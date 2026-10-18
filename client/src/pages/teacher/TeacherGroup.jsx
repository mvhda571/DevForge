import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Archive, ArrowLeft, BarChart3, ClipboardList, Copy, Pencil, Plus, RefreshCw, UserMinus, Users } from 'lucide-react';
import PageHeader from '../../components/PageHeader.jsx';
import Button from '../../components/ui/Button.jsx';
import Badge from '../../components/ui/Badge.jsx';
import Card from '../../components/ui/Card.jsx';
import Dialog from '../../components/ui/Dialog.jsx';
import Tabs from '../../components/ui/Tabs.jsx';
import StatTile from '../../components/StatTile.jsx';
import { Input, Select, Textarea } from '../../components/ui/Field.jsx';
import { EmptyState, ErrorState, PageSkeleton, ProgressBar, Skeleton } from '../../components/ui/Feedback.jsx';
import { useApi, useDocumentTitle } from '../../hooks/useApi.js';
import { useToast } from '../../context/ToastContext.jsx';
import { api } from '../../lib/api.js';
import { formatDate, shortDay, toLocalInput } from '../../lib/format.js';
import { copyText } from './TeacherDashboard.jsx';

export function AssignmentForm({ id, initial, onSubmit, withLesson = true }) {
  const lessons = useApi(withLesson ? '/lessons' : null);
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (form.title.trim().length < 2) errs.title = 'Sarlavha kamida 2 belgi';
    if (!form.dueAt) errs.dueAt = 'Muddatni tanlang';
    const max = Number(form.maxScore);
    if (!Number.isInteger(max) || max < 1 || max > 1000) errs.maxScore = '1 dan 1000 gacha butun son';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    onSubmit({ title: form.title.trim(), description: form.description.trim(), dueAt: new Date(form.dueAt).toISOString(), maxScore: max, lessonId: form.lessonId || null });
  };

  return (
    <form id={id} onSubmit={submit} className="space-y-4">
      <Input label="Sarlavha" value={form.title} onChange={set('title')} error={errors.title} maxLength={150} />
      <Textarea label="Topshiriq matni" optional rows={4} value={form.description} onChange={set('description')} maxLength={3000} />
      {withLesson && (
        <Select label="Bog‘liq dars" optional placeholder="Tanlanmagan" value={form.lessonId} onChange={set('lessonId')} options={(lessons.data?.lessons || []).map((l) => ({ value: l._id, label: `${l.subject?.name} — ${l.title}` }))} />
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Muddat" type="datetime-local" value={form.dueAt} onChange={set('dueAt')} error={errors.dueAt} />
        <Input label="Maksimal ball" type="number" min={1} max={1000} value={form.maxScore} onChange={set('maxScore')} error={errors.maxScore} />
      </div>
    </form>
  );
}

function Members({ group, members, onRemove }) {
  if (!members.length) {
    return (
      <EmptyState
        icon={Users}
        title="Guruhda hali o‘quvchi yo‘q"
        description={`O‘quvchilarga ${group.joinCode} kodini yuboring. Ular “Guruhlar” bo‘limida shu kodni kiritib qo‘shiladi.`}
      />
    );
  }
  return (
    <div className="panel overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="border-b border-line text-xs text-muted">
          <tr>
            <th className="px-4 py-3 font-medium" scope="col">O‘quvchi</th>
            <th className="px-4 py-3 font-medium" scope="col">Darslar</th>
            <th className="px-4 py-3 font-medium" scope="col">Test o‘rtachasi</th>
            <th className="px-4 py-3 font-medium" scope="col">Kasb tavsiyasi</th>
            <th className="px-4 py-3 font-medium" scope="col">Oxirgi faollik</th>
            <th className="px-4 py-3" scope="col"><span className="sr-only">Amallar</span></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {members.map((m) => (
            <tr key={m.id}>
              <td className="px-4 py-3">
                <Link to={`/teacher/groups/${group._id}/students/${m.id}`} className="font-medium text-ink hover:text-primary-ink">{m.name}</Link>
                <p className="text-xs text-muted">{m.email}</p>
              </td>
              <td className="px-4 py-3 text-ink">{m.completedLessons}</td>
              <td className="px-4 py-3 text-ink">{m.averageScore !== null ? `${m.averageScore}%` : '—'} <span className="text-xs text-muted">({m.quizAttempts})</span></td>
              <td className="px-4 py-3 text-ink">{m.topCareer ? `${m.topCareer.name} · ${m.topCareer.score}%` : <span className="text-muted">Test topshirilmagan</span>}</td>
              <td className="px-4 py-3 text-muted">{m.lastActiveDay ? shortDay(m.lastActiveDay) : '—'}</td>
              <td className="px-4 py-3 text-right">
                <button onClick={() => onRemove(m)} className="rounded-control p-2 text-muted hover:bg-sunken hover:text-danger" aria-label={`${m.name}ni guruhdan chiqarish`}><UserMinus className="h-4 w-4" /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Assignments({ groupId, onCreate }) {
  const { data, loading, error, reload } = useApi(`/assignments?groupId=${groupId}`);
  if (error) return <ErrorState error={error} onRetry={reload} />;
  if (loading) return <Skeleton className="h-32" />;
  const list = data.assignments;
  if (!list.length) return <EmptyState icon={ClipboardList} title="Topshiriqlar yo‘q" description="Guruhga birinchi topshiriqni bering. O‘quvchilar bildirishnoma oladi." action={<Button icon={Plus} onClick={onCreate}>Topshiriq berish</Button>} />;
  return (
    <ul className="space-y-2">
      {list.map((a) => {
        const overdue = new Date(a.dueAt) < new Date();
        return (
          <li key={a._id}>
            <Link to={`/teacher/assignments/${a._id}`} className="panel flex flex-col gap-2 p-4 transition-colors hover:border-primary/50 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1">
                <p className="font-medium text-ink">{a.title}</p>
                <p className="text-sm text-muted">Muddat: {formatDate(a.dueAt, true)}{a.lesson ? ` · ${a.lesson.title}` : ''}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge tone="signal">{a.submittedCount} javob</Badge>
                <Badge tone={a.gradedCount === a.submittedCount && a.submittedCount ? 'success' : 'neutral'}>{a.gradedCount} baholangan</Badge>
                {overdue && <Badge tone="outline">Muddat o‘tgan</Badge>}
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function Analytics({ groupId, members }) {
  const { data, loading, error, reload } = useApi(`/groups/${groupId}/analytics`);
  if (error) return <ErrorState error={error} onRetry={reload} />;
  if (loading) return <Skeleton className="h-48" />;
  const ranked = [...members].sort((a, b) => b.completedLessons - a.completedLessons);
  const maxLessons = Math.max(1, ...ranked.map((m) => m.completedLessons));
  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <StatTile icon={Users} label="O‘quvchilar" value={data.members} />
        <StatTile icon={ClipboardList} tone="success" label="O‘rtacha tugallangan dars" value={data.averageCompletedLessons} />
        <StatTile icon={BarChart3} tone="signal" label="O‘rtacha test natijasi" value={data.averageQuizScore !== null ? `${data.averageQuizScore}%` : '—'} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Topshiriqlar bo‘yicha" description="O‘rtacha ball faqat baholangan javoblardan hisoblanadi">
          {!data.assignments.length ? <p className="text-sm text-muted">Topshiriqlar yo‘q.</p> : (
            <ul className="space-y-4">
              {data.assignments.map((a) => (
                <li key={a.id}>
                  <div className="mb-1 flex justify-between gap-2 text-sm">
                    <span className="truncate text-ink">{a.title}</span>
                    <span className="shrink-0 text-muted">{a.averageScore !== null ? `${a.averageScore}%` : 'baholanmagan'}</span>
                  </div>
                  <ProgressBar value={a.averageScore ?? 0} tone="success" size="sm" label={`${a.title}: o‘rtacha ${a.averageScore ?? 0}%`} />
                  <p className="mt-1 text-xs text-muted">{a.submitted}/{data.members} topshirgan · {a.graded} baholangan</p>
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card title="O‘quvchilar faolligi" description="Test orqali tugallangan darslar soni">
          {!ranked.length ? <p className="text-sm text-muted">O‘quvchilar yo‘q.</p> : (
            <ul className="space-y-3">
              {ranked.map((m) => (
                <li key={m.id}>
                  <div className="mb-1 flex justify-between text-sm"><span className="truncate text-ink">{m.name}</span><span className="text-muted">{m.completedLessons}</span></div>
                  <ProgressBar value={(m.completedLessons / maxLessons) * 100} size="sm" label={`${m.name}: ${m.completedLessons} dars`} />
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}

export default function TeacherGroup() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { data, loading, error, reload, setData } = useApi(`/groups/${id}`);
  const [tab, setTab] = useState('members');
  const [dialog, setDialog] = useState(null);
  const [busy, setBusy] = useState(false);
  const [assignKey, setAssignKey] = useState(0);
  const [edit, setEdit] = useState({ name: '', description: '' });
  useDocumentTitle(data?.group?.name || 'Guruh');

  if (loading) return <PageSkeleton />;
  if (error) return <ErrorState error={error} onRetry={reload} />;
  const g = data.group;
  const members = data.members || [];

  const run = async (fn, success) => {
    setBusy(true);
    try {
      await fn();
      if (success) toast.success(success);
      return true;
    } catch (err) {
      toast.error(err);
      return false;
    } finally {
      setBusy(false);
    }
  };

  const regenerate = () => run(async () => {
    const d = await api.post(`/groups/${g._id}/code`);
    setData((prev) => ({ ...prev, group: { ...prev.group, joinCode: d.joinCode } }));
  }, 'Yangi kod yaratildi. Eski kod endi ishlamaydi.');

  const removeMember = async () => {
    const m = dialog.member;
    if (await run(() => api.delete(`/groups/${g._id}/members/${m.id}`), `${m.name} guruhdan chiqarildi`)) {
      setDialog(null);
      reload();
    }
  };

  const archive = async () => {
    if (await run(() => api.delete(`/groups/${g._id}`), 'Guruh arxivlandi')) navigate('/teacher');
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    if (edit.name.trim().length < 2) return toast.error('Guruh nomi kamida 2 belgi');
    if (await run(async () => {
      const d = await api.patch(`/groups/${g._id}`, { name: edit.name.trim(), description: edit.description.trim() });
      setData((prev) => ({ ...prev, group: { ...prev.group, name: d.group.name, description: d.group.description } }));
    }, 'Saqlandi')) setDialog(null);
  };

  const createAssignment = async (body) => {
    if (await run(() => api.post('/assignments', { ...body, groupId: g._id }), 'Topshiriq yaratildi, o‘quvchilarga bildirishnoma yuborildi')) {
      setDialog(null);
      setTab('assignments');
      setAssignKey((k) => k + 1);
    }
  };

  const defaultDue = toLocalInput(new Date(Date.now() + 7 * 86400000));

  return (
    <div>
      <Link to="/teacher" className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink"><ArrowLeft className="h-4 w-4" aria-hidden />Guruhlar</Link>
      <PageHeader
        title={g.name}
        description={g.description || (g.career ? `Yo‘nalish: ${g.career.name}` : undefined)}
        actions={
          <>
            <Button icon={Plus} onClick={() => setDialog({ type: 'assignment' })}>Topshiriq berish</Button>
            <Button variant="secondary" icon={Pencil} onClick={() => { setEdit({ name: g.name, description: g.description || '' }); setDialog({ type: 'edit' }); }}>Tahrirlash</Button>
            <Button variant="ghost" icon={Archive} onClick={() => setDialog({ type: 'archive' })}>Arxivlash</Button>
          </>
        }
      />

      <div className="panel mb-6 flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <div className="flex-1">
          <p className="text-xs text-muted">Qo‘shilish kodi</p>
          <p className="font-mono text-2xl font-semibold tracking-[0.2em] text-ink">{g.joinCode}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" icon={Copy} onClick={() => copyText(g.joinCode, toast, 'Kod nusxalandi')}>Nusxalash</Button>
          <Button variant="ghost" size="sm" icon={RefreshCw} loading={busy && !dialog} onClick={regenerate}>Yangi kod</Button>
        </div>
      </div>

      <Tabs
        className="mb-5 w-fit max-w-full"
        value={tab}
        onChange={setTab}
        tabs={[
          { value: 'members', label: 'O‘quvchilar', icon: Users, count: members.length },
          { value: 'assignments', label: 'Topshiriqlar', icon: ClipboardList },
          { value: 'analytics', label: 'Tahlil', icon: BarChart3 }
        ]}
      />

      {tab === 'members' && <Members group={g} members={members} onRemove={(m) => setDialog({ type: 'remove', member: m })} />}
      {tab === 'assignments' && <Assignments key={assignKey} groupId={g._id} onCreate={() => setDialog({ type: 'assignment' })} />}
      {tab === 'analytics' && <Analytics groupId={g._id} members={members} />}

      <Dialog
        open={dialog?.type === 'assignment'}
        onClose={() => setDialog(null)}
        title="Yangi topshiriq"
        size="lg"
        footer={<><Button variant="secondary" onClick={() => setDialog(null)}>Bekor qilish</Button><Button type="submit" form="assignment-form" loading={busy}>Yaratish</Button></>}
      >
        <AssignmentForm id="assignment-form" initial={{ title: '', description: '', lessonId: '', dueAt: defaultDue, maxScore: 100 }} onSubmit={createAssignment} />
      </Dialog>

      <Dialog
        open={dialog?.type === 'edit'}
        onClose={() => setDialog(null)}
        title="Guruhni tahrirlash"
        footer={<><Button variant="secondary" onClick={() => setDialog(null)}>Bekor qilish</Button><Button type="submit" form="edit-group" loading={busy}>Saqlash</Button></>}
      >
        <form id="edit-group" onSubmit={saveEdit} className="space-y-4">
          <Input label="Nomi" value={edit.name} onChange={(e) => setEdit({ ...edit, name: e.target.value })} maxLength={100} />
          <Textarea label="Tavsif" optional rows={3} value={edit.description} onChange={(e) => setEdit({ ...edit, description: e.target.value })} maxLength={500} />
        </form>
      </Dialog>

      <Dialog
        open={dialog?.type === 'remove'}
        onClose={() => setDialog(null)}
        title="O‘quvchini chiqarish"
        size="sm"
        description={dialog?.member ? `${dialog.member.name} guruhdan chiqariladi. Uning o‘quv natijalari o‘chmaydi, lekin siz endi ularni ko‘ra olmaysiz.` : ''}
        footer={<><Button variant="secondary" onClick={() => setDialog(null)}>Bekor qilish</Button><Button variant="danger" loading={busy} onClick={removeMember}>Chiqarish</Button></>}
      />

      <Dialog
        open={dialog?.type === 'archive'}
        onClose={() => setDialog(null)}
        title="Guruhni arxivlash"
        size="sm"
        description="Arxivlangan guruh ro‘yxatdan yo‘qoladi va kod orqali qo‘shilib bo‘lmaydi."
        footer={<><Button variant="secondary" onClick={() => setDialog(null)}>Bekor qilish</Button><Button variant="danger" loading={busy} onClick={archive}>Arxivlash</Button></>}
      />
    </div>
  );
}
