import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { GitCompare, GraduationCap, Landmark, Map, MapPin, Search, SlidersHorizontal, X } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import Button from '../components/ui/Button.jsx';
import Badge from '../components/ui/Badge.jsx';
import FavoriteButton from '../components/FavoriteButton.jsx';
import { Select, Input } from '../components/ui/Field.jsx';
import { EmptyState, ErrorState, Skeleton } from '../components/ui/Feedback.jsx';
import { useApi, useDocumentTitle } from '../hooks/useApi.js';
import { useFavorites } from '../hooks/useFavorites.js';
import { useToast } from '../context/ToastContext.jsx';
import { qs } from '../lib/api.js';
import { cx } from '../lib/format.js';

export const DATA_STATUS = {
  demo: { label: 'Demo yozuv', tone: 'warning', hint: 'Nomi, joylashuvi va rasmiy sayti ochiq manbalardan olingan; DevForge jamoasi tomonidan tekshirilmagan.' },
  partial: { label: 'Qisman tekshirilgan', tone: 'signal', hint: 'Ayrim maydonlar tasdiqlangan.' },
  verified: { label: 'Tasdiqlangan', tone: 'success', hint: 'Ma’lumotlar rasmiy manbalar bilan solishtirilgan.' }
};

const FILTER_KEYS = ['q', 'country', 'city', 'field', 'degree', 'type', 'language', 'scholarship', 'minTuition', 'maxTuition'];

