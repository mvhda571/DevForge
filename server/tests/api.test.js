import './setup-env.js';
import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { answerAll, client, registered, setupDb, teardownDb } from './helpers.js';
import { User } from '../src/models/index.js';

before(setupDb);
after(teardownDb);

describe('Autentifikatsiya va xavfsizlik', () => {
  test('CSRF tokensiz POST rad etiladi', async () => {
    const c = await client();
    const res = await c.agent.post('/api/auth/register').send({ name: 'Ali', email: 'a@b.uz', password: 'Parol1234', acceptTerms: true });
    assert.equal(res.status, 403);
  });

  test('zaif parol rad etiladi', async () => {
    const c = await client();
    const res = await c.post('/api/auth/register').send({ name: 'Ali', email: 'weak@test.uz', password: 'abcdefgh', acceptTerms: true });
    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
  });

  test('mijoz admin rolini o‘ziga bera olmaydi', async () => {
    const c = await client();
    const res = await c.post('/api/auth/register').send({ name: 'Hacker', email: 'h@test.uz', password: 'Parol1234', role: 'admin', acceptTerms: true });
    assert.equal(res.status, 400);
    assert.equal(await User.countDocuments({ email: 'h@test.uz' }), 0);
  });

  test('ro‘yxatdan o‘tish, kirish, me, chiqish', async () => {
    const s = await registered('student');
    assert.equal(s.user.role, 'student');
    assert.ok(!('passwordHash' in s.user));
    const me = await s.get('/api/auth/me');
    assert.equal(me.status, 200);
    assert.equal(me.body.data.user.email, s.email);
    await s.post('/api/auth/logout');
    assert.equal((await s.get('/api/auth/me')).status, 401);

    const c = await client();
    assert.equal((await c.post('/api/auth/login').send({ email: s.email, password: 'Xato1234' })).status, 401);
    const ok = await c.post('/api/auth/login').send({ email: s.email, password: 'Parol1234' });
    assert.equal(ok.status, 200);
    assert.equal((await c.get('/api/auth/me')).status, 200);
  });

  test('takroriy email 409 qaytaradi', async () => {
    const s = await registered('student');
    const c = await client();
    const res = await c.post('/api/auth/register').send({ name: 'Ikki', email: s.email, password: 'Parol1234', acceptTerms: true });
    assert.equal(res.status, 409);
  });

  test('himoyalangan yo‘l tokensiz 401', async () => {
    const c = await client();
    assert.equal((await c.get('/api/progress/dashboard')).status, 401);
    assert.equal((await c.get('/api/roadmaps')).status, 401);
  });
});

