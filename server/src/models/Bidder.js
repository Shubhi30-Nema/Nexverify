// src/models/Bidder.js
import mongoose from 'mongoose';

const bidderSchema = new mongoose.Schema({
  legalName:    { type: String, required: true, trim: true },
  gstin:        { type: String, required: true, trim: true, uppercase: true },
  pan:          { type: String, required: true, trim: true, uppercase: true },
  udyamNumber:  { type: String, trim: true, uppercase: true },
  cin:          { type: String, trim: true, uppercase: true },
  contactEmail: { type: String, trim: true, lowercase: true },
  address:      { type: String, trim: true },

  riskLevel: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Unknown'],
    default: 'Unknown',
  },

  // Tenders this bidder has submitted to
  tenders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tender' }],
}, { timestamps: true });

// Derived short ID for display (BID-101 style)
bidderSchema.virtual('shortId').get(function () {
  return `BID-${String(this._id).slice(-4).toUpperCase()}`;
});

export default mongoose.model('Bidder', bidderSchema);
