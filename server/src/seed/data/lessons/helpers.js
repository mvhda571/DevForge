export const single = (prompt, options, correct, explanation, wrongExplanation, concept) => ({
  type: 'single',
  prompt,
  options,
  correct: [correct],
  explanation,
  wrongExplanation,
  concept
});

export const multiple = (prompt, options, correct, explanation, wrongExplanation, concept) => ({
  type: 'multiple',
  prompt,
  options,
  correct,
  explanation,
  wrongExplanation,
  concept
});

export const tf = (prompt, isTrue, explanation, wrongExplanation, concept) => ({
  type: 'truefalse',
  prompt,
  options: ['To‘g‘ri', 'Noto‘g‘ri'],
  correct: [isTrue ? 'To‘g‘ri' : 'Noto‘g‘ri'],
  explanation,
  wrongExplanation,
  concept
});

export const short = (prompt, answers, explanation, wrongExplanation, concept) => ({
  type: 'short',
  prompt,
  options: [],
  correct: answers,
  explanation,
  wrongExplanation,
  concept
});
