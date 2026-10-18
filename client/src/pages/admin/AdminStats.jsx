import { Activity, BookOpen, Bot, Briefcase, ClipboardList, GraduationCap, Landmark, ListChecks, UserPlus, Users } from 'lucide-react';
import Card from '../../components/ui/Card.jsx';
import StatTile from '../../components/StatTile.jsx';
import { ErrorState, ProgressBar, Skeleton } from '../../components/ui/Feedback.jsx';
import { useApi } from '../../hooks/useApi.js';

const ROLE_LABELS = { student: 'O‘quvchilar', teacher: 'O‘qituvchilar', parent: 'Ota-onalar', admin: 'Administratorlar' };

export default function AdminStats() {
  const { data, loading, error, reload } = useApi('/admin/stats');
  if (error) return <ErrorState error={error} onRetry={reload} />;
  if (loading) return <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-20" />)}</div>;
  const { users, content, activity } = data;

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile icon={Users} label="Jami foydalanuvchilar" value={users.total} />
        <StatTile icon={UserPlus} tone="success" label="Oxirgi 7 kunda" value={users.newLast7Days} hint="Yangi ro‘yxatdan o‘tganlar" />
        <StatTile icon={ListChecks} tone="signal" label="Test urinishlari" value={activity.quizAttempts} />
        <StatTile icon={Activity} tone="warning" label="Tugallangan darslar" value={activity.lessonCompletions} />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card title="Rollar bo‘yicha">
          <ul className="space-y-3">
            {Object.entries(ROLE_LABELS).map(([k, label]) => {
              const n = users.byRole[k] || 0;
              return (
                <li key={k}>
                  <div className="mb-1 flex justify-between text-sm"><span className="text-ink">{label}</span><span className="text-muted">{n}</span></div>
                  <ProgressBar value={users.total ? (n / users.total) * 100 : 0} size="sm" label={`${label}: ${n}`} />
                </li>
              );
            })}
          </ul>
        </Card>
        <Card title="Kontent">
          <dl className="space-y-2.5 text-sm">
            {[
              [BookOpen, 'Darslar', content.lessons],
              [ListChecks, 'Testlar', content.quizzes],
              [Briefcase, 'Kasblar', content.careers],
              [Landmark, 'Universitetlar', content.universities]
            ].map(([Icon, label, v]) => (
              <div key={label} className="flex items-center justify-between"><dt className="flex items-center gap-2 text-muted"><Icon className="h-4 w-4" aria-hidden />{label}</dt><dd className="font-medium text-ink">{v}</dd></div>
            ))}
          </dl>
        </Card>
        <Card title="Faollik">
          <dl className="space-y-2.5 text-sm">
            {[
              [GraduationCap, 'Kasb testlari', activity.assessments],
              [ClipboardList, 'O‘quv guruhlari', activity.groups],
              [Bot, 'AI suhbatlari', activity.aiConversations]
            ].map(([Icon, label, v]) => (
              <div key={label} className="flex items-center justify-between"><dt className="flex items-center gap-2 text-muted"><Icon className="h-4 w-4" aria-hidden />{label}</dt><dd className="font-medium text-ink">{v}</dd></div>
            ))}
          </dl>
          <p className="mt-4 text-xs text-muted">AI suhbatlari mazmuni administratorlarga ko‘rsatilmaydi — faqat soni.</p>
        </Card>
      </div>
    </div>
  );
}
