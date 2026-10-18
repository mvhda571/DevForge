import {
  Achievement,
  ActivityLog,
  Career,
  Favorite,
  Lesson,
  LearningProgress,
  LearningRoadmap,
  QuizAttempt,
  Reminder,
  StudentProfile,
  Subject,
  University
} from '../models/index.js';
import { badRequest, notFound, ok } from '../utils/http.js';
import { lastNDays } from '../utils/dates.js';
import { levelInfo, recordActivity, touchStreak } from '../services/gamification.js';
import { roadmapDetails } from '../services/roadmap.js';
import { profileCompletion } from './userController.js';

async function lessonOr404(id) {
  const lesson = await Lesson.findById(id).select('subject topic durationMinutes exercises');
  if (!lesson) throw notFound('Dars topilmadi');
  return lesson;
}

async function upsertProgress(userId, lesson) {
  return LearningProgress.findOneAndUpdate(
    { user: userId, lesson: lesson._id },
    { $setOnInsert: { user: userId, lesson: lesson._id, subject: lesson.subject, topic: lesson.topic, status: 'in_progress', startedAt: new Date() } },
    { upsert: true, returnDocument: 'after' }
  );
}

export async function start(req, res) {
  const lesson = await lessonOr404(req.params.lessonId);
  const p = await upsertProgress(req.user._id, lesson);
  if (p.status === 'not_started') {
    p.status = 'in_progress';
    await p.save();
  }
  return ok(res, { progress: p });
}

export async function exercise(req, res) {
  const lesson = await lessonOr404(req.params.lessonId);
  if (req.body.index >= (lesson.exercises?.length || 0)) throw badRequest('Mashq topilmadi');
  const p = await upsertProgress(req.user._id, lesson);
  const set = new Set(p.exercisesDone);
  if (req.body.done) set.add(req.body.index);
  else set.delete(req.body.index);
  p.exercisesDone = [...set].sort((a, b) => a - b);
  await p.save();
  return ok(res, { progress: p });
}

export async function time(req, res) {
  const lesson = await lessonOr404(req.params.lessonId);
  const p = await upsertProgress(req.user._id, lesson);
  const cap = lesson.durationMinutes * 60 * 4;
  const allowed = Math.max(0, Math.min(req.body.seconds, cap - p.timeSpentSec));
  if (allowed > 0) {
    p.timeSpentSec += allowed;
    await p.save();
    await recordActivity(req.user._id, { minutes: Math.round((allowed / 60) * 100) / 100 });
  }
  return ok(res, { counted: allowed });
}

export async function complete(req, res) {
  const lesson = await lessonOr404(req.params.lessonId);
  const p = await LearningProgress.findOne({ user: req.user._id, lesson: lesson._id });
  if (!p || p.status !== 'completed') {
    throw badRequest('Darsni yakunlash uchun avval mini testdan o‘tish balini oling.');
  }
  await touchStreak(req.user._id);
  return ok(res, { progress: p });
}

async function subjectPerformance(userId) {
  const attempts = await QuizAttempt.find({ user: userId }).select('lesson subject percent createdAt').sort({ createdAt: 1 });
  const bestByLesson = new Map();
  for (const a of attempts) {
    const key = String(a.lesson);
    const prev = bestByLesson.get(key);
    if (!prev || a.percent > prev.percent) bestByLesson.set(key, a);
  }
  const bySubject = new Map();
  for (const a of bestByLesson.values()) {
    const k = String(a.subject);
    const v = bySubject.get(k) || { sum: 0, n: 0 };
    v.sum += a.percent;
    v.n += 1;
    bySubject.set(k, v);
  }
  const subjects = await Subject.find({ _id: { $in: [...bySubject.keys()] } }).select('name slug');
  return subjects.map((s) => {
    const v = bySubject.get(String(s._id));
    return { subject: s.name, slug: s.slug, average: Math.round(v.sum / v.n), lessons: v.n };
  });
}

async function skillsInProgress(userId) {
  const progress = await LearningProgress.find({ user: userId }).select('subject status');
  const grouped = new Map();
  for (const p of progress) {
    const k = String(p.subject);
    const v = grouped.get(k) || { completed: 0, started: 0 };
    v.started += 1;
    if (p.status === 'completed') v.completed += 1;
    grouped.set(k, v);
  }
  const subjects = await Subject.find({ _id: { $in: [...grouped.keys()] } }).select('name slug icon');
  const totals = await Promise.all(subjects.map((s) => Lesson.countDocuments({ subject: s._id, published: true })));
  return subjects.map((s, i) => {
    const v = grouped.get(String(s._id));
    return { subject: s.name, slug: s.slug, icon: s.icon, completed: v.completed, total: totals[i], percent: totals[i] ? Math.round((v.completed / totals[i]) * 100) : 0 };
  });
}

