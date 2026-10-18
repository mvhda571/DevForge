import { Assignment, ParentStudentLink, Reminder, StudyGroup, Submission, User } from '../models/index.js';
import { badRequest, forbidden, notFound, ok } from '../utils/http.js';
import { notify } from '../services/notify.js';
import { learningOverview } from '../services/studentSummary.js';
import { audit } from '../services/audit.js';

export async function invite(req, res) {
  const student = await User.findOne({ email: req.body.studentEmail, role: 'student', status: 'active' });
  const generic = { message: 'Agar bu email bilan o‘quvchi hisobi mavjud bo‘lsa, unga tasdiqlash so‘rovi yuborildi.' };
  if (!student) return ok(res, generic, 202);
  const existing = await ParentStudentLink.findOne({ parent: req.user._id, student: student._id });
  if (existing?.status === 'active') throw badRequest('Bu o‘quvchi allaqachon bog‘langan');
  const link = existing || new ParentStudentLink({ parent: req.user._id, student: student._id });
  link.status = 'pending';
  link.relation = req.body.relation || link.relation;
  await link.save();
  await notify(student._id, {
    type: 'parent',
    title: 'Ota-ona bog‘lanish so‘rovi',
    body: `${req.user.name} sizning o‘quv natijalaringizni kuzatish uchun ruxsat so‘ramoqda. Tasdiqlash yoki rad etish sizning ixtiyoringizda.`,
    link: '/app/settings#family'
  });
  return ok(res, generic, 202);
}

export async function links(req, res) {
  if (req.user.role === 'parent') {
    const list = await ParentStudentLink.find({ parent: req.user._id, status: { $in: ['pending', 'active'] } }).populate('student', 'name');
    return ok(res, { links: list.map((l) => ({ id: l._id, status: l.status, relation: l.relation, student: l.status === 'active' ? l.student : { name: 'Tasdiq kutilmoqda' }, studentId: l.status === 'active' ? l.student._id : null, createdAt: l.createdAt })) });
  }
  const list = await ParentStudentLink.find({ student: req.user._id, status: { $in: ['pending', 'active'] } }).populate('parent', 'name email');
  return ok(res, { links: list.map((l) => ({ id: l._id, status: l.status, relation: l.relation, parent: l.parent, createdAt: l.createdAt })) });
}

export async function respond(req, res) {
  const link = await ParentStudentLink.findOne({ _id: req.params.id, student: req.user._id });
  if (!link) throw notFound('So‘rov topilmadi');
  if (link.status !== 'pending') throw badRequest('Bu so‘rovga allaqachon javob berilgan');
  link.status = req.body.accept ? 'active' : 'declined';
  link.respondedAt = new Date();
  await link.save();
  await audit(req, req.body.accept ? 'parent_link.accept' : 'parent_link.decline', { targetType: 'ParentStudentLink', targetId: link._id });
  await notify(link.parent, {
    type: 'parent',
    title: req.body.accept ? 'Bog‘lanish tasdiqlandi' : 'Bog‘lanish rad etildi',
    body: req.body.accept ? `${req.user.name} sizga o‘quv natijalarini ko‘rishga ruxsat berdi.` : 'O‘quvchi so‘rovni rad etdi.',
    link: '/parent'
  });
  return ok(res, { status: link.status });
}

export async function revoke(req, res) {
  const link = await ParentStudentLink.findOne({ _id: req.params.id, $or: [{ parent: req.user._id }, { student: req.user._id }] });
  if (!link) throw notFound('Bog‘lanish topilmadi');
  link.status = 'revoked';
  link.respondedAt = new Date();
  await link.save();
  await audit(req, 'parent_link.revoke', { targetType: 'ParentStudentLink', targetId: link._id });
  return ok(res, { status: 'revoked' });
}

export async function studentOverview(req, res) {
  const link = await ParentStudentLink.findOne({ parent: req.user._id, student: req.params.studentId, status: 'active' });
  if (!link) throw forbidden('Bu o‘quvchi ma’lumotlarini ko‘rish uchun tasdiqlangan bog‘lanish kerak');
  const student = await User.findById(req.params.studentId).select('name xp streak');
  if (!student) throw notFound('O‘quvchi topilmadi');
  const overview = await learningOverview(student._id);
  const groups = await StudyGroup.find({ members: student._id }).select('_id name');
  const assignments = await Assignment.find({ group: { $in: groups.map((g) => g._id) }, dueAt: { $gte: new Date(Date.now() - 86400000) } }).sort({ dueAt: 1 }).limit(10).select('title dueAt group');
  const subs = await Submission.find({ student: student._id, assignment: { $in: assignments.map((a) => a._id) } }).select('assignment status');
  const deadlines = await Reminder.find({ user: student._id, kind: 'deadline', done: false, dueAt: { $gte: new Date() } }).sort({ dueAt: 1 }).limit(5).select('title dueAt');
  return ok(res, {
    student: { id: student._id, name: student.name, xp: student.xp, streak: student.streak?.current || 0 },
    overview,
    upcoming: [
      ...assignments.map((a) => ({ kind: 'assignment', title: a.title, dueAt: a.dueAt, submitted: subs.some((s) => String(s.assignment) === String(a._id)) })),
      ...deadlines.map((d) => ({ kind: 'deadline', title: d.title, dueAt: d.dueAt }))
    ].sort((x, y) => x.dueAt - y.dueAt),
    privacy: 'AI suhbatlari va shaxsiy eslatmalar ota-onaga ko‘rsatilmaydi.'
  });
}
