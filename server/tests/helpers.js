import './setup-env.js';
import mongoose from 'mongoose';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { runSeed } from '../src/seed/seed.js';

export const TEST_URI = process.env.MONGO_URI_TEST || 'mongodb://127.0.0.1:27017/devforge_test';
let app;

export async function setupDb() {
  if (mongoose.connection.readyState !== 1) await mongoose.connect(TEST_URI, { serverSelectionTimeoutMS: 8000 });
  await mongoose.connection.db.dropDatabase();
  await runSeed({ demo: false, uri: TEST_URI });
  app = createApp();
  return app;
}

export async function teardownDb() {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
}

export async function client() {
  const agent = request.agent(app);
  const res = await agent.get('/api/auth/csrf');
  const token = res.body.data.csrfToken;
  const withCsrf = (m) => (url) => agent[m](url).set('x-csrf-token', token);
  return { agent, token, get: (url) => agent.get(url), post: withCsrf('post'), put: withCsrf('put'), patch: withCsrf('patch'), delete: withCsrf('delete') };
}

let counter = 0;
export async function registered(role = 'student', extra = {}) {
  const c = await client();
  counter += 1;
  const email = `user${counter}_${Date.now()}@test.uz`;
  const res = await c.post('/api/auth/register').send({ name: `Test ${role} ${counter}`, email, password: 'Parol1234', role, acceptTerms: true, ...extra });
  if (res.status !== 201) throw new Error(`register failed: ${res.status} ${JSON.stringify(res.body)}`);
  return { ...c, user: res.body.data.user, email };
}

export async function answerAll(c, pickFor) {
  const qs = (await c.get('/api/assessments/questions')).body.data.questions;
  const start = await c.post('/api/assessments/start').send({});
  const id = start.body.data.assessment.id;
  for (const [i, q] of qs.entries()) {
    const answer = pickFor(q);
    const r = await c.put(`/api/assessments/${id}/answer`).send({ questionCode: q.code, answer, currentIndex: i + 1 });
    if (r.status !== 200) throw new Error(`answer failed: ${JSON.stringify(r.body)}`);
  }
  return { id, qs };
}
