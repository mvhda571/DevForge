import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarClock, Flame, ShieldCheck, Sparkles } from 'lucide-react';
import PageHeader from '../../components/PageHeader.jsx';
import Card from '../../components/ui/Card.jsx';
import Badge from '../../components/ui/Badge.jsx';
import StudentOverview from '../../components/StudentOverview.jsx';
import { ErrorState, PageSkeleton } from '../../components/ui/Feedback.jsx';
import { useApi, useDocumentTitle } from '../../hooks/useApi.js';
import { formatDate } from '../../lib/format.js';

export default function ParentStudent() {
  const { id } = useParams();
  const { data, loading, error, reload } = useApi(`/parents/students/${id}/overview`);
  useDocumentTitle(data?.student?.name || 'O‘quvchi natijalari');

  if (loading) return <PageSkeleton />;
  if (error) return <ErrorState error={error} onRetry={reload} />;
  const { student, overview, upcoming, privacy } = data;

  return (
    <div>
      <Link to="/parent" className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink"><ArrowLeft className="h-4 w-4" aria-hidden />Ota-ona paneli</Link>
      <PageHeader title={student.name} description="O‘quv natijalari va haftalik hisobot">
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge tone="primary" icon={Sparkles}>{student.xp} XP</Badge>
          <Badge tone="warning" icon={Flame}>{student.streak} kunlik ketma-ketlik</Badge>
        </div>
      </PageHeader>

      <div className="space-y-6">
        <StudentOverview overview={overview} />
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <Card title="Yaqinlashayotgan muddatlar">
            {!upcoming.length ? (
              <p className="flex items-center gap-2 text-sm text-muted"><CalendarClock className="h-4 w-4" aria-hidden />Yaqin muddatlar yo‘q.</p>
            ) : (
              <ul className="divide-y divide-line">
                {upcoming.map((u, i) => (
                  <li key={i} className="flex items-center justify-between gap-3 py-2.5">
                    <div className="min-w-0">
                      <p className="truncate text-sm text-ink">{u.title}</p>
                      <p className="text-xs text-muted">{u.kind === 'assignment' ? 'Guruh topshirig‘i' : 'Ariza muddati'} · {formatDate(u.dueAt, true)}</p>
                    </div>
                    {u.kind === 'assignment' && (u.submitted ? <Badge tone="success">Topshirilgan</Badge> : <Badge tone="warning">Topshirilmagan</Badge>)}
                  </li>
                ))}
              </ul>
            )}
          </Card>
          <div className="h-fit rounded-panel border border-line bg-sunken/60 p-4 text-sm text-muted">
            <p className="flex items-center gap-2 font-medium text-ink"><ShieldCheck className="h-4 w-4 text-success" aria-hidden />Maxfiylik</p>
            <p className="mt-1.5">{privacy}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
