import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarPlus, ExternalLink, Globe, Map, MapPin, ShieldAlert, ShieldCheck } from 'lucide-react';
import Button from '../components/ui/Button.jsx';
import Badge from '../components/ui/Badge.jsx';
import Card from '../components/ui/Card.jsx';
import FavoriteButton from '../components/FavoriteButton.jsx';
import { ErrorState, PageSkeleton } from '../components/ui/Feedback.jsx';
import { useApi, useDocumentTitle } from '../hooks/useApi.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { api } from '../lib/api.js';
import { formatDate } from '../lib/format.js';
import { DATA_STATUS } from './Universities.jsx';
import { ReminderForm } from './student/Reminders.jsx';

const NA = <span className="text-muted">Ma’lumot mavjud emas</span>;

function Verified({ ok }) {
  return ok ? <Badge tone="success" icon={ShieldCheck}>Tasdiqlangan</Badge> : <Badge tone="warning" icon={ShieldAlert}>Tasdiqlanmagan</Badge>;
}

export default function UniversityDetail() {
  const { slug } = useParams();
  const { user } = useAuth();
  const toast = useToast();
  const { data, loading, error, reload, setData } = useApi(`/universities/${slug}`);
  const [reminder, setReminder] = useState(false);
  const u = data?.university;
  useDocumentTitle(u?.name || 'Universitet');

  if (loading) return <PageSkeleton />;
  if (error) return <ErrorState error={error} onRetry={reload} />;

  const st = DATA_STATUS[u.dataStatus];
  const isStudent = user?.role === 'student';
  const toggleFav = async () => {
    try {
      if (data.isFavorite) await api.delete(`/favorites/by-ref/university/${u._id}`);
      else await api.post('/favorites', { kind: 'university', refId: u._id });
      setData((d) => ({ ...d, isFavorite: !d.isFavorite }));
      toast.success(data.isFavorite ? 'Saqlanganlardan olib tashlandi' : 'Universitet saqlandi');
    } catch (err) {
      toast.error(err);
    }
  };
  const t = u.tuition || {};
  const hasTuition = t.verified && (t.min != null || t.max != null);

  return (
    <div>
      <Link to="/universities" className="mb-5 inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink"><ArrowLeft className="h-4 w-4" />Universitetlar</Link>
      <header className="panel mb-6 p-6 md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-1.5">
              <Badge tone={st.tone}>{st.label}</Badge>
              <Badge tone="outline">{u.type === 'public' ? 'Davlat universiteti' : 'Xususiy universitet'}</Badge>
            </div>
            <h1 className="page-title mt-3">{u.name}</h1>
            {u.localName && u.localName !== u.name && <p className="mt-1 text-muted">{u.localName}</p>}
            <p className="mt-3 flex items-center gap-1.5 text-ink"><MapPin className="h-4 w-4 text-primary" aria-hidden />{u.city}, {u.country}</p>
            {u.description && <p className="mt-3 max-w-prose text-[15px] text-ink/85">{u.description}</p>}
          </div>
          <div className="flex flex-wrap gap-2 md:flex-col md:items-stretch">
            {u.website && <Button href={u.website} icon={Globe} iconRight={ExternalLink}>Rasmiy sayt</Button>}
            <Button to={`/map?u=${u.slug}`} variant="secondary" icon={Map}>Atrofini xaritada ko‘rish</Button>
            {isStudent && <FavoriteButton active={data.isFavorite} onClick={toggleFav} />}
            {isStudent && <Button variant="ghost" icon={CalendarPlus} onClick={() => setReminder(true)}>Muddat eslatmasi</Button>}
          </div>
        </div>
        <p className="mt-6 rounded-control bg-sunken px-4 py-3 text-[13px] text-muted">{st.hint} Oxirgi tekshiruv: {u.lastVerifiedAt ? formatDate(u.lastVerifiedAt) : 'tekshirilmagan'}. Hujjat topshirishdan oldin barcha shartlarni rasmiy saytdan tekshiring.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Ta’lim yo‘nalishlari va dasturlar">
          <p className="text-sm text-muted">Umumiy yo‘nalishlar</p>
          <div className="mt-2 flex flex-wrap gap-1.5">{u.fields.map((f) => <span key={f} className="rounded-full bg-sunken px-3 py-1 text-sm text-ink">{f}</span>)}</div>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div><dt className="text-muted">Darajalar</dt><dd className="text-ink">{u.degreeLevels.join(', ')}</dd></div>
            <div><dt className="text-muted">Ta’lim tili</dt><dd className="text-ink">{u.languages.join(', ')}</dd></div>
          </dl>
          <p className="mt-4 text-sm text-muted">Aniq dasturlar ro‘yxati</p>
          {u.programs?.length ? (
            <ul className="mt-2 divide-y divide-line text-sm">{u.programs.map((p) => <li key={p.name + p.degree} className="flex justify-between py-2"><span className="text-ink">{p.name}</span><span className="text-muted">{p.degree} · {p.language}</span></li>)}</ul>
          ) : <p className="mt-1 text-sm">{NA}</p>}
        </Card>
        <Card title="O‘qish to‘lovi" action={<Verified ok={t.verified} />}>
          {hasTuition ? (
            <p className="font-display text-2xl font-semibold text-ink">{t.min?.toLocaleString()}{t.max != null && t.max !== t.min ? ` – ${t.max.toLocaleString()}` : ''} {t.currency} <span className="text-base font-normal text-muted">/ {t.period}</span></p>
          ) : <p className="text-[15px]">{NA}</p>}
          {t.note && <p className="mt-2 text-sm text-muted">{t.note}</p>}
          {t.source && <p className="mt-2 text-xs text-muted">Manba: {t.source}</p>}
        </Card>
        <Card title="Grant va stipendiyalar">
          {u.scholarships?.length ? (
            <ul className="space-y-3">
              {u.scholarships.map((s) => (
                <li key={s.name} className="rounded-control border border-line p-3.5">
                  <div className="flex flex-wrap items-center justify-between gap-2"><p className="font-medium text-ink">{s.name}</p><Verified ok={s.verified} /></div>
                  {s.description && <p className="mt-1 text-sm text-muted">{s.description}</p>}
                  {s.url && <a href={s.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm text-primary-ink hover:underline">Rasmiy sahifa <ExternalLink className="h-3.5 w-3.5" aria-hidden /></a>}
                </li>
              ))}
            </ul>
          ) : <p className="text-[15px]">{NA}</p>}
          <p className="mt-3 text-xs text-muted">Grant yoki stipendiya mavjudligi uni olish kafolati emas.</p>
        </Card>
        <Card title="Qabul talablari" action={<Verified ok={u.admission?.verified} />}>
          {u.admission?.requirements?.length ? <ul className="list-disc space-y-1 pl-5 text-sm text-ink">{u.admission.requirements.map((r) => <li key={r}>{r}</li>)}</ul> : <p className="text-[15px]">{NA}</p>}
        </Card>
        <Card title="Ariza muddatlari">
          {u.deadlines?.length ? (
            <ul className="divide-y divide-line text-sm">{u.deadlines.map((d) => <li key={d.label} className="flex items-center justify-between gap-2 py-2"><span className="text-ink">{d.label}</span><span className="flex items-center gap-2 text-muted">{formatDate(d.date)} <Verified ok={d.verified} /></span></li>)}</ul>
          ) : <p className="text-[15px]">{NA}</p>}
        </Card>
        <Card title="Joylashuv">
          {u.location?.lat != null ? (
            <>
              <p className="text-sm text-ink">{u.location.lat.toFixed(4)}, {u.location.lng.toFixed(4)}</p>
              {u.location.approximate && <p className="text-xs text-muted">Taxminiy koordinatalar</p>}
              <Button to={`/map?u=${u.slug}`} variant="secondary" size="sm" icon={Map} className="mt-3">Xaritada ochish</Button>
            </>
          ) : <p className="text-[15px]">{NA}</p>}
        </Card>
      </div>
      {reminder && <ReminderForm initial={{ kind: 'deadline', title: `${u.name}: hujjat topshirish`, university: u._id, repeat: 'none' }} universities={[u]} onClose={() => setReminder(false)} onSaved={() => { setReminder(false); }} />}
    </div>
  );
}
