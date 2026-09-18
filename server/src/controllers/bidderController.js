// src/controllers/bidderController.js
import Bidder from '../models/Bidder.js';
import Tender from '../models/Tender.js';

export async function listBidders(req, res, next) {
  try {
    const { tenderId, page = 1, limit = 20 } = req.query;
    const filter = tenderId ? { tenders: tenderId } : {};
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [bidders, total] = await Promise.all([
      Bidder.find(filter).skip(skip).limit(parseInt(limit)).sort('-createdAt'),
      Bidder.countDocuments(filter),
    ]);
    res.json({ success: true, data: bidders, total, page: +page, limit: +limit });
  } catch (err) { next(err); }
}

export async function getBidder(req, res, next) {
  try {
    const bidder = await Bidder.findById(req.params.id);
    if (!bidder) return res.status(404).json({ success: false, message: 'Bidder not found' });
    res.json({ success: true, data: bidder });
  } catch (err) { next(err); }
}

export async function createBidder(req, res, next) {
  try {
    const bidder = await Bidder.create(req.body);
    // Attach bidder to tender if tenderId provided
    if (req.body.tenderId) {
      await Tender.findByIdAndUpdate(req.body.tenderId, { $addToSet: { bidders: bidder._id } });
      await Bidder.findByIdAndUpdate(bidder._id, { $addToSet: { tenders: req.body.tenderId } });
    }
    res.status(201).json({ success: true, data: bidder });
  } catch (err) { next(err); }
}

export async function updateBidder(req, res, next) {
  try {
    const bidder = await Bidder.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!bidder) return res.status(404).json({ success: false, message: 'Bidder not found' });
    res.json({ success: true, data: bidder });
  } catch (err) { next(err); }
}

export async function linkBidderToTender(req, res, next) {
  try {
    const { bidderId, tenderId } = req.body;
    await Promise.all([
      Tender.findByIdAndUpdate(tenderId, { $addToSet: { bidders: bidderId } }),
      Bidder.findByIdAndUpdate(bidderId, { $addToSet: { tenders: tenderId } }),
    ]);
    res.json({ success: true, message: 'Bidder linked to tender' });
  } catch (err) { next(err); }
}
