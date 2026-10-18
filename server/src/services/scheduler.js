import { Reminder } from '../models/index.js';
import { notify } from './notify.js';

const NEXT = { daily: 86400000, weekly: 7 * 86400000 };

export async function processDueReminders(now = new Date()) {
  const due = await Reminder.find({ done: false, notifiedAt: null, dueAt: { $lte: now } }).limit(200);
  for (const r of due) {
    await notify(r.user, {
      type: r.kind === 'deadline' ? 'deadline' : 'reminder',
      title: r.kind === 'deadline' ? `Muddat: ${r.title}` : `Eslatma: ${r.title}`,
      body: r.note || '',
      link: '/app/reminders'
    });
    if (r.repeat !== 'none') {
      let next = r.dueAt.getTime() + NEXT[r.repeat];
      while (next <= now.getTime()) next += NEXT[r.repeat];
      r.dueAt = new Date(next);
    } else {
      r.notifiedAt = now;
    }
    await r.save();
  }
  return due.length;
}

export function startScheduler(intervalMs = 60000) {
  const tick = () => processDueReminders().catch((e) => console.error('[scheduler]', e.message));
  tick();
  return setInterval(tick, intervalMs);
}
