// src/routes/tenders.js
import express from 'express';
import { listTenders, getTender, createTender, updateTender, deleteTender } from '../controllers/tenderController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.get('/',        listTenders);
router.get('/:id',     getTender);
router.post('/',       authorize('admin', 'procurement_officer'), createTender);
router.put('/:id',     authorize('admin', 'procurement_officer'), updateTender);
router.delete('/:id',  authorize('admin'), deleteTender);

export default router;
