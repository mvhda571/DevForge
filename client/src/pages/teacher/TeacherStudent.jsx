import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ClipboardList } from 'lucide-react';
import PageHeader from '../../components/PageHeader.jsx';
import Card from '../../components/ui/Card.jsx';
import Badge from '../../components/ui/Badge.jsx';
import StudentOverview from '../../components/StudentOverview.jsx';
import { ErrorState, PageSkeleton } from '../../components/ui/Feedback.jsx';
import { useApi, useDocumentTitle } from '../../hooks/useApi.js';
import { formatDate } from '../../lib/format.js';

function SubmissionBadge({ a }) {
  if (a.submission?.status === 'graded') return <Badge tone="success">{a.submission.score}/{a.maxScore}</Badge>;
  if (a.submission) return <Badge tone="signal">Baholash kutilmoqda</Badge>;
  if (new Date(a.dueAt) < new Date()) return <Badge tone="danger">Topshirilmagan</Badge>;
  return <Badge>Kutilmoqda</Badge>;
}

export default function TeacherStudent() {
  const { id, studentId } = useParams();
  const { data, loading, error, reload } = useApi(`/groups/${id}/students/${studentId}`);
  useDocumentTitle(data?.student?.name || 'O‘quvchi');

  if (loading) return <PageSkeleton />;
  if (error) return <ErrorState error={error} onRetry={reload} />;

  return (
    <div>
      <Link to={`/teacher/groups/${id}`} className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink"><ArrowLeft className="h-4 w-4" aria-hidden />Guruhga qaytish</Link>
      <PageHeader title={data.student.name} description={`${data.student.email} · AI suhbatlari va shaxsiy eslatmalar o‘qituvchiga ko‘rsatilmaydi.`} />
      <div className="space-y-6">
        <StudentOverview overview={data.overview} />
        <Card title="Guruh topshiriqlari">
          {!data.assignments.length ? (
            <p className="flex items-center gap-2 text-sm text-muted"><ClipboardList className="h-4 w-4" aria-hidden />Bu guruhda hali topshiriq yo‘q.</p>
          ) : (
            <ul className="divide-y divide-line">
              {data.assignments.map((a) => (
                <li key={a.id} className="flex flex-col gap-1 py-2.5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <Link to={`/teacher/assignments/${a.id}`} className="font-medium text-ink hover:text-primary-ink">{a.title}</Link>
                    <p className="text-xs text-muted">Muddat: {formatDate(a.dueAt, true)}{a.submission ? ` · topshirilgan: ${formatDate(a.submission.submittedAt, true)}` : ''}</p>
                  </div>
                  <SubmissionBadge a={a} />
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
