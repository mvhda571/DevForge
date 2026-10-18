import bcrypt from 'bcryptjs';
import { StudentProfile, User } from '../models/index.js';
import { AUTH_COOKIE, cookieOptions, signToken } from '../middleware/auth.js';
import { issueCsrf } from '../middleware/csrf.js';
import { badRequest, conflict, ok, unauthorized } from '../utils/http.js';
import { levelInfo } from '../services/gamification.js';

const SALT_ROUNDS = 12;
let dummyHash;
const getDummyHash = async () => (dummyHash ||= await bcrypt.hash('devforge-timing-guard-1', SALT_ROUNDS));

function setSession(res, user) {
  res.cookie(AUTH_COOKIE, signToken(user), cookieOptions());
}

export async function sessionPayload(user) {
  const profile = user.role === 'student' ? await StudentProfile.findOne({ user: user._id }) : null;
  return { user: user.toSafeJSON(), profile, level: levelInfo(user.xp) };
}

export function csrf(req, res) {
  return ok(res, { csrfToken: issueCsrf(req, res) });
}

export async function register(req, res) {
  const { name, email, password, role, birthYear } = req.body;
  if (await User.exists({ email })) throw conflict('Bu email bilan hisob allaqachon mavjud');
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await User.create({ name, email, passwordHash, role, birthYear });
  if (role === 'student') await StudentProfile.create({ user: user._id });
  setSession(res, user);
  return ok(res, await sessionPayload(user), 201);
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+passwordHash');
  const valid = user ? await bcrypt.compare(password, user.passwordHash) : (await bcrypt.compare(password, await getDummyHash()), false);
  if (!user || !valid) throw unauthorized('Email yoki parol noto‘g‘ri');
  if (user.status !== 'active') throw unauthorized('Hisobingiz vaqtincha bloklangan. Administrator bilan bog‘laning.');
  user.lastLoginAt = new Date();
  await user.save();
  setSession(res, user);
  return ok(res, await sessionPayload(user));
}

export function logout(_req, res) {
  res.clearCookie(AUTH_COOKIE, { ...cookieOptions(), maxAge: undefined });
  return ok(res, { loggedOut: true });
}

export async function me(req, res) {
  return ok(res, await sessionPayload(req.user));
}

export async function changePassword(req, res) {
  const user = await User.findById(req.user._id).select('+passwordHash');
  if (!(await bcrypt.compare(req.body.currentPassword, user.passwordHash))) throw badRequest('Joriy parol noto‘g‘ri');
  if (req.body.currentPassword === req.body.newPassword) throw badRequest('Yangi parol eskisidan farq qilishi kerak');
  user.passwordHash = await bcrypt.hash(req.body.newPassword, SALT_ROUNDS);
  user.tokenVersion = (user.tokenVersion || 0) + 1;
  await user.save();
  setSession(res, user);
  return ok(res, { changed: true });
}

export async function verifyPassword(userId, password) {
  const user = await User.findById(userId).select('+passwordHash');
  return user ? bcrypt.compare(password, user.passwordHash) : false;
}
