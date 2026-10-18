import { Notification, User } from '../models/index.js';

const PREF_BY_TYPE = {
  reminder: 'reminders',
  deadline: 'deadlines',
  achievement: 'achievements',
  group: 'groupUpdates',
  assignment: 'groupUpdates'
};

export async function notify(userId, { type = 'system', title, body = '', link = '' }) {
  const pref = PREF_BY_TYPE[type];
  if (pref) {
    const user = await User.findById(userId).select('notificationPrefs');
    if (user && user.notificationPrefs?.[pref] === false) return null;
  }
  return Notification.create({ user: userId, type, title, body, link });
}

export async function notifyMany(userIds, payload) {
  return Promise.all(userIds.map((id) => notify(id, payload)));
}
