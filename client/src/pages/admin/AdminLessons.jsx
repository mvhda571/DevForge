import { useEffect, useState } from 'react';
import { ExternalLink, ListChecks, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import Button from '../../components/ui/Button.jsx';
import Badge from '../../components/ui/Badge.jsx';
import Dialog from '../../components/ui/Dialog.jsx';
import Tabs from '../../components/ui/Tabs.jsx';
import { Input, Select, Textarea, Toggle } from '../../components/ui/Field.jsx';
import { ErrorState, Skeleton, Spinner } from '../../components/ui/Feedback.jsx';
import { useApi } from '../../hooks/useApi.js';
import { lines, useAction } from '../../hooks/useAction.js';
import { useToast } from '../../context/ToastContext.jsx';
import { api, qs } from '../../lib/api.js';
import { formatDate } from '../../lib/format.js';

export const DIFFICULTY = { beginner: 'Boshlang‘ich', intermediate: 'O‘rta', advanced: 'Yuqori' };
const TYPES = [
  { value: 'single', label: 'Bitta javob' },
  { value: 'multiple', label: 'Bir nechta javob' },
  { value: 'truefalse', label: 'To‘g‘ri / noto‘g‘ri' },
  { value: 'short', label: 'Qisqa javob' }
];

function LessonMeta({ lesson, onSave, busy }) {
  const toast = useToast();
  const [f, setF] = useState({ title: lesson.title, summary: lesson.summary || '', difficulty: lesson.difficulty, durationMinutes: lesson.durationMinutes, published: lesson.published });
  const submit = (e) => {
    e.preventDefault();
    const d = Number(f.durationMinutes);
    if (f.title.trim().length < 2) return toast.error('Sarlavha kamida 2 belgi');
    if (!Number.isInteger(d) || d < 5 || d > 180) return toast.error('Davomiylik 5–180 daqiqa');
    onSave({ title: f.title.trim(), summary: f.summary.trim(), difficulty: f.difficulty, durationMinutes: d, published: f.published });
  };
  return (
    <form onSubmit={submit} className="space-y-4">
      <Input label="Sarlavha" value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} maxLength={200} />
      <Textarea label="Qisqacha" rows={3} value={f.summary} onChange={(e) => setF({ ...f, summary: e.target.value })} maxLength={500} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Select label="Qiyinlik" value={f.difficulty} onChange={(e) => setF({ ...f, difficulty: e.target.value })} options={Object.entries(DIFFICULTY).map(([value, label]) => ({ value, label }))} />
        <Input label="Davomiylik (daqiqa)" type="number" min={5} max={180} value={f.durationMinutes} onChange={(e) => setF({ ...f, durationMinutes: e.target.value })} />
      </div>
      <Toggle label="Nashr qilingan" description="Nashr qilinmagan darslar o‘quvchilarga ko‘rinmaydi" checked={f.published} onChange={(v) => setF({ ...f, published: v })} />
      <p className="text-xs text-muted">Bo‘limlar: {lesson.sections.length} · Misollar: {lesson.examples.length} · Mashqlar: {lesson.exercises.length}. Asosiy mazmun seed fayllari orqali boshqariladi.</p>
      <div className="flex justify-end"><Button type="submit" loading={busy}>Saqlash</Button></div>
    </form>
  );
}

