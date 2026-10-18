import { AlertTriangle, Loader2 } from 'lucide-react';
import Button from './Button.jsx';
import { cx } from '../../lib/format.js';

export function Skeleton({ className }) {
  return <div className={cx('relative overflow-hidden rounded-control bg-sunken', className)} aria-hidden><div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/5" /></div>;
}

export function PageSkeleton() {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="Yuklanmoqda">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-4 w-96 max-w-full" />
      <div className="grid gap-4 md:grid-cols-3">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </div>
      <Skeleton className="h-64" />
    </div>
  );
}

export function Spinner({ className, label = 'Yuklanmoqda…' }) {
  return (
    <div className={cx('flex items-center justify-center gap-2 py-10 text-sm text-muted', className)} role="status">
      <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
      {label}
    </div>
  );
}

export function EmptyState({ icon: Icon, title, description, action, className }) {
  return (
    <div className={cx('flex flex-col items-center rounded-panel border border-dashed border-line px-6 py-10 text-center', className)}>
      {Icon && (
        <div className="mb-3 grid h-11 w-11 place-items-center rounded-full bg-primary-soft text-primary-ink">
          <Icon className="h-5 w-5" aria-hidden />
        </div>
      )}
      <h3 className="font-sans text-[15px] font-semibold tracking-normal text-ink">{title}</h3>
      {description && <p className="mt-1 max-w-md text-sm text-muted">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function ErrorState({ error, onRetry, className }) {
  return (
    <div className={cx('flex flex-col items-center rounded-panel border border-danger/30 bg-danger-soft/40 px-6 py-8 text-center', className)} role="alert">
      <AlertTriangle className="mb-2 h-6 w-6 text-danger" aria-hidden />
      <h3 className="font-sans text-[15px] font-semibold tracking-normal text-ink">Ma’lumotni yuklab bo‘lmadi</h3>
      <p className="mt-1 max-w-md text-sm text-muted">{error?.message || 'Kutilmagan xatolik yuz berdi.'}</p>
      {onRetry && <Button variant="secondary" size="sm" className="mt-4" onClick={onRetry}>Qayta urinish</Button>}
    </div>
  );
}

export function ProgressBar({ value = 0, tone = 'primary', className, label, size = 'md' }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  const color = { primary: 'bg-primary', success: 'bg-success', signal: 'bg-signal', warning: 'bg-warning' }[tone];
  return (
    <div className={cx('w-full overflow-hidden rounded-full bg-sunken', size === 'sm' ? 'h-1.5' : 'h-2', className)} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={label || `${pct}%`}>
      <div className={cx('h-full rounded-full transition-[width] duration-500', color)} style={{ width: `${pct}%` }} />
    </div>
  );
}
