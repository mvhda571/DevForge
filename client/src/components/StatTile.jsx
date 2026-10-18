import { cx } from '../lib/format.js';

export default function StatTile({ icon: Icon, label, value, hint, tone = 'primary' }) {
  const toneCls = { primary: 'bg-primary-soft text-primary-ink', signal: 'bg-signal-soft text-signal', success: 'bg-success-soft text-success', warning: 'bg-warning-soft text-warning' }[tone];
  return (
    <div className="panel flex items-center gap-3.5 p-4">
      {Icon && (
        <span className={cx('grid h-10 w-10 shrink-0 place-items-center rounded-control', toneCls)}>
          <Icon className="h-5 w-5" aria-hidden />
        </span>
      )}
      <div className="min-w-0">
        <p className="text-[13px] text-muted">{label}</p>
        <p className="font-display text-xl font-semibold leading-tight text-ink">{value}</p>
        {hint && <p className="truncate text-xs text-muted">{hint}</p>}
      </div>
    </div>
  );
}
