import {
  ActivityLog,
  AssessmentResult,
  Lesson,
  LearningProgress,
  LearningRoadmap,
  QuizAttempt,
  StudentProfile,
  Subject
} from '../models/index.js';
import { lastNDays } from '../utils/dates.js';
import { roadmapDetails } from './roadmap.js';

export async function compactStats(studentIds) {
  const [progress, attempts, results, logs] = await Promise.all([
    LearningProgress.find({ user: { $in: studentIds }, status: 'completed' }).select('user'),
    QuizAttempt.find({ user: { $in: studentIds } }).select('user percent'),
    AssessmentResult.find({ user: { $in: studentIds } }).sort({ createdAt: -1 }).select('user top.name top.score createdAt'),
    ActivityLog.find({ user: { $in: studentIds } }).sort({ day: -1 }).select('user day')
  ]);
  const out = new Map(studentIds.map((id) => [String(id), { completedLessons: 0, quizAttempts: 0, averageScore: null, topCareer: null, lastActiveDay: null, _sum: 0 }]));
  for (const p of progress) out.get(String(p.user)).completedLessons += 1;
  for (const a of attempts) {
    const s = out.get(String(a.user));
    s.quizAttempts += 1;
    s._sum += a.percent;
  }
  for (const r of results) {
    const s = out.get(String(r.user));
    if (s && !s.topCareer && r.top?.[0]) s.topCareer = { name: r.top[0].name, score: r.top[0].score };
  }
  for (const l of logs) {
    const s = out.get(String(l.user));
    if (s && !s.lastActiveDay) s.lastActiveDay = l.day;
  }
  for (const s of out.values()) {
    s.averageScore = s.quizAttempts ? Math.round(s._sum / s.quizAttempts) : null;
    delete s._sum;
  }
  return out;
}

export async function learningOverview(studentId) {
  const days = lastNDays(7);
  const weekStart = days[0];
  const [completed, attempts, logs, profile] = await Promise.all([
    LearningProgress.find({ user: studentId, status: 'completed' }).sort({ completedAt: -1 }).limit(30).populate('lesson', 'title slug').populate('subject', 'name'),
    QuizAttempt.find({ user: studentId }).sort({ createdAt: -1 }).limit(20).populate('lesson', 'title').select('lesson percent passed score total createdAt'),
    ActivityLog.find({ user: studentId, day: { $gte: weekStart } }),
    StudentProfile.findOne({ user: studentId }).select('activeRoadmap dailyMinutes studyDaysPerWeek level')
  ]);
  let roadmap = null;
  if (profile?.activeRoadmap) {
    const r = await LearningRoadmap.findById(profile.activeRoadmap).populate('career', 'name slug');
    if (r) {
      const d = await roadmapDetails(r, studentId);
      roadmap = { title: d.title, career: d.career, stats: d.stats, weekly: d.weekly };
    }
  }
  const bySubject = new Map();
  for (const a of attempts) {
    bySubject.set(a.lesson?.title, a);
  }
  const subjects = await Subject.find().select('name');
  const subjectTotals = await Promise.all(subjects.map((s) => Lesson.countDocuments({ subject: s._id, published: true })));
  const doneBySubject = new Map();
  for (const p of completed) if (p.subject) doneBySubject.set(p.subject.name, (doneBySubject.get(p.subject.name) || 0) + 1);

  const logByDay = new Map(logs.map((l) => [l.day, l]));
  const week = days.map((d) => ({ day: d, minutes: Math.round(logByDay.get(d)?.minutes || 0), lessons: logByDay.get(d)?.lessonsCompleted || 0, quizzes: logByDay.get(d)?.quizzes || 0 }));
  const weekAttempts = attempts.filter((a) => a.createdAt >= new Date(`${weekStart}T00:00:00Z`));

  return {
    level: profile?.level || null,
    roadmap,
    completedLessons: completed.map((p) => ({ id: p.lesson?._id, title: p.lesson?.title, subject: p.subject?.name, completedAt: p.completedAt, bestPercent: p.bestPercent })),
    quizzes: attempts.map((a) => ({ lesson: a.lesson?.title, percent: a.percent, passed: a.passed, createdAt: a.createdAt })),
    quizSummary: {
      attempts: attempts.length,
      averagePercent: attempts.length ? Math.round(attempts.reduce((s, a) => s + a.percent, 0) / attempts.length) : null,
      passed: attempts.filter((a) => a.passed).length
    },
    subjects: subjects
      .map((s, i) => ({ name: s.name, completed: doneBySubject.get(s.name) || 0, total: subjectTotals[i] }))
      .filter((s) => s.completed > 0),
    weeklyReport: {
      weekStart,
      days: week,
      minutes: week.reduce((s, d) => s + d.minutes, 0),
      lessonsCompleted: week.reduce((s, d) => s + d.lessons, 0),
      quizzes: weekAttempts.length,
      averagePercent: weekAttempts.length ? Math.round(weekAttempts.reduce((s, a) => s + a.percent, 0) / weekAttempts.length) : null
    }
  };
}
