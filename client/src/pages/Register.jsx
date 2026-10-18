import { useState } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, GraduationCap, HeartHandshake, School } from 'lucide-react';
import AuthFrame from './AuthFrame.jsx';
import Button from '../components/ui/Button.jsx';
import { Input } from '../components/ui/Field.jsx';
import { useAuth, homeFor } from '../context/AuthContext.jsx';
import { useT } from '../i18n/index.jsx';
import { useDocumentTitle } from '../hooks/useApi.js';
import { safeNext } from './Login.jsx';
import { cx } from '../lib/format.js';

const year = new Date().getFullYear();
const schema = z.object({
  name: z.string().trim().min(2, 'Ism kamida 2 belgidan iborat bo‘lsin').max(80),
  email: z.string().trim().email('Email manzil noto‘g‘ri'),
  password: z.string().min(8, 'Parol kamida 8 belgidan iborat bo‘lishi kerak').refine((v) => /[A-Za-z]/.test(v) && /\d/.test(v), 'Parolda kamida bitta harf va bitta raqam bo‘lishi kerak'),
  role: z.enum(['student', 'teacher', 'parent']),
  birthYear: z.union([z.literal(''), z.coerce.number().int().min(year - 100, 'Yil noto‘g‘ri').max(year - 6, 'Yil noto‘g‘ri')]).optional(),
  acceptTerms: z.literal(true, { message: 'Davom etish uchun rozilik bildiring' })
});

const ROLES = [
  { value: 'student', label: 'O‘quvchiman', icon: School },
  { value: 'teacher', label: 'O‘qituvchiman', icon: GraduationCap },
  { value: 'parent', label: 'Ota-onaman', icon: HeartHandshake }
];

export default function Register() {
  const t = useT();
  useDocumentTitle(t('auth.submitRegister'));
  const { register: signUp, user, loading } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [show, setShow] = useState(false);
  const [serverError, setServerError] = useState('');
  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema), defaultValues: { role: 'student', birthYear: '', acceptTerms: false } });
  const role = watch('role');
  const birthYear = watch('birthYear');
  const isMinor = birthYear && Number(birthYear) > year - 18;

  if (!loading && user) return <Navigate to={homeFor(user)} replace />;

  const onSubmit = async ({ birthYear: by, ...values }) => {
    setServerError('');
    try {
      const u = await signUp({ ...values, ...(by ? { birthYear: Number(by) } : {}) });
      const next = safeNext(params.get('next'));
      if (u.role === 'student') navigate(`/onboarding${next ? `?next=${encodeURIComponent(next)}` : ''}`, { replace: true });
      else navigate(homeFor(u), { replace: true });
    } catch (err) {
      setServerError(err.message);
    }
  };

  return (
    <AuthFrame title={t('auth.registerTitle')} subtitle={t('auth.registerSubtitle')}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {serverError && <p className="rounded-control bg-danger-soft px-3 py-2.5 text-sm text-danger" role="alert">{serverError}</p>}
        <fieldset>
          <legend className="label">{t('auth.role')}</legend>
          <div className="grid grid-cols-3 gap-2">
            {ROLES.map((r) => (
              <button key={r.value} type="button" aria-pressed={role === r.value} onClick={() => setValue('role', r.value)} className={cx('flex flex-col items-center gap-1.5 rounded-control border px-2 py-3 text-[13px] transition-colors', role === r.value ? 'border-primary bg-primary-soft text-primary-ink' : 'border-line text-ink hover:border-primary/40')}>
                <r.icon className="h-5 w-5" aria-hidden />
                {r.label}
              </button>
            ))}
          </div>
        </fieldset>
        <Input label={t('auth.name')} autoComplete="name" error={errors.name?.message} {...register('name')} />
        <Input label={t('auth.email')} type="email" autoComplete="email" error={errors.email?.message} {...register('email')} />
        <div className="relative">
          <Input label={t('auth.password')} type={show ? 'text' : 'password'} autoComplete="new-password" hint={t('auth.passwordHint')} error={errors.password?.message} inputClassName="pr-11" {...register('password')} />
          <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-2 top-[34px] rounded-control p-1.5 text-muted hover:text-ink" aria-label={show ? t('auth.hidePassword') : t('auth.showPassword')}>
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {role === 'student' && <Input label={t('auth.birthYear')} type="number" inputMode="numeric" optional placeholder="Masalan, 2009" error={errors.birthYear?.message} {...register('birthYear')} />}
        {isMinor && <p className="rounded-control bg-signal-soft px-3 py-2.5 text-[13px] text-ink">{t('auth.minorNotice')}</p>}
        <label className="flex items-start gap-2.5 text-sm text-ink">
          <input type="checkbox" className="mt-1 h-4 w-4 rounded border-line accent-[rgb(var(--primary))]" {...register('acceptTerms')} />
          <span>
            <Link to="/privacy" className="text-primary-ink hover:underline" target="_blank">Foydalanish shartlari va maxfiylik siyosati</Link>ga roziman
          </span>
        </label>
        {errors.acceptTerms && <p className="-mt-2 text-[13px] text-danger">{errors.acceptTerms.message}</p>}
        <Button type="submit" className="w-full" size="lg" loading={isSubmitting}>{t('auth.submitRegister')}</Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted">
        {t('auth.haveAccount')} <Link to="/login" className="font-medium text-primary-ink hover:underline">{t('auth.submitLogin')}</Link>
      </p>
    </AuthFrame>
  );
}
