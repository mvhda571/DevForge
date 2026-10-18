import {
  AIConversation,
  AssessmentQuestion,
  AssessmentResult,
  AuditLog,
  Career,
  Lesson,
  LearningProgress,
  QuizAttempt,
  Quiz,
  StudyGroup,
  University,
  User
} from '../models/index.js';
import { badRequest, escapeRegex, notFound, ok, pageMeta, paginate } from '../utils/http.js';
import { audit } from '../services/audit.js';
import { deleteUserData } from '../services/account.js';

const mapToObj = (doc) => {
  const o = doc.toObject();
  if (o.traits instanceof Map) o.traits = Object.fromEntries(o.traits);
  if (Array.isArray(o.options)) o.options = o.options.map((x) => ({ ...x, traits: x.traits instanceof Map ? Object.fromEntries(x.traits) : x.traits }));
  return o;
};

export async function stats(_req, res) {
  const since = new Date(Date.now() - 7 * 86400000);
  const [byRole, total, newUsers, lessons, quizzes, attempts, completions, results, universities, careers, groups, conversations] = await Promise.all([
    User.aggregate([{ $group: { _id: '$role', count: { $sum: 1 } } }]),
    User.countDocuments(),
    User.countDocuments({ createdAt: { $gte: since } }),
    Lesson.countDocuments(),
    Quiz.countDocuments(),
    QuizAttempt.countDocuments(),
    LearningProgress.countDocuments({ status: 'completed' }),
    AssessmentResult.countDocuments(),
    University.countDocuments(),
    Career.countDocuments(),
    StudyGroup.countDocuments(),
    AIConversation.countDocuments()
  ]);
  return ok(res, {
    users: { total, newLast7Days: newUsers, byRole: Object.fromEntries(byRole.map((r) => [r._id, r.count])) },
    content: { lessons, quizzes, careers, universities },
    activity: { quizAttempts: attempts, lessonCompletions: completions, assessments: results, groups, aiConversations: conversations }
  });
}

export async function users(req, res) {
  const pg = paginate(req.query, { defaultLimit: 20 });
  const filter = {};
  if (req.query.role) filter.role = String(req.query.role);
  if (req.query.q) {
    const rx = { $regex: escapeRegex(String(req.query.q).slice(0, 60)), $options: 'i' };
    filter.$or = [{ name: rx }, { email: rx }];
  }
  const [items, total] = await Promise.all([User.find(filter).sort({ createdAt: -1 }).skip(pg.skip).limit(pg.limit), User.countDocuments(filter)]);
  return ok(res, { users: items.map((u) => ({ ...u.toSafeJSON(), lastLoginAt: u.lastLoginAt })) }, 200, pageMeta(pg, total));
}

export async function updateUser(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) throw notFound('Foydalanuvchi topilmadi');
  if (String(user._id) === String(req.user._id)) throw badRequest('O‘z rolingiz yoki holatingizni o‘zgartira olmaysiz');
  const before = { role: user.role, status: user.status };
  if (req.body.role) user.role = req.body.role;
  if (req.body.status) user.status = req.body.status;
  if (before.role !== user.role || before.status !== user.status) user.tokenVersion += 1;
  await user.save();
  await audit(req, 'user.update', { targetType: 'User', targetId: user._id, meta: { before, after: { role: user.role, status: user.status } } });
  return ok(res, { user: user.toSafeJSON() });
}

export async function deleteUser(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) throw notFound('Foydalanuvchi topilmadi');
  if (String(user._id) === String(req.user._id)) throw badRequest('O‘z hisobingizni bu yerda o‘chira olmaysiz');
  await audit(req, 'user.delete', { targetType: 'User', targetId: user._id, meta: { role: user.role } });
  await deleteUserData(user._id);
  return ok(res, { deleted: true });
}

export async function careers(_req, res) {
  const list = await Career.find().sort({ order: 1, name: 1 });
  return ok(res, { careers: list.map(mapToObj) });
}

export async function createCareer(req, res) {
  const c = await Career.create(req.body);
  await audit(req, 'career.create', { targetType: 'Career', targetId: c._id, meta: { slug: c.slug } });
  return ok(res, { career: mapToObj(c) }, 201);
}

