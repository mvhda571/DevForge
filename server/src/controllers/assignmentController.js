import { Assignment, Lesson, StudyGroup, Submission, User } from '../models/index.js';
import { badRequest, forbidden, notFound, ok } from '../utils/http.js';
import { loadGroupForTeacher } from './groupController.js';
import { notify, notifyMany } from '../services/notify.js';
import { addXp, XP_RULES } from '../services/gamification.js';

async function loadAssignment(req) {
  const a = await Assignment.findById(req.params.id).populate('lesson', 'title slug');
  if (!a) throw notFound('Topshiriq topilmadi');
  const group = await StudyGroup.findById(a.group);
  if (!group) throw notFound('Guruh topilmadi');
  const isOwner = String(group.teacher) === String(req.user._id) || req.user.role === 'admin';
  const isMember = group.members.some((m) => String(m) === String(req.user._id));
  if (!isOwner && !isMember) throw forbidden('Bu topshiriqqa kirish huquqingiz yo‘q');
  return { a, group, isOwner, isMember };
}

export async function create(req, res) {
  const group = await loadGroupForTeacher(req, req.body.groupId);
  if (req.body.lessonId && !(await Lesson.exists({ _id: req.body.lessonId }))) throw notFound('Dars topilmadi');
  const a = await Assignment.create({
    group: group._id,
    teacher: req.user._id,
    title: req.body.title,
    description: req.body.description,
    lesson: req.body.lessonId || null,
    dueAt: req.body.dueAt,
    maxScore: req.body.maxScore
  });
  await notifyMany(group.members, { type: 'assignment', title: `Yangi topshiriq: ${a.title}`, body: `Muddat: ${a.dueAt.toLocaleDateString('uz-UZ')}`, link: `/app/assignments/${a._id}` });
  return ok(res, { assignment: a }, 201);
}

export async function list(req, res) {
  if (!req.query.groupId) throw badRequest('groupId kerak');
  const group = await StudyGroup.findById(String(req.query.groupId));
  if (!group) throw notFound('Guruh topilmadi');
  const isOwner = String(group.teacher) === String(req.user._id) || req.user.role === 'admin';
  const isMember = group.members.some((m) => String(m) === String(req.user._id));
  if (!isOwner && !isMember) throw forbidden('Bu guruhga kirish huquqingiz yo‘q');
  const assignments = await Assignment.find({ group: group._id }).sort({ dueAt: 1 }).populate('lesson', 'title slug');
  const subFilter = { assignment: { $in: assignments.map((a) => a._id) } };
  if (!isOwner) subFilter.student = req.user._id;
  const subs = await Submission.find(subFilter);
  return ok(res, {
    assignments: assignments.map((a) => {
      const own = subs.filter((s) => String(s.assignment) === String(a._id));
      return isOwner
        ? { ...a.toObject(), submittedCount: own.length, gradedCount: own.filter((s) => s.status === 'graded').length }
        : { ...a.toObject(), submission: own[0] || null };
    })
  });
}

export async function mine(req, res) {
  const groups = await StudyGroup.find({ members: req.user._id, archived: false }).select('name');
  const assignments = await Assignment.find({ group: { $in: groups.map((g) => g._id) } }).sort({ dueAt: 1 }).populate('lesson', 'title slug');
  const subs = await Submission.find({ student: req.user._id, assignment: { $in: assignments.map((a) => a._id) } });
  const groupName = new Map(groups.map((g) => [String(g._id), g.name]));
  return ok(res, {
    assignments: assignments.map((a) => ({ ...a.toObject(), groupName: groupName.get(String(a.group)), submission: subs.find((s) => String(s.assignment) === String(a._id)) || null }))
  });
}

export async function detail(req, res) {
  const { a, isOwner } = await loadAssignment(req);
  if (isOwner) {
    const subs = await Submission.find({ assignment: a._id }).populate('student', 'name email');
    const group = await StudyGroup.findById(a.group).select('members name');
    const members = await User.find({ _id: { $in: group.members } }).select('name');
    return ok(res, { assignment: a, groupName: group.name, role: 'owner', submissions: subs, pending: members.filter((m) => !subs.some((s) => String(s.student._id) === String(m._id))).map((m) => ({ id: m._id, name: m.name })) });
  }
  const submission = await Submission.findOne({ assignment: a._id, student: req.user._id });
  return ok(res, { assignment: a, role: 'member', submission });
}

export async function update(req, res) {
  const { a, isOwner } = await loadAssignment(req);
  if (!isOwner) throw forbidden();
  for (const k of ['title', 'description', 'dueAt', 'maxScore']) if (req.body[k] !== undefined) a[k] = req.body[k];
  await a.save();
  return ok(res, { assignment: a });
}

export async function remove(req, res) {
  const { a, isOwner } = await loadAssignment(req);
  if (!isOwner) throw forbidden();
  await Submission.deleteMany({ assignment: a._id });
  await a.deleteOne();
  return ok(res, { deleted: true });
}

export async function submit(req, res) {
  const { a, isMember } = await loadAssignment(req);
  if (!isMember || req.user.role !== 'student') throw forbidden('Faqat guruh o‘quvchilari javob yubora oladi');
  const existing = await Submission.findOne({ assignment: a._id, student: req.user._id });
  if (existing?.status === 'graded') throw badRequest('Baholangan javobni o‘zgartirib bo‘lmaydi');
  const sub = await Submission.findOneAndUpdate(
    { assignment: a._id, student: req.user._id },
    { $set: { content: req.body.content || '', link: req.body.link || '', status: 'submitted' }, $setOnInsert: { assignment: a._id, student: req.user._id } },
    { upsert: true, returnDocument: 'after' }
  );
  if (!existing) {
    await addXp(req.user._id, XP_RULES.assignmentSubmit);
    await notify(a.teacher, { type: 'assignment', title: 'Yangi javob topshirildi', body: `${req.user.name}: ${a.title}`, link: `/teacher/assignments/${a._id}` });
  }
  return ok(res, { submission: sub, late: new Date() > a.dueAt }, existing ? 200 : 201);
}

export async function grade(req, res) {
  const sub = await Submission.findById(req.params.id);
  if (!sub) throw notFound('Javob topilmadi');
  const a = await Assignment.findById(sub.assignment);
  const group = a && (await StudyGroup.findById(a.group));
  if (!group || (String(group.teacher) !== String(req.user._id) && req.user.role !== 'admin')) throw forbidden('Bu javobni baholash huquqingiz yo‘q');
  if (req.body.score > a.maxScore) throw badRequest(`Ball ${a.maxScore} dan oshmasligi kerak`);
  sub.score = req.body.score;
  sub.feedback = req.body.feedback || '';
  sub.status = 'graded';
  sub.gradedAt = new Date();
  await sub.save();
  await notify(sub.student, { type: 'assignment', title: `Topshiriq baholandi: ${a.title}`, body: `Ball: ${sub.score}/${a.maxScore}`, link: `/app/assignments/${a._id}` });
  return ok(res, { submission: sub });
}
