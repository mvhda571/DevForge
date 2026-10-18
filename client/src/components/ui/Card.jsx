import { cx } from '../../lib/format.js';

export default function Card({ title, description, action, children, className, bodyClassName, as: Tag = 'section' }) {
  return (
    <Tag className={cx('panel', className)}>
      {(title || action) && (
        <header className="flex items-start justify-between gap-3 px-5 pt-5">
          <div className="min-w-0">
            {title && <h2 className="text-[15px] font-semibold text-ink font-sans tracking-normal">{title}</h2>}
            {description && <p className="mt-0.5 text-[13px] text-muted">{description}</p>}
          </div>
          {action}
        </header>
      )}
      <div className={cx('p-5', bodyClassName)}>{children}</div>
    </Tag>
  );
}
