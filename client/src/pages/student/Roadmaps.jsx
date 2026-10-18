import { Link } from 'react-router-dom';
import { Compass, Route, Star } from 'lucide-react';
import PageHeader from '../../components/PageHeader.jsx';
import Button from '../../components/ui/Button.jsx';
import Badge from '../../components/ui/Badge.jsx';
import Icon from '../../components/ui/Icon.jsx';
import { EmptyState, ErrorState, ProgressBar, Skeleton } from '../../components/ui/Feedback.jsx';
import { useApi, useDocumentTitle } from '../../hooks/useApi.js';
import { minutesLabel } from '../../lib/format.js';

export default function Roadmaps() {
  useDocumentTitle('Yo‘l xaritalari');
  const { data, loading, error, reload } = useApi('/roadmaps');
  return (
    <div>
      <PageHeader title="Yo‘l xaritalari" description="Har bir kasb uchun alohida reja. Faol reja boshqaruv panelida va bugungi rejada ishlatiladi." actions={<Button to="/careers" variant="secondary" icon={Compass}>Yangi kasb tanlash</Button>} />
      {error ? (
        <ErrorState error={error} onRetry={reload} />
      ) : loading ? (
        <div className="grid gap-4 md:grid-cols-2"><Skeleton className="h-44" /><Skeleton className="h-44" /></div>
      ) : !data.roadmaps.length ? (
        <EmptyState icon={Route} title="Hali yo‘l xaritangiz yo‘q" description="Kasb testini topshiring yoki kasblar katalogidan birini tanlab, “Yo‘l xaritasini boshlash” tugmasini bosing." action={<div className="flex flex-wrap justify-center gap-2"><Button to="/app/assessment" icon={Compass}>Kasb testini topshirish</Button><Button to="/careers" variant="secondary">Kasblar katalogi</Button></div>} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {data.roadmaps.map((r) => (
            <Link key={r.id} to={`/app/roadmaps/${r.id}`} className="panel group flex flex-col p-5 transition-colors hover:border-primary/50">
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-control bg-primary-soft text-primary-ink"><Icon name={r.career?.icon} /></span>
                {r.isActive && <Badge tone="primary" icon={Star}>Faol</Badge>}
              </div>
              <h2 className="mt-4 font-sans text-base font-semibold tracking-normal text-ink group-hover:text-primary-ink">{r.title}</h2>
              <p className="text-sm text-muted">{r.moduleCount} ta modul · {r.stats.total} ta majburiy dars</p>
              <div className="mt-5 flex items-center gap-3">
                <ProgressBar value={r.stats.percent} />
                <span className="text-sm font-medium tabular-nums text-ink">{r.stats.percent}%</span>
              </div>
              <p className="mt-2 text-xs text-muted">
                {r.stats.completed} / {r.stats.total} dars tugallangan
                {r.stats.remainingMinutes > 0 && ` · qolgan vaqt ≈ ${minutesLabel(r.stats.remainingMinutes)} (${r.stats.estimatedWeeks} hafta)`}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
