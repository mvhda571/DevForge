import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink, GitCompare } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import Button from '../components/ui/Button.jsx';
import Badge from '../components/ui/Badge.jsx';
import { EmptyState, ErrorState, PageSkeleton } from '../components/ui/Feedback.jsx';
import { useApi, useDocumentTitle } from '../hooks/useApi.js';
import { DATA_STATUS } from './Universities.jsx';

const NA = <span className="text-muted">Ma’lumot mavjud emas</span>;

export default function UniversityCompare() {
  useDocumentTitle('Universitetlarni taqqoslash');
  const [params] = useSearchParams();
  const slugs = (params.get('slugs') || '').split(',').filter(Boolean).slice(0, 3);
  const { data, loading, error, reload } = useApi(slugs.length >= 2 ? `/universities/compare?slugs=${slugs.join(',')}` : null);
  if (slugs.length < 2) return <EmptyState icon={GitCompare} title="Taqqoslash uchun 2–3 ta universitet tanlang" action={<Button to="/universities">Universitetlarga o‘tish</Button>} />;
  if (loading) return <PageSkeleton />;
  if (error) return <ErrorState error={error} onRetry={reload} />;
  const us = data.universities;
  const rows = [
    ['Joylashuv', (u) => `${u.city}, ${u.country}`],
    ['Turi', (u) => (u.type === 'public' ? 'Davlat' : 'Xususiy')],
    ['Yo‘nalishlar', (u) => u.fields.join(', ')],
    ['Ta’lim tili', (u) => u.languages.join(', ')],
    ['Darajalar', (u) => u.degreeLevels.join(', ')],
    ['O‘qish to‘lovi', (u) => (u.tuition?.verified && u.tuition.min != null ? `${u.tuition.min.toLocaleString()}–${(u.tuition.max ?? u.tuition.min).toLocaleString()} ${u.tuition.currency}` : NA)],
    ['Grant / stipendiya', (u) => (u.scholarships?.length ? u.scholarships.map((s) => `${s.name}${s.verified ? '' : ' (tasdiqlanmagan)'}`).join('; ') : NA)],
    ['Qabul talablari', (u) => (u.admission?.verified && u.admission.requirements.length ? u.admission.requirements.join('; ') : NA)],
    ['Ma’lumot holati', (u) => <Badge tone={DATA_STATUS[u.dataStatus].tone}>{DATA_STATUS[u.dataStatus].label}</Badge>],
    ['Rasmiy sayt', (u) => (u.website ? <a href={u.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary-ink hover:underline">Ochish <ExternalLink className="h-3.5 w-3.5" /></a> : NA)]
  ];
  return (
    <div>
      <Link to="/universities" className="mb-5 inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink"><ArrowLeft className="h-4 w-4" />Universitetlar</Link>
      <PageHeader title="Universitetlarni taqqoslash" description="Tasdiqlanmagan ma’lumotlar ko‘rsatilmaydi." />
      <div className="panel overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead><tr className="border-b border-line"><th className="w-40 p-4" scope="col"><span className="sr-only">Mezon</span></th>{us.map((u) => <th key={u.slug} className="p-4 align-top" scope="col"><Link to={`/universities/${u.slug}`} className="font-semibold text-ink hover:text-primary-ink">{u.name}</Link></th>)}</tr></thead>
          <tbody className="divide-y divide-line">{rows.map(([label, fn]) => <tr key={label}><th scope="row" className="p-4 align-top font-medium text-muted">{label}</th>{us.map((u) => <td key={u.slug} className="p-4 align-top text-ink">{fn(u)}</td>)}</tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}
