// src/routes/bidders.js
import express from 'express';
import { listBidders, getBidder, createBidder, updateBidder, linkBidderToTender } from '../controllers/bidderController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.get('/',          listBidders);
router.get('/:id',       getBidder);
router.post('/',         authorize('admin', 'procurement_officer'), createBidder);
router.put('/:id',       authorize('admin', 'procurement_officer'), updateBidder);
router.post('/link',     authorize('admin', 'procurement_officer'), linkBidderToTender);

export default router;
