import { AssessmentQuestion, AssessmentResult, Career, CareerAssessment } from '../models/index.js';
import { badRequest, notFound, ok } from '../utils/http.js';
import { computeTraitProfile, rankCareers, SCORING_METHOD } from '../services/scoring.js';
import { TRAITS } from '../services/traits.js';
import { grantAchievement } from '../services/gamification.js';

const publicQuestion = (q) => ({
  code: q.code,
  order: q.order,
  dimension: q.dimension,
  text: q.text,
  hint: q.hint,
  multiple: q.multiple,
  maxSelect: q.maxSelect,
  options: q.options.map((o) => ({ key: o.key, label: o.label }))
});

const assessmentJSON = (a) => (a ? { id: a._id, status: a.status, answers: Object.fromEntries(a.answers || []), currentIndex: a.currentIndex, updatedAt: a.updatedAt } : null);

async function activeQuestions() {
  return AssessmentQuestion.find({ active: true }).sort({ order: 1 });
}

export async function questions(_req, res) {
  const qs = await activeQuestions();
  return ok(res, { questions: qs.map(publicQuestion), method: SCORING_METHOD });
}

export async function current(req, res) {
  const a = await CareerAssessment.findOne({ user: req.user._id, status: 'in_progress' }).sort({ updatedAt: -1 });
  return ok(res, { assessment: assessmentJSON(a) });
}

export async function start(req, res) {
  let a = await CareerAssessment.findOne({ user: req.user._id, status: 'in_progress' }).sort({ updatedAt: -1 });
  if (a && req.body?.restart) {
    await a.deleteOne();
    a = null;
  }
  if (!a) a = await CareerAssessment.create({ user: req.user._id });
  return ok(res, { assessment: assessmentJSON(a) }, 201);
}

async function ownAssessment(req) {
  const a = await CareerAssessment.findOne({ _id: req.params.id, user: req.user._id });
  if (!a) throw notFound('Test topilmadi');
  return a;
}

export async function answer(req, res) {
  const a = await ownAssessment(req);
  if (a.status !== 'in_progress') throw badRequest('Bu test allaqachon yakunlangan');
  const q = await AssessmentQuestion.findOne({ code: req.body.questionCode, active: true });
  if (!q) throw badRequest('Savol topilmadi');
  const keys = new Set(q.options.map((o) => o.key));
  const chosen = [...new Set(req.body.answer)];
  if (!chosen.every((k) => keys.has(k))) throw badRequest('Javob varianti noto‘g‘ri');
  if (!q.multiple && chosen.length !== 1) throw badRequest('Bitta javobni tanlang');
  if (q.multiple && chosen.length > q.maxSelect) throw badRequest(`Ko‘pi bilan ${q.maxSelect} ta javob tanlang`);
  a.answers.set(q.code, chosen);
  if (req.body.currentIndex !== undefined) a.currentIndex = req.body.currentIndex;
  await a.save();
  return ok(res, { assessment: assessmentJSON(a) });
}

export async function complete(req, res) {
  const a = await ownAssessment(req);
  if (a.status === 'completed') {
    const existing = await AssessmentResult.findOne({ assessment: a._id });
    if (existing) return ok(res, { result: existing });
  }
  const qs = await activeQuestions();
  const missing = qs.filter((q) => !(a.answers.get(q.code) || []).length);
  if (missing.length) throw badRequest(`${missing.length} ta savolga javob berilmagan`, { missing: missing.map((q) => q.code) });

  const answers = Object.fromEntries(a.answers);
  const profile = computeTraitProfile(qs, answers);
  const subjectQ = qs.find((q) => q.dimension === 'subjects');
  const favoriteSubjects = subjectQ ? (answers[subjectQ.code] || []).map((k) => subjectQ.options.find((o) => o.key === k)?.label).filter(Boolean) : [];
  const careers = await Career.find({ active: true });
  const ranking = rankCareers(careers, profile.relative, favoriteSubjects);

  const result = await AssessmentResult.create({
    user: req.user._id,
    assessment: a._id,
    traitProfile: profile.relative,
    ranking,
    top: ranking.slice(0, 3)
  });
  a.status = 'completed';
  a.completedAt = new Date();
  await a.save();
  const achievement = await grantAchievement(req.user._id, 'first_assessment');
  return ok(res, { result, newAchievements: achievement ? [{ title: achievement.title, description: achievement.description, icon: achievement.icon, xp: achievement.xp }] : [] }, 201);
}

async function expandResult(result) {
  const slugs = result.top.map((t) => t.slug);
  const careers = await Career.find({ slug: { $in: slugs } }).select('-roadmapLessons');
  const bySlug = new Map(careers.map((c) => [c.slug, c]));
  const obj = result.toObject();
  obj.traitProfile = Object.fromEntries(result.traitProfile);
  obj.top = obj.top.map((t) => {
    const c = bySlug.get(t.slug);
    return { ...t, details: c ? { ...c.toObject(), traits: Object.fromEntries(c.traits) } : null };
  });
  obj.ranking = obj.ranking.map(({ slug, name, score }) => ({ slug, name, score }));
  return { result: obj, traitLabels: TRAITS, method: SCORING_METHOD };
}

export async function latestResult(req, res) {
  const r = await AssessmentResult.findOne({ user: req.user._id }).sort({ createdAt: -1 });
  if (!r) return ok(res, { result: null, method: SCORING_METHOD });
  return ok(res, await expandResult(r));
}

export async function resultById(req, res) {
  const r = await AssessmentResult.findOne({ _id: req.params.id, user: req.user._id });
  if (!r) throw notFound('Natija topilmadi');
  return ok(res, await expandResult(r));
}

export async function history(req, res) {
  const results = await AssessmentResult.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(20).select('top.slug top.name top.score createdAt');
  return ok(res, { results });
}
