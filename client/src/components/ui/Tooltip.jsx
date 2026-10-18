import { useId } from 'react';
import { cx } from '../../lib/format.js';

export default function Tooltip({ content, children, side = 'top', className }) {
  const id = useId();
  if (!content) return children;
  return (
    <span className={cx('group/tt relative inline-flex', className)} aria-describedby={id}>
      {children}
      <span
        id={id}
        role="tooltip"
        className={cx(
          'pointer-events-none absolute left-1/2 z-50 w-max max-w-[240px] -translate-x-1/2 rounded-lg bg-navy px-2.5 py-1.5 text-xs leading-snug text-white opacity-0 shadow-lg transition-opacity group-hover/tt:opacity-100 group-focus-within/tt:opacity-100 dark:bg-slate-100 dark:text-navy',
          side === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
        )}
      >
        {content}
      </span>
    </span>
  );
}
