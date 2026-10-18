import { Notification, Reminder, University } from '../models/index.js';
import { notFound, ok, pageMeta, paginate } from '../utils/http.js';
import { processDueReminders } from '../services/scheduler.js';

export async function list(req, res) {
  await processDueReminders().catch(() => {});
  const pg = paginate(req.query, { defaultLimit: 20, maxLimit: 50 });
  const filter = { user: req.user._id };
  if (req.query.unread === 'true') filter.read = false;
  const [items, total, unread] = await Promise.all([
    Notification.find(filter).sort({ createdAt: -1 }).skip(pg.skip).limit(pg.limit),
    Notification.countDocuments(filter),
    Notification.countDocuments({ user: req.user._id, read: false })
  ]);
  return ok(res, { notifications: items, unread }, 200, pageMeta(pg, total));
}

export async function unreadCount(req, res) {
  await processDueReminders().catch(() => {});
  return ok(res, { unread: await Notification.countDocuments({ user: req.user._id, read: false }) });
}

export async function markRead(req, res) {
  const n = await Notification.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, { $set: { read: true } }, { returnDocument: 'after' });
  if (!n) throw notFound('Bildirishnoma topilmadi');
  return ok(res, { notification: n });
}

export async function markAllRead(req, res) {
  const r = await Notification.updateMany({ user: req.user._id, read: false }, { $set: { read: true } });
  return ok(res, { updated: r.modifiedCount });
}

export async function remove(req, res) {
  await Notification.deleteOne({ _id: req.params.id, user: req.user._id });
  return ok(res, { deleted: true });
}

export function preferences(req, res) {
  return ok(res, { preferences: req.user.notificationPrefs, channels: { inApp: true, email: false, sms: false, push: false } });
}

export async function updatePreferences(req, res) {
  const allowed = ['reminders', 'deadlines', 'achievements', 'groupUpdates'];
  for (const k of allowed) if (typeof req.body[k] === 'boolean') req.user.notificationPrefs[k] = req.body[k];
  await req.user.save();
  return ok(res, { preferences: req.user.notificationPrefs });
}

export async function listReminders(req, res) {
  const filter = { user: req.user._id };
  if (req.query.kind) filter.kind = String(req.query.kind);
  if (req.query.status === 'active') filter.done = false;
  const reminders = await Reminder.find(filter).sort({ done: 1, dueAt: 1 }).populate('university', 'name slug');
  return ok(res, { reminders });
}

export async function createReminder(req, res) {
  if (req.body.university && !(await University.exists({ _id: req.body.university }))) throw notFound('Universitet topilmadi');
  const r = await Reminder.create({ ...req.body, user: req.user._id });
  return ok(res, { reminder: r }, 201);
}

export async function updateReminder(req, res) {
  const r = await Reminder.findOne({ _id: req.params.id, user: req.user._id });
  if (!r) throw notFound('Eslatma topilmadi');
  Object.assign(r, req.body);
  if (req.body.dueAt) r.notifiedAt = null;
  await r.save();
  return ok(res, { reminder: r });
}

export async function deleteReminder(req, res) {
  const r = await Reminder.deleteOne({ _id: req.params.id, user: req.user._id });
  if (!r.deletedCount) throw notFound('Eslatma topilmadi');
  return ok(res, { deleted: true });
}
