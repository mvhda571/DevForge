import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, Check, ChevronDown, Circle, CircleDot, Clock, Play, RotateCcw, Settings2, Star, Target, Trash2, AlertTriangle } from 'lucide-react';
import Button from '../../components/ui/Button.jsx';
import Badge from '../../components/ui/Badge.jsx';
import Card from '../../components/ui/Card.jsx';
import Dialog from '../../components/ui/Dialog.jsx';
import { Input, Select, Textarea } from '../../components/ui/Field.jsx';
import { ErrorState, PageSkeleton, ProgressBar } from '../../components/ui/Feedback.jsx';
import { useApi, useDocumentTitle } from '../../hooks/useApi.js';
import { useToast } from '../../context/ToastContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { api } from '../../lib/api.js';
import { cx, minutesLabel } from '../../lib/format.js';

const STAGES = [
  { key: 'beginner', label: 'Boshlang‘ich bosqich' },
  { key: 'intermediate', label: 'O‘rta bosqich' },
  { key: 'advanced', label: 'Yuqori bosqich' }
];

const STATUS_ICON = {
  completed: { icon: Check, cls: 'bg-success text-white border-success' },
  in_progress: { icon: CircleDot, cls: 'border-signal text-signal' },
  needs_review: { icon: RotateCcw, cls: 'border-warning text-warning' },
  not_started: { icon: Circle, cls: 'border-line text-transparent' }
};
const STATUS_TEXT = { completed: 'Tugallangan', in_progress: 'Jarayonda', needs_review: 'Qayta o‘rganish kerak', not_started: 'Boshlanmagan' };

