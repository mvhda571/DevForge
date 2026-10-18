import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, BookOpen, Briefcase, GitCompare, Landmark, Trash2 } from 'lucide-react';
import PageHeader from '../../components/PageHeader.jsx';
import Tabs from '../../components/ui/Tabs.jsx';
import Button from '../../components/ui/Button.jsx';
import Icon from '../../components/ui/Icon.jsx';
import { EmptyState, ErrorState, Skeleton } from '../../components/ui/Feedback.jsx';
import { useApi, useDocumentTitle } from '../../hooks/useApi.js';
import { useToast } from '../../context/ToastContext.jsx';
import { api } from '../../lib/api.js';

export default function Favorites() {
  useDocumentTitle('Saqlanganlar');
  const { data, loading, error, reload, setData } = useApi('/favorites');
  const [tab, setTab] = useState('career');
  const toast = useToast();

  const remove = async (kind, id) => {
    try {
      await api.delete(`/favorites/${id}`);
      setData((d) => ({ ...d, [kind]: d[kind].filter((f) => f.id !== id) }));
      toast.success('Olib tashlandi');
    } catch (err) {
      toast.error(err);
    }
  };

  const tabs = [
    { value: 'career', label: 'Kasblar', icon: Briefcase, count: data?.career.length },
    { value: 'university', label: 'Universitetlar', icon: Landmark, count: data?.university.length },
    { value: 'lesson', label: 'Darslar', icon: BookOpen, count: data?.lesson.length }
  ];
  const items = data?.[tab] || [];
  const compareSlugs = items.slice(0, 3).map((f) => f.item.slug).join(',');
  const empty = {
    career: { title: 'Saqlangan kasb yo‘q', action: <Button to="/careers">Kasblar katalogi</Button> },
    university: { title: 'Saqlangan universitet yo‘q', action: <Button to="/universities">Universitetlar</Button> },
    lesson: { title: 'Saqlangan dars yo‘q', action: <Button to="/app/lessons">Darslar</Button> }
  }[tab];

  return (
    <div>
      <PageHeader title="Saqlanganlar" description="Qiziqtirgan kasblar, universitetlar va darslar bir joyda." actions={items.length >= 2 && tab !== 'lesson' && <Button variant="secondary" icon={GitCompare} to={`/${tab === 'career' ? 'careers' : 'universities'}/compare?slugs=${compareSlugs}`}>Birinchi {Math.min(3, items.length)} tasini taqqoslash</Button>} />
      <Tabs tabs={tabs} value={tab} onChange={setTab} className="mb-6 w-fit" />
      {error ? <ErrorState error={error} onRetry={reload} /> : loading ? <Skeleton className="h-40" /> : !items.length ? (
        <EmptyState icon={Bookmark} title={empty.title} description="Sahifadagi saqlash belgisini bosing — element shu yerda paydo bo‘ladi." action={empty.action} />
      ) : (
        <ul className="grid gap-3 md:grid-cols-2">
          {items.map((f) => {
            const to = tab === 'career' ? `/careers/${f.item.slug}` : tab === 'university' ? `/universities/${f.item.slug}` : `/app/lessons/${f.item.slug}`;
            const sub = tab === 'career' ? f.item.category : tab === 'university' ? `${f.item.city}, ${f.item.country}` : `${f.item.durationMinutes} daqiqa`;
            return (
              <li key={f.id} className="panel flex items-center gap-3 p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-control bg-primary-soft text-primary-ink">
                  {tab === 'career' ? <Icon name={f.item.icon} /> : tab === 'university' ? <Landmark className="h-5 w-5" /> : <BookOpen className="h-5 w-5" />}
                </span>
                <div className="min-w-0 flex-1">
                  <Link to={to} className="block truncate font-medium text-ink hover:text-primary-ink">{f.item.name || f.item.title}</Link>
                  <p className="truncate text-sm text-muted">{sub}</p>
                </div>
                <button onClick={() => remove(tab, f.id)} className="rounded-control p-2 text-muted hover:bg-sunken hover:text-danger" aria-label="Saqlanganlardan olib tashlash"><Trash2 className="h-4 w-4" /></button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
