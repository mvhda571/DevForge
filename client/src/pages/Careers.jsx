import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GitCompare, Search, Briefcase, X } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import Icon from '../components/ui/Icon.jsx';
import Button from '../components/ui/Button.jsx';
import FavoriteButton from '../components/FavoriteButton.jsx';
import { EmptyState, ErrorState, Skeleton } from '../components/ui/Feedback.jsx';
import { useApi, useDocumentTitle } from '../hooks/useApi.js';
import { useFavorites } from '../hooks/useFavorites.js';
import { useToast } from '../context/ToastContext.jsx';
import { cx } from '../lib/format.js';

export default function Careers() {
  useDocumentTitle('Kasblar');
  const { data, loading, error, reload } = useApi('/careers');
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');
  const [selected, setSelected] = useState([]);
  const fav = useFavorites('career');
  const toast = useToast();
  const navigate = useNavigate();

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return (data?.careers || []).filter((c) => (!category || c.category === category) && (!term || c.name.toLowerCase().includes(term) || c.description.toLowerCase().includes(term) || c.skills.some((s) => s.toLowerCase().includes(term))));
  }, [data, q, category]);

  const toggleSelect = (slug) => {
    setSelected((s) => {
      if (s.includes(slug)) return s.filter((x) => x !== slug);
      if (s.length >= 3) {
        toast.info('Bir vaqtda ko‘pi bilan 3 ta kasbni taqqoslash mumkin');
        return s;
      }
      return [...s, slug];
    });
  };

  return (
    <div className="pb-20">
      <PageHeader title="Kasblar" description="14 ta kasb profili: nima bilan shug‘ullanadi, qanday ko‘nikmalar va fanlar kerak. Taqqoslash uchun 3 tagacha kasb belgilang." />
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Kasb qidirish</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Kasb yoki ko‘nikma bo‘yicha qidirish" className="field pl-9" />
        </label>
        <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0" role="group" aria-label="Soha bo‘yicha filtr">
          {['', ...(data?.categories || [])].map((c) => (
            <button key={c || 'all'} onClick={() => setCategory(c)} aria-pressed={category === c} className={cx('shrink-0 rounded-full border px-3.5 py-2 text-sm transition-colors', category === c ? 'border-primary bg-primary-soft text-primary-ink' : 'border-line bg-surface text-ink hover:border-primary/40')}>
              {c || 'Barchasi'}
            </button>
          ))}
        </div>
      </div>

      {error ? (
        <ErrorState error={error} onRetry={reload} />
      ) : loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }, (_, i) => <Skeleton key={i} className="h-52" />)}</div>
      ) : list.length === 0 ? (
        <EmptyState icon={Briefcase} title="Mos kasb topilmadi" description="Qidiruv so‘zini o‘zgartiring yoki filtrni olib tashlang." action={<Button variant="secondary" onClick={() => { setQ(''); setCategory(''); }}>Filtrlarni tozalash</Button>} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => {
            const isSel = selected.includes(c.slug);
            return (
              <article key={c.slug} className={cx('panel flex flex-col p-5 transition-colors', isSel && 'border-primary ring-1 ring-primary')}>
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-control bg-primary-soft text-primary-ink"><Icon name={c.icon} /></span>
                  {fav.enabled && <FavoriteButton compact active={fav.has(c._id)} onClick={() => fav.toggle(c._id)} />}
                </div>
                <h2 className="mt-4 font-sans text-base font-semibold tracking-normal text-ink">
                  <Link to={`/careers/${c.slug}`} className="hover:text-primary-ink">{c.name}</Link>
                </h2>
                <p className="text-xs text-muted">{c.category}</p>
                <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted">{c.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {c.skills.slice(0, 3).map((s) => <span key={s} className="rounded-full bg-sunken px-2.5 py-0.5 text-xs text-muted">{s}</span>)}
                </div>
                <div className="mt-5 flex items-center gap-2 border-t border-line pt-4">
                  <Button to={`/careers/${c.slug}`} size="sm" variant="secondary" className="flex-1">Batafsil</Button>
                  <label className="flex cursor-pointer items-center gap-2 rounded-control px-2 py-1.5 text-sm text-ink hover:bg-sunken">
                    <input type="checkbox" checked={isSel} onChange={() => toggleSelect(c.slug)} className="h-4 w-4 accent-[rgb(var(--primary))]" />
                    Taqqoslash
                  </label>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {selected.length > 0 && (
        <div className="fixed inset-x-0 bottom-4 z-30 flex justify-center px-4">
          <div className="flex w-full max-w-xl animate-rise-in items-center gap-3 rounded-panel border border-line bg-surface p-3 shadow-xl shadow-navy/10">
            <div className="flex min-w-0 flex-1 flex-wrap gap-1.5">
              {selected.map((s) => {
                const c = data?.careers.find((x) => x.slug === s);
                return (
                  <span key={s} className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-2.5 py-1 text-xs text-primary-ink">
                    {c?.name}
                    <button onClick={() => toggleSelect(s)} aria-label={`${c?.name} ni olib tashlash`}><X className="h-3 w-3" /></button>
                  </span>
                );
              })}
            </div>
            <Button size="sm" icon={GitCompare} disabled={selected.length < 2} onClick={() => navigate(`/careers/compare?slugs=${selected.join(',')}`)}>
              {selected.length < 2 ? 'Yana bittasini tanlang' : 'Taqqoslash'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
