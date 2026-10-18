import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ClipboardList, Clock, LogOut, Users } from 'lucide-react';
import PageHeader from '../../components/PageHeader.jsx';
import Button from '../../components/ui/Button.jsx';
import Badge from '../../components/ui/Badge.jsx';
import Card from '../../components/ui/Card.jsx';
import { EmptyState, ErrorState, Skeleton } from '../../components/ui/Feedback.jsx';
import { useApi, useDocumentTitle } from '../../hooks/useApi.js';
import { useToast } from '../../context/ToastContext.jsx';
import { api } from '../../lib/api.js';
import { formatDate } from '../../lib/format.js';

export function AssignmentStatus({ a }) {
  if (a.submission?.status === 'graded') return <Badge tone="success" icon={CheckCircle2}>Baholandi: {a.submission.score}/{a.maxScore}</Badge>;
  if (a.submission) return <Badge tone="signal">Topshirildi</Badge>;
  if (new Date(a.dueAt) < new Date()) return <Badge tone="danger">Muddat o‘tgan</Badge>;
  return <Badge tone="warning">Kutilmoqda</Badge>;
}

export default function Groups() {
  useDocumentTitle('Guruhlar va topshiriqlar');
  const toast = useToast();
  const groups = useApi('/groups');
  const assignments = useApi('/assignments/mine');
  const [code, setCode] = useState('');
  const [joining, setJoining] = useState(false);

  const join = async (e) => {
    e.preventDefault();
    if (code.trim().length < 4) {
      toast.error('Guruh kodini kiriting');
      return;
    }
    setJoining(true);
    try {
      const d = await api.post('/groups/join', { code: code.trim() });
      toast.success(`“${d.group.name}” guruhiga qo‘shildingiz`);
      setCode('');
      groups.reload();
      assignments.reload();
    } catch (err) {
      toast.error(err);
    } finally {
      setJoining(false);
    }
  };

  const leave = async (g) => {
    try {
      await api.post(`/groups/${g._id}/leave`);
      toast.success('Guruhdan chiqdingiz');
      groups.reload();
      assignments.reload();
    } catch (err) {
      toast.error(err);
    }
  };

  const list = assignments.data?.assignments || [];
  return (
    <div>
      <PageHeader title="Guruhlar va topshiriqlar" description="O‘qituvchingiz bergan kod orqali guruhga qo‘shiling. Topshiriqlar va baholar shu yerda." />
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <section aria-labelledby="as-title">
          <h2 id="as-title" className="section-title mb-3">Topshiriqlar</h2>
          {assignments.error ? <ErrorState error={assignments.error} onRetry={assignments.reload} /> : assignments.loading ? <Skeleton className="h-32" /> : !list.length ? (
            <EmptyState icon={ClipboardList} title="Topshiriqlar yo‘q" description="Guruhga qo‘shilganingizdan keyin o‘qituvchi bergan topshiriqlar shu yerda paydo bo‘ladi." />
          ) : (
            <ul className="space-y-2">
              {list.map((a) => (
                <li key={a._id}>
                  <Link to={`/app/assignments/${a._id}`} className="panel flex flex-col gap-2 p-4 transition-colors hover:border-primary/50 sm:flex-row sm:items-center">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-ink">{a.title}</p>
                      <p className="flex items-center gap-1.5 text-sm text-muted"><Clock className="h-3.5 w-3.5" aria-hidden />{formatDate(a.dueAt, true)} · {a.groupName}</p>
                    </div>
                    <AssignmentStatus a={a} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
        <aside className="space-y-6">
          <Card title="Guruhga qo‘shilish">
            <form onSubmit={join} className="flex gap-2">
              <label htmlFor="join-code" className="sr-only">Guruh kodi</label>
              <input id="join-code" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} maxLength={12} placeholder="Masalan, DEMO10A" className="field font-medium tracking-wider" />
              <Button type="submit" loading={joining}>Qo‘shilish</Button>
            </form>
          </Card>
          <Card title="Mening guruhlarim">
            {groups.loading ? <Skeleton className="h-16" /> : !groups.data?.groups.length ? (
              <p className="flex items-center gap-2 text-sm text-muted"><Users className="h-4 w-4" aria-hidden />Hali guruhga qo‘shilmagansiz.</p>
            ) : (
              <ul className="divide-y divide-line">
                {groups.data.groups.map((g) => (
                  <li key={g._id} className="flex items-center gap-3 py-2.5">
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-ink">{g.name}</p>
                      <p className="text-xs text-muted">O‘qituvchi: {g.teacher?.name}</p>
                    </div>
                    <button onClick={() => leave(g)} className="rounded-control p-2 text-muted hover:bg-sunken hover:text-danger" aria-label={`${g.name} guruhidan chiqish`}><LogOut className="h-4 w-4" /></button>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </aside>
      </div>
    </div>
  );
}
