import jwt from 'jsonwebtoken';
import env from '../config/env.js';
import { User } from '../models/index.js';
import { forbidden, unauthorized } from '../utils/http.js';

export const AUTH_COOKIE = 'df_token';

export function signToken(user) {
  return jwt.sign({ sub: String(user._id), v: user.tokenVersion || 0 }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn
  });
}

export function cookieOptions() {
  return {
    httpOnly: true,
    secure: env.cookieSecure,
    sameSite: env.cookieSameSite,
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000
  };
}

function readToken(req) {
  const header = req.get('authorization');
  if (header?.startsWith('Bearer ')) return { token: header.slice(7), viaHeader: true };
  if (req.cookies?.[AUTH_COOKIE]) return { token: req.cookies[AUTH_COOKIE], viaHeader: false };
  return { token: null };
}

async function resolveUser(req) {
  const { token, viaHeader } = readToken(req);
  if (!token) return null;
  let payload;
  try {
    payload = jwt.verify(token, env.jwtSecret);
  } catch {
    return null;
  }
  const user = await User.findById(payload.sub);
  if (!user || user.status !== 'active' || (user.tokenVersion || 0) !== payload.v) return null;
  req.authViaHeader = viaHeader;
  return user;
}

export async function requireAuth(req, _res, next) {
  const user = await resolveUser(req);
  if (!user) throw unauthorized();
  req.user = user;
  next();
}

export async function optionalAuth(req, _res, next) {
  req.user = (await resolveUser(req)) || null;
  next();
}

export function requireRole(...roles) {
  return (req, _res, next) => {
    if (!req.user) throw unauthorized();
    if (!roles.includes(req.user.role)) throw forbidden();
    next();
  };
}