export async function updateCareer(req, res) {
  const c = await Career.findById(req.params.id);
  if (!c) throw notFound('Kasb topilmadi');
  Object.assign(c, req.body);
  await c.save();
  await audit(req, 'career.update', { targetType: 'Career', targetId: c._id, meta: { fields: Object.keys(req.body) } });
  return ok(res, { career: mapToObj(c) });
}

export async function deleteCareer(req, res) {
  const c = await Career.findById(req.params.id);
  if (!c) throw notFound('Kasb topilmadi');
  c.active = false;
  await c.save();
  await audit(req, 'career.deactivate', { targetType: 'Career', targetId: c._id });
  return ok(res, { deactivated: true });
}

export async function questions(_req, res) {
  const list = await AssessmentQuestion.find().sort({ order: 1 });
  return ok(res, { questions: list.map(mapToObj) });
}

export async function updateQuestion(req, res) {
  const q = await AssessmentQuestion.findById(req.params.id);
  if (!q) throw notFound('Savol topilmadi');
  Object.assign(q, req.body);
  await q.save();
  await audit(req, 'question.update', { targetType: 'AssessmentQuestion', targetId: q._id, meta: { fields: Object.keys(req.body) } });
  return ok(res, { question: mapToObj(q) });
}

export async function lessons(req, res) {
  const pg = paginate(req.query, { defaultLimit: 50, maxLimit: 100 });
  const filter = {};
  if (req.query.q) filter.title = { $regex: escapeRegex(String(req.query.q).slice(0, 60)), $options: 'i' };
  const [items, total] = await Promise.all([
    Lesson.find(filter).sort({ subject: 1, order: 1 }).skip(pg.skip).limit(pg.limit).select('slug title difficulty durationMinutes published subject topic updatedAt').populate('subject', 'name').populate('topic', 'name'),
    Lesson.countDocuments(filter)
  ]);
  const quizzes = await Quiz.find({ lesson: { $in: items.map((l) => l._id) } }).select('lesson questions');
  const qCount = new Map(quizzes.map((q) => [String(q.lesson), q.questions.length]));
  return ok(res, { lessons: items.map((l) => ({ ...l.toObject(), quizQuestions: qCount.get(String(l._id)) || 0 })) }, 200, pageMeta(pg, total));
}

export async function lesson(req, res) {
  const l = await Lesson.findById(req.params.id).populate('subject', 'name').populate('topic', 'name');
  if (!l) throw notFound('Dars topilmadi');
  const quiz = await Quiz.findOne({ lesson: l._id });
  return ok(res, { lesson: l, quiz });
}

export async function updateLesson(req, res) {
  const l = await Lesson.findById(req.params.id);
  if (!l) throw notFound('Dars topilmadi');
  Object.assign(l, req.body);
  await l.save();
  await audit(req, 'lesson.update', { targetType: 'Lesson', targetId: l._id, meta: { fields: Object.keys(req.body) } });
  return ok(res, { lesson: l });
}

export async function updateQuiz(req, res) {
  const l = await Lesson.findById(req.params.id);
  if (!l) throw notFound('Dars topilmadi');
  const quiz = (await Quiz.findOne({ lesson: l._id })) || new Quiz({ lesson: l._id });
  if (req.body.passPercent) quiz.passPercent = req.body.passPercent;
  if (req.body.questions) {
    for (const q of req.body.questions) {
      if (q.type !== 'short' && q.correct.some((c) => !q.options.includes(c))) throw badRequest(`“${q.prompt.slice(0, 40)}” savolida to‘g‘ri javob variantlar ichida bo‘lishi kerak`);
    }
    quiz.questions = req.body.questions;
  }
  await quiz.save();
  await audit(req, 'quiz.update', { targetType: 'Quiz', targetId: quiz._id, meta: { lesson: l.slug } });
  return ok(res, { quiz });
}

export async function universities(req, res) {
  const pg = paginate(req.query, { defaultLimit: 50, maxLimit: 100 });
  const filter = {};
  if (req.query.q) filter.name = { $regex: escapeRegex(String(req.query.q).slice(0, 60)), $options: 'i' };
  const [items, total] = await Promise.all([University.find(filter).sort({ country: 1, name: 1 }).skip(pg.skip).limit(pg.limit), University.countDocuments(filter)]);
  return ok(res, { universities: items }, 200, pageMeta(pg, total));
}

export async function createUniversity(req, res) {
  const u = await University.create(req.body);
  await audit(req, 'university.create', { targetType: 'University', targetId: u._id, meta: { slug: u.slug } });
  return ok(res, { university: u }, 201);
}

