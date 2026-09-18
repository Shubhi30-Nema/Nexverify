// src/controllers/verificationController.js
import Verification from '../models/Verification.js';
import AuditLog from '../models/AuditLog.js';
import { runVerification } from '../services/verificationOrchestrator.js';

// Start or resume a verification run
export async function startVerification(req, res, next) {
  try {
    const { tenderId, bidderId } = req.body;
    if (!tenderId || !bidderId) {
      return res.status(400).json({ success: false, message: 'tenderId and bidderId required' });
    }

    // Upsert: one active verification per (tender, bidder)
    let verification = await Verification.findOne({ tenderId, bidderId });
    if (!verification) {
      verification = await Verification.create({
        tenderId,
        bidderId,
        officerId: req.user._id,
        status: 'in_progress',
      });
    }

    // Log start
    await AuditLog.create({
      verificationId: verification._id,
      tenderId,
      bidderId,
      actorId:   req.user._id,
      actorName: req.user.name,
      actorRole: req.user.role,
      actionType: 'VERIFICATION_STARTED',
      payload: { verificationId: verification._id },
      ipAddress: req.ip,
    });

    // Run pipeline asynchronously (fire & respond)
    runVerification(verification._id, req.user).catch(err =>
      console.error('[Orchestrator] Pipeline error:', err.message)
    );

    res.status(202).json({ success: true, data: verification, message: 'Verification pipeline started' });
  } catch (err) { next(err); }
}

// Get current verification result for a (tender, bidder) pair
export async function getVerification(req, res, next) {
  try {
    const { tenderId, bidderId } = req.query;
    const filter = {};
    if (tenderId) filter.tenderId = tenderId;
    if (bidderId) filter.bidderId = bidderId;
    if (req.params.id) filter._id = req.params.id;

    const verification = await Verification.findOne(filter)
      .populate('tenderId', 'tenderId title miiThreshold')
      .populate('bidderId', 'legalName gstin pan udyamNumber')
      .populate('officerId', 'name role');

    if (!verification) return res.status(404).json({ success: false, message: 'Verification not found' });
    res.json({ success: true, data: verification });
  } catch (err) { next(err); }
}

// List all verifications (admin/auditor view)
export async function listVerifications(req, res, next) {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const filter = status ? { complianceStatus: status } : {};
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [verifications, total] = await Promise.all([
      Verification.find(filter)
        .populate('tenderId', 'tenderId title')
        .populate('bidderId', 'legalName gstin')
        .skip(skip).limit(parseInt(limit)).sort('-createdAt'),
      Verification.countDocuments(filter),
    ]);
    res.json({ success: true, data: verifications, total, page: +page, limit: +limit });
  } catch (err) { next(err); }
}

// Officer submits final decision
export async function makeDecision(req, res, next) {
  try {
    const { decision, reason } = req.body;
    if (!['Qualified', 'Request Representation', 'Disqualified'].includes(decision)) {
      return res.status(400).json({ success: false, message: 'Invalid decision value' });
    }

    const verification = await Verification.findById(req.params.id);
    if (!verification) return res.status(404).json({ success: false, message: 'Verification not found' });

    verification.decision       = decision;
    verification.decisionReason = reason;
    verification.decisionAt     = new Date();
    await verification.save();

    await AuditLog.create({
      verificationId: verification._id,
      tenderId:  verification.tenderId,
      bidderId:  verification.bidderId,
      actorId:   req.user._id,
      actorName: req.user.name,
      actorRole: req.user.role,
      actionType: 'DECISION_MADE',
      payload: { decision, reason, compositeScore: verification.compositeScore },
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
    });

    res.json({ success: true, data: verification });
  } catch (err) { next(err); }
}
