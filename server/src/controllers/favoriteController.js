import { Career, Favorite, Lesson, University } from '../models/index.js';
import { badRequest, notFound, ok } from '../utils/http.js';

const MODELS = {
  career: { model: Career, select: 'name slug icon category description' },
  university: { model: University, select: 'name slug city country type website' },
  lesson: { model: Lesson, select: 'title slug difficulty durationMinutes summary' }
};

export async function list(req, res) {
  const filter = { user: req.user._id };
  if (req.query.kind) {
    if (!MODELS[req.query.kind]) throw badRequest('Tur noto‘g‘ri');
    filter.kind = req.query.kind;
  }
  const favs = await Favorite.find(filter).sort({ createdAt: -1 });
  const out = { career: [], university: [], lesson: [] };
  for (const kind of Object.keys(MODELS)) {
    const ids = favs.filter((f) => f.kind === kind).map((f) => f.refId);
    if (!ids.length) continue;
    const docs = await MODELS[kind].model.find({ _id: { $in: ids } }).select(MODELS[kind].select);
    const byId = new Map(docs.map((d) => [String(d._id), d]));
    out[kind] = favs
      .filter((f) => f.kind === kind && byId.has(String(f.refId)))
      .map((f) => ({ id: f._id, refId: f.refId, note: f.note, createdAt: f.createdAt, item: byId.get(String(f.refId)) }));
  }
  return ok(res, out);
}

export async function add(req, res) {
  const { kind, refId, note } = req.body;
  const exists = await MODELS[kind].model.exists({ _id: refId });
  if (!exists) throw notFound('Saqlanadigan obyekt topilmadi');
  const fav = await Favorite.findOneAndUpdate(
    { user: req.user._id, kind, refId },
    { $setOnInsert: { user: req.user._id, kind, refId }, ...(note !== undefined ? { $set: { note } } : {}) },
    { upsert: true, returnDocument: 'after' }
  );
  return ok(res, { favorite: fav }, 201);
}

export async function remove(req, res) {
  const r = await Favorite.deleteOne({ _id: req.params.id, user: req.user._id });
  if (!r.deletedCount) throw notFound('Saqlangan element topilmadi');
  return ok(res, { deleted: true });
}

export async function removeByRef(req, res) {
  const { kind, refId } = req.params;
  if (!MODELS[kind]) throw badRequest('Tur noto‘g‘ri');
  await Favorite.deleteOne({ user: req.user._id, kind, refId });
  return ok(res, { deleted: true });
}
