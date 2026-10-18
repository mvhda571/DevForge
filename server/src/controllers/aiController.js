import { AIConversation, AssessmentResult, Career, Lesson, StudentProfile } from '../models/index.js';
import { notFound, ok } from '../utils/http.js';
import { aiStatus, generate } from '../services/ai/provider.js';
import { ACTION_LABELS, ADVISOR_FOLLOWUPS, advisorSystemPrompt, detectIntent, tutorSystemPrompt, tutorUserMessage } from '../services/ai/prompts.js';
import { demoAdvisor, demoTutor } from '../services/ai/demo.js';
import { contextToText, loadLearnerContext } from '../services/ai/context.js';

const HISTORY_LIMIT = 12;

function historyFor(conv) {
  return conv.messages.slice(-HISTORY_LIMIT).map((m) => ({ role: m.role, content: m.content }));
}

async function tryLive(system, messages) {
  try {
    const text = await generate({ system, messages });
    return text ? { text, demo: false } : null;
  } catch (err) {
    console.warn('[ai] provayder ishlamadi, demo rejimga o‘tildi:', err.message);
    return { text: null, demo: true, fallback: true };
  }
}

export function status(_req, res) {
  return ok(res, aiStatus());
}

export async function tutor(req, res) {
  const { lessonId, action, message = '', concept = '' } = req.body;
  const lesson = await Lesson.findById(lessonId);
  if (!lesson || !lesson.published) throw notFound('Dars topilmadi');
  let conv = await AIConversation.findOne({ user: req.user._id, kind: 'tutor', lesson: lesson._id });
  if (!conv) conv = new AIConversation({ user: req.user._id, kind: 'tutor', lesson: lesson._id, title: lesson.title });

  const count = conv.actionCounts.get(action) || 0;
  const pendingRaw = conv.actionCounts.get('__pending_check');
  const pendingCheck = pendingRaw ? pendingRaw - 1 : null;
  const profile = await StudentProfile.findOne({ user: req.user._id }).select('level');
  const userText = action === 'free' ? message : `${ACTION_LABELS[action]}${concept ? `: ${concept}` : ''}${message ? ` — ${message}` : ''}`;

  let reply = null;
  let demo = true;
  let fallback = false;
  const live = await tryLive(tutorSystemPrompt(lesson, { level: profile?.level, concept }), [
    ...historyFor(conv),
    { role: 'user', content: tutorUserMessage(action, message) }
  ]);
  if (live?.text) {
    reply = live.text;
    demo = false;
    if (action === 'check_me') conv.actionCounts.set('__pending_check', 1);
    else conv.actionCounts.delete('__pending_check');
  } else {
    fallback = Boolean(live?.fallback);
    const out = demoTutor({ lesson, action, count, message, concept, pendingCheck });
    if (typeof out === 'string') reply = out;
    else {
      reply = out.text;
      if (out.pendingCheck !== undefined) conv.actionCounts.set('__pending_check', out.pendingCheck + 1);
      if (out.clearCheck) conv.actionCounts.delete('__pending_check');
    }
    if (action !== 'check_me' && action !== 'free') conv.actionCounts.delete('__pending_check');
  }

  conv.actionCounts.set(action, count + 1);
  conv.messages.push({ role: 'user', content: userText || ACTION_LABELS[action], action });
  conv.messages.push({ role: 'assistant', content: reply, action, demo });
  if (conv.messages.length > 200) conv.messages = conv.messages.slice(-200);
  await conv.save();

  return ok(res, { conversationId: conv._id, reply: { role: 'assistant', content: reply, action, demo }, demo, fallback, mode: aiStatus().mode });
}

export async function tutorHistory(req, res) {
  const conv = await AIConversation.findOne({ user: req.user._id, kind: 'tutor', lesson: req.params.lessonId });
  return ok(res, { conversation: conv ? { id: conv._id, messages: conv.messages } : null });
}

export async function clearTutor(req, res) {
  await AIConversation.deleteOne({ user: req.user._id, kind: 'tutor', lesson: req.params.lessonId });
  return ok(res, { deleted: true });
}

