// src/routes/verifications.js
import express from 'express';
import {
  startVerification,
  getVerification,
  listVerifications,
  makeDecision,
} from '../controllers/verificationController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.post('/',             startVerification);
router.get('/',              listVerifications);
router.get('/:id',           getVerification);
router.post('/:id/decision', makeDecision);

export default router;
