import { useState } from 'react';
import { CheckCircle2, ClipboardCheck, RotateCcw, XCircle, Lightbulb, Trophy } from 'lucide-react';
import Button from '../ui/Button.jsx';
import { ProgressBar } from '../ui/Feedback.jsx';
import { api } from '../../lib/api.js';
import { cx } from '../../lib/format.js';
import { useToast } from '../../context/ToastContext.jsx';

const TYPE_HINT = { single: 'Bitta javob', multiple: 'Bir nechta javob', truefalse: 'To‘g‘ri yoki noto‘g‘ri', short: 'Qisqa javob yozing' };

function Question({ q, index, state, onChange, onCheck, checking }) {
  const answer = state.answer || [];
  const locked = Boolean(state.result);
  const pick = (opt) => {
    if (locked) return;
    if (q.type === 'multiple') onChange(answer.includes(opt) ? answer.filter((a) => a !== opt) : [...answer, opt]);
    else onChange([opt]);
  };
  return (
    <fieldset className="rounded-panel border border-line bg-surface p-4 sm:p-5">
      <legend className="sr-only">{index + 1}-savol</legend>
      <div className="flex items-start gap-3">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sunken text-sm font-semibold text-ink">{index + 1}</span>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-ink">{q.prompt}</p>
          <p className="mt-0.5 text-xs text-muted">{TYPE_HINT[q.type]}</p>
          {q.type === 'short' ? (
            <input value={answer[0] || ''} disabled={locked} onChange={(e) => onChange([e.target.value])} className="field mt-3 max-w-xs" aria-label="Javobingiz" />
          ) : (
            <div className="mt-3 grid gap-2" role={q.type === 'multiple' ? 'group' : 'radiogroup'}>
              {q.options.map((opt) => {
                const active = answer.includes(opt);
                const isCorrect = locked && state.result.correctAnswer.includes(opt);
                const isWrongPick = locked && active && !isCorrect;
                return (
                  <button
                    key={opt}
                    type="button"
                    role={q.type === 'multiple' ? 'checkbox' : 'radio'}
                    aria-checked={active}
                    disabled={locked}
                    onClick={() => pick(opt)}
                    className={cx(
                      'flex items-center gap-3 rounded-control border px-3.5 py-2.5 text-left text-sm transition-colors disabled:cursor-default',
                      isCorrect ? 'border-success bg-success-soft text-ink' : isWrongPick ? 'border-danger bg-danger-soft text-ink' : active ? 'border-primary bg-primary-soft text-ink' : 'border-line text-ink hover:border-primary/40'
                    )}
                  >
                    <span className={cx('h-4 w-4 shrink-0 border-2', q.type === 'multiple' ? 'rounded' : 'rounded-full', active ? 'border-primary bg-primary' : 'border-line')} aria-hidden />
                    {opt}
                  </button>
                );
              })}
            </div>
          )}
          {state.result ? (
            <div className={cx('mt-3 flex gap-2 rounded-control p-3 text-sm', state.result.correct ? 'bg-success-soft' : 'bg-danger-soft')} role="status">
              {state.result.correct ? <CheckCircle2 className="h-5 w-5 shrink-0 text-success" aria-hidden /> : <XCircle className="h-5 w-5 shrink-0 text-danger" aria-hidden />}
              <div>
                <p className="font-medium text-ink">{state.result.correct ? 'To‘g‘ri!' : `Noto‘g‘ri. To‘g‘ri javob: ${state.result.correctAnswer.join(', ')}`}</p>
                {state.result.explanation && <p className="mt-0.5 text-ink/80">{state.result.explanation}</p>}
              </div>
            </div>
          ) : (
            <Button size="sm" variant="secondary" className="mt-3" onClick={onCheck} loading={checking} disabled={!answer.filter((a) => String(a).trim()).length}>Tekshirish</Button>
          )}
        </div>
      </div>
    </fieldset>
  );
}

