import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, ArrowRight, Bot, CheckCircle2, ChevronDown, Clock, Eye, Lightbulb, ListTree, MessageCircleQuestion, PartyPopper, Target, X } from 'lucide-react';
import Button from '../../components/ui/Button.jsx';
import Badge, { StatusBadge } from '../../components/ui/Badge.jsx';
import Markdown from '../../components/ui/Markdown.jsx';
import Tooltip from '../../components/ui/Tooltip.jsx';
import FavoriteButton from '../../components/FavoriteButton.jsx';
import { ErrorState, PageSkeleton } from '../../components/ui/Feedback.jsx';
import TutorPanel from '../../components/lesson/TutorPanel.jsx';
import QuizSection from '../../components/lesson/QuizSection.jsx';
import CourseSidebar from '../../components/lesson/CourseSidebar.jsx';
import { useApi, useDocumentTitle } from '../../hooks/useApi.js';
import { useMediaQuery } from '../../hooks/useMediaQuery.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { useCelebrate } from '../../context/CelebrationContext.jsx';
import { api } from '../../lib/api.js';
import { cx } from '../../lib/format.js';

const DIFF = { beginner: { label: 'Boshlang‘ich', tone: 'success' }, intermediate: { label: 'O‘rta', tone: 'signal' }, advanced: { label: 'Murakkab', tone: 'warning' } };

function useStudyTimer(lessonId, enabled) {
  const startRef = useRef(Date.now());
  useEffect(() => {
    if (!enabled) return undefined;
    startRef.current = Date.now();
    const flush = (keepalive = false) => {
      const seconds = Math.round((Date.now() - startRef.current) / 1000);
      startRef.current = Date.now();
      if (seconds >= 15) {
        api.post(`/progress/${lessonId}/time`, { seconds: Math.min(seconds, 3600) }, { keepalive }).catch(() => {});
      }
    };
    const id = setInterval(() => document.visibilityState === 'visible' && flush(), 60000);
    const onVis = () => (document.visibilityState === 'hidden' ? flush(true) : (startRef.current = Date.now()));
    document.addEventListener('visibilitychange', onVis);
    return () => {
      clearInterval(id);
      document.removeEventListener('visibilitychange', onVis);
      flush(true);
    };
  }, [lessonId, enabled]);
}

