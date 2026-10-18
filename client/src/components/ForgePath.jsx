import { Check } from 'lucide-react';
import { cx } from '../lib/format.js';

export default function ForgePath({ steps, className }) {
  return (
    <ol className={cx('relative', className)}>
      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        return (
          <li key={s.title} className="relative flex gap-3.5 pb-5 last:pb-0">
            {!last && (
              <span aria-hidden className={cx('absolute left-[11px] top-6 h-[calc(100%-12px)] w-0.5', s.state === 'done' ? 'bg-primary' : 'bg-line')} />
            )}
            <span
              aria-hidden
              className={cx(
                'relative z-10 mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border-2',
                s.state === 'done' && 'border-primary bg-primary text-white',
                s.state === 'current' && 'border-primary bg-surface',
                s.state === 'todo' && 'border-line bg-surface'
              )}
            >
              {s.state === 'done' ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : s.state === 'current' ? <span className="h-2 w-2 rounded-full bg-primary" /> : null}
            </span>
            <div className="min-w-0 flex-1">
              <p className={cx('text-sm font-medium', s.state === 'todo' ? 'text-muted' : 'text-ink')}>{s.title}</p>
              {s.meta && <p className="text-xs text-muted">{s.meta}</p>}
              {s.children}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
