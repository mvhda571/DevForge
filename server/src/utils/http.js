export class HttpError extends Error {
  constructor(status, message, details) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export const badRequest = (msg = 'So‘rov noto‘g‘ri', details) => new HttpError(400, msg, details);
export const unauthorized = (msg = 'Tizimga kirishingiz kerak') => new HttpError(401, msg);
export const forbidden = (msg = 'Bu amal uchun ruxsatingiz yo‘q') => new HttpError(403, msg);
export const notFound = (msg = 'Ma’lumot topilmadi') => new HttpError(404, msg);
export const conflict = (msg = 'Ziddiyat yuz berdi') => new HttpError(409, msg);

export function ok(res, data, status = 200, meta) {
  const body = { success: true, data };
  if (meta) body.meta = meta;
  return res.status(status).json(body);
}

export function paginate(query, { defaultLimit = 20, maxLimit = 100 } = {}) {
  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const limit = Math.min(maxLimit, Math.max(1, parseInt(query.limit, 10) || defaultLimit));
  return { page, limit, skip: (page - 1) * limit };
}

export function pageMeta({ page, limit }, total) {
  return { page, limit, total, pages: Math.max(1, Math.ceil(total / limit)) };
}

export function escapeRegex(str = '') {
  return String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
