import { Lesson, LearningProgress, Quiz, QuizAttempt, StudentProfile, Subject } from '../models/index.js';
import { badRequest, notFound, ok } from '../utils/http.js';
import { gradeQuiz, isCorrect, statusAfterQuiz, weeklyTarget } from '../services/progressCalc.js';
import { addXp, checkWeeklyGoal, evaluateLearningAchievements, recordActivity, XP_RULES } from '../services/gamification.js';

async function loadQuiz(lessonId) {
  const quiz = await Quiz.findOne({ lesson: lessonId });
  if (!quiz || !quiz.questions.length) throw notFound('Bu dars uchun test topilmadi');
  return quiz;
}

export async function check(req, res) {
  const quiz = await loadQuiz(req.params.lessonId);
  const q = quiz.questions.id(req.body.questionId);
  if (!q) throw badRequest('Savol topilmadi');
  const given = (req.body.answer || []).map(String);
  const correct = isCorrect(q, given);
  return ok(res, { correct, correctAnswer: q.correct, explanation: correct ? q.explanation : q.wrongExplanation || q.explanation });
}

export async function submit(req, res) {
  const lesson = await Lesson.findById(req.params.lessonId);
  if (!lesson) throw notFound('Dars topilmadi');
  const quiz = await loadQuiz(lesson._id);
  const graded = gradeQuiz(quiz.questions, req.body.answers);
  const passed = graded.percent >= quiz.passPercent;

  const attempt = await QuizAttempt.create({
    user: req.user._id,
    quiz: quiz._id,
    lesson: lesson._id,
    subject: lesson.subject,
    answers: graded.results.map(({ questionId, answer, correct }) => ({ questionId, answer, correct })),
    score: graded.score,
    total: graded.total,
    percent: graded.percent,
    passed,
    weakConcepts: graded.weakConcepts
  });

  let progress = await LearningProgress.findOne({ user: req.user._id, lesson: lesson._id });
  if (!progress) progress = new LearningProgress({ user: req.user._id, lesson: lesson._id, subject: lesson.subject, topic: lesson.topic });
  const wasCompleted = progress.status === 'completed';
  progress.attempts += 1;
  progress.lastPercent = graded.percent;
  progress.bestPercent = Math.max(progress.bestPercent || 0, graded.percent);
  progress.status = statusAfterQuiz(progress.status, graded.percent, quiz.passPercent);
  if (progress.status === 'completed' && !progress.completedAt) progress.completedAt = new Date();

  let xpGained = 0;
  if (passed && !progress.xpAwarded.quizPass) {
    progress.xpAwarded.quizPass = true;
    xpGained += XP_RULES.quizPass;
  }
  const newlyCompleted = progress.status === 'completed' && !wasCompleted;
  const firstCompletion = newlyCompleted && !progress.xpAwarded.complete;
  if (firstCompletion) {
    progress.xpAwarded.complete = true;
    xpGained += XP_RULES.lessonComplete;
  }
  const perfect = graded.percent === 100;
  if (perfect && !progress.xpAwarded.perfect) {
    progress.xpAwarded.perfect = true;
    xpGained += XP_RULES.quizPerfect;
  }
  await progress.save();

  await recordActivity(req.user._id, { quizzes: 1, lessonsCompleted: firstCompletion ? 1 : 0 });
  await addXp(req.user._id, xpGained);

  const subject = await Subject.findById(lesson.subject);
  const newAchievements = await evaluateLearningAchievements(req.user._id, { perfect, subject: progress.status === 'completed' ? subject : null });
  if (firstCompletion) {
    const profile = await StudentProfile.findOne({ user: req.user._id });
    const weekly = await checkWeeklyGoal(req.user._id, weeklyTarget(profile?.dailyMinutes, profile?.studyDaysPerWeek));
    if (weekly) newAchievements.push(weekly);
  }

  const recommendations = [];
  if (!passed) recommendations.push('Darsni yana bir bor ko‘rib chiqing va AI ustozdan “Tushunmadim” yoki “Boshqa misol ber” yordamini so‘rang.');
  for (const c of graded.weakConcepts) recommendations.push(`“${c}” tushunchasini takrorlang — AI ustozdan shu mavzu bo‘yicha savol bering.`);
  if (passed && !perfect) recommendations.push('Yaxshi natija! Xato qilgan savollaringiz izohlarini o‘qib chiqing.');
  if (perfect) recommendations.push('Ajoyib! Keyingi darsga o‘tishingiz mumkin.');

  return ok(res, {
    attemptId: attempt._id,
    score: graded.score,
    total: graded.total,
    percent: graded.percent,
    passed,
    passPercent: quiz.passPercent,
    results: graded.results,
    weakConcepts: graded.weakConcepts,
    recommendations,
    progress: { status: progress.status, bestPercent: progress.bestPercent, attempts: progress.attempts },
    xpGained,
    newAchievements
  }, 201);
}

export async function attempts(req, res) {
  const filter = { user: req.user._id };
  if (req.query.lessonId) filter.lesson = String(req.query.lessonId);
  const list = await QuizAttempt.find(filter).sort({ createdAt: -1 }).limit(50).populate('lesson', 'title slug').select('-answers');
  return ok(res, { attempts: list });
}
