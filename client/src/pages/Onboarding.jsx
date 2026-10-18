import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Logo from '../components/ui/Logo.jsx';
import Button from '../components/ui/Button.jsx';
import { ChipGroup, Input, Textarea } from '../components/ui/Field.jsx';
import { ProgressBar } from '../components/ui/Feedback.jsx';
import { useAuth, homeFor } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { api } from '../lib/api.js';
import { cx } from '../lib/format.js';
import { useDocumentTitle } from '../hooks/useApi.js';
import { safeNext } from './Login.jsx';

const INTERESTS = ['Texnologiya', 'Dizayn', 'Tibbiyot', 'Biznes', 'Fan va tadqiqot', 'San’at', 'Sport', 'Ijtimoiy faoliyat', 'Huquq', 'Muhandislik', 'Ta’lim', 'Til o‘rganish'];
const SUBJECTS = ['Matematika', 'Informatika', 'Fizika', 'Kimyo', 'Biologiya', 'Ingliz tili', 'Ona tili va adabiyot', 'Tarix', 'Iqtisodiyot', 'Tasviriy san’at', 'Geografiya'];
const CAREERS = ['Dasturchi', 'UI/UX dizayner', 'Shifokor', 'Muhandis', 'Iqtisodchi', 'O‘qituvchi', 'Me’mor', 'Kiberxavfsizlik mutaxassisi', 'Ma’lumotlar tahlilchisi', 'Marketolog', 'Huquqshunos', 'Tadbirkor', 'Hali bilmayman'];
const LEVELS = [
  { value: 'beginner', label: 'Boshlang‘ich', text: 'Endi boshlayapman' },
  { value: 'intermediate', label: 'O‘rta', text: 'Asoslarni bilaman' },
  { value: 'advanced', label: 'Yuqori', text: 'Chuqurroq o‘rganmoqchiman' }
];
const TYPES = [
  { value: 'school', label: 'Maktab o‘quvchisi' },
  { value: 'applicant', label: 'Abituriyent' },
  { value: 'university', label: 'Talaba' },
  { value: 'other', label: 'Boshqa' }
];
const MINUTES = [15, 30, 45, 60, 90, 120];

function Choice({ active, onClick, title, text }) {
  return (
    <button type="button" aria-pressed={active} onClick={onClick} className={cx('rounded-control border p-4 text-left transition-colors', active ? 'border-primary bg-primary-soft' : 'border-line hover:border-primary/40')}>
      <p className={cx('font-medium', active ? 'text-primary-ink' : 'text-ink')}>{title}</p>
      {text && <p className="text-sm text-muted">{text}</p>}
    </button>
  );
}

