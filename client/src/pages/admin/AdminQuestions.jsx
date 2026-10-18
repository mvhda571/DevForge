import { useState } from 'react';
import { Pencil } from 'lucide-react';
import Button from '../../components/ui/Button.jsx';
import Badge from '../../components/ui/Badge.jsx';
import Dialog from '../../components/ui/Dialog.jsx';
import { Input, Toggle } from '../../components/ui/Field.jsx';
import { ErrorState, Skeleton } from '../../components/ui/Feedback.jsx';
import { useApi } from '../../hooks/useApi.js';
import { useAction } from '../../hooks/useAction.js';
import { useToast } from '../../context/ToastContext.jsx';
import { api } from '../../lib/api.js';
import TraitEditor, { useTraitLabels } from './TraitEditor.jsx';

function QuestionForm({ q, labels, onSubmit }) {
  const toast = useToast();
  const [f, setF] = useState({ text: q.text, hint: q.hint || '', active: q.active, options: q.options.map((o) => ({ ...o, traits: { ...o.traits } })) });
  const setOpt = (i, patch) => setF({ ...f, options: f.options.map((o, j) => (j === i ? { ...o, ...patch } : o)) });

  const submit = (e) => {
    e.preventDefault();
    if (f.text.trim().length < 5) return toast.error('Savol matni kamida 5 belgi');
    if (f.options.some((o) => !o.label.trim())) return toast.error('Barcha variantlar matnini kiriting');
    onSubmit({ text: f.text.trim(), hint: f.hint.trim(), active: f.active, options: f.options.map((o) => ({ key: o.key, label: o.label.trim(), traits: o.traits })) });
  };

  return (
    <form id="question-form" onSubmit={submit} className="space-y-4">
      <Input label="Savol" value={f.text} onChange={(e) => setF({ ...f, text: e.target.value })} maxLength={300} />
      <Input label="Yordamchi izoh" optional value={f.hint} onChange={(e) => setF({ ...f, hint: e.target.value })} maxLength={300} />
      <Toggle label="Faol" description="Nofaol savollar yangi testlarda ko‘rsatilmaydi" checked={f.active} onChange={(v) => setF({ ...f, active: v })} />
      {f.options.map((o, i) => (
        <details key={o.key} className="rounded-control border border-line p-3" open={i === 0}>
          <summary className="cursor-pointer text-sm font-medium text-ink">Variant {o.key.toUpperCase()}: {o.label}</summary>
          <div className="mt-3 space-y-3">
            <Input label="Variant matni" value={o.label} onChange={(e) => setOpt(i, { label: e.target.value })} maxLength={200} />
            <TraitEditor labels={labels} value={o.traits} onChange={(traits) => setOpt(i, { traits })} legend="Bu javob qaysi xususiyatlarga ball beradi (0–5)" />
          </div>
        </details>
      ))}
    </form>
  );
}

export default function AdminQuestions() {
  const { data, loading, error, reload, setData } = useApi('/admin/questions');
  const labels = useTraitLabels();
  const [editing, setEditing] = useState(null);
  const [run, busy] = useAction();

  const save = async (body) => {
    const d = await run(() => api.patch(`/admin/questions/${editing._id}`, body), 'Savol yangilandi');
    if (d) {
      setData((prev) => ({ ...prev, questions: prev.questions.map((q) => (q._id === editing._id ? d.question : q)) }));
      setEditing(null);
    }
  };

  if (error) return <ErrorState error={error} onRetry={reload} />;
  if (loading) return <Skeleton className="h-64" />;

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted">Kasb testi {data.questions.filter((q) => q.active).length} ta faol savoldan iborat. Har bir javob variantining xususiyat og‘irliklari moslik foizini hisoblashda ishlatiladi.</p>
      <ol className="space-y-2">
        {data.questions.map((q) => (
          <li key={q._id} className="panel flex items-start gap-3 p-4">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sunken text-xs font-semibold text-muted">{q.order}</span>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-ink">{q.text}</p>
              <p className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-muted">
                {q.dimension} · {q.options.length} variant{q.multiple ? ` · ${q.maxSelect} tagacha tanlov` : ''}
                {!q.active && <Badge>Nofaol</Badge>}
              </p>
            </div>
            <Button size="iconSm" variant="ghost" onClick={() => setEditing(q)} aria-label="Savolni tahrirlash"><Pencil className="h-4 w-4" /></Button>
          </li>
        ))}
      </ol>
      <Dialog
        open={Boolean(editing)}
        onClose={() => setEditing(null)}
        title="Savolni tahrirlash"
        size="lg"
        footer={<><Button variant="secondary" onClick={() => setEditing(null)}>Bekor qilish</Button><Button type="submit" form="question-form" loading={busy}>Saqlash</Button></>}
      >
        {editing && <QuestionForm key={editing._id} q={editing} labels={labels} onSubmit={save} />}
      </Dialog>
    </div>
  );
}
