import { AuditLog } from '../models/index.js';

export async function audit(req, action, { targetType = '', targetId = '', meta = {} } = {}) {
  try {
    await AuditLog.create({ actor: req.user?._id, action, targetType, targetId: String(targetId || ''), meta, ip: req.ip || '' });
  } catch (err) {
    console.error('[audit] yozib bo‘lmadi:', err.message);
  }
}
