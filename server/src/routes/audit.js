// src/routes/audit.js
import express from 'express';
import { listAuditLogs, getAuditLog } from '../controllers/auditController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Audit logs are read-only — no POST/PUT/DELETE routes
router.use(protect);
router.use(authorize('admin', 'auditor', 'procurement_officer'));
router.get('/',    listAuditLogs);
router.get('/:id', getAuditLog);

export default router;
