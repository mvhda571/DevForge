import { useState } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import AuthFrame from './AuthFrame.jsx';
import Button from '../components/ui/Button.jsx';
import { Input } from '../components/ui/Field.jsx';
import { useAuth, homeFor } from '../context/AuthContext.jsx';
import { useT } from '../i18n/index.jsx';
import { useDocumentTitle } from '../hooks/useApi.js';

const schema = z.object({
  email: z.string().trim().email('Email manzil noto‘g‘ri'),
  password: z.string().min(1, 'Parolni kiriting')
});

export function safeNext(next) {
  return next && next.startsWith('/') && !next.startsWith('//') ? next : null;
}

export default function Login() {
  const t = useT();
  useDocumentTitle(t('nav.login'));
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [show, setShow] = useState(false);
  const [serverError, setServerError] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });

  if (!loading && user) return <Navigate to={safeNext(params.get('next')) || homeFor(user)} replace />;

  const onSubmit = async (values) => {
    setServerError('');
    try {
      const u = await login(values.email, values.password);
      const next = safeNext(params.get('next'));
      navigate(u.role === 'student' && !u.onboardingCompleted ? '/onboarding' : next || homeFor(u), { replace: true });
    } catch (err) {
      setServerError(err.message);
    }
  };

  return (
    <AuthFrame title={t('auth.loginTitle')} subtitle={t('auth.loginSubtitle')}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {serverError && <p className="rounded-control bg-danger-soft px-3 py-2.5 text-sm text-danger" role="alert">{serverError}</p>}
        <Input label={t('auth.email')} type="email" autoComplete="email" error={errors.email?.message} {...register('email')} />
        <div className="relative">
          <Input label={t('auth.password')} type={show ? 'text' : 'password'} autoComplete="current-password" error={errors.password?.message} inputClassName="pr-11" {...register('password')} />
          <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-2 top-[34px] rounded-control p-1.5 text-muted hover:text-ink" aria-label={show ? t('auth.hidePassword') : t('auth.showPassword')}>
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <Button type="submit" className="w-full" size="lg" loading={isSubmitting}>{t('auth.submitLogin')}</Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted">
        {t('auth.noAccount')} <Link to={`/register${params.get('next') ? `?next=${encodeURIComponent(params.get('next'))}` : ''}`} className="font-medium text-primary-ink hover:underline">{t('auth.submitRegister')}</Link>
      </p>
    </AuthFrame>
  );
}
