import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Compass, GitCompare, Info, Lightbulb, RotateCcw, Route, Sparkles, ChevronDown } from 'lucide-react';
import PageHeader from '../../components/PageHeader.jsx';
import Button from '../../components/ui/Button.jsx';
import Card from '../../components/ui/Card.jsx';
import Icon from '../../components/ui/Icon.jsx';
import FavoriteButton from '../../components/FavoriteButton.jsx';
import ForgePath from '../../components/ForgePath.jsx';
import { EmptyState, ErrorState, PageSkeleton } from '../../components/ui/Feedback.jsx';
import Markdown from '../../components/ui/Markdown.jsx';
import { useApi, useDocumentTitle } from '../../hooks/useApi.js';
import { useFavorites } from '../../hooks/useFavorites.js';
import { useStartRoadmap } from '../../hooks/useStartRoadmap.js';
import { useToast } from '../../context/ToastContext.jsx';
import { api } from '../../lib/api.js';
import { cx, formatDate } from '../../lib/format.js';

function ScoreRing({ value }) {
  const r = 30;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-20 w-20 shrink-0" role="img" aria-label={`Taxminiy moslik ${value}%`}>
      <svg viewBox="0 0 72 72" className="h-20 w-20 -rotate-90">
        <circle cx="36" cy="36" r={r} fill="none" strokeWidth="7" className="stroke-sunken" />
        <circle cx="36" cy="36" r={r} fill="none" strokeWidth="7" strokeLinecap="round" className="stroke-primary" strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)} />
      </svg>
      <span className="absolute inset-0 grid place-items-center font-display text-lg font-semibold text-ink">{value}%</span>
    </div>
  );
}

