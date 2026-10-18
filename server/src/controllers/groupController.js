import crypto from 'node:crypto';
import { Assignment, Career, StudyGroup, Submission, User } from '../models/index.js';
import { badRequest, forbidden, notFound, ok } from '../utils/http.js';
import { compactStats, learningOverview } from '../services/studentSummary.js';
import { notify } from '../services/notify.js';

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function newCode(len = 7) {
  const bytes = crypto.randomBytes(len);
  return [...bytes].map((b) => ALPHABET[b % ALPHABET.length]).join('');
}

async function uniqueCode() {
  for (let i = 0; i < 10; i += 1) {
    const code = newCode();
    if (!(await StudyGroup.exists({ joinCode: code }))) return code;
  }
  throw new Error('Kod yaratib bo‘lmadi');
}

export async function loadGroupForTeacher(req, id = req.params.id) {
  const g = await StudyGroup.findById(id);
  if (!g) throw notFound('Guruh topilmadi');
  if (req.user.role !== 'admin' && String(g.teacher) !== String(req.user._id)) throw forbidden('Bu guruh sizga tegishli emas');
  return g;
}

export async function list(req, res) {
  if (req.user.role === 'teacher') {
    const groups = await StudyGroup.find({ teacher: req.user._id, archived: false }).sort({ createdAt: -1 }).populate('career', 'name slug');
    const counts = await Promise.all(groups.map((g) => Assignment.countDocuments({ group: g._id })));
    return ok(res, { groups: groups.map((g, i) => ({ ...g.toObject(), memberCount: g.members.length, assignmentCount: counts[i] })) });
  }
  const groups = await StudyGroup.find({ members: req.user._id, archived: false }).populate('teacher', 'name').populate('career', 'name slug').select('-members -joinCode');
  return ok(res, { groups });
}

export async function create(req, res) {
  let career = null;
  if (req.body.careerSlug) career = await Career.findOne({ slug: req.body.careerSlug });
  const g = await StudyGroup.create({ name: req.body.name, description: req.body.description, teacher: req.user._id, joinCode: await uniqueCode(), career: career?._id || null });
  return ok(res, { group: g }, 201);
}

export async function detail(req, res) {
  const g = await StudyGroup.findById(req.params.id).populate('teacher', 'name').populate('career', 'name slug');
  if (!g) throw notFound('Guruh topilmadi');
  const isOwner = String(g.teacher._id) === String(req.user._id) || req.user.role === 'admin';
  const isMember = g.members.some((m) => String(m) === String(req.user._id));
  if (!isOwner && !isMember) throw forbidden('Bu guruhga kirish huquqingiz yo‘q');
  if (!isOwner) {
    const { joinCode, members, ...rest } = g.toObject();
    return ok(res, { group: { ...rest, memberCount: members.length }, role: 'member' });
  }
  const members = await User.find({ _id: { $in: g.members } }).select('name email');
  const stats = await compactStats(g.members);
  return ok(res, { group: g, role: 'owner', members: members.map((m) => ({ id: m._id, name: m.name, email: m.email, ...stats.get(String(m._id)) })) });
}

export async function update(req, res) {
  const g = await loadGroupForTeacher(req);
  if (req.body.name) g.name = req.body.name;
  if (req.body.description !== undefined) g.description = req.body.description;
  await g.save();
  return ok(res, { group: g });
}

export async function archive(req, res) {
  const g = await loadGroupForTeacher(req);
  g.archived = true;
  await g.save();
  return ok(res, { archived: true });
}

export async function regenerateCode(req, res) {
  const g = await loadGroupForTeacher(req);
  g.joinCode = await uniqueCode();
  await g.save();
  return ok(res, { joinCode: g.joinCode });
}

export async function removeMember(req, res) {
  const g = await loadGroupForTeacher(req);
  g.members = g.members.filter((m) => String(m) !== String(req.params.userId));
  await g.save();
  return ok(res, { removed: true });
}

export async function join(req, res) {
  const g = await StudyGroup.findOne({ joinCode: req.body.code, archived: false });
  if (!g) throw notFound('Bunday kodli guruh topilmadi');
  if (g.members.some((m) => String(m) === String(req.user._id))) throw badRequest('Siz allaqachon bu guruh a’zosisiz');
  if (g.members.length >= 200) throw badRequest('Guruh to‘lgan');
  g.members.push(req.user._id);
  await g.save();
  await notify(g.teacher, { type: 'group', title: 'Guruhga yangi o‘quvchi qo‘shildi', body: `${req.user.name} “${g.name}” guruhiga qo‘shildi`, link: `/teacher/groups/${g._id}` });
  return ok(res, { group: { id: g._id, name: g.name } }, 201);
}

export async function leave(req, res) {
  const g = await StudyGroup.findById(req.params.id);
  if (!g) throw notFound('Guruh topilmadi');
  g.members = g.members.filter((m) => String(m) !== String(req.user._id));
  await g.save();
  return ok(res, { left: true });
}

export async function studentDetail(req, res) {
  const g = await loadGroupForTeacher(req);
  if (!g.members.some((m) => String(m) === String(req.params.studentId))) throw forbidden('Bu o‘quvchi guruhingizda emas');
  const student = await User.findById(req.params.studentId).select('name email');
  if (!student) throw notFound('O‘quvchi topilmadi');
  const assignments = await Assignment.find({ group: g._id }).select('title dueAt maxScore');
  const submissions = await Submission.find({ assignment: { $in: assignments.map((a) => a._id) }, student: student._id });
  const overview = await learningOverview(student._id);
  return ok(res, {
    student: { id: student._id, name: student.name, email: student.email },
    overview,
    assignments: assignments.map((a) => {
      const s = submissions.find((x) => String(x.assignment) === String(a._id));
      return { id: a._id, title: a.title, dueAt: a.dueAt, maxScore: a.maxScore, submission: s ? { status: s.status, score: s.score, submittedAt: s.createdAt } : null };
    })
  });
}

export async function analytics(req, res) {
  const g = await loadGroupForTeacher(req);
  const stats = await compactStats(g.members);
  const assignments = await Assignment.find({ group: g._id }).sort({ dueAt: 1 });
  const subs = await Submission.find({ assignment: { $in: assignments.map((a) => a._id) } });
  const values = [...stats.values()];
  const scored = values.filter((v) => v.averageScore !== null);
  return ok(res, {
    members: g.members.length,
    averageCompletedLessons: values.length ? Math.round((values.reduce((s, v) => s + v.completedLessons, 0) / values.length) * 10) / 10 : 0,
    averageQuizScore: scored.length ? Math.round(scored.reduce((s, v) => s + v.averageScore, 0) / scored.length) : null,
    assignments: assignments.map((a) => {
      const own = subs.filter((s) => String(s.assignment) === String(a._id));
      const graded = own.filter((s) => s.status === 'graded' && s.score !== null);
      return {
        id: a._id,
        title: a.title,
        dueAt: a.dueAt,
        submitted: own.length,
        graded: graded.length,
        averageScore: graded.length ? Math.round((graded.reduce((s, x) => s + (x.score / a.maxScore) * 100, 0) / graded.length)) : null
      };
    })
  });
}
