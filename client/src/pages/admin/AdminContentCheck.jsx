import { useState } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Info, RefreshCw } from 'lucide-react';
import Button from '../../components/ui/Button.jsx';
import StatTile from '../../components/StatTile.jsx';
import Tabs from '../../components/ui/Tabs.jsx';
import { EmptyState, ErrorState, Skeleton } from '../../components/ui/Feedback.jsx';
import { useApi } from '../../hooks/useApi.js';

const SEVERITY = {
  error: { icon: AlertCircle, cls: 'text-danger', label: 'Xato' },
  warning: { icon: AlertTriangle, cls: 'text-warning', label: 'Ogohlantirish' },
  info: { icon: Info, cls: 'text-signal', label: 'Ma’lumot' }
};
const TYPE_LABEL = { lesson: 'Dars', career: 'Kasb', university: 'Universitet' };

export default function AdminContentCheck() {
  const { data, loading, error, reload } = useApi('/admin/content-check');
  const [filter, setFilter] = useState('all');
  if (error) return <ErrorState error={error} onRetry={reload} />;
  if (loading) return <Skeleton className="h-64" />;
  const issues = filter === 'all' ? data.issues : data.issues.filter((i) => i.severity === filter);

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <StatTile icon={AlertCircle} tone="warning" label="Xatolar" value={data.summary.errors} hint="Darhol tuzatish kerak" />
        <StatTile icon={AlertTriangle} tone="warning" label="Ogohlantirishlar" value={data.summary.warnings} />
        <StatTile icon={Info} tone="signal" label="Ma’lumot" value={data.summary.info} hint="Masalan, tasdiqlanmagan yozuvlar" />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tabs value={filter} onChange={setFilter} tabs={[{ value: 'all', label: 'Barchasi', count: data.issues.length }, { value: 'error', label: 'Xatolar' }, { value: 'warning', label: 'Ogohlantirishlar' }, { value: 'info', label: 'Ma’lumot' }]} />
        <Button variant="secondary" size="sm" icon={RefreshCw} onClick={reload}>Qayta tekshirish</Button>
      </div>
      {!issues.length ? <EmptyState icon={CheckCircle2} title="Muammo topilmadi" description="Tanlangan toifada tekshiruv hech narsa topmadi." /> : (
        <ul className="panel divide-y divide-line">
          {issues.map((i, idx) => {
            const s = SEVERITY[i.severity];
            return (
              <li key={idx} className="flex items-start gap-3 px-4 py-3 text-sm">
                <s.icon className={`mt-0.5 h-4 w-4 shrink-0 ${s.cls}`} aria-label={s.label} />
                <div className="min-w-0">
                  <p className="text-ink">{i.message}</p>
                  <p className="text-xs text-muted">{TYPE_LABEL[i.type]} · <code>{i.ref}</code></p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
