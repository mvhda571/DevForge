import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Clock, Compass, RotateCcw, ShieldCheck } from 'lucide-react';
import Button from '../../components/ui/Button.jsx';
import { ErrorState, PageSkeleton, ProgressBar } from '../../components/ui/Feedback.jsx';
import { api } from '../../lib/api.js';
import { cx } from '../../lib/format.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { useCelebrate } from '../../context/CelebrationContext.jsx';
import { useDocumentTitle } from '../../hooks/useApi.js';

export default function Assessment() {
  useDocumentTitle('Kasb testi');
  const navigate = useNavigate();
  const toast = useToast();
  const celebrate = useCelebrate();
  const { refresh } = useAuth();
  const [state, setState] = useState({ loading: true, error: null, questions: [], assessment: null, method: null });
  const [mode, setMode] = useState('intro');
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [saving, setSaving] = useState(false);
  const [hint, setHint] = useState('');

  const load = async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const [q, cur] = await Promise.all([api.get('/assessments/questions'), api.get('/assessments/current')]);
      setState({ loading: false, error: null, questions: q.questions, assessment: cur.assessment, method: q.method });
      if (cur.assessment) {
        setAnswers(cur.assessment.answers || {});
        setIndex(Math.min(cur.assessment.currentIndex || 0, q.questions.length - 1));
      }
    } catch (error) {
      setState((s) => ({ ...s, loading: false, error }));
    }
  };

  useEffect(() => {
    load();
  }, []);

  const begin = async (restart = false) => {
    setSaving(true);
    try {
      const d = await api.post('/assessments/start', { restart });
      setState((s) => ({ ...s, assessment: d.assessment }));
      if (restart) {
        setAnswers({});
        setIndex(0);
      }
      setMode('quiz');
    } catch (err) {
      toast.error(err);
    } finally {
      setSaving(false);
    }
  };

  const { questions, assessment } = state;
  const q = questions[index];
  const chosen = (q && answers[q.code]) || [];

  const choose = (key) => {
    setHint('');
    setAnswers((a) => {
      const cur = a[q.code] || [];
      if (!q.multiple) return { ...a, [q.code]: [key] };
      if (cur.includes(key)) return { ...a, [q.code]: cur.filter((k) => k !== key) };
      if (cur.length >= q.maxSelect) {
        setHint(`Ko‘pi bilan ${q.maxSelect} ta javob tanlash mumkin`);
        return a;
      }
      return { ...a, [q.code]: [...cur, key] };
    });
  };

  const goNext = async () => {
    if (!chosen.length) {
      setHint('Davom etish uchun javobni tanlang');
      return;
    }
    setSaving(true);
    try {
      await api.put(`/assessments/${assessment.id}/answer`, { questionCode: q.code, answer: chosen, currentIndex: Math.min(index + 1, questions.length - 1) });
      if (index < questions.length - 1) {
        setIndex((i) => i + 1);
        setHint('');
      } else {
        const d = await api.post(`/assessments/${assessment.id}/complete`);
        celebrate(d.newAchievements);
        refresh();
        navigate('/app/results', { replace: true });
      }
    } catch (err) {
      toast.error(err);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (mode !== 'quiz' || !q) return undefined;
    const onKey = (e) => {
      if (e.target.closest('input, textarea')) return;
      const n = Number(e.key);
      if (n >= 1 && n <= q.options.length) choose(q.options[n - 1].key);
      if (e.key === 'Enter' && chosen.length) goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  if (state.loading) return <PageSkeleton />;
  if (state.error) return <ErrorState error={state.error} onRetry={load} />;

  if (mode === 'intro') {
    const answered = Object.keys(answers).length;
    return (
      <div className="mx-auto max-w-2xl">
        <div className="panel p-6 sm:p-10">
          <span className="grid h-12 w-12 place-items-center rounded-panel bg-primary-soft text-primary-ink"><Compass className="h-6 w-6" aria-hidden /></span>
          <h1 className="page-title mt-5">Kasbimni topish</h1>
          <p className="mt-3 text-[15px] text-muted">{questions.length} ta savol qiziqishlaringiz, sevimli fanlaringiz, muammo yechish uslubingiz va kelajakdagi maqsadlaringiz haqida. To‘g‘ri yoki noto‘g‘ri javob yo‘q — o‘zingizga eng yaqin variantni tanlang.</p>
          <ul className="mt-6 space-y-2.5 text-sm text-ink">
            <li className="flex gap-2.5"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />Taxminan 8–10 daqiqa. Javoblar avtomatik saqlanadi — istalgan vaqtda davom ettirishingiz mumkin.</li>
            <li className="flex gap-2.5"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />Natijada eng mos 3 ta kasb, moslik foizi va sabablari ko‘rsatiladi.</li>
            <li className="flex gap-2.5"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />Bu ilmiy psixologik tashxis emas — o‘zingizni yaxshiroq tushunish uchun yordamchi vosita.</li>
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {assessment ? (
              <>
                <Button size="lg" onClick={() => setMode('quiz')} icon={ArrowRight}>Davom ettirish ({answered}/{questions.length})</Button>
                <Button size="lg" variant="secondary" icon={RotateCcw} onClick={() => begin(true)} loading={saving}>Qaytadan boshlash</Button>
              </>
            ) : (
              <Button size="lg" onClick={() => begin(false)} loading={saving} icon={Compass}>Testni boshlash</Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center gap-3">
        <ProgressBar value={((index + (chosen.length ? 1 : 0)) / questions.length) * 100} label={`${index + 1}-savol, jami ${questions.length}`} />
        <span className="shrink-0 text-sm tabular-nums text-muted">{index + 1} / {questions.length}</span>
      </div>
      <section key={q.code} className="panel animate-rise-in p-6 sm:p-8" aria-labelledby={`q-${q.code}`}>
        <h1 id={`q-${q.code}`} className="font-display text-xl font-semibold leading-snug text-ink sm:text-2xl">{q.text}</h1>
        {q.hint && <p className="mt-2 text-sm text-muted">{q.hint}</p>}
        <div role={q.multiple ? 'group' : 'radiogroup'} aria-labelledby={`q-${q.code}`} className="mt-6 grid gap-2.5">
          {q.options.map((o, i) => {
            const active = chosen.includes(o.key);
            return (
              <button
                key={o.key}
                type="button"
                role={q.multiple ? 'checkbox' : 'radio'}
                aria-checked={active}
                onClick={() => choose(o.key)}
                className={cx('flex items-center gap-3.5 rounded-control border px-4 py-3.5 text-left text-[15px] transition-colors', active ? 'border-primary bg-primary-soft text-ink' : 'border-line bg-surface text-ink hover:border-primary/40')}
              >
                <span className={cx('grid h-6 w-6 shrink-0 place-items-center border-2 text-[11px] font-semibold', q.multiple ? 'rounded-md' : 'rounded-full', active ? 'border-primary bg-primary text-white' : 'border-line text-muted')} aria-hidden>
                  {active ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
                </span>
                {o.label}
              </button>
            );
          })}
        </div>
        <p className={cx('mt-3 min-h-[20px] text-sm', hint ? 'text-warning' : 'text-transparent')} role="status">{hint || '.'}</p>
      </section>
      <div className="mt-5 flex items-center justify-between">
        <Button variant="ghost" icon={ArrowLeft} onClick={() => (index === 0 ? setMode('intro') : setIndex((i) => i - 1))}>Oldingi</Button>
        <Button onClick={goNext} loading={saving} iconRight={index === questions.length - 1 ? Check : ArrowRight}>
          {index === questions.length - 1 ? 'Natijani ko‘rish' : 'Keyingi'}
        </Button>
      </div>
      <p className="mt-4 hidden text-center text-xs text-muted sm:block">Klaviatura: 1–{q.options.length} javobni tanlaydi, Enter — keyingi savol.</p>
    </div>
  );
}
