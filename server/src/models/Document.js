// src/models/Document.js
import mongoose from 'mongoose';

// Valid document types — must map 1-1 to scoring engine weights
export const DOC_TYPES = [
  'UDYAM_MSME',
  'GSTR_3B',
  'PAN_ITR',
  'MII_AFFIDAVIT',
  'CPPP_DEBARMENT',
  'OEM_AUTH',
  'IMPORT_BILL_OF_ENTRY',
  'EPFO_ECR',
  'BALANCE_SHEET',
];

const documentSchema = new mongoose.Schema({
  bidderId: { type: mongoose.Schema.Types.Mixed, required: true },
  tenderId: { type: mongoose.Schema.Types.Mixed, required: true },

  docType: { type: String, enum: DOC_TYPES, required: true },

  fileName:     { type: String, required: true },
  originalName: { type: String },
  filePath:     { type: String, required: true },
  webPath:      { type: String },
  mimeType:     { type: String, required: true },
  sizeBytes:    { type: Number, required: true },

  // SHA-256 of the file content for tamper-evidence
  digitalHash: { type: String },

  // PaddleOCR pipeline state
  ocrStatus: {
    type: String,
    enum: ['pending', 'processing', 'done', 'failed'],
    default: 'pending',
  },
  ocrConfidence:       { type: Number },  // 0-100
  boundingPolygonCount:{ type: Number },  // total bounding boxes detected

  // Raw full text returned by PaddleOCR
  rawText: { type: String },

  // Structured key-value fields extracted by extractors.py regex + keyword windows
  // Stored as Mixed so each docType can have its own schema without strict typing
  extractedFields: { type: mongoose.Schema.Types.Mixed, default: {} },

  ocrError:    { type: String }, // surfaced when ocrStatus = 'failed'
  uploadedAt:  { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model('Document', documentSchema);
