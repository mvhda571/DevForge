export const STATUS_LABELS = {
  not_started: 'Boshlanmagan',
  in_progress: 'Jarayonda',
  completed: 'Tugallangan',
  needs_review: 'Qayta o‘rganish kerak'
};

export function gradeQuiz(questions, submitted) {
  const byId = new Map(submitted.map((a) => [String(a.questionId), a.answer || []]));
  const results = questions.map((q) => {
    const given = (byId.get(String(q._id)) || []).map((x) => String(x).trim());
    const correct = isCorrect(q, given);
    return {
      questionId: String(q._id),
      answer: given,
      correct,
      correctAnswer: q.correct,
      explanation: correct ? q.explanation : q.wrongExplanation || q.explanation,
      concept: q.concept || ''
    };
  });
  const score = results.filter((r) => r.correct).length;
  const total = questions.length;
  const percent = total ? Math.round((score / total) * 100) : 0;
  const weakConcepts = [...new Set(results.filter((r) => !r.correct && r.concept).map((r) => r.concept))];
  return { results, score, total, percent, weakConcepts };
}

export function isCorrect(question, given) {
  const norm = (s) => String(s).trim().toLowerCase().replace(/\s+/g, ' ');
  if (question.type === 'short') {
    if (!given.length) return false;
    const g = norm(given[0]);
    return question.correct.some((c) => norm(c) === g);
  }
  const want = [...question.correct].map(norm).sort();
  const got = [...new Set(given.map(norm))].sort();
  return want.length === got.length && want.every((v, i) => v === got[i]);
}

export function statusAfterQuiz(previous, percent, passPercent) {
  if (percent >= passPercent) return 'completed';
  return 'needs_review';
}

export function roadmapStats(roadmap, progressByLesson, lessonsById) {
  const modules = roadmap.modules.map((m) => {
    const lessonIds = m.lessons.map(String);
    const counts = { total: lessonIds.length, completed: 0, in_progress: 0, needs_review: 0, not_started: 0 };
    let remainingMinutes = 0;
    for (const id of lessonIds) {
      const status = progressByLesson.get(id)?.status || 'not_started';
      counts[status] += 1;
      if (status !== 'completed') remainingMinutes += lessonsById.get(id)?.durationMinutes || 20;
    }
    const percent = counts.total ? Math.round((counts.completed / counts.total) * 100) : 0;
    return { id: String(m._id), optional: !!m.optional, stage: m.stage, counts, percent, remainingMinutes };
  });

  const required = modules.filter((m) => !m.optional);
  const sum = (arr, key) => arr.reduce((s, m) => s + m.counts[key], 0);
  const total = sum(required, 'total');
  const completed = sum(required, 'completed');
  const remainingMinutes = required.reduce((s, m) => s + m.remainingMinutes, 0);
  const weeklyMinutes = Math.max(10, (roadmap.dailyMinutes || 30) * (roadmap.studyDaysPerWeek || 5));

  const stages = {};
  for (const m of required) {
    stages[m.stage] ||= { total: 0, completed: 0 };
    stages[m.stage].total += m.counts.total;
    stages[m.stage].completed += m.counts.completed;
  }

  return {
    total,
    completed,
    inProgress: sum(required, 'in_progress'),
    needsReview: sum(modules, 'needs_review'),
    percent: total ? Math.round((completed / total) * 100) : 0,
    remainingMinutes,
    estimatedWeeks: Math.ceil(remainingMinutes / weeklyMinutes),
    modules,
    stages
  };
}

export function nextLesson(roadmap, progressByLesson) {
  const ordered = [...roadmap.modules].sort((a, b) => (a.optional === b.optional ? a.order - b.order : a.optional ? 1 : -1));
  for (const status of ['needs_review_first', 'normal']) {
    for (const m of ordered) {
      for (const id of m.lessons.map(String)) {
        const s = progressByLesson.get(id)?.status || 'not_started';
        if (status === 'normal' && s !== 'completed') return id;
        if (status === 'needs_review_first' && s === 'in_progress') return id;
      }
    }
  }
  return null;
}

export function revisionList(progressDocs, threshold = 80) {
  return progressDocs
    .filter((p) => p.status === 'needs_review' || (p.status === 'completed' && p.bestPercent < threshold))
    .sort((a, b) => a.bestPercent - b.bestPercent)
    .map((p) => String(p.lesson?._id || p.lesson));
}

export function weeklyTarget(dailyMinutes = 30, daysPerWeek = 5, avgLessonMinutes = 25) {
  return Math.max(1, Math.round((dailyMinutes * daysPerWeek) / avgLessonMinutes));
}
