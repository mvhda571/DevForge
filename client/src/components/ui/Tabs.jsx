import { useRef } from 'react';
import { cx } from '../../lib/format.js';

export default function Tabs({ tabs, value, onChange, className }) {
  const refs = useRef([]);
  const onKey = (e, i) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const next = (i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    refs.current[next]?.focus();
    onChange(tabs[next].value);
  };
  return (
    <div role="tablist" className={cx('flex gap-1 overflow-x-auto rounded-control bg-sunken p-1', className)}>
      {tabs.map((t, i) => (
        <button
          key={t.value}
          ref={(el) => (refs.current[i] = el)}
          role="tab"
          type="button"
          aria-selected={value === t.value}
          tabIndex={value === t.value ? 0 : -1}
          onKeyDown={(e) => onKey(e, i)}
          onClick={() => onChange(t.value)}
          className={cx('flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors', value === t.value ? 'bg-surface text-ink shadow-sm' : 'text-muted hover:text-ink')}
        >
          {t.icon && <t.icon className="h-4 w-4" aria-hidden />}
          {t.label}
          {t.count !== undefined && <span className="rounded-full bg-sunken px-1.5 text-xs text-muted">{t.count}</span>}
        </button>
      ))}
    </div>
  );
}
