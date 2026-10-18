import { BookOpenCheck, CheckCircle2, Clock, ListChecks, Route, XCircle } from 'lucide-react';
import Card from './ui/Card.jsx';
import Badge from './ui/Badge.jsx';
import StatTile from './StatTile.jsx';
import ActivityChart from './charts/ActivityChart.jsx';
import { EmptyState, ProgressBar } from './ui/Feedback.jsx';
import { formatDate, minutesLabel, shortDay } from '../lib/format.js';

export default function StudentOverview({ overview }) {
  const { roadmap, weeklyReport: week, quizSummary, completedLessons, quizzes, subjects } = overview;
  const hasActivity = completedLessons.length > 0 || quizzes.length > 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile icon={Route} label="Yo‘l xaritasi" value={roadmap ? `${roadmap.stats.percent}%` : '—'} hint={roadmap ? roadmap.title : 'Faol yo‘l xaritasi yo‘q'} />
        <StatTile icon={BookOpenCheck} tone="success" label="Tugallangan darslar" value={completedLessons.length} hint="Test orqali tasdiqlangan" />
        <StatTile icon={ListChecks} tone="signal" label="Test o‘rtachasi" value={quizSummary.averagePercent !== null ? `${quizSummary.averagePercent}%` : '—'} hint={`${quizSummary.attempts} urinish, ${quizSummary.passed} tasi o‘tgan`} />
        <StatTile icon={Clock} tone="warning" label="Shu hafta" value={minutesLabel(week.minutes)} hint={`${week.lessonsCompleted} dars · ${week.quizzes} test`} />
      </div>

      {!hasActivity ? (
        <EmptyState icon={BookOpenCheck} title="Hali o‘quv faoliyati yo‘q" description="O‘quvchi darslarni tugatib, test topshirgach natijalar shu yerda ko‘rinadi." />
      ) : (
        <>
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <Card title="Haftalik hisobot" description={`${shortDay(week.weekStart)} dan beri, daqiqalarda`}>
              <ActivityChart data={week.days} label="Oxirgi 7 kundagi o‘qish vaqti, daqiqalarda" />
            </Card>
            <Card title="Fanlar bo‘yicha">
              {!subjects.length ? <p className="text-sm text-muted">Hali birorta fan bo‘yicha dars tugallanmagan.</p> : (
                <ul className="space-y-3">
                  {subjects.map((s) => (
                    <li key={s.name}>
                      <div className="mb-1 flex justify-between text-sm"><span className="text-ink">{s.name}</span><span className="text-muted">{s.completed}/{s.total}</span></div>
                      <ProgressBar value={(s.completed / Math.max(1, s.total)) * 100} size="sm" label={`${s.name}: ${s.completed} / ${s.total}`} />
                    </li>
                  ))}
                </ul>
              )}
              {roadmap && (
                <div className="mt-5 border-t border-line pt-4">
                  <p className="text-sm font-medium text-ink">{roadmap.title}</p>
                  <p className="text-xs text-muted">{roadmap.stats.completed}/{roadmap.stats.total} majburiy dars · haftalik maqsad {roadmap.weekly.completed}/{roadmap.weekly.target}</p>
                  <ProgressBar value={roadmap.stats.percent} className="mt-2" />
                </div>
              )}
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card title="Tugallangan darslar">
              <ul className="max-h-80 divide-y divide-line overflow-y-auto text-sm">
                {completedLessons.map((l) => (
                  <li key={l.id} className="flex items-center justify-between gap-3 py-2">
                    <div className="min-w-0">
                      <p className="truncate text-ink">{l.title}</p>
                      <p className="text-xs text-muted">{l.subject} · {formatDate(l.completedAt)}</p>
                    </div>
                    {l.bestPercent !== null && l.bestPercent !== undefined && <Badge tone="success">{l.bestPercent}%</Badge>}
                  </li>
                ))}
                {!completedLessons.length && <li className="py-2 text-muted">Hali yo‘q.</li>}
              </ul>
            </Card>
            <Card title="So‘nggi testlar">
              <ul className="max-h-80 divide-y divide-line overflow-y-auto text-sm">
                {quizzes.map((q, i) => (
                  <li key={i} className="flex items-center justify-between gap-3 py-2">
                    <div className="min-w-0">
                      <p className="truncate text-ink">{q.lesson}</p>
                      <p className="text-xs text-muted">{formatDate(q.createdAt, true)}</p>
                    </div>
                    <span className="flex items-center gap-1.5 text-sm">
                      {q.passed ? <CheckCircle2 className="h-4 w-4 text-success" aria-hidden /> : <XCircle className="h-4 w-4 text-danger" aria-hidden />}
                      <span className="font-medium text-ink">{q.percent}%</span>
                      <span className="sr-only">{q.passed ? 'o‘tdi' : 'o‘tmadi'}</span>
                    </span>
                  </li>
                ))}
                {!quizzes.length && <li className="py-2 text-muted">Hali test topshirilmagan.</li>}
              </ul>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
