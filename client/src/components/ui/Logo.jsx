import { Link } from 'react-router-dom';
import { cx } from '../../lib/format.js';

export function LogoMark({ className }) {
  return (
    <svg viewBox="0 0 32 32" className={cx('h-8 w-8', className)} aria-hidden>
      <rect width="32" height="32" rx="8" fill="#0E1A33" className="dark:fill-[#1C2C50]" />
      <path d="M9 8h8.5a7.5 7.5 0 0 1 0 15H13v-4.5h4.5a3 3 0 0 0 0-6H13.5V23H9z" fill="#fff" />
      <circle cx="22.5" cy="23.5" r="2.5" fill="#8B73FF" />
    </svg>
  );
}

export default function Logo({ to = '/', light = false, compact = false, className }) {
  return (
    <Link to={to} className={cx('inline-flex items-center gap-2.5 rounded-control', className)} aria-label="DevForge bosh sahifa">
      <LogoMark />
      {!compact && <span className={cx('font-display text-[17px] font-semibold tracking-tight', light ? 'text-white' : 'text-ink')}>DevForge</span>}
    </Link>
  );
}
