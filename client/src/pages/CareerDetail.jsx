import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, GitCompare, Route, Lightbulb, Building2 } from 'lucide-react';
import Icon from '../components/ui/Icon.jsx';
import Button from '../components/ui/Button.jsx';
import Card from '../components/ui/Card.jsx';
import FavoriteButton from '../components/FavoriteButton.jsx';
import ForgePath from '../components/ForgePath.jsx';
import TraitBars from '../components/TraitBars.jsx';
import { ErrorState, PageSkeleton } from '../components/ui/Feedback.jsx';
import { useApi, useDocumentTitle } from '../hooks/useApi.js';
import { useFavorites } from '../hooks/useFavorites.js';
import { useStartRoadmap } from '../hooks/useStartRoadmap.js';
import { useAuth } from '../context/AuthContext.jsx';
import { minutesLabel } from '../lib/format.js';

export default function CareerDetail() {
  const { slug } = useParams();
  const { data, loading, error, reload } = useApi(`/careers/${slug}`);
  const { user } = useAuth();
  const fav = useFavorites('career');
  const { start, pending } = useStartRoadmap();
  const c = data?.career;
  useDocumentTitle(c?.name || 'Kasb');

  if (loading) return <PageSkeleton />;
  if (error) return <ErrorState error={error} onRetry={reload} />;

  const preview = data.roadmapPreview;
  return (
    <div>
      <Link to="/careers" className="mb-5 inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink"><ArrowLeft className="h-4 w-4" />Barcha kasblar</Link>
      <header className="panel mb-6 flex flex-col gap-6 p-6 md:flex-row md:items-start md:p-8">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-panel bg-primary-soft text-primary-ink"><Icon name={c.icon} className="h-7 w-7" /></span>
        <div className="min-w-0 flex-1">
          <p className="text-sm text-muted">{c.category}</p>
          <h1 className="page-title mt-1">{c.name}</h1>
          <p className="mt-3 max-w-prose text-[15px] text-ink/85">{c.description}</p>
          {c.workEnvironment && <p className="mt-3 flex items-center gap-2 text-sm text-muted"><Building2 className="h-4 w-4" aria-hidden />{c.workEnvironment}</p>}
        </div>
        <div className="flex flex-wrap gap-2 md:flex-col md:items-stretch">
          {user?.role === 'student' ? (
            <Button icon={Route} onClick={() => start(c.slug)} loading={pending === c.slug} disabled={!preview.hasContent}>Yo‘l xaritasini boshlash</Button>
          ) : !user ? (
            <Button to={`/register?next=/careers/${c.slug}`} icon={Route}>Yo‘l xaritasini boshlash</Button>
          ) : null}
          {fav.enabled && <FavoriteButton active={fav.has(c._id)} onClick={() => fav.toggle(c._id)} />}
          <Button to={`/careers/compare?slugs=${c.slug}`} variant="ghost" icon={GitCompare}>Taqqoslash</Button>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <Card title="Kerakli ko‘nikmalar">
            <ul className="grid gap-2 sm:grid-cols-2">
              {c.skills.map((s) => <li key={s} className="rounded-control border border-line px-3 py-2 text-sm text-ink">{s}</li>)}
            </ul>
          </Card>
          <Card title="O‘qish yo‘li" description="Bu kasbga odatda shunday bosqichlar orqali boriladi.">
            <ForgePath steps={c.learningPath.map((p, i) => ({ title: p, state: i === 0 ? 'current' : 'todo' }))} />
          </Card>
          <Card title="Rivojlanish yo‘nalishlari">
            <div className="flex flex-wrap gap-2">{c.directions.map((d) => <span key={d} className="rounded-full bg-sunken px-3 py-1 text-sm text-ink">{d}</span>)}</div>
          </Card>
        </div>
        <div className="space-y-6">
          <Card title="Tavsiya etilgan maktab fanlari">
            <div className="flex flex-wrap gap-2">{c.schoolSubjects.map((s) => <span key={s} className="rounded-full border border-line px-3 py-1 text-sm text-ink">{s}</span>)}</div>
          </Card>
          <Card title="Muhim xususiyatlar" description="Kasb testi shu og‘irliklar asosida moslikni hisoblaydi.">
            <TraitBars traits={c.traits} labels={data.traitLabels} />
          </Card>
          <Card title="DevForge’dagi darslar">
            {preview.hasContent ? (
              <div className="flex gap-6 text-sm">
                <p className="flex items-center gap-2 text-ink"><BookOpen className="h-4 w-4 text-primary" aria-hidden />{preview.lessonCount} ta dars</p>
                <p className="flex items-center gap-2 text-ink"><Clock className="h-4 w-4 text-primary" aria-hidden />{minutesLabel(preview.totalMinutes)}</p>
              </div>
            ) : (
              <p className="text-sm text-muted">Bu kasb uchun darslar hali tayyorlanmoqda.</p>
            )}
          </Card>
          <div className="rounded-panel border border-primary/30 bg-primary-soft/50 p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-primary-ink"><Lightbulb className="h-4 w-4" aria-hidden />Keyingi qadam</p>
            <p className="mt-2 text-sm text-ink">{c.nextAction}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
