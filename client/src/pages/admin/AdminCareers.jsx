import { useState } from 'react';
import { EyeOff, Pencil, Plus, Star } from 'lucide-react';
import Button from '../../components/ui/Button.jsx';
import Badge from '../../components/ui/Badge.jsx';
import Dialog from '../../components/ui/Dialog.jsx';
import Icon from '../../components/ui/Icon.jsx';
import { Input, Textarea, Toggle } from '../../components/ui/Field.jsx';
import { ErrorState, Skeleton } from '../../components/ui/Feedback.jsx';
import { useApi } from '../../hooks/useApi.js';
import { lines, useAction } from '../../hooks/useAction.js';
import { useToast } from '../../context/ToastContext.jsx';
import { api } from '../../lib/api.js';
import TraitEditor, { useTraitLabels } from './TraitEditor.jsx';

const LIST_FIELDS = [
  ['skills', 'Kerakli ko‘nikmalar'],
  ['strengths', 'Kuchli tomonlar'],
  ['schoolSubjects', 'Maktab fanlari'],
  ['learningPath', 'O‘qish yo‘li'],
  ['directions', 'Yo‘nalishlar'],
  ['roadmapLessons', 'Yo‘l xaritasi darslari (slug)']
];

const EMPTY = { slug: '', name: '', category: '', icon: 'Briefcase', description: '', nextAction: '', workEnvironment: '', traits: {}, featured: false, active: true, ...Object.fromEntries(LIST_FIELDS.map(([k]) => [k, []])) };

function CareerForm({ initial, isNew, labels, onSubmit }) {
  const toast = useToast();
  const [f, setF] = useState({ ...initial, ...Object.fromEntries(LIST_FIELDS.map(([k]) => [k, (initial[k] || []).join('\n')])) });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!/^[a-z0-9-]+$/.test(f.slug)) return toast.error('Slug faqat kichik lotin harflari, raqam va chiziqchadan iborat bo‘lsin');
    if (f.name.trim().length < 2 || f.category.trim().length < 2) return toast.error('Nomi va toifasini kiriting');
    if (f.description.trim().length < 10) return toast.error('Tavsif kamida 10 belgi');
    const body = {
      slug: f.slug,
      name: f.name.trim(),
      category: f.category.trim(),
      icon: f.icon.trim() || 'Briefcase',
      description: f.description.trim(),
      nextAction: f.nextAction.trim(),
      workEnvironment: f.workEnvironment.trim(),
      traits: f.traits,
      featured: f.featured,
      active: f.active,
      ...Object.fromEntries(LIST_FIELDS.map(([k]) => [k, lines(f[k])]))
    };
    onSubmit(body);
  };

  return (
    <form id="career-form" onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Nomi" value={f.name} onChange={set('name')} maxLength={100} />
        <Input label="Slug" value={f.slug} onChange={set('slug')} disabled={!isNew} hint={isNew ? 'URL uchun, masalan: data-analyst' : 'Slugni o‘zgartirib bo‘lmaydi'} maxLength={60} />
        <Input label="Toifa" value={f.category} onChange={set('category')} maxLength={60} />
        <Input label="Belgi (Lucide nomi)" value={f.icon} onChange={set('icon')} maxLength={40} hint="Masalan: Code2, Stethoscope, Scale" />
      </div>
      <Textarea label="Tavsif" rows={3} value={f.description} onChange={set('description')} maxLength={2000} />
      <Textarea label="Ish muhiti" optional rows={2} value={f.workEnvironment} onChange={set('workEnvironment')} maxLength={300} />
      <Input label="Keyingi qadam tavsiyasi" optional value={f.nextAction} onChange={set('nextAction')} maxLength={300} />
      <div className="grid gap-4 sm:grid-cols-2">
        {LIST_FIELDS.map(([k, label]) => <Textarea key={k} label={label} hint="Har bir qator — bitta element" rows={4} value={f[k]} onChange={set(k)} />)}
      </div>
      <TraitEditor labels={labels} value={f.traits} onChange={(traits) => setF({ ...f, traits })} legend="Moslik hisobi uchun xususiyat og‘irliklari (0–5)" />
      <div className="space-y-3 rounded-control border border-line p-3">
        <Toggle label="Bosh sahifada ko‘rsatish" checked={f.featured} onChange={(v) => setF({ ...f, featured: v })} />
        <Toggle label="Faol" description="Nofaol kasblar test natijalari va katalogda ko‘rinmaydi" checked={f.active} onChange={(v) => setF({ ...f, active: v })} />
      </div>
    </form>
  );
}

export default function AdminCareers() {
  const { data, loading, error, reload } = useApi('/admin/careers');
  const labels = useTraitLabels();
  const [editing, setEditing] = useState(null);
  const [run, busy] = useAction();

  const save = async (body) => {
    const ok = editing.isNew
      ? await run(() => api.post('/admin/careers', body), 'Kasb qo‘shildi')
      : await run(() => api.put(`/admin/careers/${editing.career._id}`, body), 'Kasb yangilandi');
    if (ok) {
      setEditing(null);
      reload();
    }
  };

  const deactivate = async (c) => {
    if (await run(() => api.delete(`/admin/careers/${c._id}`), `“${c.name}” nofaol qilindi`)) reload();
  };

  if (error) return <ErrorState error={error} onRetry={reload} />;
  if (loading) return <Skeleton className="h-64" />;

  return (
    <div className="space-y-4">
      <div className="flex justify-end"><Button icon={Plus} onClick={() => setEditing({ isNew: true, career: EMPTY })}>Kasb qo‘shish</Button></div>
      <ul className="grid gap-3 md:grid-cols-2">
        {data.careers.map((c) => (
          <li key={c._id} className="panel flex items-start gap-3 p-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-control bg-primary-soft text-primary-ink"><Icon name={c.icon} /></span>
            <div className="min-w-0 flex-1">
              <p className="flex flex-wrap items-center gap-2 font-medium text-ink">
                {c.name}
                {c.featured && <Star className="h-3.5 w-3.5 text-warning" aria-label="Bosh sahifada" />}
                {!c.active && <Badge tone="neutral">Nofaol</Badge>}
              </p>
              <p className="text-xs text-muted">{c.category} · {Object.keys(c.traits || {}).length} xususiyat · {c.roadmapLessons.length} dars</p>
            </div>
            <Button size="iconSm" variant="ghost" onClick={() => setEditing({ isNew: false, career: c })} aria-label={`${c.name}ni tahrirlash`}><Pencil className="h-4 w-4" /></Button>
            {c.active && <Button size="iconSm" variant="ghost" onClick={() => deactivate(c)} disabled={busy} aria-label={`${c.name}ni nofaol qilish`}><EyeOff className="h-4 w-4" /></Button>}
          </li>
        ))}
      </ul>

      <Dialog
        open={Boolean(editing)}
        onClose={() => setEditing(null)}
        title={editing?.isNew ? 'Yangi kasb' : `Tahrirlash: ${editing?.career.name}`}
        size="lg"
        footer={<><Button variant="secondary" onClick={() => setEditing(null)}>Bekor qilish</Button><Button type="submit" form="career-form" loading={busy}>Saqlash</Button></>}
      >
        {editing && <CareerForm key={editing.career._id || 'new'} initial={editing.career} isNew={editing.isNew} labels={labels} onSubmit={save} />}
      </Dialog>
    </div>
  );
}
