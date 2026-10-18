import { useState } from 'react';
import { CalendarClock, Check, Pencil, Plus, Repeat, Trash2, Undo2 } from 'lucide-react';
import PageHeader from '../../components/PageHeader.jsx';
import Button from '../../components/ui/Button.jsx';
import Badge from '../../components/ui/Badge.jsx';
import Dialog from '../../components/ui/Dialog.jsx';
import Tabs from '../../components/ui/Tabs.jsx';
import { Input, Select, Textarea } from '../../components/ui/Field.jsx';
import { EmptyState, ErrorState, Skeleton } from '../../components/ui/Feedback.jsx';
import { useApi, useDocumentTitle } from '../../hooks/useApi.js';
import { useToast } from '../../context/ToastContext.jsx';
import { api } from '../../lib/api.js';
import { cx, formatDate, toLocalInput } from '../../lib/format.js';

const REPEAT = { none: 'Bir marta', daily: 'Har kuni', weekly: 'Har hafta' };

export function ReminderForm({ initial, universities, onClose, onSaved }) {
  const toast = useToast();
  const [form, setForm] = useState(() => ({
    kind: initial?.kind || 'study',
    title: initial?.title || '',
    note: initial?.note || '',
    dueAt: toLocalInput(initial?.dueAt || Date.now() + 3600000),
    repeat: initial?.repeat || 'none',
    university: initial?.university?._id || initial?.university || ''
  }));
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const save = async () => {
    const errs = {};
    if (form.title.trim().length < 2) errs.title = 'Sarlavhani kiriting';
    if (!form.dueAt) errs.dueAt = 'Sana va vaqtni tanlang';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSaving(true);
    try {
      const payload = { ...form, title: form.title.trim(), dueAt: new Date(form.dueAt).toISOString(), university: form.university || null };
      const d = initial?._id ? await api.patch(`/notifications/reminders/${initial._id}`, payload) : await api.post('/notifications/reminders', payload);
      toast.success(initial?._id ? 'Eslatma yangilandi' : 'Eslatma qo‘shildi');
      onSaved(d.reminder);
    } catch (err) {
      toast.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open onClose={onClose} title={initial?._id ? 'Eslatmani tahrirlash' : 'Yangi eslatma'} description="Eslatma vaqti kelganda bildirishnomalar bo‘limida xabar paydo bo‘ladi." footer={<><Button variant="secondary" onClick={onClose}>Bekor qilish</Button><Button onClick={save} loading={saving}>Saqlash</Button></>}>
      <div className="grid gap-4">
        <Select label="Turi" value={form.kind} onChange={set('kind')} options={[{ value: 'study', label: 'O‘qish eslatmasi' }, { value: 'deadline', label: 'Ariza muddati' }]} />
        <Input label="Sarlavha" value={form.title} onChange={set('title')} error={errors.title} maxLength={150} placeholder={form.kind === 'deadline' ? 'Masalan, hujjatlarni topshirish' : 'Masalan, JavaScript darsini takrorlash'} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Sana va vaqt" type="datetime-local" value={form.dueAt} onChange={set('dueAt')} error={errors.dueAt} />
          <Select label="Takrorlash" value={form.repeat} onChange={set('repeat')} options={Object.entries(REPEAT).map(([value, label]) => ({ value, label }))} />
        </div>
        {form.kind === 'deadline' && <Select label="Universitet" optional value={form.university} onChange={set('university')} placeholder="Tanlanmagan" options={universities.map((u) => ({ value: u._id, label: u.name }))} hint="Muddatlarni universitetning rasmiy saytidan tekshirib kiriting." />}
        <Textarea label="Izoh" optional rows={3} value={form.note} onChange={set('note')} maxLength={1000} />
      </div>
    </Dialog>
  );
}

export default function Reminders() {
  useDocumentTitle('Eslatmalar');
  const toast = useToast();
  const { data, loading, error, reload, setData } = useApi('/notifications/reminders');
  const unis = useApi('/universities?limit=60');
  const [editing, setEditing] = useState(null);
  const [tab, setTab] = useState('active');

  const upsert = (r) => {
    setData((d) => {
      const exists = d.reminders.some((x) => x._id === r._id);
      return { reminders: exists ? d.reminders.map((x) => (x._id === r._id ? r : x)) : [...d.reminders, r] };
    });
    setEditing(null);
  };
  const toggleDone = async (r) => {
    try {
      const d = await api.patch(`/notifications/reminders/${r._id}`, { done: !r.done });
      upsert(d.reminder);
    } catch (err) {
      toast.error(err);
    }
  };
  const remove = async (r) => {
    try {
      await api.delete(`/notifications/reminders/${r._id}`);
      setData((d) => ({ reminders: d.reminders.filter((x) => x._id !== r._id) }));
      toast.success('Eslatma o‘chirildi');
    } catch (err) {
      toast.error(err);
    }
  };

  const list = (data?.reminders || [])
    .filter((r) => (tab === 'active' ? !r.done : tab === 'deadline' ? r.kind === 'deadline' && !r.done : r.done))
    .sort((a, b) => new Date(a.dueAt) - new Date(b.dueAt));

  return (
    <div>
      <PageHeader title="Eslatmalar" description="O‘qish vaqti va ariza muddatlarini unutmang. Hozircha eslatmalar ilova ichida ko‘rsatiladi; email va SMS yuborish sozlanmagan." actions={<Button icon={Plus} onClick={() => setEditing('new')}>Eslatma qo‘shish</Button>} />
      <Tabs className="mb-6 w-fit" value={tab} onChange={setTab} tabs={[{ value: 'active', label: 'Faol' }, { value: 'deadline', label: 'Muddatlar' }, { value: 'done', label: 'Bajarilgan' }]} />
      {error ? <ErrorState error={error} onRetry={reload} /> : loading ? <Skeleton className="h-40" /> : !list.length ? (
        <EmptyState icon={CalendarClock} title={tab === 'done' ? 'Bajarilgan eslatmalar yo‘q' : 'Eslatmalar yo‘q'} description="Masalan, har kuni soat 19:00 da o‘qish yoki universitetga hujjat topshirish muddati." action={tab !== 'done' && <Button icon={Plus} onClick={() => setEditing('new')}>Eslatma qo‘shish</Button>} />
      ) : (
        <ul className="space-y-2">
          {list.map((r) => {
            const overdue = !r.done && new Date(r.dueAt) < new Date();
            return (
              <li key={r._id} className="panel flex items-start gap-3 p-4">
                <button onClick={() => toggleDone(r)} className={cx('mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border-2', r.done ? 'border-success bg-success text-white' : 'border-line hover:border-primary')} aria-label={r.done ? 'Bajarilmagan deb belgilash' : 'Bajarildi deb belgilash'}>
                  {r.done ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : null}
                </button>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className={cx('font-medium', r.done ? 'text-muted line-through' : 'text-ink')}>{r.title}</p>
                    {r.kind === 'deadline' && <Badge tone="danger">Muddat</Badge>}
                    {r.repeat !== 'none' && <Badge tone="outline" icon={Repeat}>{REPEAT[r.repeat]}</Badge>}
                    {overdue && <Badge tone="warning">O‘tib ketgan</Badge>}
                  </div>
                  <p className="text-sm text-muted">{formatDate(r.dueAt, true)}{r.university ? ` · ${r.university.name}` : ''}</p>
                  {r.note && <p className="mt-1 text-sm text-ink/80">{r.note}</p>}
                </div>
                <div className="flex">
                  {r.done ? (
                    <button onClick={() => toggleDone(r)} className="rounded-control p-2 text-muted hover:bg-sunken hover:text-ink" aria-label="Qayta faollashtirish"><Undo2 className="h-4 w-4" /></button>
                  ) : (
                    <button onClick={() => setEditing(r)} className="rounded-control p-2 text-muted hover:bg-sunken hover:text-ink" aria-label="Tahrirlash"><Pencil className="h-4 w-4" /></button>
                  )}
                  <button onClick={() => remove(r)} className="rounded-control p-2 text-muted hover:bg-sunken hover:text-danger" aria-label="O‘chirish"><Trash2 className="h-4 w-4" /></button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {editing && <ReminderForm initial={editing === 'new' ? null : editing} universities={unis.data?.universities || []} onClose={() => setEditing(null)} onSaved={upsert} />}
    </div>
  );
}
