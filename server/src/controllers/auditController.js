// src/controllers/auditController.js
// APPEND-ONLY — no update or delete operations.
import AuditLog from '../models/AuditLog.js';

export async function listAuditLogs(req, res, next) {
  try {
    const { verificationId, bidderId, tenderId, page = 1, limit = 50 } = req.query;
    const filter = {};
    if (verificationId) filter.verificationId = verificationId;
    if (bidderId) filter.bidderId = bidderId;
    if (tenderId) filter.tenderId = tenderId;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [logs, total] = await Promise.all([
      AuditLog.find(filter)
        .populate('actorId', 'name role')
        .skip(skip).limit(parseInt(limit)).sort('-createdAt'),
      AuditLog.countDocuments(filter),
    ]);
    res.json({ success: true, data: logs, total, page: +page, limit: +limit });
  } catch (err) { next(err); }
}

export async function getAuditLog(req, res, next) {
  try {
    const log = await AuditLog.findById(req.params.id).populate('actorId', 'name role');
    if (!log) return res.status(404).json({ success: false, message: 'Audit log not found' });
    res.json({ success: true, data: log });
  } catch (err) { next(err); }
}
