// src/models/Verification.js
import mongoose from 'mongoose';

// Individual document score sub-document
const docScoreSchema = new mongoose.Schema({
  documentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Document' },
  docType:    { type: String },
  rawScore:   { type: Number }, // before clamping
  score:      { type: Number }, // 0 – weight_max
  maxScore:   { type: Number },
  deductions: [
    {
      field:   { type: String },     // e.g. 'gst_filing_lag'
      reason:  { type: String },     // human readable
      statute: { type: String },     // e.g. 'CGST Act § 47'
      points:  { type: Number },     // negative
    }
  ],
}, { _id: false });

// Cross-check result sub-document
const crossCheckSchema = new mongoose.Schema({
  fieldKey:    { type: String },    // e.g. 'legal_name'
  docA:        { type: String },    // docType of first doc
  docB:        { type: String },    // docType of second doc
  valueA:      { type: String },
  valueB:      { type: String },
  match:       { type: Boolean },
  similarity:  { type: Number },    // 0-1 for string fields
  statute:     { type: String },
  reason:      { type: String },
}, { _id: false });

const verificationSchema = new mongoose.Schema({
  tenderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tender', required: true },
  bidderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bidder', required: true },
  officerId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User',   required: true },

  // Scoring breakdown
  docScores:      [docScoreSchema],
  crossChecks:    [crossCheckSchema],

  // Overall composite score (0–100)
  compositeScore: { type: Number },
  // Compliance decision
  complianceStatus: {
    type: String,
    enum: ['Compliant', 'Non-Compliant', 'Pending', 'Representation Requested'],
    default: 'Pending',
  },

  // Flags summary (pulled from deductions where applicable)
  criticalFlags: [{ type: String }],

  ocrMetrics: {
    totalPages:          { type: Number },
    totalBoundingBoxes:  { type: Number },
    avgConfidence:       { type: Number },
    processingTimeMs:    { type: Number },
  },

  // Officer decision
  decision: {
    type: String,
    enum: ['Qualified', 'Request Representation', 'Disqualified', null],
    default: null,
  },
  decisionReason:  { type: String },
  decisionAt:      { type: Date },

  startedAt:    { type: Date, default: Date.now },
  completedAt:  { type: Date },

  status: {
    type: String,
    enum: ['in_progress', 'done', 'failed'],
    default: 'in_progress',
  },
}, { timestamps: true });

// Only one active verification per (tender, bidder) pair
verificationSchema.index({ tenderId: 1, bidderId: 1 });

export default mongoose.model('Verification', verificationSchema);