function Exercise({ ex, index, done, onToggle, onHint, canTrack }) {
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  return (
    <li className={cx('rounded-panel border p-4', done ? 'border-success/40 bg-success-soft/30' : 'border-line bg-surface')}>
      <div className="flex gap-3">
        {canTrack ? (
          <input type="checkbox" checked={done} onChange={(e) => onToggle(index, e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[rgb(var(--success))]" aria-label={`${index + 1}-mashqni bajarildi deb belgilash`} />
        ) : (
          <span className="mt-0.5 text-sm font-semibold text-muted">{index + 1}.</span>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-[15px] text-ink">{ex.prompt}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {ex.hint && <Button size="sm" variant="ghost" icon={Lightbulb} onClick={() => setShowHint((s) => !s)} aria-expanded={showHint}>{showHint ? 'Maslahatni yashirish' : 'Maslahat'}</Button>}
            <Button size="sm" variant="ghost" icon={Bot} onClick={() => onHint(ex.prompt)}>AI ustozdan yo‘l-yo‘riq</Button>
            {ex.solution && <Button size="sm" variant="ghost" icon={Eye} onClick={() => setShowSolution((s) => !s)} aria-expanded={showSolution}>{showSolution ? 'Yechimni yashirish' : 'Yechimni ko‘rish'}</Button>}
          </div>
          {showHint && <p className="mt-2 rounded-control bg-warning-soft px-3 py-2 text-sm text-ink">{ex.hint}</p>}
          {showSolution && <p className="mt-2 rounded-control bg-sunken px-3 py-2 text-sm text-ink"><span className="font-medium">Yechim: </span>{ex.solution}</p>}
        </div>
      </div>
    </li>
  );
}

export default function Lesson() {
  const { slug } = useParams();
  const { user, refresh } = useAuth();
  const toast = useToast();
  const celebrate = useCelebrate();
  const { data, loading, error, reload, setData } = useApi(`/lessons/${slug}`);
  const [tutorRequest, setTutorRequest] = useState(null);
  const [tutorOpen, setTutorOpen] = useState(false);
  const [courseOpen, setCourseOpen] = useState(false);
  const isStudent = user?.role === 'student';
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const lesson = data?.lesson;
  useDocumentTitle(lesson?.title || 'Dars');
  useStudyTimer(lesson?._id, Boolean(lesson && isStudent));

  useEffect(() => {
    if (!lesson || !isStudent) return;
    api.post(`/progress/${lesson._id}/start`).then((d) => setData((prev) => (prev ? { ...prev, progress: d.progress } : prev))).catch(() => {});
  }, [lesson?._id, isStudent]);

  useEffect(() => {
    setTutorOpen(false);
    setCourseOpen(false);
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading && !data) return <PageSkeleton />;
  if (error) return <ErrorState error={error} onRetry={reload} />;

  const { quiz, progress, course } = data;
  const status = progress?.status || 'not_started';
  const diff = DIFF[lesson.difficulty];

  const ask = (req) => {
    setTutorRequest({ ...req, nonce: Date.now() });
    if (!isDesktop) setTutorOpen(true);
  };

  const toggleExercise = async (index, done) => {
    try {
      const d = await api.post(`/progress/${lesson._id}/exercise`, { index, done });
      setData((prev) => ({ ...prev, progress: d.progress }));
    } catch (err) {
      toast.error(err);
    }
  };

  const toggleFavorite = async () => {
    try {
      if (data.isFavorite) await api.delete(`/favorites/by-ref/lesson/${lesson._id}`);
      else await api.post('/favorites', { kind: 'lesson', refId: lesson._id });
      setData((prev) => ({ ...prev, isFavorite: !prev.isFavorite }));
      toast.success(data.isFavorite ? 'Saqlanganlardan olib tashlandi' : 'Dars saqlandi');
    } catch (err) {
      toast.error(err);
    }
  };

  const onQuizSubmitted = (r) => {
    setData((prev) => ({ ...prev, progress: { ...prev.progress, ...r.progress } }));
    celebrate(r.newAchievements);
    refresh();
    const freshCourse = () => api.get(`/lessons/${slug}`).then((d) => setData((prev) => ({ ...prev, course: d.course }))).catch(() => {});
    freshCourse();
  };

  const complete = async () => {
    try {
      await api.post(`/progress/${lesson._id}/complete`);
      toast.success('Dars tugallangan deb saqlandi');
    } catch (err) {
      toast.error(err);
    }
  };

  const tutor = <TutorPanel lesson={lesson} request={tutorRequest} onRequestHandled={() => setTutorRequest(null)} className="h-full" />;

  return (
    <div className="-mx-4 -my-6 md:-mx-6 md:-my-8">
      <div className="grid xl:grid-cols-[260px_minmax(0,1fr)_380px] lg:grid-cols-[minmax(0,1fr)_360px]">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] border-r border-line bg-surface xl:block">
          <CourseSidebar course={course} currentId={lesson._id} />
        </aside>

        <article className="min-w-0 px-4 py-6 md:px-8 md:py-8">
          <div className="mb-4 flex items-center justify-between gap-3">
            <button onClick={() => setCourseOpen(true)} className="inline-flex items-center gap-1.5 rounded-control border border-line bg-surface px-3 py-1.5 text-sm text-ink hover:bg-sunken xl:hidden">
              <ListTree className="h-4 w-4" aria-hidden />Kurs tarkibi
            </button>
            {course.roadmapId && <Link to={`/app/roadmaps/${course.roadmapId}`} className="hidden items-center gap-1.5 text-sm text-muted hover:text-ink xl:inline-flex"><ArrowLeft className="h-4 w-4" />Yo‘l xaritasiga qaytish</Link>}
            <div className="ml-auto text-xs text-muted">{course.progress.completed}/{course.progress.total} dars tugallangan</div>
          </div>

          <header className="border-b border-line pb-6">
            <p className="text-sm text-muted">{lesson.subject?.name} · {lesson.topic?.name}</p>
            <h1 className="mt-2 font-display text-2xl font-semibold leading-tight text-ink md:text-[32px]">{lesson.title}</h1>
            <p className="mt-3 max-w-prose text-[16px] text-muted">{lesson.summary}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Badge tone={diff.tone}>Qiyinlik: {diff.label}</Badge>
              <Badge tone="outline" icon={Clock}>{lesson.durationMinutes} daqiqa</Badge>
              {isStudent && <StatusBadge status={status} />}
              {isStudent && progress?.bestPercent > 0 && <Badge tone="neutral">Eng yaxshi natija: {progress.bestPercent}%</Badge>}
              {isStudent && <div className="ml-auto"><FavoriteButton compact active={data.isFavorite} onClick={toggleFavorite} label="Darsni saqlash" /></div>}
            </div>
            {!isStudent && <p className="mt-4 flex items-center gap-2 rounded-control bg-signal-soft px-3 py-2 text-sm text-ink"><Eye className="h-4 w-4 text-signal" aria-hidden />Ko‘rib chiqish rejimi: progress va test natijalari faqat o‘quvchi hisoblarida saqlanadi.</p>}
          </header>

          {lesson.notice && (
            <div className="mt-6 flex gap-3 rounded-panel border border-warning/40 bg-warning-soft/60 p-4 text-sm text-ink" role="note">
              <AlertTriangle className="h-5 w-5 shrink-0 text-warning" aria-hidden />
              {lesson.notice}
            </div>
          )}

          <section className="mt-8" aria-labelledby="objectives">
            <h2 id="objectives" className="section-title flex items-center gap-2"><Target className="h-5 w-5 text-primary" aria-hidden />O‘quv maqsadlari</h2>
            <ul className="mt-3 space-y-2">
              {lesson.objectives.map((o) => <li key={o} className="flex gap-2.5 text-[15px] text-ink"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />{o}</li>)}
            </ul>
          </section>

          {lesson.definitions?.length > 0 && (
            <section className="mt-8" aria-labelledby="definitions">
              <h2 id="definitions" className="section-title">Asosiy atamalar</h2>
              <dl className="mt-3 grid gap-2 sm:grid-cols-2">
                {lesson.definitions.map((d) => (
                  <div key={d.term} className="group rounded-control border border-line bg-surface p-3.5">
                    <dt className="flex items-center justify-between gap-2 font-semibold text-ink">
                      {d.term}
                      <Tooltip content="Shu atamani AI ustozdan so‘rash">
                        <button onClick={() => ask({ action: 'explain_again', concept: d.term })} className="rounded p-1 text-muted opacity-70 hover:text-primary group-hover:opacity-100" aria-label={`${d.term} haqida AI ustozdan so‘rash`}><MessageCircleQuestion className="h-4 w-4" /></button>
                      </Tooltip>
                    </dt>
                    <dd className="mt-1 text-sm text-muted">{d.meaning}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <div className="mt-8 space-y-8">
            {lesson.sections.map((s) => (
              <section key={s.heading} className="group/sec">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="section-title">{s.heading}</h2>
                  <button onClick={() => ask({ action: 'explain_again', concept: s.heading })} className="inline-flex shrink-0 items-center gap-1 rounded-full border border-line px-2.5 py-1 text-xs text-muted transition-colors hover:border-primary/50 hover:text-primary-ink">
                    <MessageCircleQuestion className="h-3.5 w-3.5" aria-hidden />Tushunmadim
                  </button>
                </div>
                <Markdown text={s.body} className="mt-2 max-w-prose text-[16px] text-ink/90" />
                {s.code && <pre className="mt-3 overflow-x-auto rounded-control bg-navy-900 p-4 text-[13px] leading-6 text-slate-100"><code>{s.code}</code></pre>}
              </section>
            ))}
          </div>

          {lesson.examples?.length > 0 && (
            <section className="mt-10" aria-labelledby="examples">
              <h2 id="examples" className="section-title">Bosqichma-bosqich misollar</h2>
              <div className="mt-4 space-y-4">
                {lesson.examples.map((ex) => (
                  <div key={ex.title} className="rounded-panel border border-line bg-surface p-5">
                    <h3 className="font-sans text-[15px] font-semibold tracking-normal text-ink">{ex.title}</h3>
                    <ol className="mt-3 space-y-2">
                      {ex.steps.map((st, i) => (
                        <li key={i} className="flex gap-3 text-[15px] text-ink/90">
                          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary-soft text-xs font-semibold text-primary-ink">{i + 1}</span>
                          <span className="pt-0.5"><Markdown text={st} className="[&_p]:my-0" /></span>
                        </li>
                      ))}
                    </ol>
                    {ex.code && <pre className="mt-3 overflow-x-auto rounded-control bg-navy-900 p-4 text-[13px] leading-6 text-slate-100"><code>{ex.code}</code></pre>}
                    {ex.result && <p className="mt-3 rounded-control bg-success-soft px-3 py-2 text-sm text-ink"><span className="font-medium">Natija: </span>{ex.result}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {lesson.exercises?.length > 0 && (
            <section className="mt-10" aria-labelledby="exercises">
              <h2 id="exercises" className="section-title">Amaliy mashqlar</h2>
              <p className="mt-1 text-sm text-muted">Avval o‘zingiz yechib ko‘ring. Qiynalsangiz, maslahat yoki AI ustozdan yo‘l-yo‘riq so‘rang.</p>
              <ul className="mt-4 space-y-3">
                {lesson.exercises.map((ex, i) => (
                  <Exercise key={i} ex={ex} index={i} canTrack={isStudent} done={progress?.exercisesDone?.includes(i)} onToggle={toggleExercise} onHint={(prompt) => ask({ action: 'hint', concept: prompt.slice(0, 180) })} />
                ))}
              </ul>
            </section>
          )}

          <section className="mt-10 rounded-panel border border-line bg-sunken/60 p-5" aria-labelledby="summary">
            <h2 id="summary" className="section-title">Xulosa</h2>
            <ul className="mt-3 space-y-1.5">
              {lesson.summaryPoints.map((p) => <li key={p} className="flex gap-2.5 text-[15px] text-ink"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />{p}</li>)}
            </ul>
          </section>

          <div className="mt-10">
            <QuizSection key={lesson._id} lesson={lesson} quiz={quiz} canSubmit={isStudent} onSubmitted={onQuizSubmitted} onAskTutor={ask} />
          </div>

          {isStudent && (
            <div className={cx('mt-8 flex flex-col gap-3 rounded-panel border p-5 sm:flex-row sm:items-center', status === 'completed' ? 'border-success/40 bg-success-soft/40' : 'border-line bg-surface')}>
              <div className="flex-1">
                <p className="flex items-center gap-2 font-medium text-ink">
                  {status === 'completed' ? <><PartyPopper className="h-5 w-5 text-success" aria-hidden />Dars tugallangan</> : 'Darsni yakunlash'}
                </p>
                <p className="text-sm text-muted">{status === 'completed' ? 'Natijangiz saqlandi. Keyingi darsga o‘ting.' : `Dars mini testdan kamida ${quiz?.passPercent ?? 60}% olinganda tugallangan hisoblanadi.`}</p>
              </div>
              {status === 'completed' ? (
                course.next ? <Button to={`/app/lessons/${course.next.slug}`} iconRight={ArrowRight}>Keyingi dars</Button> : <Button onClick={complete} variant="secondary">Tugallanganini tasdiqlash</Button>
              ) : (
                <Tooltip content="Avval mini testdan o‘ting">
                  <Button disabled>Darsni yakunlash</Button>
                </Tooltip>
              )}
            </div>
          )}

          <nav className="mt-8 flex items-center justify-between gap-3 border-t border-line pt-6" aria-label="Darslar orasida o‘tish">
            {course.prev ? <Button to={`/app/lessons/${course.prev.slug}`} variant="ghost" icon={ArrowLeft} className="max-w-[45%]"><span className="truncate">{course.prev.title}</span></Button> : <span />}
            {course.next ? <Button to={`/app/lessons/${course.next.slug}`} variant="secondary" iconRight={ArrowRight} className="max-w-[45%]"><span className="truncate">{course.next.title}</span></Button> : <span />}
          </nav>
        </article>

        {isDesktop && <aside className="sticky top-16 h-[calc(100vh-4rem)] border-l border-line bg-surface">{tutor}</aside>}
      </div>

      <button onClick={() => setTutorOpen(true)} className="fixed bottom-5 right-5 z-30 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-medium text-white shadow-lg shadow-primary/30 lg:hidden" aria-label="AI ustozni ochish">
        <Bot className="h-5 w-5" aria-hidden />AI ustoz
      </button>

      {tutorOpen && !isDesktop && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="AI ustoz">
          <div className="absolute inset-0 bg-navy-900/50" onClick={() => setTutorOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 flex h-[85vh] animate-rise-in flex-col rounded-t-panel bg-surface">
            <button onClick={() => setTutorOpen(false)} className="absolute right-3 top-3 z-10 rounded-control p-1.5 text-muted hover:bg-sunken" aria-label="Yopish"><ChevronDown className="h-5 w-5" /></button>
            {tutor}
          </div>
        </div>
      )}

      {courseOpen && (
        <div className="fixed inset-0 z-50 xl:hidden" role="dialog" aria-modal="true" aria-label="Kurs tarkibi">
          <div className="absolute inset-0 bg-navy-900/50" onClick={() => setCourseOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[85vw] animate-rise-in bg-surface">
            <button onClick={() => setCourseOpen(false)} className="absolute right-3 top-3 z-10 rounded-control p-1.5 text-muted hover:bg-sunken" aria-label="Yopish"><X className="h-5 w-5" /></button>
            <CourseSidebar course={course} currentId={lesson._id} onNavigate={() => setCourseOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