function ModuleItem({ mod, nextId, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  const s = mod.stats;
  return (
    <div className={cx('rounded-panel border bg-surface', mod.optional ? 'border-dashed border-line' : 'border-line')}>
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex w-full items-center gap-4 p-4 text-left sm:p-5">
        <span className={cx('grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 text-sm font-semibold', s.percent === 100 ? 'border-success bg-success text-white' : s.percent > 0 ? 'border-primary text-primary' : 'border-line text-muted')}>
          {s.percent === 100 ? <Check className="h-5 w-5" /> : mod.order}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-sans text-[15px] font-semibold tracking-normal text-ink">{mod.title}</h3>
            {mod.optional && <Badge tone="outline">Ixtiyoriy — takrorlash uchun</Badge>}
            {s.counts.needs_review > 0 && <Badge tone="warning">{s.counts.needs_review} ta takrorlash</Badge>}
          </div>
          <p className="mt-0.5 text-[13px] text-muted">{mod.subject?.name} · {s.counts.completed}/{s.counts.total} dars · {minutesLabel(s.remainingMinutes)} qoldi</p>
        </div>
        <div className="hidden w-28 sm:block"><ProgressBar value={s.percent} size="sm" tone={s.percent === 100 ? 'success' : 'primary'} /></div>
        <ChevronDown className={cx('h-5 w-5 shrink-0 text-muted transition-transform', open && 'rotate-180')} aria-hidden />
      </button>
      {open && (
        <div className="border-t border-line px-4 pb-4 pt-3 sm:px-5">
          {(mod.objectives?.length > 0 || mod.prerequisites?.length > 0) && (
            <div className="mb-3 grid gap-3 text-[13px] sm:grid-cols-2">
              {mod.objectives?.length > 0 && (
                <div>
                  <p className="font-medium text-ink">O‘quv maqsadlari</p>
                  <ul className="mt-1 list-disc pl-4 text-muted">{mod.objectives.map((o) => <li key={o}>{o}</li>)}</ul>
                </div>
              )}
              {mod.prerequisites?.length > 0 && (
                <div>
                  <p className="font-medium text-ink">Avval o‘rganish tavsiya etiladi</p>
                  <p className="mt-1 text-muted">{mod.prerequisites.join(', ')}</p>
                </div>
              )}
            </div>
          )}
          <ol className="space-y-1">
            {mod.lessons.map((l) => {
              const st = STATUS_ICON[l.status];
              const isNext = l.id === nextId;
              return (
                <li key={l.id}>
                  <Link to={`/app/lessons/${l.slug}`} className={cx('flex items-center gap-3 rounded-control px-2.5 py-2.5 transition-colors hover:bg-sunken', isNext && 'bg-primary-soft/60 hover:bg-primary-soft')}>
                    <span className={cx('grid h-6 w-6 shrink-0 place-items-center rounded-full border-2', st.cls)} title={STATUS_TEXT[l.status]}>
                      <st.icon className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm text-ink">{l.title}</span>
                      <span className="text-xs text-muted">{STATUS_TEXT[l.status]}{l.bestPercent !== null && l.status !== 'not_started' ? ` · eng yaxshi natija ${l.bestPercent}%` : ''}</span>
                    </span>
                    {isNext && <Badge tone="primary">Keyingi</Badge>}
                    <span className="hidden shrink-0 text-xs text-muted sm:inline">{l.durationMinutes} daq</span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </div>
  );
}

function SettingsDialog({ open, onClose, roadmap, onSaved }) {
  const toast = useToast();
  const [form, setForm] = useState({ dailyMinutes: roadmap.dailyMinutes, studyDaysPerWeek: roadmap.studyDaysPerWeek, goal: roadmap.goal || '', level: roadmap.level });
  const [saving, setSaving] = useState(false);
  const save = async () => {
    setSaving(true);
    try {
      const d = await api.patch(`/roadmaps/${roadmap.id}`, { ...form, dailyMinutes: Number(form.dailyMinutes), studyDaysPerWeek: Number(form.studyDaysPerWeek) });
      onSaved(d.roadmap);
      toast.success('Reja yangilandi');
      onClose();
    } catch (err) {
      toast.error(err);
    } finally {
      setSaving(false);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} title="Rejani sozlash" description="Kunlik vaqt va maqsadingizni o‘zgartiring. Haftalik maqsad shunga qarab qayta hisoblanadi." footer={<><Button variant="secondary" onClick={onClose}>Bekor qilish</Button><Button onClick={save} loading={saving}>Saqlash</Button></>}>
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-3">
          <Input label="Kunlik vaqt (daqiqa)" type="number" min={10} max={240} value={form.dailyMinutes} onChange={(e) => setForm({ ...form, dailyMinutes: e.target.value })} />
          <Input label="Haftasiga kun" type="number" min={1} max={7} value={form.studyDaysPerWeek} onChange={(e) => setForm({ ...form, studyDaysPerWeek: e.target.value })} />
        </div>
        <Select label="Daraja" value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} options={[{ value: 'beginner', label: 'Boshlang‘ich' }, { value: 'intermediate', label: 'O‘rta' }, { value: 'advanced', label: 'Yuqori' }]} hint="Darajani o‘zgartirsangiz, modullar qayta tuziladi. Tugatgan darslaringiz saqlanib qoladi." />
        <Textarea label="Maqsad" rows={3} maxLength={300} value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value })} />
      </div>
    </Dialog>
  );
}

export default function RoadmapView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { refresh } = useAuth();
  const { data, loading, error, reload, setData } = useApi(`/roadmaps/${id}`);
  const [settings, setSettings] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const rm = data?.roadmap;
  useDocumentTitle(rm?.title || 'Yo‘l xaritasi');

  if (loading) return <PageSkeleton />;
  if (error) return <ErrorState error={error} onRetry={reload} />;

  const makeActive = async () => {
    try {
      await api.patch(`/roadmaps/${rm.id}`, { makeActive: true });
      setData((d) => ({ roadmap: { ...d.roadmap, isActive: true } }));
      refresh();
      toast.success('Faol reja o‘zgartirildi');
    } catch (err) {
      toast.error(err);
    }
  };
  const remove = async () => {
    try {
      await api.delete(`/roadmaps/${rm.id}`);
      toast.success('Yo‘l xaritasi o‘chirildi. Dars natijalaringiz saqlanib qoldi.');
      navigate('/app/roadmaps');
    } catch (err) {
      toast.error(err);
    }
  };

  const nextId = rm.nextLesson?.id;
  const weeklyPct = Math.min(100, (rm.weekly.completed / rm.weekly.target) * 100);

  return (
    <div>
      <Link to="/app/roadmaps" className="mb-5 inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink"><ArrowLeft className="h-4 w-4" />Yo‘l xaritalari</Link>
      <header className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="page-title">{rm.title}</h1>
            {rm.isActive && <Badge tone="primary" icon={Star}>Faol</Badge>}
          </div>
          <p className="mt-1.5 text-muted">Daraja: {{ beginner: 'boshlang‘ich', intermediate: 'o‘rta', advanced: 'yuqori' }[rm.level]} · kuniga {rm.dailyMinutes} daqiqa, haftasiga {rm.studyDaysPerWeek} kun{rm.goal ? ` · Maqsad: ${rm.goal}` : ''}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {!rm.isActive && <Button variant="secondary" icon={Star} onClick={makeActive}>Faol qilish</Button>}
          <Button variant="secondary" icon={Settings2} onClick={() => setSettings(true)}>Sozlash</Button>
          <Button variant="ghost" icon={Trash2} onClick={() => setConfirmDelete(true)} aria-label="Yo‘l xaritasini o‘chirish" />
        </div>
      </header>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="panel p-5 md:col-span-2">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm text-muted">Umumiy progress</p>
              <p className="font-display text-3xl font-semibold text-ink">{rm.stats.percent}%</p>
            </div>
            <p className="text-right text-sm text-muted">{rm.stats.completed} / {rm.stats.total} dars<br />≈ {minutesLabel(rm.stats.remainingMinutes)} qoldi ({rm.stats.estimatedWeeks} hafta)</p>
          </div>
          <ProgressBar value={rm.stats.percent} className="mt-4" />
          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            {STAGES.map((s) => {
              const st = rm.stats.stages[s.key];
              return (
                <div key={s.key} className="rounded-control bg-sunken px-2 py-2.5">
                  <p className="text-xs text-muted">{s.label}</p>
                  <p className="text-sm font-semibold text-ink">{st ? `${st.completed}/${st.total}` : '—'}</p>
                </div>
              );
            })}
          </div>
          {rm.nextLesson ? (
            <div className="mt-5 flex flex-col gap-3 rounded-control border border-primary/30 bg-primary-soft/50 p-4 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-primary-ink">Tavsiya etilgan keyingi dars</p>
                <p className="truncate font-medium text-ink">{rm.nextLesson.title}</p>
                <p className="text-xs text-muted"><Clock className="mr-1 inline h-3 w-3" aria-hidden />{rm.nextLesson.durationMinutes} daqiqa</p>
              </div>
              <Button to={`/app/lessons/${rm.nextLesson.slug}`} icon={Play}>Darsni boshlash</Button>
            </div>
          ) : (
            <p className="mt-5 rounded-control bg-success-soft p-4 text-sm text-success">Barcha majburiy darslar tugallandi. Ajoyib natija!</p>
          )}
        </div>
        <div className="space-y-4">
          <Card title="Haftalik maqsad" description="Kunlik vaqtingiz asosida hisoblangan" bodyClassName="pt-3">
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-2xl font-semibold text-ink">{rm.weekly.completed}</span>
              <span className="text-muted">/ {rm.weekly.target} dars</span>
            </div>
            <ProgressBar value={weeklyPct} tone={weeklyPct >= 100 ? 'success' : 'signal'} className="mt-3" />
            <p className="mt-2 flex items-center gap-1.5 text-xs text-muted"><Target className="h-3.5 w-3.5" aria-hidden />Shu hafta {minutesLabel(rm.weekly.minutes)} o‘qidingiz</p>
          </Card>
          <Card title="Takrorlash tavsiyalari" bodyClassName="pt-3">
            {rm.revision.length ? (
              <ul className="space-y-1.5">
                {rm.revision.map((l) => (
                  <li key={l.id}><Link to={`/app/lessons/${l.slug}`} className="flex items-center gap-2 rounded-lg px-1 py-1 text-sm text-ink hover:text-primary-ink"><RotateCcw className="h-3.5 w-3.5 shrink-0 text-warning" aria-hidden /><span className="truncate">{l.title}</span></Link></li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted">Hozircha takrorlash kerak bo‘lgan mavzu yo‘q.</p>
            )}
          </Card>
        </div>
      </div>

      <div className="space-y-10">
        {STAGES.map((stage) => {
          const mods = rm.modules.filter((m) => m.stage === stage.key);
          if (!mods.length) return null;
          return (
            <section key={stage.key} aria-labelledby={`stage-${stage.key}`}>
              <div className="mb-4 flex items-center gap-3">
                <h2 id={`stage-${stage.key}`} className="section-title">{stage.label}</h2>
                <span className="h-px flex-1 bg-line" aria-hidden />
                <span className="text-sm text-muted">{mods.length} modul</span>
              </div>
              <div className="relative space-y-3 border-l-2 border-line pl-5 sm:pl-7">
                {mods.map((m) => (
                  <div key={m.id} className="relative">
                    <span aria-hidden className={cx('absolute -left-[27px] top-7 h-3 w-3 rounded-full border-2 border-bg sm:-left-[35px]', m.stats.percent === 100 ? 'bg-success' : m.stats.percent > 0 ? 'bg-primary' : 'bg-line')} />
                    <ModuleItem mod={m} nextId={nextId} defaultOpen={m.lessons.some((l) => l.id === nextId)} />
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-10 flex items-center gap-2 text-xs text-muted"><BookOpen className="h-3.5 w-3.5" aria-hidden />Dars faqat mini testdan kamida 60% olinganda “Tugallangan” hisoblanadi. Darsni ochishning o‘zi progressga qo‘shilmaydi.</div>

      {settings && <SettingsDialog open={settings} onClose={() => setSettings(false)} roadmap={rm} onSaved={(r) => setData({ roadmap: { ...r, isActive: rm.isActive } })} />}
      <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)} title="Yo‘l xaritasini o‘chirasizmi?" size="sm" footer={<><Button variant="secondary" onClick={() => setConfirmDelete(false)}>Bekor qilish</Button><Button variant="danger" onClick={remove}>O‘chirish</Button></>}>
        <p className="flex gap-2 text-sm text-muted"><AlertTriangle className="h-4 w-4 shrink-0 text-warning" aria-hidden />Reja o‘chiriladi, lekin tugatgan darslaringiz, test natijalaringiz va XP saqlanib qoladi.</p>
      </Dialog>
    </div>
  );
}