export default function Universities() {
  useDocumentTitle('Universitetlar');
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const toast = useToast();
  const fav = useFavorites('university');
  const [showFilters, setShowFilters] = useState(false);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState(params.get('q') || '');
  const filters = Object.fromEntries(FILTER_KEYS.map((k) => [k, params.get(k) || '']));
  const page = Number(params.get('page') || 1);
  const opts = useApi('/universities/filters');
  const list = useApi(`/universities${qs({ ...filters, page, limit: 12 })}`, { withMeta: true });

  useEffect(() => {
    const t = setTimeout(() => {
      if ((params.get('q') || '') !== search) update({ q: search });
    }, 350);
    return () => clearTimeout(t);
  }, [search]);

  function update(patch) {
    const next = new URLSearchParams(params);
    for (const [k, v] of Object.entries(patch)) {
      if (v) next.set(k, v);
      else next.delete(k);
    }
    if (!('page' in patch)) next.delete('page');
    if ('country' in patch) next.delete('city');
    setParams(next, { replace: true });
  }

  const activeCount = FILTER_KEYS.filter((k) => k !== 'q' && filters[k]).length;
  const cities = filters.country ? opts.data?.cities?.[filters.country] || [] : [...new Set(Object.values(opts.data?.cities || {}).flat())].sort();
  const toggleSelect = (slug) => setSelected((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : s.length >= 3 ? (toast.info('Ko‘pi bilan 3 ta universitetni taqqoslash mumkin'), s) : [...s, slug]));

  const filterPanel = (
    <div className="space-y-4">
      <Select label="Mamlakat" value={filters.country} onChange={(e) => update({ country: e.target.value })} placeholder="Barchasi" options={(opts.data?.countries || []).map((c) => ({ value: c, label: c }))} />
      <Select label="Shahar" value={filters.city} onChange={(e) => update({ city: e.target.value })} placeholder="Barchasi" options={cities.map((c) => ({ value: c, label: c }))} />
      <Select label="Ta’lim yo‘nalishi" value={filters.field} onChange={(e) => update({ field: e.target.value })} placeholder="Barchasi" options={(opts.data?.fields || []).map((c) => ({ value: c, label: c }))} />
      <Select label="Daraja" value={filters.degree} onChange={(e) => update({ degree: e.target.value })} placeholder="Barchasi" options={(opts.data?.degrees || []).map((c) => ({ value: c, label: c }))} />
      <Select label="Muassasa turi" value={filters.type} onChange={(e) => update({ type: e.target.value })} placeholder="Barchasi" options={[{ value: 'public', label: 'Davlat' }, { value: 'private', label: 'Xususiy' }]} />
      <Select label="Ta’lim tili" value={filters.language} onChange={(e) => update({ language: e.target.value })} placeholder="Barchasi" options={(opts.data?.languages || []).map((c) => ({ value: c, label: c }))} />
      <label className="flex items-center gap-2.5 text-sm text-ink">
        <input type="checkbox" checked={filters.scholarship === 'true'} onChange={(e) => update({ scholarship: e.target.checked ? 'true' : '' })} className="h-4 w-4 accent-[rgb(var(--primary))]" />
        Grant yoki stipendiya dasturi bor
      </label>
      <div>
        <p className="label">Yillik to‘lov (USD)</p>
        <div className="grid grid-cols-2 gap-2">
          <Input aria-label="Minimal to‘lov" type="number" min={0} placeholder="dan" value={filters.minTuition} onChange={(e) => update({ minTuition: e.target.value })} />
          <Input aria-label="Maksimal to‘lov" type="number" min={0} placeholder="gacha" value={filters.maxTuition} onChange={(e) => update({ maxTuition: e.target.value })} />
        </div>
        <p className="mt-1.5 text-xs text-muted">Faqat tasdiqlangan to‘lov ma’lumotiga ega universitetlar hisobga olinadi.</p>
      </div>
      {activeCount > 0 && <Button variant="ghost" size="sm" icon={X} onClick={() => setParams({}, { replace: true })}>Filtrlarni tozalash</Button>}
    </div>
  );

  const items = list.data?.universities || [];
  return (
    <div className="pb-20">
      <PageHeader
        title="Universitetlar"
        description="O‘zbekiston, Janubiy Koreya, Xitoy, Germaniya, Turkiya va AQSHdagi universitetlar. Tasdiqlanmagan to‘lov, grant yoki muddat ko‘rsatilmaydi — rasmiy saytni tekshiring."
        actions={<Button to="/map" variant="secondary" icon={Map}>Xaritada ko‘rish</Button>}
      />
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block"><div className="panel sticky top-20 p-4">{filterPanel}</div></aside>
        <div className="min-w-0">
          <div className="mb-4 flex gap-2">
            <label className="relative flex-1">
              <span className="sr-only">Universitet qidirish</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Nomi yoki shahar bo‘yicha qidirish" className="field pl-9" />
            </label>
            <Button variant="secondary" icon={SlidersHorizontal} className="lg:hidden" onClick={() => setShowFilters((s) => !s)} aria-expanded={showFilters}>Filtrlar{activeCount ? ` (${activeCount})` : ''}</Button>
          </div>
          {showFilters && <div className="panel mb-4 p-4 lg:hidden">{filterPanel}</div>}
          {list.data?.tuitionNote && <p className="mb-4 rounded-control bg-signal-soft px-3 py-2 text-sm text-ink">{list.data.tuitionNote}</p>}
          {list.error ? <ErrorState error={list.error} onRetry={list.reload} /> : list.loading && !list.data ? (
            <div className="grid gap-4 md:grid-cols-2">{Array.from({ length: 4 }, (_, i) => <Skeleton key={i} className="h-40" />)}</div>
          ) : !items.length ? (
            <EmptyState icon={Landmark} title="Mos universitet topilmadi" description={filters.minTuition || filters.maxTuition ? 'Hozircha tasdiqlangan to‘lov ma’lumoti bor universitetlar yo‘q. To‘lov filtrini olib tashlang.' : 'Filtrlarni o‘zgartirib ko‘ring.'} action={<Button variant="secondary" onClick={() => { setSearch(''); setParams({}, { replace: true }); }}>Filtrlarni tozalash</Button>} />
          ) : (
            <>
              <p className="mb-3 text-sm text-muted">{list.meta.total} ta universitet</p>
              <ul className={cx('grid gap-4 md:grid-cols-2', list.loading && 'opacity-60')}>
                {items.map((u) => {
                  const st = DATA_STATUS[u.dataStatus];
                  const isSel = selected.includes(u.slug);
                  return (
                    <li key={u._id} className={cx('panel flex flex-col p-5', isSel && 'border-primary ring-1 ring-primary')}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <Link to={`/universities/${u.slug}`} className="font-semibold text-ink hover:text-primary-ink">{u.name}</Link>
                          {u.localName && u.localName !== u.name && <p className="truncate text-xs text-muted">{u.localName}</p>}
                          <p className="mt-1 flex items-center gap-1 text-sm text-muted"><MapPin className="h-3.5 w-3.5" aria-hidden />{u.city}, {u.country}</p>
                        </div>
                        {fav.enabled && <FavoriteButton compact active={fav.has(u._id)} onClick={() => fav.toggle(u._id)} />}
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        <Badge tone="outline">{u.type === 'public' ? 'Davlat' : 'Xususiy'}</Badge>
                        <Badge tone="outline">{u.languages.join(', ')}</Badge>
                        <Badge tone={st.tone}>{st.label}</Badge>
                      </div>
                      <p className="mt-3 line-clamp-2 flex-1 text-sm text-muted">{u.fields.join(' · ')}</p>
                      <div className="mt-4 flex items-center gap-2 border-t border-line pt-3">
                        <Button to={`/universities/${u.slug}`} size="sm" variant="secondary" className="flex-1">Batafsil</Button>
                        <Button to={`/map?u=${u.slug}`} size="iconSm" variant="ghost" aria-label="Xaritada ko‘rish"><Map className="h-4 w-4" /></Button>
                        <label className="flex cursor-pointer items-center gap-2 rounded-control px-2 py-1.5 text-sm text-ink hover:bg-sunken">
                          <input type="checkbox" checked={isSel} onChange={() => toggleSelect(u.slug)} className="h-4 w-4 accent-[rgb(var(--primary))]" />Taqqoslash
                        </label>
                      </div>
                    </li>
                  );
                })}
              </ul>
              {list.meta.pages > 1 && (
                <nav className="mt-6 flex items-center justify-center gap-3" aria-label="Sahifalar">
                  <Button variant="secondary" size="sm" disabled={page <= 1} onClick={() => update({ page: String(page - 1) })}>Oldingi</Button>
                  <span className="text-sm text-muted">{page} / {list.meta.pages}</span>
                  <Button variant="secondary" size="sm" disabled={page >= list.meta.pages} onClick={() => update({ page: String(page + 1) })}>Keyingi</Button>
                </nav>
              )}
            </>
          )}
        </div>
      </div>
      {selected.length > 0 && (
        <div className="fixed inset-x-0 bottom-4 z-30 flex justify-center px-4">
          <div className="flex w-full max-w-xl animate-rise-in items-center gap-3 rounded-panel border border-line bg-surface p-3 shadow-xl shadow-navy/10">
            <p className="flex-1 text-sm text-ink"><GraduationCap className="mr-1.5 inline h-4 w-4 text-primary" aria-hidden />{selected.length} ta tanlandi</p>
            <Button size="sm" variant="ghost" onClick={() => setSelected([])}>Tozalash</Button>
            <Button size="sm" icon={GitCompare} disabled={selected.length < 2} onClick={() => navigate(`/universities/compare?slugs=${selected.join(',')}`)}>{selected.length < 2 ? 'Yana bittasini tanlang' : 'Taqqoslash'}</Button>
          </div>
        </div>
      )}
    </div>
  );
}