export default function QuizSection({ lesson, quiz, canSubmit, onSubmitted, onAskTutor }) {
  const toast = useToast();
  const [states, setStates] = useState({});
  const [checking, setChecking] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  if (!quiz) return null;
  const allChecked = quiz.questions.every((q) => states[q.id]?.result);
  const checkedCount = quiz.questions.filter((q) => states[q.id]?.result).length;

  const check = async (q) => {
    setChecking(q.id);
    try {
      const answer = (states[q.id]?.answer || []).map((a) => String(a).trim()).filter(Boolean);
      const r = await api.post(`/quizzes/lesson/${lesson._id}/check`, { questionId: q.id, answer });
      setStates((s) => ({ ...s, [q.id]: { answer, result: r } }));
    } catch (err) {
      toast.error(err);
    } finally {
      setChecking(null);
    }
  };

  const submit = async () => {
    setSubmitting(true);
    try {
      const r = await api.post(`/quizzes/lesson/${lesson._id}/submit`, { answers: quiz.questions.map((q) => ({ questionId: q.id, answer: states[q.id]?.answer || [] })) });
      setResult(r);
      onSubmitted?.(r);
    } catch (err) {
      toast.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const retry = () => {
    setStates({});
    setResult(null);
    document.getElementById('mini-test')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="mini-test" className="scroll-mt-24" aria-labelledby="quiz-title">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h2 id="quiz-title" className="section-title flex items-center gap-2"><ClipboardCheck className="h-5 w-5 text-primary" aria-hidden />Mini test</h2>
          <p className="mt-1 text-sm text-muted">{quiz.questions.length} ta savol. Darsni tugatish uchun kamida {quiz.passPercent}% kerak. Har bir javobni tekshirib, izohini o‘qing.</p>
        </div>
        <span className="shrink-0 text-sm tabular-nums text-muted">{checkedCount}/{quiz.questions.length}</span>
      </div>

      {result ? (
        <div className={cx('rounded-panel border p-5 sm:p-6', result.passed ? 'border-success/40 bg-success-soft/50' : 'border-warning/40 bg-warning-soft/50')} role="status">
          <div className="flex flex-wrap items-center gap-4">
            <span className={cx('grid h-14 w-14 place-items-center rounded-full', result.passed ? 'bg-success text-white' : 'bg-warning text-white')}>
              {result.passed ? <Trophy className="h-7 w-7" aria-hidden /> : <RotateCcw className="h-7 w-7" aria-hidden />}
            </span>
            <div className="flex-1">
              <p className="font-display text-2xl font-semibold text-ink">{result.score} / {result.total} · {result.percent}%</p>
              <p className="text-sm text-ink/80">{result.passed ? 'Dars tugallandi!' : `O‘tish uchun ${result.passPercent}% kerak. Dars “Qayta o‘rganish kerak” deb belgilandi.`}{result.xpGained > 0 && ` +${result.xpGained} XP`}</p>
            </div>
            <Button variant="secondary" icon={RotateCcw} onClick={retry}>Qayta ishlash</Button>
          </div>
          {result.weakConcepts.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-ink">Takrorlash kerak bo‘lgan tushunchalar</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {result.weakConcepts.map((c) => (
                  <button key={c} onClick={() => onAskTutor?.({ action: 'explain_again', concept: c })} className="inline-flex items-center gap-1 rounded-full border border-warning/40 bg-surface px-2.5 py-1 text-xs text-ink hover:border-primary">
                    <Lightbulb className="h-3 w-3 text-warning" aria-hidden />{c} — AI ustozdan so‘rash
                  </button>
                ))}
              </div>
            </div>
          )}
          <ul className="mt-4 space-y-1 text-sm text-ink/85">{result.recommendations.map((r) => <li key={r}>• {r}</li>)}</ul>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {quiz.questions.map((q, i) => (
              <Question key={q.id} q={q} index={i} state={states[q.id] || {}} checking={checking === q.id} onCheck={() => check(q)} onChange={(answer) => setStates((s) => ({ ...s, [q.id]: { ...(s[q.id] || {}), answer } }))} />
            ))}
          </div>
          <div className="mt-4 flex flex-col items-start gap-3 rounded-panel border border-line bg-sunken/60 p-4 sm:flex-row sm:items-center">
            <div className="flex-1">
              <ProgressBar value={(checkedCount / quiz.questions.length) * 100} size="sm" />
              <p className="mt-2 text-xs text-muted">{allChecked ? 'Barcha savollar tekshirildi. Natijani saqlang.' : 'Natijani saqlash uchun barcha savollarni tekshiring.'}</p>
            </div>
            {canSubmit ? (
              <Button onClick={submit} loading={submitting} disabled={!allChecked}>Natijani saqlash</Button>
            ) : (
              <p className="text-xs text-muted">Natijalar faqat o‘quvchi hisobida saqlanadi.</p>
            )}
          </div>
        </>
      )}
    </section>
  );
}
