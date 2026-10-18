import { Career, LearningRoadmap, StudentProfile } from '../models/index.js';
import { badRequest, notFound, ok } from '../utils/http.js';
import { buildModules, roadmapDetails } from '../services/roadmap.js';
import { grantAchievement } from '../services/gamification.js';

async function ownRoadmap(req) {
  const r = await LearningRoadmap.findOne({ _id: req.params.id, user: req.user._id }).populate('career', 'name slug icon category');
  if (!r) throw notFound('Yo‘l xaritasi topilmadi');
  return r;
}

export async function list(req, res) {
  const roadmaps = await LearningRoadmap.find({ user: req.user._id }).sort({ updatedAt: -1 }).populate('career', 'name slug icon category');
  const profile = await StudentProfile.findOne({ user: req.user._id });
  const details = await Promise.all(roadmaps.map((r) => roadmapDetails(r, req.user._id)));
  return ok(res, {
    roadmaps: details.map((d) => ({ ...d, modules: undefined, moduleCount: d.modules.length, isActive: String(profile?.activeRoadmap) === d.id }))
  });
}

export async function create(req, res) {
  const career = await Career.findOne({ slug: req.body.careerSlug, active: true });
  if (!career) throw notFound('Kasb topilmadi');
  const profile = await StudentProfile.findOneAndUpdate({ user: req.user._id }, { $setOnInsert: { user: req.user._id } }, { upsert: true, returnDocument: 'after' });
  const existing = await LearningRoadmap.findOne({ user: req.user._id, career: career._id });
  if (existing) {
    profile.activeRoadmap = existing._id;
    await profile.save();
    return ok(res, { roadmap: { id: existing._id }, existed: true });
  }
  const level = req.body.level || profile.level || 'beginner';
  const modules = await buildModules(career, level);
  if (!modules.length) throw badRequest('Bu kasb uchun darslar hali tayyorlanmagan');
  const roadmap = await LearningRoadmap.create({
    user: req.user._id,
    career: career._id,
    title: `${career.name} yo‘l xaritasi`,
    level,
    dailyMinutes: req.body.dailyMinutes || profile.dailyMinutes || 30,
    studyDaysPerWeek: req.body.studyDaysPerWeek || profile.studyDaysPerWeek || 5,
    goal: req.body.goal ?? profile.goal ?? '',
    modules
  });
  profile.activeRoadmap = roadmap._id;
  await profile.save();
  const achievement = await grantAchievement(req.user._id, 'roadmap_started');
  return ok(res, { roadmap: { id: roadmap._id }, existed: false, newAchievements: achievement ? [{ title: achievement.title, description: achievement.description, icon: achievement.icon, xp: achievement.xp }] : [] }, 201);
}

export async function detail(req, res) {
  const r = await ownRoadmap(req);
  const profile = await StudentProfile.findOne({ user: req.user._id });
  return ok(res, { roadmap: { ...(await roadmapDetails(r, req.user._id)), isActive: String(profile?.activeRoadmap) === String(r._id) } });
}

export async function active(req, res) {
  const profile = await StudentProfile.findOne({ user: req.user._id });
  let r = profile?.activeRoadmap ? await LearningRoadmap.findOne({ _id: profile.activeRoadmap, user: req.user._id }).populate('career', 'name slug icon category') : null;
  if (!r) r = await LearningRoadmap.findOne({ user: req.user._id, status: 'active' }).sort({ updatedAt: -1 }).populate('career', 'name slug icon category');
  return ok(res, { roadmap: r ? await roadmapDetails(r, req.user._id) : null });
}

export async function update(req, res) {
  const r = await ownRoadmap(req);
  const { dailyMinutes, studyDaysPerWeek, goal, level, makeActive } = req.body;
  if (dailyMinutes !== undefined) r.dailyMinutes = dailyMinutes;
  if (studyDaysPerWeek !== undefined) r.studyDaysPerWeek = studyDaysPerWeek;
  if (goal !== undefined) r.goal = goal;
  if (level && level !== r.level) {
    const career = await Career.findById(r.career._id);
    r.level = level;
    r.modules = await buildModules(career, level);
  }
  await r.save();
  if (makeActive) await StudentProfile.updateOne({ user: req.user._id }, { $set: { activeRoadmap: r._id } });
  return ok(res, { roadmap: await roadmapDetails(r, req.user._id) });
}

export async function remove(req, res) {
  const r = await ownRoadmap(req);
  await r.deleteOne();
  await StudentProfile.updateOne({ user: req.user._id, activeRoadmap: r._id }, { $set: { activeRoadmap: null } });
  return ok(res, { deleted: true });
}
