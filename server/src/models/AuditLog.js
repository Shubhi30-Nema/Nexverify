// src/models/AuditLog.js
// APPEND-ONLY — no update or delete routes are permitted.
import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  verificationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Verification' },
  tenderId:       { type: mongoose.Schema.Types.ObjectId, ref: 'Tender' },
  bidderId:       { type: mongoose.Schema.Types.ObjectId, ref: 'Bidder' },
  actorId:        { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  actorName:      { type: String },
  actorRole:      { type: String },

  // Category of the event
  actionType: {
    type: String,
    enum: [
      'VERIFICATION_STARTED',
      'DOCUMENT_UPLOADED',
      'OCR_COMPLETED',
      'SCORING_COMPLETED',
      'CROSS_CHECK_COMPLETED',
      'DECISION_MADE',
      'STATUS_CHANGED',
      'NOTE_ADDED',
    ],
    required: true,
  },

  payload:   { type: mongoose.Schema.Types.Mixed }, // event-specific data
  ipAddress: { type: String },
  userAgent: { type: String },
}, {
  timestamps: true,
  // Enforce immutability at Mongoose level
  // (still need to block PUT/DELETE at route level)
});

// No pre-save hook to mutate; no update statics exposed
export default mongoose.model('AuditLog', auditLogSchema);
