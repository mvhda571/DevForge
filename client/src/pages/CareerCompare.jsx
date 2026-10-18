import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, GitCompare, Route } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import Icon from '../components/ui/Icon.jsx';
import Button from '../components/ui/Button.jsx';
import { EmptyState, ErrorState, PageSkeleton } from '../components/ui/Feedback.jsx';
import { useApi, useDocumentTitle } from '../hooks/useApi.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useStartRoadmap } from '../hooks/useStartRoadmap.js';

export default function CareerCompare() {
  useDocumentTitle('Kasblarni taqqoslash');
  const [params] = useSearchParams();
  const slugs = (params.get('slugs') || '').split(',').filter(Boolean).slice(0, 3);
  const enough = slugs.length >= 2;
  const { data, loading, error, reload } = useApi(enough ? `/careers/compare?slugs=${slugs.join(',')}` : null);
  const { user } = useAuth();
  const { start, pending } = useStartRoadmap();

  if (!enough) {
    return (
      <>
        <PageHeader title="Kasblarni taqqoslash" />
        <EmptyState icon={GitCompare} title="Taqqoslash uchun kamida 2 ta kasb tanlang" description="Kasblar sahifasida 2–3 ta kasb yonidagi “Taqqoslash” belgisini qo‘ying." action={<Button to="/careers">Kasblarga o‘tish</Button>} />
      </>
    );
  }
  if (loading) return <PageSkeleton />;
  if (error) return <ErrorState error={error} onRetry={reload} />;

  const careers = data.careers;
  const allTraits = [...new Set(careers.flatMap((c) => Object.keys(c.traits)))];
  const rows = [
    { label: 'Soha', render: (c) => c.category },
    { label: 'Mohiyati', render: (c) => <span className="text-muted">{c.description}</span> },
    { label: 'Asosiy ko‘nikmalar', render: (c) => <ul className="list-disc space-y-1 pl-4">{c.skills.slice(0, 5).map((s) => <li key={s}>{s}</li>)}</ul> },
    { label: 'Maktab fanlari', render: (c) => c.schoolSubjects.join(', ') },
    { label: 'Ish muhiti', render: (c) => c.workEnvironment || '—' },
    { label: 'Yo‘nalishlar', render: (c) => c.directions.join(', ') }
  ];

  return (
    <div>
      <Link to="/careers" className="mb-5 inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink"><ArrowLeft className="h-4 w-4" />Kasblar</Link>
      <PageHeader title="Kasblarni taqqoslash" description="Har bir kasb nimani talab qilishini yonma-yon ko‘ring." />
      <div className="panel overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-line">
              <th className="w-44 p-4 font-medium text-muted" scope="col"><span className="sr-only">Mezon</span></th>
              {careers.map((c) => (
                <th key={c.slug} className="p-4 align-top" scope="col">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-9 w-9 place-items-center rounded-control bg-primary-soft text-primary-ink"><Icon name={c.icon} className="h-4 w-4" /></span>
                    <Link to={`/careers/${c.slug}`} className="font-semibold text-ink hover:text-primary-ink">{c.name}</Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((r) => (
              <tr key={r.label}>
                <th scope="row" className="p-4 align-top font-medium text-muted">{r.label}</th>
                {careers.map((c) => <td key={c.slug} className="p-4 align-top text-ink">{r.render(c)}</td>)}
              </tr>
            ))}
            <tr>
              <th scope="row" className="p-4 align-top font-medium text-muted">Xususiyatlar og‘irligi</th>
              {careers.map((c) => (
                <td key={c.slug} className="p-4 align-top">
                  <ul className="space-y-1.5">
                    {allTraits.filter((t) => c.traits[t]).sort((a, b) => c.traits[b] - c.traits[a]).map((t) => (
                      <li key={t} className="flex items-center gap-2">
                        <span className="flex gap-0.5" aria-label={`${c.traits[t]} / 3`}>{[1, 2, 3].map((n) => <span key={n} className={`h-2 w-3 rounded-sm ${n <= c.traits[t] ? 'bg-primary' : 'bg-sunken'}`} />)}</span>
                        <span className="text-xs text-ink">{data.traitLabels[t]}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
            {user?.role === 'student' && (
              <tr>
                <th scope="row" className="p-4" />
                {careers.map((c) => (
                  <td key={c.slug} className="p-4">
                    <Button size="sm" icon={Route} onClick={() => start(c.slug)} loading={pending === c.slug}>Yo‘l xaritasi</Button>
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
