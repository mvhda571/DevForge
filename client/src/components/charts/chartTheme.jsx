import { useTheme } from '../../context/ThemeContext.jsx';

export function useChartTheme() {
  const { theme } = useTheme();
  return theme === 'dark'
    ? { mark: '#8B73FF', grid: '#212F4E', axis: '#91A0BC', surface: '#101B32', cursor: 'rgba(139,115,255,0.10)' }
    : { mark: '#6A4BFF', grid: '#E8EBF2', axis: '#64748B', surface: '#FFFFFF', cursor: 'rgba(106,75,255,0.08)' };
}

export function ChartTooltip({ active, payload, label, format }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-control border border-line bg-surface px-3 py-2 text-xs shadow-lg shadow-navy/10">
      <p className="font-medium text-ink">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="mt-0.5 text-muted">{format ? format(p.value, p.payload) : p.value}</p>
      ))}
    </div>
  );
}
