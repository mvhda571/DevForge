import { cx } from '../../lib/format.js';

const TONES = {
  neutral: 'bg-sunken text-muted',
  primary: 'bg-primary-soft text-primary-ink',
  signal: 'bg-signal-soft text-signal',
  success: 'bg-success-soft text-success',
  warning: 'bg-warning-soft text-warning',
  danger: 'bg-danger-soft text-danger',
  outline: 'border border-line text-muted'
};

export default function Badge({ tone = 'neutral', icon: Icon, className, children }) {
  return (
    <span className={cx('inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium', TONES[tone], className)}>
      {Icon && <Icon className="h-3.5 w-3.5" aria-hidden />}
      {children}
    </span>
  );
}

const STATUS_TONE = { not_started: 'neutral', in_progress: 'signal', completed: 'success', needs_review: 'warning' };
const STATUS_LABEL = { not_started: 'Boshlanmagan', in_progress: 'Jarayonda', completed: 'Tugallangan', needs_review: 'Qayta o‘rganish kerak' };

export function StatusBadge({ status = 'not_started' }) {
  return <Badge tone={STATUS_TONE[status]}>{STATUS_LABEL[status]}</Badge>;
}