export async function advisor(req, res) {
  const { conversationId, message } = req.body;
  let conv = conversationId ? await AIConversation.findOne({ _id: conversationId, user: req.user._id, kind: 'advisor' }) : null;
  if (conversationId && !conv) throw notFound('Suhbat topilmadi');
  if (!conv) conv = new AIConversation({ user: req.user._id, kind: 'advisor', title: message.slice(0, 60) });

  const ctx = await loadLearnerContext(req.user);
  const live = await tryLive(advisorSystemPrompt(contextToText(ctx)), [...historyFor(conv), { role: 'user', content: message }]);
  let text;
  let followups;
  let demo = true;
  if (live?.text) {
    text = live.text;
    demo = false;
    followups = ADVISOR_FOLLOWUPS[detectIntent(message)] || ADVISOR_FOLLOWUPS.general;
  } else {
    const careers = await Career.find({ active: true }).select('name slug description skills schoolSubjects workEnvironment nextAction');
    const out = demoAdvisor({ message, ctx, careers });
    text = out.text;
    followups = out.followups;
  }
  conv.messages.push({ role: 'user', content: message });
  conv.messages.push({ role: 'assistant', content: text, demo });
  if (conv.messages.length > 200) conv.messages = conv.messages.slice(-200);
  await conv.save();
  return ok(res, { conversationId: conv._id, title: conv.title, reply: { role: 'assistant', content: text, demo }, followups, demo, fallback: Boolean(live?.fallback) });
}

export async function conversations(req, res) {
  const list = await AIConversation.find({ user: req.user._id, kind: req.query.kind === 'tutor' ? 'tutor' : 'advisor' })
    .sort({ updatedAt: -1 })
    .limit(50)
    .select('title kind lesson updatedAt createdAt');
  return ok(res, { conversations: list });
}

export async function conversation(req, res) {
  const conv = await AIConversation.findOne({ _id: req.params.id, user: req.user._id });
  if (!conv) throw notFound('Suhbat topilmadi');
  return ok(res, { conversation: conv });
}

export async function deleteConversation(req, res) {
  const r = await AIConversation.deleteOne({ _id: req.params.id, user: req.user._id });
  if (!r.deletedCount) throw notFound('Suhbat topilmadi');
  return ok(res, { deleted: true });
}

export async function deleteAllConversations(req, res) {
  const r = await AIConversation.deleteMany({ user: req.user._id });
  return ok(res, { deleted: r.deletedCount });
}

export async function explainResult(req, res) {
  const result = await AssessmentResult.findOne({ _id: req.params.id, user: req.user._id });
  if (!result) throw notFound('Natija topilmadi');
  const mode = aiStatus().mode;
  if (mode !== 'live') {
    return ok(res, { explanations: result.top.map((t) => ({ slug: t.slug, text: '' })), demo: true, message: 'AI provayder sozlanmagan. Tushuntirishlar shaffof algoritm asosida ko‘rsatilmoqda.' });
  }
  const system =
    'Sen kasb maslahatchisisan. O‘zbek tilida, har bir kasb uchun 2–3 gaplik iliq va aniq izoh yoz. Moslik foizini o‘zgartirma yoki yangi raqam qo‘shma. Bu ilmiy tashxis emasligini unutma. Javobni JSON massiv shaklida qaytar: [{"slug":"...","text":"..."}]';
  const payload = result.top.map((t) => ({ slug: t.slug, name: t.name, score: t.score, reasons: t.reasons, strengths: t.matchedStrengths }));
  const live = await tryLive(system, [{ role: 'user', content: JSON.stringify(payload) }]);
  let explanations = [];
  try {
    const match = live?.text?.match(/\[[\s\S]*\]/);
    explanations = match ? JSON.parse(match[0]) : [];
  } catch {
    explanations = [];
  }
  for (const t of result.top) {
    const e = explanations.find((x) => x.slug === t.slug);
    if (e?.text) t.aiExplanation = String(e.text).slice(0, 1200);
  }
  await result.save();
  return ok(res, { explanations: result.top.map((t) => ({ slug: t.slug, text: t.aiExplanation })), demo: !live?.text });
}
