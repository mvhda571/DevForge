import { z } from 'zod';
import { Favorite, University } from '../models/index.js';
import { badRequest, escapeRegex, notFound, ok, pageMeta, paginate } from '../utils/http.js';
import { CATEGORIES, nearbyPlaces } from '../services/overpass.js';

export const listQuery = z.object({
  q: z.string().max(80).optional(),
  country: z.string().max(60).optional(),
  city: z.string().max(80).optional(),
  field: z.string().max(60).optional(),
  degree: z.string().max(30).optional(),
  type: z.enum(['public', 'private']).optional(),
  language: z.string().max(30).optional(),
  scholarship: z.enum(['true', 'false']).optional(),
  minTuition: z.coerce.number().min(0).optional(),
  maxTuition: z.coerce.number().min(0).optional(),
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(60).optional()
});

export async function list(req, res) {
  const q = req.q;
  const filter = { active: true };
  if (q.q) filter.$or = [{ name: { $regex: escapeRegex(q.q), $options: 'i' } }, { city: { $regex: escapeRegex(q.q), $options: 'i' } }];
  if (q.country) filter.country = q.country;
  if (q.city) filter.city = q.city;
  if (q.field) filter.fields = q.field;
  if (q.degree) filter.degreeLevels = q.degree;
  if (q.type) filter.type = q.type;
  if (q.language) filter.languages = q.language;
  if (q.scholarship === 'true') filter['scholarships.0'] = { $exists: true };
  const tuitionFiltered = q.minTuition !== undefined || q.maxTuition !== undefined;
  if (tuitionFiltered) {
    filter['tuition.verified'] = true;
    if (q.minTuition !== undefined) filter['tuition.max'] = { $gte: q.minTuition };
    if (q.maxTuition !== undefined) filter['tuition.min'] = { $lte: q.maxTuition };
  }
  const pg = paginate(q, { defaultLimit: 12, maxLimit: 60 });
  const [items, total] = await Promise.all([
    University.find(filter).sort({ country: 1, name: 1 }).skip(pg.skip).limit(pg.limit).select('slug name localName country city type fields degreeLevels languages scholarships.name dataStatus lastVerifiedAt location website'),
    University.countDocuments(filter)
  ]);
  let favoriteIds = new Set();
  if (req.user) {
    const favs = await Favorite.find({ user: req.user._id, kind: 'university' }).select('refId');
    favoriteIds = new Set(favs.map((f) => String(f.refId)));
  }
  return ok(
    res,
    { universities: items.map((u) => ({ ...u.toObject(), isFavorite: favoriteIds.has(String(u._id)) })), tuitionNote: tuitionFiltered ? 'To‘lov filtri faqat tasdiqlangan to‘lov ma’lumotiga ega universitetlarni ko‘rsatadi.' : null },
    200,
    pageMeta(pg, total)
  );
}

export async function filters(_req, res) {
  const [countries, cities, fields, degrees, languages] = await Promise.all([
    University.distinct('country', { active: true }),
    University.find({ active: true }).select('country city'),
    University.distinct('fields', { active: true }),
    University.distinct('degreeLevels', { active: true }),
    University.distinct('languages', { active: true })
  ]);
  const citiesByCountry = {};
  for (const u of cities) (citiesByCountry[u.country] ||= new Set()).add(u.city);
  return ok(res, {
    countries: countries.sort(),
    cities: Object.fromEntries(Object.entries(citiesByCountry).map(([k, v]) => [k, [...v].sort()])),
    fields: fields.sort(),
    degrees,
    languages: languages.sort()
  });
}

export async function detail(req, res) {
  const u = await University.findOne({ slug: req.params.slug, active: true });
  if (!u) throw notFound('Universitet topilmadi');
  const isFavorite = req.user ? Boolean(await Favorite.exists({ user: req.user._id, kind: 'university', refId: u._id })) : false;
  return ok(res, { university: u, isFavorite });
}

export async function compare(req, res) {
  const slugs = String(req.query.slugs || '').split(',').map((s) => s.trim()).filter(Boolean);
  if (slugs.length < 2 || slugs.length > 3) throw badRequest('Taqqoslash uchun 2–3 ta universitet tanlang');
  const items = await University.find({ slug: { $in: slugs }, active: true });
  return ok(res, { universities: slugs.map((s) => items.find((u) => u.slug === s)).filter(Boolean) });
}

export const nearbyQuery = z.object({
  categories: z
    .string()
    .optional()
    .transform((s) => (s ? s.split(',').map((x) => x.trim()) : Object.keys(CATEGORIES)))
    .refine((arr) => arr.length > 0 && arr.every((c) => c in CATEGORIES), 'Kategoriya noto‘g‘ri'),
  radius: z.coerce.number().int().min(200).max(2000).default(1000)
});

export async function nearby(req, res) {
  const u = await University.findOne({ slug: req.params.slug, active: true }).select('name location');
  if (!u) throw notFound('Universitet topilmadi');
  if (u.location?.lat == null || u.location?.lng == null) throw badRequest('Bu universitet uchun koordinatalar mavjud emas');
  const data = await nearbyPlaces({ lat: u.location.lat, lng: u.location.lng, radius: req.q.radius, categories: req.q.categories });
  return ok(res, { center: u.location, ...data, attribution: '© OpenStreetMap hissadorlari (ODbL)', notice: 'Joylar OpenStreetMap jamoatchilik ma’lumotlaridan olingan va DevForge tomonidan tasdiqlanmagan.' });
}