function QuizEditor({ quiz, onSave, busy }) {
  const toast = useToast();
  const [pass, setPass] = useState(quiz?.passPercent || 60);
  const [qs_, setQs] = useState(() => (quiz?.questions || []).map((q) => ({ ...q, options: q.options.join('\n'), correct: q.correct.join('\n') })));
  const set = (i, patch) => setQs(qs_.map((q, j) => (j === i ? { ...q, ...patch } : q)));

  const submit = (e) => {
    e.preventDefault();
    const questions = [];
    for (const [i, q] of qs_.entries()) {
      const options = q.type === 'truefalse' ? ['To‘g‘ri', 'Noto‘g‘ri'] : q.type === 'short' ? [] : lines(q.options);
      const correct = lines(q.correct);
      if (q.prompt.trim().length < 3) return toast.error(`${i + 1}-savol matni juda qisqa`);
      if (!correct.length) return toast.error(`${i + 1}-savolda to‘g‘ri javob ko‘rsatilmagan`);
      if (q.type !== 'short' && options.length < 2) return toast.error(`${i + 1}-savolda kamida 2 variant bo‘lsin`);
      if (q.type !== 'short' && correct.some((c) => !options.includes(c))) return toast.error(`${i + 1}-savol: to‘g‘ri javob variantlar bilan aynan bir xil yozilishi kerak`);
      questions.push({ ...(q._id ? { _id: q._id } : {}), type: q.type, prompt: q.prompt.trim(), options, correct, explanation: (q.explanation || '').trim(), wrongExplanation: (q.wrongExplanation || '').trim(), concept: (q.concept || '').trim() });
    }
    if (!questions.length) return toast.error('Kamida bitta savol qo‘shing');
    onSave({ passPercent: Number(pass), questions });
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <Input label="O‘tish foizi" type="number" min={1} max={100} value={pass} onChange={(e) => setPass(e.target.value)} className="sm:w-40" />
      {qs_.map((q, i) => (
        <fieldset key={q._id || i} className="space-y-3 rounded-control border border-line p-3">
          <div className="flex items-center justify-between gap-2">
            <legend className="text-sm font-semibold text-ink">{i + 1}-savol</legend>
            <button type="button" onClick={() => setQs(qs_.filter((_, j) => j !== i))} className="rounded-control p-1.5 text-muted hover:bg-sunken hover:text-danger" aria-label={`${i + 1}-savolni o‘chirish`}><Trash2 className="h-4 w-4" /></button>
          </div>
          <div className="grid gap-3 sm:grid-cols-[1fr_200px]">
            <Input label="Savol" value={q.prompt} onChange={(e) => set(i, { prompt: e.target.value })} maxLength={500} />
            <Select label="Turi" value={q.type} onChange={(e) => set(i, { type: e.target.value })} options={TYPES} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {q.type !== 'truefalse' && q.type !== 'short' && <Textarea label="Variantlar" hint="Har qatorda bitta" rows={4} value={q.options} onChange={(e) => set(i, { options: e.target.value })} />}
            <Textarea label="To‘g‘ri javob(lar)" hint={q.type === 'truefalse' ? '“To‘g‘ri” yoki “Noto‘g‘ri”' : q.type === 'short' ? 'Qabul qilinadigan javoblar, har qatorda bitta' : 'Variant bilan aynan bir xil'} rows={q.type === 'truefalse' ? 1 : 4} value={q.correct} onChange={(e) => set(i, { correct: e.target.value })} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Textarea label="To‘g‘ri javob izohi" rows={2} value={q.explanation || ''} onChange={(e) => set(i, { explanation: e.target.value })} maxLength={1000} />
            <Textarea label="Noto‘g‘ri javob izohi" optional rows={2} value={q.wrongExplanation || ''} onChange={(e) => set(i, { wrongExplanation: e.target.value })} maxLength={1000} />
          </div>
          <Input label="Tushuncha (zaif mavzuni aniqlash uchun)" optional value={q.concept || ''} onChange={(e) => set(i, { concept: e.target.value })} maxLength={120} />
        </fieldset>
      ))}
      <div className="flex flex-wrap justify-between gap-2">
        <Button variant="secondary" icon={Plus} disabled={qs_.length >= 20} onClick={() => setQs([...qs_, { type: 'single', prompt: '', options: '', correct: '', explanation: '' }])}>Savol qo‘shish</Button>
        <Button type="submit" loading={busy}>Testni saqlash</Button>
      </div>
      {qs_.length !== 5 && <p className="text-xs text-warning">Tavsiya: har bir darsda 5 ta savol bo‘lishi kerak (hozir {qs_.length} ta).</p>}
    </form>
  );
}

