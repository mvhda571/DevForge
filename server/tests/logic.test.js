import './setup-env.js';
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import questions from '../src/seed/data/questions.js';
import careers from '../src/seed/data/careers.js';
import { computeTraitProfile, rankCareers, scoreCareer } from '../src/services/scoring.js';
import { gradeQuiz, isCorrect, nextLesson, roadmapStats, statusAfterQuiz, weeklyTarget } from '../src/services/progressCalc.js';
import { levelInfo } from '../src/services/gamification.js';

const pickByTrait = (trait) =>
  Object.fromEntries(
    questions.map((q) => {
      const sorted = [...q.options].sort((a, b) => (b.traits[trait] || 0) - (a.traits[trait] || 0));
      return [q.code, sorted.slice(0, q.multiple ? q.maxSelect : 1).map((o) => o.key)];
    })
  );

describe('Kasb moslik algoritmi', () => {
  test('texnologiyaga yo‘naltirilgan javoblar dasturlash kasblarini yuqoriga chiqaradi', () => {
    const profile = computeTraitProfile(questions, pickByTrait('technical'));
    const ranking = rankCareers(careers, profile.relative);
    const top3 = ranking.slice(0, 3).map((r) => r.slug);
    assert.ok(top3.some((s) => ['software-developer', 'backend-developer', 'frontend-developer', 'cybersecurity-specialist'].includes(s)), `top3: ${top3}`);
    assert.ok(ranking[0].score > ranking[ranking.length - 1].score);
  });

  test('g‘amxo‘rlik va tabiiy fanlarga yo‘naltirilgan javoblar shifokorni yuqoriga chiqaradi', () => {
    const answers = pickByTrait('care');
    const profile = computeTraitProfile(questions, answers);
    const ranking = rankCareers(careers, profile.relative);
    assert.ok(ranking.slice(0, 3).some((r) => r.slug === 'doctor' || r.slug === 'teacher'));
  });

  test('ball 0–100 oralig‘ida va tushuntirishlar bor', () => {
    const profile = computeTraitProfile(questions, pickByTrait('business'));
    for (const r of rankCareers(careers, profile.relative)) {
      assert.ok(r.score >= 0 && r.score <= 100);
      assert.ok(Array.isArray(r.reasons));
      assert.ok(r.contributions.every((c) => c.label && typeof c.points === 'number'));
    }
  });

  test('formula shaffof: og‘irlikli o‘rtacha', () => {
    const { score } = scoreCareer({ traits: { a: 2, b: 2 } }, { a: 1, b: 0.5 });
    assert.equal(score, 75);
  });

  test('javob berilmagan bo‘lsa, profil nol', () => {
    const profile = computeTraitProfile(questions, {});
    assert.ok(Object.values(profile.relative).every((v) => v === 0));
  });
});

describe('Test baholash va progress', () => {
  const qs = [
    { _id: 'q1', type: 'single', correct: ['A'], explanation: 'ok', wrongExplanation: 'no', concept: 'c1' },
    { _id: 'q2', type: 'multiple', correct: ['A', 'C'], explanation: 'ok', concept: 'c2' },
    { _id: 'q3', type: 'short', correct: ['-4', '−4'], explanation: 'ok', concept: 'c3' },
    { _id: 'q4', type: 'truefalse', correct: ['To‘g‘ri'], explanation: 'ok', concept: 'c4' },
    { _id: 'q5', type: 'single', correct: ['B'], explanation: 'ok', concept: 'c5' }
  ];

  test('to‘g‘ri hisoblaydi va zaif tushunchalarni aniqlaydi', () => {
    const r = gradeQuiz(qs, [
      { questionId: 'q1', answer: ['A'] },
      { questionId: 'q2', answer: ['C', 'A'] },
      { questionId: 'q3', answer: [' -4 '] },
      { questionId: 'q4', answer: ['Noto‘g‘ri'] }
    ]);
    assert.equal(r.score, 3);
    assert.equal(r.percent, 60);
    assert.deepEqual(r.weakConcepts, ['c4', 'c5']);
  });

  test('ko‘p tanlovli savolda qisman javob noto‘g‘ri', () => {
    assert.equal(isCorrect(qs[1], ['A']), false);
    assert.equal(isCorrect(qs[1], ['A', 'B', 'C']), false);
  });

  test('o‘tish bali bo‘yicha holat', () => {
    assert.equal(statusAfterQuiz('in_progress', 60, 60), 'completed');
    assert.equal(statusAfterQuiz('in_progress', 40, 60), 'needs_review');
    assert.equal(statusAfterQuiz('completed', 20, 60), 'needs_review');
  });

  test('yo‘l xaritasi progressi faqat tugallangan darslardan hisoblanadi', () => {
    const roadmap = {
      dailyMinutes: 30,
      studyDaysPerWeek: 5,
      modules: [
        { _id: 'm1', order: 1, optional: false, stage: 'beginner', lessons: ['l1', 'l2'] },
        { _id: 'm2', order: 2, optional: false, stage: 'intermediate', lessons: ['l3', 'l4'] },
        { _id: 'm0', order: 3, optional: true, stage: 'beginner', lessons: ['l5'] }
      ]
    };
    const progress = new Map([
      ['l1', { status: 'completed' }],
      ['l2', { status: 'in_progress' }],
      ['l5', { status: 'completed' }]
    ]);
    const lessons = new Map(['l1', 'l2', 'l3', 'l4', 'l5'].map((id) => [id, { durationMinutes: 30 }]));
    const stats = roadmapStats(roadmap, progress, lessons);
    assert.equal(stats.total, 4);
    assert.equal(stats.completed, 1);
    assert.equal(stats.percent, 25);
    assert.equal(stats.remainingMinutes, 90);
    assert.equal(nextLesson(roadmap, progress), 'l2');
  });

  test('ochilgan, lekin tugallanmagan dars progressga qo‘shilmaydi', () => {
    const roadmap = { modules: [{ _id: 'm', order: 1, lessons: ['a', 'b'] }] };
    const stats = roadmapStats(roadmap, new Map([['a', { status: 'in_progress' }], ['b', { status: 'needs_review' }]]), new Map());
    assert.equal(stats.percent, 0);
  });

  test('haftalik maqsad va daraja hisoblari', () => {
    assert.equal(weeklyTarget(30, 5, 25), 6);
    assert.equal(levelInfo(0).level, 1);
    assert.equal(levelInfo(100).level, 2);
    assert.equal(levelInfo(299).level, 2);
    assert.equal(levelInfo(300).level, 3);
  });
});
