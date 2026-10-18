import { Lesson, LearningProgress, LearningRoadmap, Quiz, StudentProfile, Subject, Topic, Favorite } from '../models/index.js';
import { notFound, ok } from '../utils/http.js';

export async function subjects(_req, res) {
  const [subjects, topics, counts] = await Promise.all([
    Subject.find().sort({ order: 1 }),
    Topic.find().sort({ order: 1 }),
    Lesson.aggregate([{ $match: { published: true } }, { $group: { _id: '$topic', count: { $sum: 1 } } }])
  ]);
  const countByTopic = new Map(counts.map((c) => [String(c._id), c.count]));
  return ok(res, {
    subjects: subjects.map((s) => ({
      ...s.toObject(),
      topics: topics
        .filter((t) => String(t.subject) === String(s._id))
        .map((t) => ({ id: t._id, slug: t.slug, name: t.name, stage: t.stage, lessonCount: countByTopic.get(String(t._id)) || 0 }))
    }))
  });
}

export async function list(req, res) {
  const filter = { published: true };
  if (req.query.subject) {
    const s = await Subject.findOne({ slug: String(req.query.subject) });
    if (!s) return ok(res, { lessons: [] });
    filter.subject = s._id;
  }
  const lessons = await Lesson.find(filter).select('slug title summary difficulty durationMinutes subject topic order').populate('subject', 'name slug').populate('topic', 'name slug order').sort({ order: 1 });
  let statusById = new Map();
  if (req.user) {
    const progress = await LearningProgress.find({ user: req.user._id, lesson: { $in: lessons.map((l) => l._id) } }).select('lesson status bestPercent');
    statusById = new Map(progress.map((p) => [String(p.lesson), p]));
  }
  lessons.sort((a, b) => (a.topic?.order ?? 0) - (b.topic?.order ?? 0) || a.order - b.order);
  return ok(res, {
    lessons: lessons.map((l) => ({ ...l.toObject(), status: statusById.get(String(l._id))?.status || 'not_started', bestPercent: statusById.get(String(l._id))?.bestPercent ?? null }))
  });
}

async function courseFor(user, lesson) {
  const profile = user.role === 'student' ? await StudentProfile.findOne({ user: user._id }) : null;
  let roadmap = null;
  if (profile?.activeRoadmap) roadmap = await LearningRoadmap.findOne({ _id: profile.activeRoadmap, user: user._id, 'modules.lessons': lesson._id });
  if (!roadmap) roadmap = await LearningRoadmap.findOne({ user: user._id, 'modules.lessons': lesson._id });

  let modules;
  let title;
  if (roadmap) {
    title = roadmap.title;
    modules = roadmap.modules.map((m) => ({ title: m.title, optional: m.optional, lessonIds: m.lessons.map(String) }));
  } else {
    const subject = await Subject.findById(lesson.subject);
    const topics = await Topic.find({ subject: lesson.subject }).sort({ order: 1 });
    const lessons = await Lesson.find({ subject: lesson.subject, published: true }).select('_id topic order').sort({ order: 1 });
    title = subject?.name || 'Kurs';
    modules = topics.map((t) => ({ title: t.name, optional: false, lessonIds: lessons.filter((l) => String(l.topic) === String(t._id)).map((l) => String(l._id)) })).filter((m) => m.lessonIds.length);
  }
  const allIds = modules.flatMap((m) => m.lessonIds);
  const [lessons, progress] = await Promise.all([
    Lesson.find({ _id: { $in: allIds } }).select('slug title durationMinutes'),
    LearningProgress.find({ user: user._id, lesson: { $in: allIds } }).select('lesson status')
  ]);
  const lById = new Map(lessons.map((l) => [String(l._id), l]));
  const pById = new Map(progress.map((p) => [String(p.lesson), p.status]));
  const flat = allIds.filter((id) => lById.has(id));
  const idx = flat.indexOf(String(lesson._id));
  const brief = (id) => (id && lById.has(id) ? { id, slug: lById.get(id).slug, title: lById.get(id).title } : null);
  const done = flat.filter((id) => pById.get(id) === 'completed').length;
  return {
    title,
    roadmapId: roadmap?._id || null,
    progress: { completed: done, total: flat.length, percent: flat.length ? Math.round((done / flat.length) * 100) : 0 },
    modules: modules.map((m) => ({
      title: m.title,
      optional: m.optional,
      lessons: m.lessonIds.filter((id) => lById.has(id)).map((id) => ({ ...brief(id), durationMinutes: lById.get(id).durationMinutes, status: pById.get(id) || 'not_started' }))
    })),
    prev: brief(flat[idx - 1]),
    next: brief(flat[idx + 1])
  };
}

export async function detail(req, res) {
  const lesson = await Lesson.findOne({ slug: req.params.slug, published: true }).populate('subject', 'name slug color').populate('topic', 'name slug stage');
  if (!lesson) throw notFound('Dars topilmadi');
  const [quiz, progress, course, favorite] = await Promise.all([
    Quiz.findOne({ lesson: lesson._id }),
    LearningProgress.findOne({ user: req.user._id, lesson: lesson._id }),
    courseFor(req.user, lesson),
    Favorite.exists({ user: req.user._id, kind: 'lesson', refId: lesson._id })
  ]);
  const obj = lesson.toObject();
  delete obj.tutor;
  return ok(res, {
    lesson: { ...obj, tutorAvailable: true },
    quiz: quiz
      ? { id: quiz._id, passPercent: quiz.passPercent, questions: quiz.questions.map((q) => ({ id: q._id, type: q.type, prompt: q.prompt, options: q.options, concept: q.concept })) }
      : null,
    progress: progress || { status: 'not_started', exercisesDone: [], bestPercent: 0, attempts: 0 },
    course,
    isFavorite: Boolean(favorite)
  });
}
