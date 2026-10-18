import { Career, Lesson } from '../models/index.js';
import { escapeRegex, notFound, ok } from '../utils/http.js';
import { TRAITS } from '../services/traits.js';

const toJSON = (c) => {
  const obj = c.toObject ? c.toObject() : c;
  return { ...obj, traits: obj.traits instanceof Map ? Object.fromEntries(obj.traits) : obj.traits };
};

export async function list(req, res) {
  const filter = { active: true };
  if (req.query.category) filter.category = String(req.query.category);
  if (req.query.featured === 'true') filter.featured = true;
  if (req.query.q) filter.name = { $regex: escapeRegex(String(req.query.q).slice(0, 60)), $options: 'i' };
  const careers = await Career.find(filter).sort({ order: 1, name: 1 }).select('-roadmapLessons');
  const categories = await Career.distinct('category', { active: true });
  return ok(res, { careers: careers.map(toJSON), categories, traitLabels: TRAITS });
}

export async function detail(req, res) {
  const career = await Career.findOne({ slug: req.params.slug, active: true });
  if (!career) throw notFound('Kasb topilmadi');
  const lessons = await Lesson.find({ slug: { $in: career.roadmapLessons }, published: true }).select('slug title difficulty durationMinutes');
  return ok(res, {
    career: toJSON(career),
    traitLabels: TRAITS,
    roadmapPreview: { lessonCount: lessons.length, totalMinutes: lessons.reduce((s, l) => s + l.durationMinutes, 0), hasContent: lessons.length > 0 }
  });
}

export async function compare(req, res) {
  const careers = await Career.find({ slug: { $in: req.q.slugs }, active: true }).select('-roadmapLessons');
  if (careers.length < 2) throw notFound('Taqqoslash uchun kasblar topilmadi');
  const ordered = req.q.slugs.map((s) => careers.find((c) => c.slug === s)).filter(Boolean);
  return ok(res, { careers: ordered.map(toJSON), traitLabels: TRAITS });
}