export async function dashboard(req, res) {
  const userId = req.user._id;
  const profile = await StudentProfile.findOne({ user: userId });
  const days = lastNDays(14);
  const [completion, completedCount, attemptsCount, recentAttempts, logs, favorites, reminders, achievements, performance, skills, revisionDocs] = await Promise.all([
    profileCompletion(req.user),
    LearningProgress.countDocuments({ user: userId, status: 'completed' }),
    QuizAttempt.countDocuments({ user: userId }),
    QuizAttempt.find({ user: userId }).sort({ createdAt: -1 }).limit(5).populate('lesson', 'title slug').select('percent passed score total createdAt lesson'),
    ActivityLog.find({ user: userId }).select('day minutes lessonsCompleted quizzes xp'),
    Favorite.find({ user: userId, kind: { $in: ['career', 'university'] } }).sort({ createdAt: -1 }).limit(20),
    Reminder.find({ user: userId, done: false, dueAt: { $gte: new Date(Date.now() - 86400000) } }).sort({ dueAt: 1 }).limit(5),
    Achievement.find({ user: userId }).sort({ createdAt: -1 }).limit(6),
    subjectPerformance(userId),
    skillsInProgress(userId),
    LearningProgress.find({ user: userId, $or: [{ status: 'needs_review' }, { status: 'completed', bestPercent: { $lt: 80 } }] }).sort({ bestPercent: 1 }).limit(5).populate('lesson', 'title slug')
  ]);

  const logByDay = new Map(logs.map((l) => [l.day, l]));
  const totalMinutes = Math.round(logs.reduce((s, l) => s + (l.minutes || 0), 0));
  const activity = days.map((d) => ({ day: d, minutes: Math.round(logByDay.get(d)?.minutes || 0), lessons: logByDay.get(d)?.lessonsCompleted || 0 }));

  let roadmap = null;
  if (profile?.activeRoadmap) {
    const r = await LearningRoadmap.findOne({ _id: profile.activeRoadmap, user: userId }).populate('career', 'name slug icon');
    if (r) roadmap = await roadmapDetails(r, userId);
  }

  const todayPlan = [];
  if (roadmap) {
    let budget = profile?.dailyMinutes || 30;
    const candidates = [];
    for (const m of roadmap.modules) for (const l of m.lessons) if (l.status !== 'completed' && !m.optional) candidates.push({ ...l, kind: l.status === 'needs_review' ? 'revision' : 'lesson' });
    candidates.sort((a, b) => (a.kind === 'revision' ? -1 : 0) - (b.kind === 'revision' ? -1 : 0));
    for (const c of candidates) {
      if (budget <= 0 || todayPlan.length >= 3) break;
      todayPlan.push(c);
      budget -= c.durationMinutes;
    }
  }

  const careerIds = favorites.filter((f) => f.kind === 'career').map((f) => f.refId);
  const uniIds = favorites.filter((f) => f.kind === 'university').map((f) => f.refId);
  const [savedCareers, favoriteUniversities] = await Promise.all([
    Career.find({ _id: { $in: careerIds } }).select('name slug icon category'),
    University.find({ _id: { $in: uniIds } }).select('name slug city country')
  ]);

  return ok(res, {
    user: { name: req.user.name, xp: req.user.xp, streak: req.user.streak },
    level: levelInfo(req.user.xp),
    profileCompletion: completion,
    onboardingCompleted: req.user.onboardingCompleted,
    totals: { completedLessons: completedCount, quizAttempts: attemptsCount, studyMinutes: totalMinutes },
    roadmap: roadmap && {
      id: roadmap.id,
      title: roadmap.title,
      career: roadmap.career,
      stats: roadmap.stats,
      nextLesson: roadmap.nextLesson,
      weekly: roadmap.weekly
    },
    todayPlan,
    recentQuizzes: recentAttempts,
    revision: revisionDocs.filter((p) => p.lesson).map((p) => ({ id: p.lesson._id, slug: p.lesson.slug, title: p.lesson.title, bestPercent: p.bestPercent, status: p.status })),
    skills,
    charts: { activity, subjectPerformance: performance },
    savedCareers,
    favoriteUniversities,
    reminders,
    achievements,
    hasActivity: completedCount > 0 || attemptsCount > 0
  });
}