export async function updateUniversity(req, res) {
  const u = await University.findById(req.params.id);
  if (!u) throw notFound('Universitet topilmadi');
  Object.assign(u, req.body);
  await u.save();
  await audit(req, 'university.update', { targetType: 'University', targetId: u._id, meta: { fields: Object.keys(req.body) } });
  return ok(res, { university: u });
}

export async function deleteUniversity(req, res) {
  const u = await University.findById(req.params.id);
  if (!u) throw notFound('Universitet topilmadi');
  await u.deleteOne();
  await audit(req, 'university.delete', { targetType: 'University', targetId: u._id, meta: { slug: u.slug } });
  return ok(res, { deleted: true });
}

export async function contentCheck(_req, res) {
  const issues = [];
  const [lessonsList, quizzes, careersList, unis] = await Promise.all([
    Lesson.find().select('slug title sections examples exercises objectives tutor published'),
    Quiz.find().select('lesson questions'),
    Career.find({ active: true }).select('slug name roadmapLessons traits'),
    University.find().select('slug name website location dataStatus lastVerifiedAt tuition')
  ]);
  const quizByLesson = new Map(quizzes.map((q) => [String(q.lesson), q]));
  const lessonSlugs = new Set(lessonsList.map((l) => l.slug));
  for (const l of lessonsList) {
    const q = quizByLesson.get(String(l._id));
    if (!q) issues.push({ severity: 'error', type: 'lesson', ref: l.slug, message: `“${l.title}” darsida test yo‘q` });
    else if (q.questions.length !== 5) issues.push({ severity: 'warning', type: 'lesson', ref: l.slug, message: `“${l.title}” testida ${q.questions.length} ta savol bor (5 ta tavsiya etiladi)` });
    if (!l.sections?.length) issues.push({ severity: 'error', type: 'lesson', ref: l.slug, message: `“${l.title}” darsida mazmun yo‘q` });
    if (!l.examples?.length) issues.push({ severity: 'warning', type: 'lesson', ref: l.slug, message: `“${l.title}” darsida misollar yo‘q` });
    if (!l.exercises?.length) issues.push({ severity: 'warning', type: 'lesson', ref: l.slug, message: `“${l.title}” darsida mashqlar yo‘q` });
    if (!l.tutor?.analogies?.length) issues.push({ severity: 'info', type: 'lesson', ref: l.slug, message: `“${l.title}” uchun demo AI ustoz materiali kam` });
  }
  for (const c of careersList) {
    const missing = c.roadmapLessons.filter((s) => !lessonSlugs.has(s));
    if (!c.roadmapLessons.length) issues.push({ severity: 'warning', type: 'career', ref: c.slug, message: `“${c.name}” uchun yo‘l xaritasi darslari belgilanmagan` });
    if (missing.length) issues.push({ severity: 'error', type: 'career', ref: c.slug, message: `“${c.name}” yo‘l xaritasida mavjud bo‘lmagan darslar: ${missing.join(', ')}` });
    if (!c.traits?.size) issues.push({ severity: 'error', type: 'career', ref: c.slug, message: `“${c.name}” uchun xususiyat og‘irliklari yo‘q` });
  }
  for (const u of unis) {
    if (!u.website) issues.push({ severity: 'warning', type: 'university', ref: u.slug, message: `${u.name}: rasmiy sayt ko‘rsatilmagan` });
    if (u.location?.lat == null) issues.push({ severity: 'info', type: 'university', ref: u.slug, message: `${u.name}: koordinatalar yo‘q` });
    if (u.dataStatus !== 'verified') issues.push({ severity: 'info', type: 'university', ref: u.slug, message: `${u.name}: ma’lumotlar tasdiqlanmagan (${u.dataStatus})` });
  }
  return ok(res, { issues, summary: { errors: issues.filter((i) => i.severity === 'error').length, warnings: issues.filter((i) => i.severity === 'warning').length, info: issues.filter((i) => i.severity === 'info').length } });
}

export async function auditLogs(req, res) {
  const pg = paginate(req.query, { defaultLimit: 30 });
  const [items, total] = await Promise.all([AuditLog.find().sort({ createdAt: -1 }).skip(pg.skip).limit(pg.limit).populate('actor', 'name email role'), AuditLog.countDocuments()]);
  return ok(res, { logs: items }, 200, pageMeta(pg, total));
}
