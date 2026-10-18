import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Award, BookOpen, CalendarClock, Check, Clock, Compass, Flame, Landmark, Play, RotateCcw, Route, Sparkles, Target, Trophy, UserRound } from 'lucide-react';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import Icon from '../../components/ui/Icon.jsx';
import StatTile from '../../components/StatTile.jsx';
import { ErrorState, PageSkeleton, ProgressBar, Skeleton } from '../../components/ui/Feedback.jsx';
import { useApi, useDocumentTitle } from '../../hooks/useApi.js';
import { cx, formatDate, minutesLabel, relativeTime } from '../../lib/format.js';

const ActivityChart = lazy(() => import('../../components/charts/ActivityChart.jsx'));
const SubjectChart = lazy(() => import('../../components/charts/SubjectChart.jsx'));

function greeting() {
  const h = new Date().getHours();
  if (h < 5) return 'Xayrli tun';
  if (h < 12) return 'Xayrli tong';
  if (h < 18) return 'Xayrli kun';
  return 'Xayrli kech';
}

function StartChecklist({ d }) {
  const steps = [
    { done: d.profileCompletion.percent >= 75, title: 'Profilni to‘ldiring', text: 'Qiziqishlar va maqsadingiz tavsiyalarni aniqroq qiladi.', to: '/app/settings', cta: 'Profilga o‘tish' },
    { done: d.profileCompletion.checks.find((c) => c.key === 'assessment')?.done, title: 'Kasb testini topshiring', text: '14 ta savol — sizga mos 3 ta kasb.', to: '/app/assessment', cta: 'Testni boshlash' },
    { done: Boolean(d.roadmap), title: 'Yo‘l xaritasini yarating', text: 'Tanlagan kasbingiz uchun bosqichma-bosqich reja.', to: '/app/results', cta: 'Natijalarni ko‘rish' },
    { done: d.totals.completedLessons > 0, title: 'Birinchi darsni tugating', text: 'Mini testdan o‘tganingizda dars tugallanadi.', to: d.roadmap?.nextLesson ? `/app/lessons/${d.roadmap.nextLesson.slug}` : '/app/lessons', cta: 'Darsga o‘tish' }
  ];
  const nextIdx = steps.findIndex((s) => !s.done);
  return (
    <section className="panel p-5 sm:p-6" aria-labelledby="start-title">
      <h2 id="start-title" className="section-title">Boshlash uchun 4 qadam</h2>
      <p className="mt-1 text-sm text-muted">Bajarilgan qadamlar avtomatik belgilanadi. Grafiklar birinchi darsdan keyin paydo bo‘ladi.</p>
      <ol className="mt-5 grid gap-3 md:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.title} className={cx('flex flex-col rounded-control border p-4', s.done ? 'border-success/40 bg-success-soft/40' : i === nextIdx ? 'border-primary bg-primary-soft/40' : 'border-line')}>
            <span className={cx('grid h-7 w-7 place-items-center rounded-full text-xs font-semibold', s.done ? 'bg-success text-white' : i === nextIdx ? 'bg-primary text-white' : 'bg-sunken text-muted')}>
              {s.done ? <Check className="h-4 w-4" strokeWidth={3} /> : i + 1}
            </span>
            <p className="mt-3 font-medium text-ink">{s.title}</p>
            <p className="mt-1 flex-1 text-[13px] text-muted">{s.text}</p>
            {!s.done && i === nextIdx && <Button to={s.to} size="sm" className="mt-3 self-start">{s.cta}</Button>}
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function Dashboard() {
  useDocumentTitle('Boshqaruv paneli');
  const { data: d, loading, error, reload } = useApi('/progress/dashboard');
  if (loading) return <PageSkeleton />;
  if (error) return <ErrorState error={error} onRetry={reload} />;

  const rm = d.roadmap;
  const weeklyPct = rm ? Math.min(100, (rm.weekly.completed / rm.weekly.target) * 100) : 0;
  const isNew = !d.hasActivity;

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="page-title">{greeting()}, {d.user.name.split(' ')[0]}</h1>
          <p className="mt-1 text-muted">{rm ? `Faol yo‘l xaritangiz: ${rm.title}` : 'Kasb tanlash va o‘qishni shu yerdan boshlang.'}</p>
        </div>
        {rm?.nextLesson && <Button to={`/app/lessons/${rm.nextLesson.slug}`} icon={Play}>O‘qishni davom ettirish</Button>}
      </header>

      {isNew && <StartChecklist d={d} />}

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile icon={Flame} label="O‘qish izchilligi" value={`${d.user.streak?.current || 0} kun`} hint={`Eng uzun: ${d.user.streak?.best || 0} kun`} tone="warning" />
        <StatTile icon={Clock} label="Jami o‘qish vaqti" value={minutesLabel(d.totals.studyMinutes)} hint="Dars sahifasida faol vaqt" tone="signal" />
        <StatTile icon={BookOpen} label="Tugallangan darslar" value={d.totals.completedLessons} hint={`${d.totals.quizAttempts} ta test urinishi`} tone="success" />
        <StatTile icon={Trophy} label={`${d.level.level}-daraja`} value={`${d.level.xp} XP`} hint={`Keyingi darajagacha ${d.level.nextLevelXp - d.level.xp} XP`} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {rm ? (
            <Card title="Yo‘l xaritasi" description={rm.title} action={<Button to={`/app/roadmaps/${rm.id}`} variant="ghost" size="sm">Ochish</Button>}>
              <div className="flex items-center gap-4">
                <ProgressBar value={rm.stats.percent} />
                <span className="font-display text-lg font-semibold tabular-nums text-ink">{rm.stats.percent}%</span>
              </div>
              <p className="mt-2 text-sm text-muted">{rm.stats.completed} / {rm.stats.total} dars · qolgan ≈ {minutesLabel(rm.stats.remainingMinutes)}</p>
              <div className="mt-5">
                <h3 className="text-sm font-semibold text-ink">Bugungi reja</h3>
                {d.todayPlan.length ? (
                  <ul className="mt-2 divide-y divide-line rounded-control border border-line">
                    {d.todayPlan.map((l) => (
                      <li key={l.id}>
                        <Link to={`/app/lessons/${l.slug}`} className="flex items-center gap-3 px-3.5 py-3 hover:bg-sunken">
                          {l.kind === 'revision' ? <RotateCcw className="h-4 w-4 shrink-0 text-warning" aria-hidden /> : <Play className="h-4 w-4 shrink-0 text-primary" aria-hidden />}
                          <span className="min-w-0 flex-1 truncate text-sm text-ink">{l.title}</span>
                          <span className="shrink-0 text-xs text-muted">{l.kind === 'revision' ? 'Takrorlash' : `${l.durationMinutes} daq`}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm text-muted">Barcha darslar tugallangan.</p>
                )}
              </div>
            </Card>
          ) : (
            <Card title="Yo‘l xaritasi">
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <Route className="h-8 w-8 text-primary" aria-hidden />
                <p className="flex-1 text-sm text-muted">Faol yo‘l xaritangiz yo‘q. Kasb testini topshiring yoki kasblar katalogidan kasb tanlang.</p>
                <Button to="/app/assessment" size="sm" icon={Compass}>Kasbimni topish</Button>
              </div>
            </Card>
          )}

          <Card title="O‘qish faolligi" description="Oxirgi 14 kun, daqiqalarda">
            {isNew ? (
              <p className="rounded-control bg-sunken px-4 py-6 text-center text-sm text-muted">Birinchi darsni o‘qiganingizdan keyin faollik grafigi shu yerda ko‘rinadi.</p>
            ) : (
              <Suspense fallback={<Skeleton className="h-56" />}><ActivityChart data={d.charts.activity} /></Suspense>
            )}
          </Card>

          <Card title="Fanlar bo‘yicha natijalar" description="Har bir darsdagi eng yaxshi test natijasining o‘rtachasi">
            {d.charts.subjectPerformance.length ? (
              <Suspense fallback={<Skeleton className="h-40" />}><SubjectChart data={d.charts.subjectPerformance} /></Suspense>
            ) : (
              <p className="rounded-control bg-sunken px-4 py-6 text-center text-sm text-muted">Mini testlarni ishlaganingizda fanlar bo‘yicha natijalar shu yerda chiqadi.</p>
            )}
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card title="So‘nggi test natijalari">
              {d.recentQuizzes.length ? (
                <ul className="space-y-2.5">
                  {d.recentQuizzes.map((q) => (
                    <li key={q._id} className="flex items-center gap-3">
                      <span className={cx('grid h-9 w-11 shrink-0 place-items-center rounded-control text-xs font-semibold', q.passed ? 'bg-success-soft text-success' : 'bg-warning-soft text-warning')}>{q.percent}%</span>
                      <div className="min-w-0">
                        <Link to={`/app/lessons/${q.lesson?.slug}`} className="block truncate text-sm text-ink hover:text-primary-ink">{q.lesson?.title}</Link>
                        <p className="text-xs text-muted">{relativeTime(q.createdAt)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : <p className="text-sm text-muted">Hali test ishlanmagan.</p>}
            </Card>
            <Card title="Takrorlash kerak">
              {d.revision.length ? (
                <ul className="space-y-2">
                  {d.revision.map((r) => (
                    <li key={r.id}>
                      <Link to={`/app/lessons/${r.slug}`} className="flex items-center gap-2 text-sm text-ink hover:text-primary-ink">
                        <RotateCcw className="h-4 w-4 shrink-0 text-warning" aria-hidden />
                        <span className="flex-1 truncate">{r.title}</span>
                        <span className="text-xs text-muted">{r.bestPercent}%</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : <p className="text-sm text-muted">Takrorlash kerak bo‘lgan mavzu yo‘q.</p>}
            </Card>
          </div>
        </div>

        <aside className="space-y-6">
          {rm && (
            <Card title="Haftalik maqsad">
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-2xl font-semibold text-ink">{rm.weekly.completed}</span>
                <span className="text-muted">/ {rm.weekly.target} dars</span>
              </div>
              <ProgressBar value={weeklyPct} tone={weeklyPct >= 100 ? 'success' : 'signal'} className="mt-3" />
              <p className="mt-2 flex items-center gap-1.5 text-xs text-muted"><Target className="h-3.5 w-3.5" aria-hidden />Shu hafta {minutesLabel(rm.weekly.minutes)} o‘qidingiz</p>
            </Card>
          )}

          {d.profileCompletion.percent < 100 && (
            <Card title="Profil to‘liqligi" action={<span className="text-sm font-semibold text-ink">{d.profileCompletion.percent}%</span>}>
              <ProgressBar value={d.profileCompletion.percent} />
              <ul className="mt-3 space-y-1.5 text-sm">
                {d.profileCompletion.checks.filter((c) => !c.done).slice(0, 4).map((c) => (
                  <li key={c.key} className="flex items-center gap-2 text-muted"><UserRound className="h-3.5 w-3.5" aria-hidden />{c.label}</li>
                ))}
              </ul>
              <Button to={d.profileCompletion.checks.find((c) => !c.done)?.key === 'assessment' ? '/app/assessment' : '/app/settings'} variant="secondary" size="sm" className="mt-4">To‘ldirish</Button>
            </Card>
          )}

          <Card title="Rivojlanayotgan ko‘nikmalar">
            {d.skills.length ? (
              <ul className="space-y-3">
                {d.skills.map((s) => (
                  <li key={s.slug}>
                    <div className="mb-1 flex justify-between text-sm"><span className="text-ink">{s.subject}</span><span className="tabular-nums text-muted">{s.completed}/{s.total}</span></div>
                    <ProgressBar value={s.percent} size="sm" tone="success" />
                  </li>
                ))}
              </ul>
            ) : <p className="text-sm text-muted">Darslarni boshlaganingizda fanlar bo‘yicha ko‘nikmalar shu yerda ko‘rinadi.</p>}
          </Card>

          <Card title="Yaqin eslatmalar" action={<Button to="/app/reminders" variant="ghost" size="sm">Barchasi</Button>}>
            {d.reminders.length ? (
              <ul className="space-y-2.5">
                {d.reminders.map((r) => (
                  <li key={r._id} className="flex gap-2.5 text-sm">
                    <CalendarClock className={cx('mt-0.5 h-4 w-4 shrink-0', r.kind === 'deadline' ? 'text-danger' : 'text-signal')} aria-hidden />
                    <div className="min-w-0"><p className="truncate text-ink">{r.title}</p><p className="text-xs text-muted">{formatDate(r.dueAt, true)}</p></div>
                  </li>
                ))}
              </ul>
            ) : <p className="text-sm text-muted">Yaqin eslatmalar yo‘q.</p>}
          </Card>

          <Card title="Yutuqlar" action={<Button to="/app/achievements" variant="ghost" size="sm">Barchasi</Button>}>
            {d.achievements.length ? (
              <ul className="grid grid-cols-3 gap-2">
                {d.achievements.map((a) => (
                  <li key={a._id} className="flex flex-col items-center gap-1.5 rounded-control bg-sunken p-2.5 text-center" title={a.description}>
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-primary-soft text-primary-ink"><Icon name={a.icon} className="h-4 w-4" /></span>
                    <span className="line-clamp-2 text-[11px] leading-tight text-ink">{a.title}</span>
                  </li>
                ))}
              </ul>
            ) : <p className="flex items-center gap-2 text-sm text-muted"><Award className="h-4 w-4" aria-hidden />Birinchi yutuq kasb testidan keyin.</p>}
          </Card>

          <Card title="Saqlanganlar" action={<Button to="/app/favorites" variant="ghost" size="sm">Barchasi</Button>}>
            {d.savedCareers.length || d.favoriteUniversities.length ? (
              <ul className="space-y-2 text-sm">
                {d.savedCareers.slice(0, 3).map((c) => <li key={c._id}><Link to={`/careers/${c.slug}`} className="flex items-center gap-2 text-ink hover:text-primary-ink"><Sparkles className="h-4 w-4 text-primary" aria-hidden />{c.name}</Link></li>)}
                {d.favoriteUniversities.slice(0, 3).map((u) => <li key={u._id}><Link to={`/universities/${u.slug}`} className="flex items-center gap-2 text-ink hover:text-primary-ink"><Landmark className="h-4 w-4 text-signal" aria-hidden /><span className="truncate">{u.name}</span></Link></li>)}
              </ul>
            ) : <p className="text-sm text-muted">Kasb va universitetlarni saqlash uchun ularning sahifasidagi belgini bosing.</p>}
          </Card>
        </aside>
      </div>
    </div>
  );
}