function CareerResult({ rec, rank, fav, start, pending, aiText }) {
  const d = rec.details;
  const [open, setOpen] = useState(rank === 1);
  if (!d) return null;
  return (
    <article className={cx('panel overflow-hidden', rank === 1 && 'border-primary/50')}>
      <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-6">
        <ScoreRing value={rec.score} />
        <div className="min-w-0 flex-1">
          <p className="text-sm text-muted">{rank}-o‘rin · {d.category}</p>
          <h2 className="mt-0.5 flex items-center gap-2 font-sans text-xl font-semibold tracking-normal text-ink">
            <Icon name={d.icon} className="h-5 w-5 text-primary" />
            {rec.name}
          </h2>
          {rec.matchedStrengths?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {rec.matchedStrengths.map((s) => <span key={s} className="rounded-full bg-success-soft px-2.5 py-0.5 text-xs text-success">{s}</span>)}
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button icon={Route} onClick={() => start(rec.slug)} loading={pending === rec.slug}>Yo‘l xaritasi</Button>
          {fav.enabled && <FavoriteButton compact active={fav.has(d._id)} onClick={() => fav.toggle(d._id)} />}
        </div>
      </div>
      <div className="border-t border-line px-5 py-4 sm:px-6">
        <h3 className="text-sm font-semibold text-ink">Nega mos keladi</h3>
        <ul className="mt-2 space-y-1.5 text-sm text-ink/85">
          {rec.reasons.map((r) => <li key={r} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />{r}</li>)}
        </ul>
        {aiText && (
          <div className="mt-4 rounded-control bg-primary-soft/60 p-3.5 text-sm">
            <p className="mb-1 flex items-center gap-1.5 text-xs font-medium text-primary-ink"><Sparkles className="h-3.5 w-3.5" aria-hidden />AI izohi (moslik foizini o‘zgartirmaydi)</p>
            <Markdown text={aiText} />
          </div>
        )}
      </div>
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex w-full items-center justify-between border-t border-line px-5 py-3 text-sm font-medium text-ink hover:bg-sunken sm:px-6">
        Ko‘nikmalar, fanlar va o‘qish yo‘li
        <ChevronDown className={cx('h-4 w-4 transition-transform', open && 'rotate-180')} aria-hidden />
      </button>
      {open && (
        <div className="grid gap-6 border-t border-line p-5 sm:p-6 md:grid-cols-2">
          <div className="space-y-5">
            <div>
              <h3 className="text-sm font-semibold text-ink">Kerakli ko‘nikmalar</h3>
              <div className="mt-2 flex flex-wrap gap-1.5">{d.skills.map((s) => <span key={s} className="rounded-full border border-line px-2.5 py-1 text-xs text-ink">{s}</span>)}</div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-ink">Tavsiya etilgan maktab fanlari</h3>
              <p className="mt-1 text-sm text-muted">{d.schoolSubjects.join(', ')}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-ink">Kasbiy yo‘nalishlar</h3>
              <p className="mt-1 text-sm text-muted">{d.directions.join(', ')}</p>
            </div>
            <div className="rounded-control border border-primary/30 bg-primary-soft/40 p-3.5">
              <p className="flex items-center gap-1.5 text-sm font-semibold text-primary-ink"><Lightbulb className="h-4 w-4" aria-hidden />Keyingi qadam</p>
              <p className="mt-1 text-sm text-ink">{d.nextAction}</p>
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-ink">Kutilayotgan o‘qish yo‘li</h3>
            <ForgePath steps={d.learningPath.map((p) => ({ title: p, state: 'todo' }))} />
            <Link to={`/careers/${rec.slug}`} className="mt-4 inline-block text-sm font-medium text-primary-ink hover:underline">Kasb sahifasini ochish</Link>
          </div>
        </div>
      )}
    </article>
  );
}

export default function Results() {
  useDocumentTitle('Natijalarim');
  const { data, loading, error, reload } = useApi('/assessments/results/latest');
  const fav = useFavorites('career');
  const { start, pending } = useStartRoadmap();
  const toast = useToast();
  const [ai, setAi] = useState({ loading: false, map: {} });
  const [showAll, setShowAll] = useState(false);

  if (loading) return <PageSkeleton />;
  if (error) return <ErrorState error={error} onRetry={reload} />;
  if (!data.result) {
    return (
      <>
        <PageHeader title="Natijalarim" />
        <EmptyState icon={Compass} title="Siz hali kasb testini topshirmagansiz" description="14 ta savolga javob bering va sizga mos 3 ta kasbni sabablari bilan ko‘ring." action={<Button to="/app/assessment" icon={Compass}>Testni boshlash</Button>} />
      </>
    );
  }

  const r = data.result;
  const profile = Object.entries(r.traitProfile).sort((a, b) => b[1] - a[1]);

  const explain = async () => {
    setAi((s) => ({ ...s, loading: true }));
    try {
      const d = await api.post(`/ai/explain-result/${r._id}`);
      if (d.demo) toast.info(d.message || 'AI provayder sozlanmagan — shaffof algoritm izohlari ko‘rsatilmoqda.');
      setAi({ loading: false, map: Object.fromEntries(d.explanations.filter((e) => e.text).map((e) => [e.slug, e.text])) });
    } catch (err) {
      toast.error(err);
      setAi((s) => ({ ...s, loading: false }));
    }
  };
  const aiMap = { ...Object.fromEntries(r.top.filter((t) => t.aiExplanation).map((t) => [t.slug, t.aiExplanation])), ...ai.map };

  return (
    <div>
      <PageHeader
        title="Sizga mos kasblar"
        description={`Test ${formatDate(r.createdAt)} kuni topshirilgan. Foizlar javoblaringiz va kasb profillari asosida hisoblangan taxminiy moslikdir.`}
        actions={
          <>
            <Button variant="secondary" icon={Sparkles} onClick={explain} loading={ai.loading}>AI izohini olish</Button>
            <Button variant="secondary" icon={GitCompare} to={`/careers/compare?slugs=${r.top.map((t) => t.slug).join(',')}`}>Taqqoslash</Button>
            <Button variant="ghost" icon={RotateCcw} to="/app/assessment">Qayta topshirish</Button>
          </>
        }
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-4">
          {r.top.map((rec, i) => <CareerResult key={rec.slug} rec={rec} rank={i + 1} fav={fav} start={start} pending={pending} aiText={aiMap[rec.slug]} />)}
          <div className="panel">
            <button onClick={() => setShowAll((s) => !s)} aria-expanded={showAll} className="flex w-full items-center justify-between px-5 py-4 text-sm font-medium text-ink">
              Barcha kasblar bo‘yicha moslik
              <ChevronDown className={cx('h-4 w-4 transition-transform', showAll && 'rotate-180')} aria-hidden />
            </button>
            {showAll && (
              <ul className="divide-y divide-line border-t border-line">
                {r.ranking.map((x, i) => (
                  <li key={x.slug} className="flex items-center gap-3 px-5 py-2.5 text-sm">
                    <span className="w-6 text-muted tabular-nums">{i + 1}</span>
                    <Link to={`/careers/${x.slug}`} className="flex-1 text-ink hover:text-primary-ink">{x.name}</Link>
                    <div className="hidden h-1.5 w-32 overflow-hidden rounded-full bg-sunken sm:block"><div className="h-full rounded-full bg-primary/70" style={{ width: `${x.score}%` }} /></div>
                    <span className="w-10 text-right tabular-nums text-ink">{x.score}%</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <aside className="space-y-4">
          <Card title="Sizning xususiyatlaringiz" description="Eng kuchli xususiyatingizga nisbatan.">
            <ul className="space-y-2.5">
              {profile.slice(0, 8).map(([k, v]) => (
                <li key={k}>
                  <div className="mb-1 flex justify-between text-sm"><span className="text-ink">{data.traitLabels[k]}</span><span className="tabular-nums text-muted">{Math.round(v * 100)}%</span></div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-sunken"><div className="h-full rounded-full bg-signal" style={{ width: `${v * 100}%` }} /></div>
                </li>
              ))}
            </ul>
          </Card>
          <section className="rounded-panel border border-line bg-sunken/60 p-5">
            <h2 className="flex items-center gap-2 font-sans text-sm font-semibold tracking-normal text-ink"><Info className="h-4 w-4 text-signal" aria-hidden />Qanday hisoblandi</h2>
            <p className="mt-2 text-[13px] leading-relaxed text-muted">{data.method.summary}</p>
            <p className="mt-3 text-[13px] leading-relaxed text-ink">{data.method.disclaimer}</p>
          </section>
          <Button to="/app/advisor" variant="secondary" className="w-full" icon={BookOpen}>Natijani maslahatchi bilan muhokama qilish</Button>
        </aside>
      </div>
    </div>
  );
}
