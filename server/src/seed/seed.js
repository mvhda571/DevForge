import crypto from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import env from '../config/env.js';
import { connectDb, disconnectDb } from '../config/db.js';
import {
  AssessmentQuestion,
  Career,
  Lesson,
  ParentStudentLink,
  Quiz,
  StudentProfile,
  StudyGroup,
  Subject,
  Topic,
  University,
  User
} from '../models/index.js';
import { subjects, topics } from './data/subjects.js';
import careers from './data/careers.js';
import questions from './data/questions.js';
import universities from './data/universities.js';
import math from './data/lessons/math.js';
import informatics from './data/lessons/informatics.js';
import webHtmlCss from './data/lessons/webHtmlCss.js';
import webJs from './data/lessons/webJs.js';
import webReact from './data/lessons/webReact.js';
import english from './data/lessons/english.js';
import science from './data/lessons/science.js';
import economics from './data/lessons/economics.js';

export const allLessons = [...math, ...informatics, ...webHtmlCss, ...webJs, ...webReact, ...english, ...science, ...economics];

const stableId = (key) => new mongoose.Types.ObjectId(crypto.createHash('sha1').update(key).digest('hex').slice(0, 24));

export function validateContent() {
  const problems = [];
  const lessonSlugs = new Set();
  const topicSlugs = new Set(topics.map((t) => t.slug));
  for (const l of allLessons) {
    if (lessonSlugs.has(l.slug)) problems.push(`Takroriy dars slug: ${l.slug}`);
    lessonSlugs.add(l.slug);
    if (!topicSlugs.has(l.topic)) problems.push(`${l.slug}: noma’lum mavzu ${l.topic}`);
    if (l.quiz?.length !== 5) problems.push(`${l.slug}: testda ${l.quiz?.length ?? 0} ta savol (5 ta bo‘lishi kerak)`);
    for (const q of l.quiz || []) {
      if (q.type !== 'short' && !q.correct.every((c) => q.options.includes(c))) problems.push(`${l.slug}: “${q.prompt.slice(0, 40)}” javobi variantlarda yo‘q`);
    }
    if (!l.sections?.length || !l.examples?.length || !l.exercises?.length) problems.push(`${l.slug}: mazmun, misol yoki mashq yetishmaydi`);
  }
  for (const c of careers) {
    for (const s of c.roadmapLessons) if (!lessonSlugs.has(s)) problems.push(`${c.slug}: yo‘l xaritasida noma’lum dars ${s}`);
  }
  return problems;
}

async function upsert(Model, filter, doc) {
  return Model.findOneAndUpdate(filter, { $set: doc }, { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true, runValidators: true });
}

async function seedContent() {
  const subjectIds = {};
  for (const s of subjects) subjectIds[s.slug] = (await upsert(Subject, { slug: s.slug }, s))._id;

  const topicDocs = {};
  for (const t of topics) {
    topicDocs[t.slug] = await upsert(Topic, { slug: t.slug }, { ...t, subject: subjectIds[t.subject], prerequisites: t.prerequisites || [] });
  }

  for (const { quiz, topic, ...lesson } of allLessons) {
    const topicDoc = topicDocs[topic];
    const saved = await upsert(Lesson, { slug: lesson.slug }, { ...lesson, topic: topicDoc._id, subject: topicDoc.subject, published: true });
    await upsert(Quiz, { lesson: saved._id }, {
      lesson: saved._id,
      title: `${lesson.title}: mini test`,
      passPercent: 60,
      questions: quiz.map((q, i) => ({ _id: stableId(`${lesson.slug}:q${i}`), ...q }))
    });
  }

  for (const q of questions) await upsert(AssessmentQuestion, { code: q.code }, { ...q, active: true });
  for (const c of careers) await upsert(Career, { slug: c.slug }, { featured: false, active: true, ...c });
  for (const u of universities) await upsert(University, { slug: u.slug }, { active: true, ...u });
}

