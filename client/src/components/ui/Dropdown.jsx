import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { cx } from '../../lib/format.js';

export default function Dropdown({ trigger, items, align = 'right', label = 'Menyu' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e) => !ref.current?.contains(e.target) && setOpen(false);
    const onKey = (e) => {
      const els = [...(menuRef.current?.querySelectorAll('[role="menuitem"]') || [])];
      const idx = els.indexOf(document.activeElement);
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        els[(idx + 1) % els.length]?.focus();
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        els[(idx - 1 + els.length) % els.length]?.focus();
      }
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    setTimeout(() => menuRef.current?.querySelector('[role="menuitem"]')?.focus(), 0);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button type="button" onClick={() => setOpen((o) => !o)} aria-haspopup="menu" aria-expanded={open} aria-label={label} className="rounded-control">
        {trigger}
      </button>
      {open && (
        <div ref={menuRef} role="menu" className={cx('absolute z-50 mt-2 min-w-[220px] animate-fade-in rounded-control border border-line bg-surface p-1.5 shadow-xl shadow-navy/10', align === 'right' ? 'right-0' : 'left-0')}>
          {items.filter(Boolean).map((item, i) =>
            item.divider ? (
              <div key={i} className="my-1 h-px bg-line" />
            ) : item.header ? (
              <div key={i} className="px-3 py-2">{item.header}</div>
            ) : item.to ? (
              <Link key={i} to={item.to} role="menuitem" onClick={() => setOpen(false)} className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ink hover:bg-sunken focus:bg-sunken focus:outline-none">
                {item.icon && <item.icon className="h-4 w-4 text-muted" />}
                {item.label}
              </Link>
            ) : (
              <button key={i} type="button" role="menuitem" onClick={() => { setOpen(false); item.onClick?.(); }} className={cx('flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm hover:bg-sunken focus:bg-sunken focus:outline-none', item.danger ? 'text-danger' : 'text-ink')}>
                {item.icon && <item.icon className="h-4 w-4" />}
                {item.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
