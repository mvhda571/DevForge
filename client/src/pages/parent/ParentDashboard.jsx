import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, ChevronRight, Clock, HeartHandshake, Link2Off, Send, ShieldCheck } from 'lucide-react';
import PageHeader from '../../components/PageHeader.jsx';
import Button from '../../components/ui/Button.jsx';
import Badge from '../../components/ui/Badge.jsx';
import Card from '../../components/ui/Card.jsx';
import Dialog from '../../components/ui/Dialog.jsx';
import { Input } from '../../components/ui/Field.jsx';
import { EmptyState, ErrorState, Skeleton } from '../../components/ui/Feedback.jsx';
import { useApi, useDocumentTitle } from '../../hooks/useApi.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { api } from '../../lib/api.js';
import { formatDate, relativeTime } from '../../lib/format.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ParentDashboard() {
  useDocumentTitle('Ota-ona paneli');
  const { user } = useAuth();
  const toast = useToast();
  const links = useApi('/parents/links');
  const notes = useApi('/notifications?limit=5');
  const [form, setForm] = useState({ studentEmail: '', relation: '' });
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [revoking, setRevoking] = useState(null);
  const [busy, setBusy] = useState(false);

  const invite = async (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(form.studentEmail.trim())) {
      setError('To‘g‘ri email manzil kiriting');
      return;
    }
    setSending(true);
    try {
      const body = { studentEmail: form.studentEmail.trim().toLowerCase() };
      if (form.relation.trim()) body.relation = form.relation.trim();
      const d = await api.post('/parents/invite', body);
      toast.info(d.message);
      setForm({ studentEmail: '', relation: '' });
      links.reload();
    } catch (err) {
      toast.error(err);
    } finally {
      setSending(false);
    }
  };

  const revoke = async () => {
    setBusy(true);
    try {
      await api.delete(`/parents/links/${revoking.id}`);
      toast.success('Bog‘lanish bekor qilindi');
      setRevoking(null);
      links.reload();
    } catch (err) {
      toast.error(err);
    } finally {
      setBusy(false);
    }
  };

  const list = links.data?.links || [];
  const notifications = notes.data?.notifications || [];

  return (
    <div>
      <PageHeader title={`Assalomu alaykum, ${user?.name?.split(' ')[0] || ''}`} description="Farzandingizning o‘quv jarayonini uning roziligi bilan kuzating." />

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <section aria-labelledby="kids-title" className="space-y-4">
          <h2 id="kids-title" className="section-title">Bog‘langan o‘quvchilar</h2>
          {links.error ? <ErrorState error={links.error} onRetry={links.reload} /> : links.loading ? <Skeleton className="h-24" /> : !list.length ? (
            <EmptyState icon={HeartHandshake} title="Hali bog‘langan o‘quvchi yo‘q" description="O‘quvchining DevForge hisobidagi emailni kiriting. U so‘rovni o‘z hisobida tasdiqlagandan keyingina natijalarni ko‘ra olasiz." />
          ) : (
            <ul className="space-y-2">
              {list.map((l) => (
                <li key={l.id} className="panel flex items-center gap-3 p-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-soft font-semibold text-primary-ink">{l.status === 'active' ? l.student.name.charAt(0) : <Clock className="h-4 w-4" aria-hidden />}</div>
                  <div className="min-w-0 flex-1">
                    {l.status === 'active' ? (
                      <Link to={`/parent/students/${l.studentId}`} className="font-medium text-ink hover:text-primary-ink">{l.student.name}</Link>
                    ) : (
                      <p className="font-medium text-ink">Tasdiq kutilmoqda</p>
                    )}
                    <p className="text-xs text-muted">{l.relation ? `${l.relation} · ` : ''}{l.status === 'active' ? 'Tasdiqlangan' : `So‘rov yuborilgan: ${formatDate(l.createdAt)}`}</p>
                  </div>
                  {l.status === 'active' ? <Badge tone="success">Faol</Badge> : <Badge tone="warning">Kutilmoqda</Badge>}
                  {l.status === 'active' && <Button to={`/parent/students/${l.studentId}`} size="iconSm" variant="ghost" aria-label={`${l.student.name} natijalarini ko‘rish`}><ChevronRight className="h-4 w-4" /></Button>}
                  <button onClick={() => setRevoking(l)} className="rounded-control p-2 text-muted hover:bg-sunken hover:text-danger" aria-label="Bog‘lanishni bekor qilish"><Link2Off className="h-4 w-4" /></button>
                </li>
              ))}
            </ul>
          )}

          <Card title="So‘nggi bildirishnomalar" action={<Button to="/app/notifications" size="sm" variant="ghost">Barchasi</Button>}>
            {notes.loading ? <Skeleton className="h-16" /> : !notifications.length ? (
              <p className="flex items-center gap-2 text-sm text-muted"><Bell className="h-4 w-4" aria-hidden />Yangi bildirishnoma yo‘q.</p>
            ) : (
              <ul className="divide-y divide-line">
                {notifications.map((n) => (
                  <li key={n._id} className="py-2.5">
                    <p className={n.read ? 'text-sm text-ink' : 'text-sm font-medium text-ink'}>{n.title}</p>
                    {n.body && <p className="text-xs text-muted">{n.body}</p>}
                    <p className="mt-0.5 text-xs text-muted">{relativeTime(n.createdAt)}</p>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </section>

        <aside className="space-y-4">
          <Card title="O‘quvchini bog‘lash" description="O‘quvchiga tasdiqlash so‘rovi yuboriladi">
            <form onSubmit={invite} className="space-y-3">
              <Input label="O‘quvchi emaili" type="email" autoComplete="off" value={form.studentEmail} error={error} onChange={(e) => { setForm({ ...form, studentEmail: e.target.value }); setError(''); }} placeholder="farzand@example.com" />
              <Input label="Qarindoshlik" optional value={form.relation} onChange={(e) => setForm({ ...form, relation: e.target.value })} placeholder="Masalan, ona" maxLength={40} />
              <Button type="submit" icon={Send} loading={sending} className="w-full">So‘rov yuborish</Button>
            </form>
          </Card>
          <div className="rounded-panel border border-line bg-sunken/60 p-4 text-sm text-muted">
            <p className="flex items-center gap-2 font-medium text-ink"><ShieldCheck className="h-4 w-4 text-success" aria-hidden />Maxfiylik</p>
            <p className="mt-1.5">Siz faqat o‘quv natijalari, tugallangan darslar, test xulosalari va muddatlarni ko‘rasiz. AI suhbatlari va shaxsiy eslatmalar ko‘rsatilmaydi. O‘quvchi bog‘lanishni istalgan vaqtda bekor qila oladi.</p>
          </div>
        </aside>
      </div>

      <Dialog
        open={Boolean(revoking)}
        onClose={() => setRevoking(null)}
        title="Bog‘lanishni bekor qilish"
        size="sm"
        description="Bekor qilingach, o‘quvchi natijalarini ko‘ra olmaysiz. Qayta bog‘lanish uchun yangi so‘rov va o‘quvchi roziligi kerak bo‘ladi."
        footer={<><Button variant="secondary" onClick={() => setRevoking(null)}>Ortga</Button><Button variant="danger" loading={busy} onClick={revoke}>Bekor qilish</Button></>}
      />
    </div>
  );
}