export default function Onboarding() {
  useDocumentTitle('Tanishuv');
  const { user, profile, setSession } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    learnerType: profile?.learnerType || 'school',
    level: profile?.level || 'beginner',
    interests: profile?.interests || [],
    favoriteSubjects: profile?.favoriteSubjects || [],
    careerInterests: profile?.careerInterests || [],
    dailyMinutes: profile?.dailyMinutes || 30,
    goal: profile?.goal || ''
  });
  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  const steps = [
    { title: 'Tanishib olaylik', text: 'Sizga qanday murojaat qilaylik?', body: <Input label="Ismingiz" value={form.name} onChange={(e) => set('name')(e.target.value)} autoFocus /> },
    {
      title: 'Hozir qayerdasiz?',
      text: 'Bu yo‘l xaritangiz qaysi bosqichdan boshlanishini belgilaydi.',
      body: (
        <div className="space-y-5">
          <div className="grid gap-2 sm:grid-cols-2">{TYPES.map((o) => <Choice key={o.value} active={form.learnerType === o.value} onClick={() => set('learnerType')(o.value)} title={o.label} />)}</div>
          <div>
            <p className="label">Bilim darajangiz</p>
            <div className="grid gap-2 sm:grid-cols-3">{LEVELS.map((o) => <Choice key={o.value} active={form.level === o.value} onClick={() => set('level')(o.value)} title={o.label} text={o.text} />)}</div>
          </div>
        </div>
      )
    },
    { title: 'Nimalar sizni qiziqtiradi?', text: 'Bir nechtasini tanlang.', body: <ChipGroup options={INTERESTS} value={form.interests} onChange={set('interests')} /> },
    { title: 'Sevimli fanlaringiz', text: 'Ko‘pi bilan 4 tasini tanlang.', body: <ChipGroup options={SUBJECTS} value={form.favoriteSubjects} onChange={set('favoriteSubjects')} max={4} /> },
    { title: 'Qaysi kasblar haqida o‘ylayapsiz?', text: 'Bilmasangiz ham mayli — kasb testi yordam beradi.', body: <ChipGroup options={CAREERS} value={form.careerInterests} onChange={set('careerInterests')} max={5} /> },
    {
      title: 'Kuniga qancha vaqt ajrata olasiz?',
      text: 'Realistik bo‘ling — izchillik tezlikdan muhimroq. Keyin istalgan vaqtda o‘zgartirish mumkin.',
      body: <div className="grid grid-cols-3 gap-2">{MINUTES.map((m) => <Choice key={m} active={form.dailyMinutes === m} onClick={() => set('dailyMinutes')(m)} title={`${m} daqiqa`} />)}</div>
    },
    { title: 'Asosiy maqsadingiz', text: 'Masalan: “IT yo‘nalishida grantga kirish” yoki “birinchi veb-saytimni yaratish”.', body: <Textarea label="Maqsad" value={form.goal} maxLength={300} onChange={(e) => set('goal')(e.target.value)} rows={3} /> }
  ];

  const save = async (complete) => {
    setSaving(true);
    try {
      const payload = { ...form, name: form.name.trim().length >= 2 ? form.name.trim() : undefined, goal: form.goal.trim(), complete };
      const data = await api.put('/users/me/onboarding', payload);
      setSession(data);
      if (complete) {
        toast.success('Profilingiz saqlandi');
        const next = safeNext(params.get('next'));
        navigate(next || (data.user.role === 'student' ? '/app/assessment' : homeFor(data.user)), { replace: true });
      }
      return true;
    } catch (err) {
      toast.error(err);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const next = async () => {
    if (step < steps.length - 1) setStep((s) => s + 1);
    else await save(true);
  };

  const current = steps[step];
  return (
    <div className="min-h-screen bg-bg">
      <header className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4">
        <Logo />
        <Button variant="ghost" size="sm" onClick={() => save(true)} disabled={saving}>Keyinroq to‘ldiraman</Button>
      </header>
      <main className="mx-auto max-w-2xl px-4 pb-16 pt-6">
        <div className="mb-8 flex items-center gap-3">
          <ProgressBar value={((step + 1) / steps.length) * 100} label={`${step + 1}-qadam, jami ${steps.length}`} />
          <span className="shrink-0 text-sm text-muted">{step + 1} / {steps.length}</span>
        </div>
        <section className="panel p-6 sm:p-8" key={step} aria-live="polite">
          <h1 className="font-display text-2xl font-semibold text-ink">{current.title}</h1>
          <p className="mt-1.5 text-muted">{current.text}</p>
          <div className="mt-6 animate-fade-in">{current.body}</div>
        </section>
        <div className="mt-6 flex items-center justify-between gap-3">
          <Button variant="ghost" icon={ArrowLeft} onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>Orqaga</Button>
          <div className="flex gap-2">
            {step > 0 && step < steps.length - 1 && <Button variant="secondary" onClick={() => setStep((s) => s + 1)}>O‘tkazib yuborish</Button>}
            <Button onClick={next} loading={saving}>{step === steps.length - 1 ? 'Saqlash va testni boshlash' : 'Davom etish'}</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
