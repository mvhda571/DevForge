import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, CircleMarker, Popup, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { AlertTriangle, BookOpen, Bus, Coffee, GraduationCap, Home, Info, Landmark, Pill, RefreshCw, ShoppingBag } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import Button from '../components/ui/Button.jsx';
import Badge from '../components/ui/Badge.jsx';
import { Select } from '../components/ui/Field.jsx';
import { ErrorState, Skeleton } from '../components/ui/Feedback.jsx';
import { useApi, useDocumentTitle } from '../hooks/useApi.js';
import { api, qs } from '../lib/api.js';
import { cx, formatDate } from '../lib/format.js';

export const PLACE_CATEGORIES = [
  { key: 'university', label: 'Universitetlar', icon: GraduationCap, color: '#6A4BFF' },
  { key: 'library', label: 'Kutubxonalar', icon: BookOpen, color: '#0E7490' },
  { key: 'cafe', label: 'Kafelar', icon: Coffee, color: '#B45309' },
  { key: 'pharmacy', label: 'Dorixonalar', icon: Pill, color: '#15803D' },
  { key: 'shop', label: 'Do‘konlar', icon: ShoppingBag, color: '#BE185D' },
  { key: 'accommodation', label: 'Yotoqxona / turar joy', icon: Home, color: '#7C2D12' },
  { key: 'transport', label: 'Jamoat transporti', icon: Bus, color: '#1D4ED8' }
];
const CAT = Object.fromEntries(PLACE_CATEGORIES.map((c) => [c.key, c]));
const DEFAULT_CATS = ['library', 'cafe', 'pharmacy', 'transport', 'accommodation'];
const RADII = [
  { value: '500', label: '500 m' },
  { value: '1000', label: '1 km' },
  { value: '1500', label: '1,5 km' },
  { value: '2000', label: '2 km' }
];

function FitView({ center, radius, points }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo([center.lat, center.lng], radius > 1200 ? 14 : 15, { duration: 0.6 });
    else if (points.length) map.fitBounds(points.map((p) => [p.lat, p.lng]), { padding: [30, 30], maxZoom: 6 });
  }, [center?.lat, center?.lng, radius, points.length]);
  return null;
}

