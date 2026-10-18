import crypto from 'node:crypto';
import env from '../config/env.js';
import { HttpError } from '../utils/http.js';

export const CSRF_COOKIE = 'df_csrf';
const SAFE = new Set(['GET', 'HEAD', 'OPTIONS']);

export function issueCsrf(req, res) {
  let token = req.cookies?.[CSRF_COOKIE];
  if (!token || token.length < 32) {
    token = crypto.randomBytes(24).toString('hex');
    res.cookie(CSRF_COOKIE, token, {
      httpOnly: false,
      secure: env.cookieSecure,
      sameSite: env.cookieSameSite,
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
  }
  return token;
}

export function csrfProtection(req, _res, next) {
  if (SAFE.has(req.method)) return next();
  if (req.get('authorization')?.startsWith('Bearer ')) return next();
  const cookieToken = req.cookies?.[CSRF_COOKIE];
  const headerToken = req.get('x-csrf-token');
  if (!cookieToken || !headerToken || cookieToken.length !== headerToken.length) {
    throw new HttpError(403, 'Xavfsizlik tokeni yaroqsiz. Sahifani yangilab, qayta urinib ko‘ring.');
  }
  if (!crypto.timingSafeEqual(Buffer.from(cookieToken), Buffer.from(headerToken))) {
    throw new HttpError(403, 'Xavfsizlik tokeni yaroqsiz. Sahifani yangilab, qayta urinib ko‘ring.');
  }
  next();
}
