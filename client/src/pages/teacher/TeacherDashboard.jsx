import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList, Copy, FolderPlus, Plus, Users } from 'lucide-react';
import PageHeader from '../../components/PageHeader.jsx';
import Button from '../../components/ui/Button.jsx';
import Dialog from '../../components/ui/Dialog.jsx';
import StatTile from '../../components/StatTile.jsx';
import { Input, Select, Textarea } from '../../components/ui/Field.jsx';
import { EmptyState, ErrorState, Skeleton } from '../../components/ui/Feedback.jsx';
import { useApi, useDocumentTitle } from '../../hooks/useApi.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { api } from '../../lib/api.js';
import { formatDate } from '../../lib/format.js';

export async function copyText(text, toast, label = 'Nusxa olindi') {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(label);
  } catch {
    toast.info(`Kod: ${text}`);
  }
}

function CreateGroupDialog({ open, onClose, onCreated }) {
  const toast = useToast();
  const careers = useApi(open ? '/careers' : null);
  const [form, setForm] = useState({ name: '', description: '', careerSlug: '' });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (form.name.trim().length < 2) {
      setError('Guruh nomi kamida 2 belgidan iborat bo‘lsin');
      return;
    }
    setSaving(true);
    try {
      const body = { name: form.name.trim(), description: form.description.trim() };
      if (form.careerSlug) body.careerSlug = form.careerSlug;
      const d = await api.post('/groups', body);
      toast.success('Guruh yaratildi');
      setForm({ name: '', description: '', careerSlug: '' });
      onCreated(d.group);
    } catch (err) {
      toast.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Yangi guruh"
      description="Guruh yaratilgach, o‘quvchilar qo‘shilishi uchun noyob kod beriladi."
      footer={<><Button variant="secondary" onClick={onClose}>Bekor qilish</Button><Button type="submit" form="group-form" loading={saving}>Yaratish</Button></>}
    >
      <form id="group-form" onSubmit={submit} className="space-y-4">
        <Input label="Guruh nomi" value={form.name} error={error} onChange={(e) => { setForm({ ...form, name: e.target.value }); setError(''); }} placeholder="Masalan, 10-A informatika" maxLength={100} />
        <Textarea label="Tavsif" optional rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} maxLength={500} />
        <Select label="Yo‘nalish" optional placeholder="Tanlanmagan" value={form.careerSlug} onChange={(e) => setForm({ ...form, careerSlug: e.target.value })} options={(careers.data?.careers || []).map((c) => ({ value: c.slug, label: c.name }))} />
      </form>
    </Dialog>
  );
}

export default function TeacherDashboard() {
  useDocumentTitle('O‘qituvchi paneli');
  const { user } = useAuth();
  const toast = useToast();
  const { data, loading, error, reload } = useApi('/groups');
  const [open, setOpen] = useState(false);
  const groups = data?.groups || [];
  const students = groups.reduce((s, g) => s + g.memberCount, 0);
  const assignments = groups.reduce((s, g) => s + g.assignmentCount, 0);

  return (
    <div>
      <PageHeader
        title={`Assalomu alaykum, ${user?.name?.split(' ')[0] || 'ustoz'}`}
        description="Guruhlaringizni boshqaring, topshiriq bering va o‘quvchilar natijalarini kuzating."
        actions={<Button icon={Plus} onClick={() => setOpen(true)}>Yangi guruh</Button>}
      />

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <StatTile icon={FolderPlus} label="Faol guruhlar" value={loading ? '…' : groups.length} />
        <StatTile icon={Users} tone="signal" label="O‘quvchilar" value={loading ? '…' : students} hint="Barcha guruhlar bo‘yicha" />
        <StatTile icon={ClipboardList} tone="success" label="Topshiriqlar" value={loading ? '…' : assignments} />
      </div>

      <h2 className="section-title mb-3">Guruhlar</h2>
      {error ? <ErrorState error={error} onRetry={reload} /> : loading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"><Skeleton className="h-40" /><Skeleton className="h-40" /><Skeleton className="h-40" /></div>
      ) : !groups.length ? (
        <EmptyState
          icon={Users}
          title="Hali guruh yo‘q"
          description="Birinchi guruhingizni yarating va kodni o‘quvchilarga yuboring. Ular “Guruhlar” bo‘limida kodni kiritib qo‘shiladi."
          action={<Button icon={Plus} onClick={() => setOpen(true)}>Guruh yaratish</Button>}
        />
      ) : (
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {groups.map((g) => (
            <li key={g._id} className="panel flex flex-col p-5">
              <Link to={`/teacher/groups/${g._id}`} className="font-semibold text-ink hover:text-primary-ink">{g.name}</Link>
              <p className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm text-muted">{g.description || (g.career ? `Yo‘nalish: ${g.career.name}` : 'Tavsif kiritilmagan')}</p>
              <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div><dt className="text-xs text-muted">O‘quvchilar</dt><dd className="font-medium text-ink">{g.memberCount}</dd></div>
                <div><dt className="text-xs text-muted">Topshiriqlar</dt><dd className="font-medium text-ink">{g.assignmentCount}</dd></div>
              </dl>
              <div className="mt-4 flex items-center justify-between gap-2 border-t border-line pt-3">
                <button onClick={() => copyText(g.joinCode, toast, 'Guruh kodi nusxalandi')} className="inline-flex items-center gap-1.5 rounded-control px-2 py-1 font-mono text-sm tracking-wider text-ink hover:bg-sunken" aria-label={`Guruh kodini nusxalash: ${g.joinCode}`}>
                  {g.joinCode}<Copy className="h-3.5 w-3.5 text-muted" aria-hidden />
                </button>
                <span className="text-xs text-muted">{formatDate(g.createdAt)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}

      <CreateGroupDialog open={open} onClose={() => setOpen(false)} onCreated={() => { setOpen(false); reload(); }} />
    </div>
  );
}
