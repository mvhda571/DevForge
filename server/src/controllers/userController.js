import { Achievement, AssessmentResult, StudentProfile, User } from '../models/index.js';
import { AUTH_COOKIE, cookieOptions } from '../middleware/auth.js';
import { badRequest, ok } from '../utils/http.js';
import { deleteUserData, exportUserData } from '../services/account.js';
import { ACHIEVEMENTS, levelInfo } from '../services/gamification.js';
import { verifyPassword, sessionPayload } from './authController.js';
import { audit } from '../services/audit.js';

export async function updateMe(req, res) {
  const { name, birthYear, notificationPrefs } = req.body;
  const user = req.user;
  if (name !== undefined) user.name = name;
  if (birthYear !== undefined) user.birthYear = birthYear ?? undefined;
  if (notificationPrefs) {
    for (const [k, v] of Object.entries(notificationPrefs)) user.notificationPrefs[k] = v;
  }
  await user.save();
  return ok(res, await sessionPayload(user));
}

export async function saveOnboarding(req, res) {
  if (req.user.role !== 'student') {
    if (req.body.name) req.user.name = req.body.name;
    req.user.onboardingCompleted = true;
    await req.user.save();
    return ok(res, await sessionPayload(req.user));
  }
  const { name, complete, ...fields } = req.body;
  const profile = await StudentProfile.findOneAndUpdate(
    { user: req.user._id },
    { $set: fields, $setOnInsert: { user: req.user._id } },
    { upsert: true, returnDocument: 'after', runValidators: true }
  );
  if (name) req.user.name = name;
  if (complete) req.user.onboardingCompleted = true;
  await req.user.save();
  return ok(res, { ...(await sessionPayload(req.user)), profile });
}

export async function profileCompletion(user) {
  const profile = await StudentProfile.findOne({ user: user._id });
  const hasResult = await AssessmentResult.exists({ user: user._id });
  const checks = [
    { key: 'name', label: 'Ism', done: !!user.name },
    { key: 'birthYear', label: 'Tug‘ilgan yil', done: !!user.birthYear },
    { key: 'level', label: 'Bilim darajasi', done: !!profile?.level && user.onboardingCompleted },
    { key: 'interests', label: 'Qiziqishlar', done: !!profile?.interests?.length },
    { key: 'favoriteSubjects', label: 'Sevimli fanlar', done: !!profile?.favoriteSubjects?.length },
    { key: 'careerInterests', label: 'Qiziqtirgan kasblar', done: !!profile?.careerInterests?.length },
    { key: 'goal', label: 'Asosiy maqsad', done: !!profile?.goal },
    { key: 'assessment', label: 'Kasb testi', done: !!hasResult }
  ];
  const percent = Math.round((checks.filter((c) => c.done).length / checks.length) * 100);
  return { percent, checks };
}

export async function getCompletion(req, res) {
  return ok(res, await profileCompletion(req.user));
}

export async function achievements(req, res) {
  const earned = await Achievement.find({ user: req.user._id }).sort({ createdAt: -1 });
  const earnedKeys = new Set(earned.map((a) => a.key));
  const locked = Object.entries(ACHIEVEMENTS)
    .filter(([key]) => !earnedKeys.has(key))
    .map(([key, def]) => ({ key, title: def.title, description: def.description, icon: def.icon, xp: def.xp }));
  return ok(res, { earned, locked, level: levelInfo(req.user.xp), streak: req.user.streak });
}

export async function exportData(req, res) {
  const data = await exportUserData(req.user._id);
  res.setHeader('Content-Disposition', 'attachment; filename="devforge-malumotlarim.json"');
  return ok(res, data);
}

export async function deleteMe(req, res) {
  if (!(await verifyPassword(req.user._id, req.body.password))) throw badRequest('Parol noto‘g‘ri');
  if (req.user.role === 'admin' && (await User.countDocuments({ role: 'admin', status: 'active' })) <= 1) {
    throw badRequest('Oxirgi administrator hisobini o‘chirib bo‘lmaydi');
  }
  await audit(req, 'account.delete_self', { targetType: 'User', targetId: req.user._id });
  await deleteUserData(req.user._id);
  res.clearCookie(AUTH_COOKIE, { ...cookieOptions(), maxAge: undefined });
  return ok(res, { deleted: true });
}
