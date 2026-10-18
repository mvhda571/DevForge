import { useId } from 'react';
import { cx } from '../../lib/format.js';

export function Field({ label, hint, error, children, id, optional, className }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="label">
          {label}
          {optional && <span className="ml-1 font-normal text-muted">(ixtiyoriy)</span>}
        </label>
      )}
      {children}
      {error ? (
        <p className="mt-1.5 text-[13px] text-danger" role="alert">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-[13px] text-muted">{hint}</p>
      ) : null}
    </div>
  );
}

export function Input({ label, hint, error, optional, className, inputClassName, ref, ...rest }) {
  const id = useId();
  return (
    <Field label={label} hint={hint} error={error} id={rest.id || id} optional={optional} className={className}>
      <input ref={ref} id={rest.id || id} aria-invalid={Boolean(error) || undefined} className={cx('field', error && 'border-danger focus:border-danger focus:ring-danger/20', inputClassName)} {...rest} />
    </Field>
  );
}

export function Textarea({ label, hint, error, optional, className, ref, rows = 4, ...rest }) {
  const id = useId();
  return (
    <Field label={label} hint={hint} error={error} id={rest.id || id} optional={optional} className={className}>
      <textarea ref={ref} id={rest.id || id} rows={rows} aria-invalid={Boolean(error) || undefined} className={cx('field resize-y', error && 'border-danger')} {...rest} />
    </Field>
  );
}

export function Select({ label, hint, error, optional, className, options = [], placeholder, ref, ...rest }) {
  const id = useId();
  return (
    <Field label={label} hint={hint} error={error} id={rest.id || id} optional={optional} className={className}>
      <select ref={ref} id={rest.id || id} className={cx('field appearance-none bg-[length:16px] bg-[right_12px_center] bg-no-repeat pr-9', error && 'border-danger')} style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")" }} {...rest}>
        {placeholder !== undefined && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </Field>
  );
}

export function Toggle({ checked, onChange, label, description, disabled }) {
  const id = useId();
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <label htmlFor={id} className="text-sm font-medium text-ink">{label}</label>
        {description && <p className="text-[13px] text-muted">{description}</p>}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cx('relative mt-0.5 inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors disabled:opacity-50', checked ? 'bg-primary' : 'bg-line')}
      >
        <span className={cx('inline-block h-5 w-5 rounded-full bg-white shadow transition-transform', checked ? 'translate-x-[22px]' : 'translate-x-0.5')} />
      </button>
    </div>
  );
}

export function ChipGroup({ options, value = [], onChange, max, label }) {
  const toggle = (opt) => {
    const has = value.includes(opt);
    if (has) onChange(value.filter((v) => v !== opt));
    else if (!max || value.length < max) onChange([...value, opt]);
  };
  return (
    <fieldset>
      {label && <legend className="label">{label}</legend>}
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              aria-pressed={active}
              onClick={() => toggle(opt)}
              className={cx(
                'rounded-full border px-3.5 py-1.5 text-sm transition-colors',
                active ? 'border-primary bg-primary-soft text-primary-ink' : 'border-line bg-surface text-ink hover:border-primary/40'
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
