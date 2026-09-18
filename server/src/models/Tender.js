// src/models/Tender.js
import mongoose from 'mongoose';

const tenderSchema = new mongoose.Schema({
  // GeM tender ID, e.g. GEM/2026/B/582910
  tenderId: {
    type: String, required: true, unique: true, trim: true, uppercase: true,
  },
  title:           { type: String, required: true, trim: true },
  category:        { type: String, trim: true },
  department:      { type: String, trim: true },
  estimatedValue:  { type: Number, required: true }, // in INR crore
  estimatedValueLabel: { type: String },             // display string e.g. "₹ 38.5 Crore"

  // MII threshold percentage — default 60% per Order 2017
  miiThreshold:   { type: Number, default: 60 },
  turnoverRequirement: { type: Number, default: 0 }, // in INR crore

  // List of docType strings required for this tender
  requiredDocuments: [{ type: String }],

  closingDate: { type: Date },
  status: {
    type: String,
    enum: ['draft', 'open', 'evaluation', 'awarded', 'cancelled'],
    default: 'open',
  },
  bidders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bidder' }],
}, { timestamps: true });

export default mongoose.model('Tender', tenderSchema);
