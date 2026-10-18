import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { cx } from '../../lib/format.js';

const VARIANTS = {
  primary: 'bg-primary text-white hover:bg-primary-ink disabled:hover:bg-primary',
  secondary: 'border border-line bg-surface text-ink hover:bg-sunken',
  ghost: 'text-ink hover:bg-sunken',
  subtle: 'bg-primary-soft text-primary-ink hover:bg-primary/15',
  danger: 'bg-danger text-white hover:bg-danger/90',
  dark: 'bg-navy text-white hover:bg-navy-700 dark:bg-white dark:text-navy dark:hover:bg-slate-200'
};
const SIZES = {
  sm: 'h-8 gap-1.5 px-3 text-[13px]',
  md: 'h-10 gap-2 px-4 text-sm',
  lg: 'h-12 gap-2 px-5 text-[15px]',
  icon: 'h-9 w-9 justify-center',
  iconSm: 'h-8 w-8 justify-center'
};

export default function Button({ variant = 'primary', size = 'md', loading = false, icon: Icon, iconRight: IconRight, to, href, className, children, disabled, type = 'button', ...rest }) {
  const cls = cx(
    'inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-control font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-55',
    VARIANTS[variant],
    SIZES[size],
    className
  );
  const content = (
    <>
      {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : Icon ? <Icon className="h-4 w-4" aria-hidden /> : null}
      {children}
      {IconRight && !loading ? <IconRight className="h-4 w-4" aria-hidden /> : null}
    </>
  );
  if (to) return <Link to={to} className={cls} {...rest}>{content}</Link>;
  if (href) return <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>{content}</a>;
  return (
    <button type={type} className={cls} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
      {content}
    </button>
  );
}