function LessonEditor({ id, onChanged }) {
  const { data, loading, error, reload, setData } = useApi(`/admin/lessons/${id}`);
  const [tab, setTab] = useState('meta');
  const [run, busy] = useAction();
  if (loading) return <Spinner />;
  if (error) return <ErrorState error={error} onRetry={reload} />;

  const saveMeta = async (body) => {
    const d = await run(() => api.patch(`/admin/lessons/${id}`, body), 'Dars yangilandi');
    if (d) { setData((prev) => ({ ...prev, lesson: { ...prev.lesson, ...d.lesson } })); onChanged(); }
  };
  const saveQuiz = async (body) => {
    const d = await run(() => api.put(`/admin/lessons/${id}/quiz`, body), 'Test saqlandi');
    if (d) { setData((prev) => ({ ...prev, quiz: d.quiz })); onChanged(); }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Tabs value={tab} onChange={setTab} tabs={[{ value: 'meta', label: 'Dars' }, { value: 'quiz', label: 'Test', icon: ListChecks, count: data.quiz?.questions.length || 0 }]} />
        <Button to={`/app/lessons/${data.lesson.slug}`} variant="ghost" size="sm" iconRight={ExternalLink} target="_blank">Darsni ochish</Button>
      </div>
      {tab === 'meta' ? <LessonMeta key={data.lesson.updatedAt} lesson={data.lesson} onSave={saveMeta} busy={busy} /> : <QuizEditor key={data.quiz?.updatedAt || 'new'} quiz={data.quiz} onSave={saveQuiz} busy={busy} />}
    </div>
  );
}

export default function AdminLessons() {
  const [search, setSearch] = useState('');
  const [q, setQ] = useState('');
  const [editing, setEditing] = useState(null);
  const { data, loading, error, reload } = useApi(`/admin/lessons${qs({ q, limit: 100 })}`);

  useEffect(() => {
    const t = setTimeout(() => setQ(search.trim()), 300);
    return () => clearTimeout(t);
  }, [search]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
        <label htmlFor="lesson-search" className="sr-only">Dars nomi bo‘yicha qidirish</label>
        <input id="lesson-search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Dars nomi" className="field pl-9" />
      </div>
      {error ? <ErrorState error={error} onRetry={reload} /> : loading && !data ? <Skeleton className="h-64" /> : (
        <div className="panel overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-line text-xs text-muted">
              <tr>
                <th className="px-4 py-3 font-medium" scope="col">Dars</th>
                <th className="px-4 py-3 font-medium" scope="col">Fan</th>
                <th className="px-4 py-3 font-medium" scope="col">Qiyinlik</th>
                <th className="px-4 py-3 font-medium" scope="col">Test</th>
                <th className="px-4 py-3 font-medium" scope="col">Yangilangan</th>
                <th className="px-4 py-3" scope="col"><span className="sr-only">Amallar</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {data.lessons.map((l) => (
                <tr key={l._id}>
                  <td className="px-4 py-3"><p className="font-medium text-ink">{l.title}</p><p className="text-xs text-muted">{l.topic?.name}{!l.published && ' · nashr qilinmagan'}</p></td>
                  <td className="px-4 py-3 text-muted">{l.subject?.name}</td>
                  <td className="px-4 py-3 text-muted">{DIFFICULTY[l.difficulty]}</td>
                  <td className="px-4 py-3">{l.quizQuestions === 5 ? <Badge tone="success">5 savol</Badge> : <Badge tone="warning">{l.quizQuestions} savol</Badge>}</td>
                  <td className="px-4 py-3 text-muted">{formatDate(l.updatedAt)}</td>
                  <td className="px-4 py-3 text-right"><Button size="iconSm" variant="ghost" onClick={() => setEditing(l)} aria-label={`${l.title}ni tahrirlash`}><Pencil className="h-4 w-4" /></Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Dialog open={Boolean(editing)} onClose={() => setEditing(null)} title={editing?.title || ''} size="lg">
        {editing && <LessonEditor id={editing._id} onChanged={reload} />}
      </Dialog>
    </div>
  );
}