async function ensureUser({ name, email, role, password, birthYear }) {
  let user = await User.findOne({ email });
  let created = false;
  if (!user) {
    user = await User.create({ name, email, role, birthYear, passwordHash: await bcrypt.hash(password, 12), onboardingCompleted: true });
    created = true;
  }
  if (role === 'student') {
    await StudentProfile.findOneAndUpdate(
      { user: user._id },
      { $setOnInsert: { user: user._id, level: 'beginner', learnerType: 'applicant', interests: ['Texnologiya', 'Dizayn'], favoriteSubjects: ['Matematika', 'Informatika'], careerInterests: ['Dasturchi'], dailyMinutes: 40, goal: 'IT sohasida universitetga kirish' } },
      { upsert: true }
    );
  }
  return { user, created };
}

async function seedAccounts({ demo }) {
  const created = [];
  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    const r = await ensureUser({ name: 'Administrator', email: process.env.ADMIN_EMAIL.toLowerCase(), role: 'admin', password: process.env.ADMIN_PASSWORD });
    if (r.created) created.push(`admin: ${r.user.email}`);
  }
  if (!demo) return created;
  const password = process.env.DEMO_PASSWORD || 'DevForge2026!';
  const accounts = [
    { name: 'Demo Administrator', email: 'admin@devforge.demo', role: 'admin' },
    { name: 'Nodira Karimova', email: 'teacher@devforge.demo', role: 'teacher' },
    { name: 'Jamshid Aliyev', email: 'parent@devforge.demo', role: 'parent' },
    { name: 'Sardor Aliyev', email: 'student@devforge.demo', role: 'student', birthYear: 2009 }
  ];
  const users = {};
  for (const a of accounts) {
    const r = await ensureUser({ ...a, password });
    users[a.role] = r.user;
    if (r.created) created.push(`${a.role}: ${a.email}`);
  }
  const group = await StudyGroup.findOneAndUpdate(
    { teacher: users.teacher._id, name: 'Web dasturlash — 10-A' },
    { $setOnInsert: { teacher: users.teacher._id, name: 'Web dasturlash — 10-A', description: 'Demo guruh: HTML, CSS va JavaScript asoslari', joinCode: 'DEMO10A' }, $addToSet: { members: users.student._id } },
    { upsert: true, returnDocument: 'after' }
  );
  await ParentStudentLink.findOneAndUpdate(
    { parent: users.parent._id, student: users.student._id },
    { $setOnInsert: { parent: users.parent._id, student: users.student._id, status: 'active', relation: 'ota', respondedAt: new Date() } },
    { upsert: true }
  );
  created.push(`demo guruh qo‘shilish kodi: ${group.joinCode}`);
  return created;
}

export async function runSeed({ demo = false, uri } = {}) {
  const problems = validateContent();
  if (problems.length) {
    const err = new Error(`Seed ma’lumotlarida xatolar:\n- ${problems.join('\n- ')}`);
    err.problems = problems;
    throw err;
  }
  await seedContent();
  const accounts = await seedAccounts({ demo });
  return {
    subjects: subjects.length,
    topics: topics.length,
    lessons: allLessons.length,
    careers: careers.length,
    questions: questions.length,
    universities: universities.length,
    accounts,
    uri: uri || env.mongoUri
  };
}

const isMain = Boolean(process.argv[1]) && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const demo = process.argv.includes('--demo') || process.env.SEED_DEMO_USERS === 'true';
  (async () => {
    try {
      await connectDb();
      const summary = await runSeed({ demo });
      console.log('[seed] Tayyor:');
      console.log(`  Fanlar: ${summary.subjects}, mavzular: ${summary.topics}, darslar: ${summary.lessons}`);
      console.log(`  Kasblar: ${summary.careers}, test savollari: ${summary.questions}, universitetlar: ${summary.universities}`);
      if (summary.accounts.length) console.log(`  Yaratilgan hisoblar: ${summary.accounts.join('; ')}`);
      if (demo) console.log('  Demo hisoblar paroli: DEMO_PASSWORD (standart: DevForge2026!)');
    } catch (err) {
      console.error('[seed] Xatolik:', err.message);
      process.exitCode = 1;
    } finally {
      await disconnectDb();
    }
  })();
}
