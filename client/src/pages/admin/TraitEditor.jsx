import { useApi } from '../../hooks/useApi.js';

export function useTraitLabels() {
  const { data } = useApi('/careers');
  return data?.traitLabels || {};
}

export default function TraitEditor({ labels, value = {}, onChange, legend = 'Xususiyat og‘irliklari (0–5)' }) {
  const keys = Object.keys(labels).length ? Object.keys(labels) : Object.keys(value);
  const set = (k, raw) => {
    const next = { ...value };
    const n = Number(raw);
    if (raw === '' || n === 0) delete next[k];
    else next[k] = Math.max(0, Math.min(5, n));
    onChange(next);
  };
  return (
    <fieldset>
      <legend className="label">{legend}</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {keys.map((k) => (
          <label key={k} className="flex items-center justify-between gap-3 rounded-control border border-line px-3 py-1.5 text-sm">
            <span className="text-ink">{labels[k] || k}</span>
            <input type="number" min={0} max={5} step={0.5} value={value[k] ?? ''} placeholder="0" onChange={(e) => set(k, e.target.value)} className="w-16 rounded-md border border-line bg-surface px-2 py-1 text-right text-ink focus:border-primary focus:outline-none" />
          </label>
        ))}
      </div>
    </fieldset>
  );
}
