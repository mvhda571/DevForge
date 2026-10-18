import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Search } from 'lucide-react';
import PageHeader from '../../components/PageHeader.jsx';
import Tabs from '../../components/ui/Tabs.jsx';
import { StatusBadge } from '../../components/ui/Badge.jsx';
import { EmptyState, ErrorState, Skeleton } from '../../components/ui/Feedback.jsx';
import { useApi, useDocumentTitle } from '../../hooks/useApi.js';
import { useAuth } from '../../context/AuthContext.jsx';

const DIFF = { beginner: 'Boshlang‘ich', intermediate: 'O‘rta', advanced: 'Murakkab' };

export default function Library() {
  useDocumentTitle('Darslar');
  const { user } = useAuth();
  const subjects = useApi('/lessons/subjects');
  const [subject, setSubject] = useState('');
  const [q, setQ] = useState('');
  const lessons = useApi(`/lessons${subject ? `?subject=${subject}` : ''}`);

  const groups = useMemo(() => {
    const term = q.trim().toLowerCase();
    const list = (lessons.data?.lessons || []).filter((l) => !term || l.title.toLowerCase().includes(term) || l.summary.toLowerCase().includes(term));
    const map = new Map();
    for (const l of list) {
      const key = `${l.subject?.name} — ${l.topic?.name}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(l);
    }
    return [...map.entries()];
  }, [lessons.data, q]);

  const tabs = [{ value: '', label: 'Barchasi' }, ...(subjects.data?.subjects || []).map((s) => ({ value: s.slug, label: s.name }))];

  return (
    <div>
      <PageHeader title="Darslar kutubxonasi" description="Barcha darslar o‘zbek tilida: tushuntirish, misollar, mashqlar, mini test va AI ustoz." />
      <div className="mb-6 space-y-3">
        <Tabs tabs={tabs} value={subject} onChange={setSubject} />
        <label className="relative block max-w-md">
          <span className="sr-only">Dars qidirish</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Dars nomi bo‘yicha qidirish" className="field pl-9" />
        </label>
      </div>
      {lessons.error ? (
        <ErrorState error={lessons.error} onRetry={lessons.reload} />
      ) : lessons.loading ? (
        <div className="space-y-3"><Skeleton className="h-24" /><Skeleton className="h-24" /><Skeleton className="h-24" /></div>
      ) : !groups.length ? (
        <EmptyState icon={BookOpen} title="Dars topilmadi" description="Boshqa so‘z bilan qidirib ko‘ring." />
      ) : (
        <div className="space-y-8">
          {groups.map(([title, items]) => (
            <section key={title}>
              <h2 className="mb-3 font-sans text-sm font-semibold tracking-normal text-muted">{title}</h2>
              <ul className="grid gap-3 md:grid-cols-2">
                {items.map((l) => (
                  <li key={l._id}>
                    <Link to={`/app/lessons/${l.slug}`} className="panel flex h-full flex-col p-4 transition-colors hover:border-primary/50">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-sans text-[15px] font-semibold tracking-normal text-ink">{l.title}</h3>
                        {user?.role === 'student' && <StatusBadge status={l.status} />}
                      </div>
                      <p className="mt-1 line-clamp-2 flex-1 text-sm text-muted">{l.summary}</p>
                      <p className="mt-3 flex items-center gap-3 text-xs text-muted"><span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" aria-hidden />{l.durationMinutes} daqiqa</span><span>{DIFF[l.difficulty]}</span>{l.bestPercent ? <span>Natija: {l.bestPercent}%</span> : null}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
