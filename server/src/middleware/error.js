import mongoose from 'mongoose';
import env from '../config/env.js';

export function notFoundHandler(req, res) {
  res.status(404).json({ success: false, error: { message: 'API manzili topilmadi' } });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, _next) {
  let status = err.status || err.statusCode || 500;
  let message = err.status ? err.message : 'Serverda kutilmagan xatolik yuz berdi';
  let details = err.details;

  if (err instanceof mongoose.Error.ValidationError) {
    status = 400;
    message = 'Ma’lumotlar yaroqsiz';
    details = Object.values(err.errors).map((e) => ({ path: e.path, message: e.message }));
  } else if (err instanceof mongoose.Error.CastError) {
    status = 400;
    message = 'Identifikator noto‘g‘ri';
  } else if (err?.code === 11000) {
    status = 409;
    message = 'Bunday yozuv allaqachon mavjud';
  } else if (err?.type === 'entity.parse.failed') {
    status = 400;
    message = 'JSON formati noto‘g‘ri';
  } else if (err?.type === 'entity.too.large') {
    status = 413;
    message = 'So‘rov hajmi juda katta';
  }

  if (status >= 500 && !env.isTest) {
    console.error(`[error] ${req.method} ${req.originalUrl}:`, err?.message);
    if (!env.isProd) console.error(err?.stack);
  }

  const body = { success: false, error: { message } };
  if (details) body.error.details = details;
  res.status(status).json(body);
}
