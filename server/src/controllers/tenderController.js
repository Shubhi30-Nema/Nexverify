// src/controllers/tenderController.js
import Tender from '../models/Tender.js';

export async function listTenders(req, res, next) {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : {};
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [tenders, total] = await Promise.all([
      Tender.find(filter).populate('bidders', 'legalName gstin').skip(skip).limit(parseInt(limit)).sort('-createdAt'),
      Tender.countDocuments(filter),
    ]);
    res.json({ success: true, data: tenders, total, page: +page, limit: +limit });
  } catch (err) { next(err); }
}

export async function getTender(req, res, next) {
  try {
    const tender = await Tender.findById(req.params.id).populate('bidders');
    if (!tender) return res.status(404).json({ success: false, message: 'Tender not found' });
    res.json({ success: true, data: tender });
  } catch (err) { next(err); }
}

export async function createTender(req, res, next) {
  try {
    const tender = await Tender.create(req.body);
    res.status(201).json({ success: true, data: tender });
  } catch (err) { next(err); }
}

export async function updateTender(req, res, next) {
  try {
    const tender = await Tender.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!tender) return res.status(404).json({ success: false, message: 'Tender not found' });
    res.json({ success: true, data: tender });
  } catch (err) { next(err); }
}

export async function deleteTender(req, res, next) {
  try {
    await Tender.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Tender deleted' });
  } catch (err) { next(err); }
}
