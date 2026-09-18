// src/services/verificationOrchestrator.js
// Orchestrates the full verification pipeline:
//   1. Run PaddleOCR on each uploaded document
//   2. Cross-check extracted fields
//   3. Score each document
//   4. Compute composite score and overall status
//   5. Persist results to Verification collection

import Document from '../models/Document.js';
import Verification from '../models/Verification.js';
import AuditLog from '../models/AuditLog.js';
import { processDocument } from './ocrClient.js';
import { runCrossChecks } from './crossCheckEngine.js';
import { scoreDocument, computeCompositeScore } from './scoringEngine.js';

// Helper: determine compliance status from composite score + critical flags
function deriveStatus(compositeScore, hasCriticalCrossCheck) {
  if (hasCriticalCrossCheck) return 'Non-Compliant';
  if (compositeScore >= 80) return 'Compliant';
  if (compositeScore >= 60) return 'Pending'; // borderline — officer review needed
  return 'Non-Compliant';
}

export async function runVerification(verificationId, officerUser) {
  const verification = await Verification.findById(verificationId)
    .populate('tenderId')
    .populate('bidderId');

  if (!verification) throw new Error('Verification not found');
  const tender = verification.tenderId;

  // Fetch all documents for this (tender, bidder) pair
  const docs = await Document.find({
    bidderId: verification.bidderId._id,
    tenderId: verification.tenderId._id,
  });

  if (docs.length === 0) {
    throw new Error('No documents found for this verification');
  }

  let totalPages = 0;
  let totalBoxes = 0;
  let totalConfidence = 0;
  let totalProcessingMs = 0;

  // 1. Run OCR on each document
  for (const doc of docs) {
    try {
      doc.ocrStatus = 'processing';
      await doc.save();

      const result = await processDocument(doc.filePath, doc.docType);

      doc.rawText            = result.rawText;
      doc.ocrConfidence      = result.confidence;
      doc.boundingPolygonCount = result.boundingBoxCount;
      doc.extractedFields    = result.extractedFields;
      doc.ocrStatus          = 'done';
      await doc.save();

      totalBoxes      += result.boundingBoxCount;
      totalConfidence += result.confidence;
      totalProcessingMs += result.processingTimeMs;
      // Estimate pages from bounding box count (rough heuristic: 1 page ≈ 25 boxes)
      totalPages += Math.max(1, Math.ceil(result.boundingBoxCount / 25));
    } catch (err) {
      doc.ocrStatus = 'failed';
      doc.ocrError  = err.message;
      await doc.save();
      console.error(`[OCR] Failed for doc ${doc._id} (${doc.docType}):`, err.message);
    }
  }

  // Re-fetch docs so extractedFields are fresh
  const processedDocs = await Document.find({
    bidderId: verification.bidderId._id,
    tenderId: verification.tenderId._id,
    ocrStatus: 'done',
  });

  // 2. Cross-checks
  const { crossChecks, hasCritical } = runCrossChecks(processedDocs);

  // 3. Score each document
  const docScores = processedDocs.map(doc => {
    const result = scoreDocument(doc, tender);
    return {
      documentId: doc._id,
      docType:    result.docType,
      rawScore:   result.score,
      score:      result.score,
      maxScore:   result.maxScore,
      deductions: result.deductions,
    };
  });

  // 4. Composite score
  const compositeScore = computeCompositeScore(docScores);
  const complianceStatus = deriveStatus(compositeScore, hasCritical);

  // Collect critical flags from deductions
  const criticalFlags = [];
  for (const ds of docScores) {
    for (const d of ds.deductions) {
      criticalFlags.push(`[${ds.docType}] ${d.reason}`);
    }
  }
  for (const cc of crossChecks.filter(c => !c.match)) {
    criticalFlags.push(`[CROSS-CHECK ${cc.docA}↔${cc.docB}] ${cc.reason}`);
  }

  // 5. Persist
  verification.docScores        = docScores;
  verification.crossChecks      = crossChecks;
  verification.compositeScore   = compositeScore;
  verification.complianceStatus = complianceStatus;
  verification.criticalFlags    = criticalFlags;
  verification.ocrMetrics = {
    totalPages,
    totalBoundingBoxes: totalBoxes,
    avgConfidence: docs.length ? Math.round(totalConfidence / docs.length) : 0,
    processingTimeMs: totalProcessingMs,
  };
  verification.status      = 'done';
  verification.completedAt = new Date();
  await verification.save();

  // Write audit log
  await AuditLog.create({
    verificationId: verification._id,
    tenderId:  verification.tenderId._id,
    bidderId:  verification.bidderId._id,
    actorId:   officerUser._id,
    actorName: officerUser.name,
    actorRole: officerUser.role,
    actionType: 'SCORING_COMPLETED',
    payload: {
      compositeScore,
      complianceStatus,
      docsProcessed: processedDocs.length,
      crossChecksRun: crossChecks.length,
      criticalCrossChecks: crossChecks.filter(c => !c.match).length,
    },
  });

  return verification;
}
