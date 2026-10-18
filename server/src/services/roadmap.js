import { Lesson, LearningProgress } from '../models/index.js';
import { nextLesson, roadmapStats, revisionList, weeklyTarget } from './progressCalc.js';
import { startOfWeekKey } from '../utils/dates.js';
import { ActivityLog } from '../models/index.js';

const STAGE_RANK = { beginner: 0, intermediate: 1, advanced: 2 };

export async function buildModules(career, level = 'beginner') {
  const slugs = career.roadmapLessons || [];
  const lessons = await Lesson.find({ slug: { $in: slugs }, published: true }).populate('topic').populate('subject', 'name slug');
  const bySlug = new Map(lessons.map((l) => [l.slug, l]));
  const groups = new Map();
  slugs.forEach((slug, index) => {
    const lesson = bySlug.get(slug);
    if (!lesson?.topic) return;
    const key = String(lesson.topic._id);
    if (!groups.has(key)) groups.set(key, { topic: lesson.topic, subject: lesson.subject, firstIndex: index, lessons: [] });
    groups.get(key).lessons.push(lesson);
  });

  const included = new Map([...groups.values()].map((g) => [g.topic.slug, g.topic.name]));
  const modules = [...groups.values()]
    .sort((a, b) => STAGE_RANK[a.topic.stage] - STAGE_RANK[b.topic.stage] || a.firstIndex - b.firstIndex)
    .map((g, i) => ({
      topic: g.topic._id,
      subject: g.subject?._id,
      title: g.topic.name,
      stage: g.topic.stage,
      order: i + 1,
      objectives: g.topic.objectives,
      prerequisites: (g.topic.prerequisites || []).filter((p) => included.has(p)).map((p) => included.get(p)),
      lessons: g.lessons.sort((a, b) => a.order - b.order).map((l) => l._id),
      optional: (level === 'intermediate' || level === 'advanced') && g.topic.stage === 'beginner'
    }));
  return modules;
}

export async function roadmapDetails(roadmap, userId) {
  const lessonIds = roadmap.modules.flatMap((m) => m.lessons);
  const [lessons, progress] = await Promise.all([
    Lesson.find({ _id: { $in: lessonIds } }).select('title slug difficulty durationMinutes summary subject topic order').populate('subject', 'name slug color'),
    LearningProgress.find({ user: userId, lesson: { $in: lessonIds } })
  ]);
  const lessonsById = new Map(lessons.map((l) => [String(l._id), l]));
  const progressByLesson = new Map(progress.map((p) => [String(p.lesson), p]));
  const stats = roadmapStats(roadmap, progressByLesson, lessonsById);
  const nextId = nextLesson(roadmap, progressByLesson);
  const revision = revisionList(progress).filter((id) => lessonsById.has(id)).slice(0, 5);

  const weekStart = startOfWeekKey();
  const logs = await ActivityLog.find({ user: userId, day: { $gte: weekStart } });
  const weekCompleted = logs.reduce((s, l) => s + (l.lessonsCompleted || 0), 0);
  const weekMinutes = logs.reduce((s, l) => s + (l.minutes || 0), 0);
  const target = weeklyTarget(roadmap.dailyMinutes, roadmap.studyDaysPerWeek);

  const modules = roadmap.modules.map((m, i) => ({
    id: String(m._id),
    title: m.title,
    stage: m.stage,
    order: m.order,
    optional: m.optional,
    objectives: m.objectives,
    prerequisites: m.prerequisites,
    subject: lessonsById.get(String(m.lessons[0]))?.subject || null,
    stats: stats.modules[i],
    lessons: m.lessons
      .map(String)
      .filter((id) => lessonsById.has(id))
      .map((id) => {
        const l = lessonsById.get(id);
        const p = progressByLesson.get(id);
        return {
          id,
          slug: l.slug,
          title: l.title,
          difficulty: l.difficulty,
          durationMinutes: l.durationMinutes,
          status: p?.status || 'not_started',
          bestPercent: p?.bestPercent ?? null
        };
      })
  }));

  const brief = (id) => {
    const l = lessonsById.get(id);
    return l ? { id, slug: l.slug, title: l.title, durationMinutes: l.durationMinutes, summary: l.summary } : null;
  };

  return {
    id: String(roadmap._id),
    title: roadmap.title,
    career: roadmap.career,
    level: roadmap.level,
    dailyMinutes: roadmap.dailyMinutes,
    studyDaysPerWeek: roadmap.studyDaysPerWeek,
    goal: roadmap.goal,
    status: roadmap.status,
    createdAt: roadmap.createdAt,
    stats: { ...stats, modules: undefined },
    modules,
    nextLesson: nextId ? brief(nextId) : null,
    revision: revision.map(brief).filter(Boolean),
    weekly: { target, completed: weekCompleted, minutes: weekMinutes, weekStart }
  };
}