describe('O‘quvchi yo‘li: test → tavsiya → yo‘l xaritasi → dars → test → dashboard', () => {
  let s;
  let topCareer;
  let roadmapId;
  let lesson;

  before(async () => {
    s = await registered('student');
  });

  test('onboarding saqlanadi', async () => {
    const res = await s.put('/api/users/me/onboarding').send({ level: 'beginner', interests: ['Texnologiya'], favoriteSubjects: ['Informatika'], dailyMinutes: 45, goal: 'Dasturchi bo‘lish', complete: true });
    assert.equal(res.status, 200);
    assert.equal(res.body.data.profile.dailyMinutes, 45);
    assert.equal(res.body.data.user.onboardingCompleted, true);
  });

  test('to‘liq javob berilmasa test yakunlanmaydi', async () => {
    const start = await s.post('/api/assessments/start').send({});
    const res = await s.post(`/api/assessments/${start.body.data.assessment.id}/complete`).send({});
    assert.equal(res.status, 400);
  });

  test('test davom ettiriladi va natija saqlanadi', async () => {
    const { id } = await answerAll(s, (q) => [q.options[0].key]);
    const current = await s.get('/api/assessments/current');
    assert.equal(current.body.data.assessment.id, id);
    assert.equal(Object.keys(current.body.data.assessment.answers).length, 14);
    const done = await s.post(`/api/assessments/${id}/complete`).send({});
    assert.equal(done.status, 201);
    const top = done.body.data.result.top;
    assert.equal(top.length, 3);
    assert.ok(top[0].score >= top[1].score && top[1].score >= top[2].score);
    assert.ok(top[0].reasons.length > 0);
    topCareer = top[0].slug;
    const latest = await s.get('/api/assessments/results/latest');
    assert.equal(latest.body.data.result.top[0].slug, topCareer);
    assert.ok(latest.body.data.result.top[0].details.skills.length > 0);
    assert.ok(latest.body.data.method.disclaimer);
  });

  test('yo‘l xaritasi haqiqiy darslardan yaratiladi', async () => {
    const res = await s.post('/api/roadmaps').send({ careerSlug: 'software-developer' });
    assert.equal(res.status, 201);
    roadmapId = res.body.data.roadmap.id;
    const again = await s.post('/api/roadmaps').send({ careerSlug: 'software-developer' });
    assert.equal(again.body.data.existed, true);
    const detail = await s.get(`/api/roadmaps/${roadmapId}`);
    const rm = detail.body.data.roadmap;
    assert.ok(rm.modules.length >= 5);
    assert.equal(rm.stats.total, 30);
    assert.equal(rm.stats.percent, 0);
    assert.ok(rm.nextLesson?.slug);
    lesson = rm.modules[0].lessons[0];
  });

  test('darsni ochish progress hisoblamaydi', async () => {
    const detail = await s.get(`/api/lessons/${lesson.slug}`);
    assert.equal(detail.status, 200);
    assert.equal(detail.body.data.quiz.questions.length, 5);
    assert.ok(!('correct' in detail.body.data.quiz.questions[0]));
    assert.ok(!detail.body.data.lesson.tutor);
    await s.post(`/api/progress/${lesson.id}/start`).send({});
    const rm = (await s.get(`/api/roadmaps/${roadmapId}`)).body.data.roadmap;
    assert.equal(rm.stats.completed, 0);
    assert.equal(rm.modules[0].lessons[0].status, 'in_progress');
  });

  test('yiqilgan test → qayta o‘rganish kerak; o‘tgan test → tugallangan; XP bir marta', async () => {
    const quiz = (await s.get(`/api/lessons/${lesson.slug}`)).body.data.quiz;
    const fail = await s.post(`/api/quizzes/lesson/${lesson.id}/submit`).send({ answers: quiz.questions.map((q) => ({ questionId: q.id, answer: ['___'] })) });
    assert.equal(fail.status, 201);
    assert.equal(fail.body.data.passed, false);
    assert.equal(fail.body.data.progress.status, 'needs_review');
    assert.ok(fail.body.data.weakConcepts.length > 0);
    assert.equal(fail.body.data.xpGained, 0);

    const correct = await Promise.all(
      quiz.questions.map(async (q) => {
        const r = await s.post(`/api/quizzes/lesson/${lesson.id}/check`).send({ questionId: q.id, answer: ['___'] });
        return { questionId: q.id, answer: r.body.data.correctAnswer };
      })
    );
    const pass = await s.post(`/api/quizzes/lesson/${lesson.id}/submit`).send({ answers: correct });
    assert.equal(pass.body.data.percent, 100);
    assert.equal(pass.body.data.progress.status, 'completed');
    assert.equal(pass.body.data.xpGained, 80);
    assert.ok(pass.body.data.newAchievements.some((a) => a.title === 'Ilk dars'));

    const again = await s.post(`/api/quizzes/lesson/${lesson.id}/submit`).send({ answers: correct });
    assert.equal(again.body.data.xpGained, 0);
  });

  test('progress qayta yuklanganda saqlanib qoladi', async () => {
    const detail = await s.get(`/api/lessons/${lesson.slug}`);
    assert.equal(detail.body.data.progress.status, 'completed');
    const rm = (await s.get(`/api/roadmaps/${roadmapId}`)).body.data.roadmap;
    assert.equal(rm.stats.completed, 1);
    assert.equal(rm.stats.percent, Math.round(100 / 30));
    assert.notEqual(rm.nextLesson.id, lesson.id);
    const attempts = await s.get(`/api/quizzes/attempts?lessonId=${lesson.id}`);
    assert.equal(attempts.body.data.attempts.length, 3);
  });

  test('dashboard haqiqiy ma’lumotni ko‘rsatadi', async () => {
    const d = (await s.get('/api/progress/dashboard')).body.data;
    assert.equal(d.totals.completedLessons, 1);
    assert.equal(d.totals.quizAttempts, 3);
    assert.ok(d.roadmap.stats.percent > 0);
    assert.ok(d.level.xp >= 80);
    assert.equal(d.charts.activity.length, 14);
    assert.ok(d.hasActivity);
  });

  test('AI ustoz dars kontekstidan foydalanadi va takrorlamaydi (demo)', async () => {
    const r1 = await s.post('/api/ai/tutor').send({ lessonId: lesson.id, action: 'explain_again' });
    const r2 = await s.post('/api/ai/tutor').send({ lessonId: lesson.id, action: 'explain_again' });
    assert.equal(r1.status, 200);
    assert.equal(r1.body.data.demo, true);
    assert.notEqual(r1.body.data.reply.content, r2.body.data.reply.content);
    const check = await s.post('/api/ai/tutor').send({ lessonId: lesson.id, action: 'check_me' });
    assert.ok(check.body.data.reply.content.includes('Tekshiramiz'));
    const answer = await s.post('/api/ai/tutor').send({ lessonId: lesson.id, action: 'free', message: 'teng kuchli almashtirish muvozanat saqlanadi' });
    assert.ok(answer.body.data.reply.content.includes('Namunaviy javob'));
    const hist = await s.get(`/api/ai/tutor/${lesson.id}`);
    assert.equal(hist.body.data.conversation.messages.length, 8);
  });

  test('AI maslahatchi suhbatni saqlaydi va o‘chiradi', async () => {
    const r = await s.post('/api/ai/advisor').send({ message: 'Haftalik reja tuzib bering' });
    assert.equal(r.status, 200);
    assert.ok(r.body.data.reply.content.includes('haftalik reja'));
    assert.ok(r.body.data.followups.length > 0);
    const list = await s.get('/api/ai/conversations?kind=advisor');
    assert.equal(list.body.data.conversations.length, 1);
    assert.equal((await s.delete(`/api/ai/conversations/${r.body.data.conversationId}`)).status, 200);
    assert.equal((await s.get('/api/ai/conversations?kind=advisor')).body.data.conversations.length, 0);
  });

  test('sevimlilar va eslatmalar saqlanadi', async () => {
    const uni = (await s.get('/api/universities?country=Germaniya')).body.data.universities[0];
    assert.ok(uni);
    assert.equal((await s.post('/api/favorites').send({ kind: 'university', refId: uni._id })).status, 201);
    const career = (await s.get('/api/careers')).body.data.careers[0];
    await s.post('/api/favorites').send({ kind: 'career', refId: career._id });
    const favs = (await s.get('/api/favorites')).body.data;
    assert.equal(favs.university.length, 1);
    assert.equal(favs.career.length, 1);

    const past = new Date(Date.now() - 60000).toISOString();
    const rem = await s.post('/api/notifications/reminders').send({ title: 'Hujjat topshirish', kind: 'deadline', dueAt: past, university: uni._id });
    assert.equal(rem.status, 201);
    const notes = await s.get('/api/notifications');
    assert.ok(notes.body.data.notifications.some((n) => n.title.includes('Hujjat topshirish')));
    const id = notes.body.data.notifications[0]._id;
    await s.patch(`/api/notifications/${id}/read`).send({});
    const after = (await s.get('/api/notifications')).body.data.notifications.find((n) => n._id === id);
    assert.equal(after.read, true);
  });

  test('universitet qidiruvi va filtrlari', async () => {
    const all = await s.get('/api/universities?limit=60');
    assert.ok(all.body.meta.total >= 20 && all.body.meta.total <= 30);
    const kr = await s.get('/api/universities?country=Janubiy%20Koreya');
    assert.ok(kr.body.data.universities.every((u) => u.country === 'Janubiy Koreya'));
    const priv = await s.get('/api/universities?type=private');
    assert.ok(priv.body.data.universities.every((u) => u.type === 'private'));
    const q = await s.get('/api/universities?q=KAIST');
    assert.equal(q.body.data.universities[0].slug, 'kaist');
    const tuition = await s.get('/api/universities?maxTuition=5000');
    assert.equal(tuition.body.data.universities.length, 0);
    assert.ok(tuition.body.data.tuitionNote);
    const detail = await s.get('/api/universities/kaist');
    assert.equal(detail.body.data.university.tuition.min, null);
  });

  test('xarita xizmati o‘chirilganda tushunarli xato qaytaradi', async () => {
    const res = await s.get('/api/universities/kaist/nearby');
    assert.equal(res.status, 503);
    assert.ok(res.body.error.message);
  });
});