export default function UniversityMap() {
  useDocumentTitle('Universitetlar xaritasi');
  const [params, setParams] = useSearchParams();
  const slug = params.get('u') || '';
  const [cats, setCats] = useState(DEFAULT_CATS);
  const [radius, setRadius] = useState('1000');
  const [nearby, setNearby] = useState({ loading: false, error: null, data: null });
  const unis = useApi('/universities?limit=60');

  const list = unis.data?.universities || [];
  const withCoords = useMemo(() => list.filter((u) => u.location?.lat != null && u.location?.lng != null), [list]);
  const selected = withCoords.find((u) => u.slug === slug) || null;
  const selectedWithoutCoords = slug && list.length && !selected ? list.find((u) => u.slug === slug) : null;

  const load = async () => {
    if (!selected || !cats.length) {
      setNearby({ loading: false, error: null, data: null });
      return;
    }
    setNearby((s) => ({ ...s, loading: true, error: null }));
    try {
      const data = await api.get(`/universities/${selected.slug}/nearby${qs({ categories: cats.join(','), radius })}`);
      setNearby({ loading: false, error: null, data });
    } catch (err) {
      setNearby({ loading: false, error: err, data: null });
    }
  };

  useEffect(() => {
    const t = setTimeout(load, 300);
    return () => clearTimeout(t);
  }, [selected?.slug, cats.join(','), radius]);

  const toggleCat = (key) => setCats((c) => (c.includes(key) ? c.filter((x) => x !== key) : [...c, key]));
  const choose = (s) => setParams(s ? { u: s } : {}, { replace: true });

  const places = (nearby.data?.places || []).filter((p) => cats.includes(p.category));
  const counts = places.reduce((m, p) => ({ ...m, [p.category]: (m[p.category] || 0) + 1 }), {});
  const named = places.filter((p) => p.name).slice(0, 40);

  return (
    <div>
      <PageHeader
        title="Universitetlar xaritasi"
        description="Universitetni tanlang va uning atrofidagi kutubxona, kafe, dorixona, do‘kon, turar joy va transport bekatlarini ko‘ring."
      />

      <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
        <aside className="space-y-4">
          <div className="panel space-y-4 p-4">
            {unis.loading ? <Skeleton className="h-10" /> : (
              <Select
                label="Universitet"
                value={slug}
                onChange={(e) => choose(e.target.value)}
                placeholder="Barcha universitetlar"
                options={list.map((u) => ({ value: u.slug, label: `${u.name} — ${u.city}` }))}
              />
            )}
            <Select label="Qidiruv radiusi" value={radius} onChange={(e) => setRadius(e.target.value)} options={RADII} disabled={!selected} />
            <fieldset>
              <legend className="label">Joy turlari</legend>
              <div className="flex flex-wrap gap-2">
                {PLACE_CATEGORIES.map((c) => {
                  const active = cats.includes(c.key);
                  return (
                    <button
                      key={c.key}
                      type="button"
                      aria-pressed={active}
                      onClick={() => toggleCat(c.key)}
                      className={cx('inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] transition-colors', active ? 'border-primary bg-primary-soft text-primary-ink' : 'border-line bg-surface text-muted hover:text-ink')}
                    >
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }} aria-hidden />
                      {c.label}
                      {selected && active && counts[c.key] !== undefined && <span className="text-xs text-muted">{counts[c.key]}</span>}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </div>

          {selected && (
            <div className="panel p-4">
              <p className="text-xs text-muted">Tanlangan</p>
              <p className="mt-0.5 font-semibold text-ink">{selected.name}</p>
              <p className="text-sm text-muted">{selected.city}, {selected.country}</p>
              {selected.location?.approximate && <p className="mt-2 text-xs text-muted">Koordinatalar taxminiy — kampus kirish joyi farq qilishi mumkin.</p>}
              <div className="mt-3 flex flex-wrap gap-2">
                <Button to={`/universities/${selected.slug}`} size="sm" variant="secondary" icon={Landmark}>Batafsil</Button>
                <Button size="sm" variant="ghost" onClick={() => choose('')}>Tanlovni bekor qilish</Button>
              </div>
            </div>
          )}

          {selected && named.length > 0 && (
            <div className="panel p-4">
              <h2 className="text-sm font-semibold text-ink">Atrofdagi joylar</h2>
              <ul className="mt-2 max-h-72 divide-y divide-line overflow-y-auto text-sm">
                {named.map((p) => {
                  const c = CAT[p.category];
                  return (
                    <li key={p.id} className="flex items-start gap-2 py-2">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ background: c.color }} aria-hidden />
                      <div className="min-w-0">
                        <p className="truncate text-ink">{p.name}</p>
                        <p className="text-xs text-muted">{c.label}{p.address ? ` · ${p.address}` : ''}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </aside>

        <section className="space-y-3" aria-label="Xarita">
          {selectedWithoutCoords && (
            <div className="flex items-start gap-2 rounded-control border border-warning/30 bg-warning-soft/50 p-3 text-sm text-ink" role="status">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-warning" aria-hidden />
              {selectedWithoutCoords.name} uchun koordinatalar mavjud emas.
            </div>
          )}
          {nearby.error && (
            <div className="flex flex-col gap-3 rounded-control border border-danger/30 bg-danger-soft/40 p-3 text-sm sm:flex-row sm:items-center" role="alert">
              <AlertTriangle className="h-4 w-4 shrink-0 text-danger" aria-hidden />
              <p className="flex-1 text-ink">{nearby.error.message} Universitet joylashuvi baribir ko‘rsatilmoqda.</p>
              <Button size="sm" variant="secondary" icon={RefreshCw} onClick={load}>Qayta urinish</Button>
            </div>
          )}
          {nearby.data?.stale && <Badge tone="warning">Xizmat javob bermadi — avvalgi saqlangan natija ko‘rsatilmoqda ({formatDate(nearby.data.fetchedAt, true)})</Badge>}

          {unis.error ? <ErrorState error={unis.error} onRetry={unis.reload} /> : (
            <div className="relative h-[460px] overflow-hidden rounded-panel border border-line sm:h-[560px]">
              <MapContainer center={[41.31, 69.27]} zoom={4} scrollWheelZoom className="h-full w-full" worldCopyJump>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> hissadorlari'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  maxZoom={19}
                />
                <FitView center={selected?.location} radius={Number(radius)} points={withCoords.map((u) => u.location)} />
                {selected && <Circle center={[selected.location.lat, selected.location.lng]} radius={Number(radius)} pathOptions={{ color: '#6A4BFF', weight: 1, fillOpacity: 0.05 }} />}
                {(selected ? [selected] : withCoords).map((u) => (
                  <CircleMarker
                    key={u.slug}
                    center={[u.location.lat, u.location.lng]}
                    radius={selected ? 11 : 8}
                    pathOptions={{ color: '#fff', weight: 2, fillColor: '#0E1A33', fillOpacity: 1 }}
                    eventHandlers={{ click: () => !selected && choose(u.slug) }}
                  >
                    <Popup>
                      <strong>{u.name}</strong>
                      <br />
                      {u.city}, {u.country}
                      <br />
                      <Link to={`/universities/${u.slug}`}>Batafsil ma’lumot</Link>
                    </Popup>
                  </CircleMarker>
                ))}
                {places.map((p) => {
                  const c = CAT[p.category];
                  return (
                    <CircleMarker key={p.id} center={[p.lat, p.lng]} radius={6} pathOptions={{ color: '#fff', weight: 1.5, fillColor: c.color, fillOpacity: 0.95 }}>
                      <Popup>
                        <strong>{p.name || 'Nomi ko‘rsatilmagan'}</strong>
                        <br />
                        {c.label}
                        {p.address && (<><br />{p.address}</>)}
                        {p.openingHours && (<><br />Ish vaqti: {p.openingHours}</>)}
                        <br />
                        <small>OpenStreetMap ma’lumoti, tasdiqlanmagan</small>
                      </Popup>
                    </CircleMarker>
                  );
                })}
              </MapContainer>
              {nearby.loading && (
                <div className="pointer-events-none absolute inset-x-0 top-3 z-[500] flex justify-center">
                  <span className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-muted shadow">Atrofdagi joylar yuklanmoqda…</span>
                </div>
              )}
            </div>
          )}
          <p className="text-xs text-muted">
            Xarita va joylar © OpenStreetMap hissadorlari (ODbL). Joylar jamoatchilik tomonidan kiritilgan va DevForge tomonidan tasdiqlanmagan — ish vaqti va manzilni joyning o‘zidan aniqlang.
            {!selected && ' Atrofni ko‘rish uchun universitetni tanlang yoki xaritadagi nuqtani bosing.'}
          </p>
        </section>
      </div>
    </div>
  );
}
