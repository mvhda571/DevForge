import { Achievement, ActivityLog, LearningProgress, Lesson, User } from '../models/index.js';
import { dayKey, daysBetween, startOfWeekKey } from '../utils/dates.js';
import { notify } from './notify.js';

export const XP_RULES = {
  lessonComplete: 50,
  quizPass: 20,
  quizPerfect: 10,
  assignmentSubmit: 15
};

export const ACHIEVEMENTS = {
  first_assessment: { title: 'Birinchi qadam', description: 'Kasb testini yakunladingiz', icon: 'Compass', xp: 30 },
  roadmap_started: { title: 'Yo‘l tanlandi', description: 'Birinchi yo‘l xaritangizni yaratdingiz', icon: 'Map', xp: 20 },
  first_lesson: { title: 'Ilk dars', description: 'Birinchi darsni muvaffaqiyatli tugatdingiz', icon: 'BookOpenCheck', xp: 20 },
  lessons_5: { title: 'Bilim izlovchi', description: '5 ta darsni tugatdingiz', icon: 'Layers', xp: 40 },
  lessons_10: { title: 'Barqaror o‘quvchi', description: '10 ta darsni tugatdingiz', icon: 'Mountain', xp: 60 },
  lessons_25: { title: 'Bilim ustasi', description: '25 ta darsni tugatdingiz', icon: 'Crown', xp: 100 },
  perfect_quiz: { title: 'Mukammal natija', description: 'Mini testdan 100% oldingiz', icon: 'Target', xp: 15 },
  streak_3: { title: '3 kunlik izchillik', description: '3 kun ketma-ket o‘qidingiz', icon: 'Flame', xp: 15, kind: 'streak' },
  streak_7: { title: 'Bir hafta izchillik', description: '7 kun ketma-ket o‘qidingiz', icon: 'Flame', xp: 40, kind: 'streak' },
  streak_30: { title: 'Bir oylik izchillik', description: '30 kun ketma-ket o‘qidingiz', icon: 'Flame', xp: 150, kind: 'streak' }
};

export function levelInfo(xp = 0) {
  const level = Math.floor((1 + Math.sqrt(1 + (8 * xp) / 100)) / 2);
  const floorXp = (100 * level * (level - 1)) / 2;
  const nextXp = (100 * (level + 1) * level) / 2;
  return { level, xp, levelStartXp: floorXp, nextLevelXp: nextXp, progress: Math.round(((xp - floorXp) / (nextXp - floorXp)) * 100) };
}

export async function recordActivity(userId, inc) {
  await ActivityLog.updateOne({ user: userId, day: dayKey() }, { $inc: inc, $setOnInsert: { user: userId, day: dayKey() } }, { upsert: true });
}

export async function addXp(userId, amount) {
  if (amount <= 0) return;
  await User.updateOne({ _id: userId }, { $inc: { xp: amount } });
  await recordActivity(userId, { xp: amount });
}

export async function touchStreak(userId) {
  const user = await User.findById(userId);
  if (!user) return null;
  const today = dayKey();
  const last = user.streak?.lastActiveDay;
  if (last === today) return user.streak;
  const current = last && daysBetween(last, today) === 1 ? (user.streak.current || 0) + 1 : 1;
  user.streak = { current, best: Math.max(current, user.streak?.best || 0), lastActiveDay: today };
  await user.save();
  return user.streak;
}

export async function grantAchievement(userId, key, override = {}) {
  const def = { kind: 'milestone', ...(ACHIEVEMENTS[key] || {}), ...override };
  if (!def.title) return null;
  try {
    const doc = await Achievement.create({ user: userId, key, title: def.title, description: def.description, icon: def.icon, kind: def.kind, xp: def.xp || 0 });
    if (def.xp) await addXp(userId, def.xp);
    await notify(userId, { type: 'achievement', title: `Yangi yutuq: ${def.title}`, body: def.description, link: '/app/achievements' });
    return doc;
  } catch (err) {
    if (err?.code === 11000) return null;
    throw err;
  }
}

export async function evaluateLearningAchievements(userId, { perfect = false, subject = null } = {}) {
  const earned = [];
  const push = (a) => a && earned.push(a);
  const completed = await LearningProgress.countDocuments({ user: userId, status: 'completed' });
  if (completed >= 1) push(await grantAchievement(userId, 'first_lesson'));
  if (completed >= 5) push(await grantAchievement(userId, 'lessons_5'));
  if (completed >= 10) push(await grantAchievement(userId, 'lessons_10'));
  if (completed >= 25) push(await grantAchievement(userId, 'lessons_25'));
  if (perfect) push(await grantAchievement(userId, 'perfect_quiz'));

  const streak = await touchStreak(userId);
  if (streak?.current >= 3) push(await grantAchievement(userId, 'streak_3'));
  if (streak?.current >= 7) push(await grantAchievement(userId, 'streak_7'));
  if (streak?.current >= 30) push(await grantAchievement(userId, 'streak_30'));

  if (subject) {
    const totalInSubject = await Lesson.countDocuments({ subject: subject._id, published: true });
    const doneInSubject = await LearningProgress.countDocuments({ user: userId, subject: subject._id, status: 'completed' });
    if (totalInSubject > 0 && doneInSubject >= totalInSubject) {
      push(
        await grantAchievement(userId, `subject_${subject.slug}`, {
          title: `${subject.name}: ko‘nikma nishoni`,
          description: `“${subject.name}” fanidagi barcha darslarni tugatdingiz`,
          icon: 'BadgeCheck',
          kind: 'badge',
          xp: 50
        })
      );
    }
  }
  return earned.map((a) => ({ key: a.key, title: a.title, description: a.description, icon: a.icon, xp: a.xp }));
}

export async function checkWeeklyGoal(userId, target) {
  const weekStart = startOfWeekKey();
  const logs = await ActivityLog.find({ user: userId, day: { $gte: weekStart } });
  const done = logs.reduce((s, l) => s + (l.lessonsCompleted || 0), 0);
  if (target > 0 && done >= target) {
    const a = await grantAchievement(userId, `weekly_goal_${weekStart}`, {
      title: 'Haftalik maqsad bajarildi',
      description: `Shu hafta ${done} ta darsni tugatdingiz`,
      icon: 'CalendarCheck',
      kind: 'milestone',
      xp: 30
    });
    return a ? { key: a.key, title: a.title, description: a.description, icon: a.icon, xp: a.xp } : null;
  }
  return null;
}