describe('Rollar va ruxsatlar', () => {
  test('o‘quvchi admin yo‘llariga kira olmaydi', async () => {
    const s = await registered('student');
    assert.equal((await s.get('/api/admin/stats')).status, 403);
    assert.equal((await s.get('/api/admin/users')).status, 403);
  });

  test('o‘qituvchi boshqa o‘qituvchi guruhini ko‘ra olmaydi', async () => {
    const t1 = await registered('teacher');
    const t2 = await registered('teacher');
    const g = await t1.post('/api/groups').send({ name: 'Matematika 9-B' });
    assert.equal(g.status, 201);
    const id = g.body.data.group._id;
    assert.equal((await t2.get(`/api/groups/${id}`)).status, 403);
    assert.equal((await t2.get(`/api/groups/${id}/analytics`)).status, 403);
    assert.equal((await t2.post('/api/assignments').send({ groupId: id, title: 'Uy vazifasi', dueAt: new Date(Date.now() + 86400000).toISOString() })).status, 403);
  });

  test('guruh, topshiriq, javob va baholash jarayoni', async () => {
    const t = await registered('teacher');
    const s = await registered('student');
    const outsider = await registered('student');
    const g = (await t.post('/api/groups').send({ name: 'Informatika' })).body.data.group;
    assert.equal((await s.post('/api/groups/join').send({ code: g.joinCode })).status, 201);
    assert.equal((await outsider.get(`/api/groups/${g._id}`)).status, 403);
    const member = await s.get(`/api/groups/${g._id}`);
    assert.equal(member.status, 200);
    assert.equal(member.body.data.group.joinCode, undefined);

    const a = (await t.post('/api/assignments').send({ groupId: g._id, title: 'Algoritm yozing', dueAt: new Date(Date.now() + 86400000).toISOString(), maxScore: 10 })).body.data.assignment;
    assert.equal((await outsider.post(`/api/assignments/${a._id}/submit`).send({ content: 'x' })).status, 403);
    const sub = await s.post(`/api/assignments/${a._id}/submit`).send({ content: 'Mening yechimim' });
    assert.equal(sub.status, 201);
    assert.equal((await s.patch(`/api/assignments/submissions/${sub.body.data.submission._id}/grade`).send({ score: 10 })).status, 403);
    assert.equal((await t.patch(`/api/assignments/submissions/${sub.body.data.submission._id}/grade`).send({ score: 11 })).status, 400);
    const graded = await t.patch(`/api/assignments/submissions/${sub.body.data.submission._id}/grade`).send({ score: 9, feedback: 'Yaxshi' });
    assert.equal(graded.body.data.submission.status, 'graded');
    const detail = await t.get(`/api/groups/${g._id}`);
    assert.equal(detail.body.data.members.length, 1);
    assert.equal((await t.get(`/api/groups/${g._id}/students/${outsider.user.id}`)).status, 403);
    assert.equal((await t.get(`/api/groups/${g._id}/students/${s.user.id}`)).status, 200);
  });

  test('ota-ona faqat tasdiqlangan bog‘lanish orqali ko‘radi', async () => {
    const p = await registered('parent');
    const s = await registered('student');
    assert.equal((await p.get(`/api/parents/students/${s.user.id}/overview`)).status, 403);
    assert.equal((await p.post('/api/parents/invite').send({ studentEmail: s.email })).status, 202);
    assert.equal((await p.get(`/api/parents/students/${s.user.id}/overview`)).status, 403);
    const links = (await s.get('/api/parents/links')).body.data.links;
    assert.equal(links[0].status, 'pending');
    await s.post(`/api/parents/links/${links[0].id}/respond`).send({ accept: true });
    const ov = await p.get(`/api/parents/students/${s.user.id}/overview`);
    assert.equal(ov.status, 200);
    const json = JSON.stringify(ov.body);
    assert.ok(!json.includes('messages'));
    assert.ok(!json.includes(s.email));
    await s.delete(`/api/parents/links/${links[0].id}`);
    assert.equal((await p.get(`/api/parents/students/${s.user.id}/overview`)).status, 403);
  });

  test('o‘quvchi ota-ona ko‘rinishiga kira olmaydi, ota-ona dashboard API’ga emas', async () => {
    const s = await registered('student');
    assert.equal((await s.get(`/api/parents/students/${s.user.id}/overview`)).status, 403);
    const p = await registered('parent');
    assert.equal((await p.get('/api/progress/dashboard')).status, 403);
  });

  test('admin statistika va audit jurnaliga ega, o‘zini pastga tushira olmaydi', async () => {
    const a = await registered('student');
    await User.updateOne({ _id: a.user.id }, { $set: { role: 'admin' } });
    assert.equal((await a.get('/api/admin/stats')).status, 200);
    assert.equal((await a.patch(`/api/admin/users/${a.user.id}`).send({ role: 'student' })).status, 400);
    const victim = await registered('student');
    assert.equal((await a.patch(`/api/admin/users/${victim.user.id}`).send({ status: 'disabled' })).status, 200);
    assert.equal((await victim.get('/api/auth/me')).status, 401);
    const logs = await a.get('/api/admin/audit-logs');
    assert.ok(logs.body.data.logs.some((l) => l.action === 'user.update'));
    const check = await a.get('/api/admin/content-check');
    assert.equal(check.body.data.summary.errors, 0);
  });

  test('foydalanuvchi o‘z hisobini va ma’lumotlarini o‘chira oladi', async () => {
    const s = await registered('student');
    await s.post('/api/ai/advisor').send({ message: 'Salom' });
    assert.equal((await s.delete('/api/users/me').send({ password: 'Parol1234', confirm: 'NOTO' })).status, 400);
    assert.equal((await s.delete('/api/users/me').send({ password: 'Parol1234', confirm: 'O‘CHIRISH' })).status, 200);
    assert.equal(await User.countDocuments({ _id: s.user.id }), 0);
  });
});
