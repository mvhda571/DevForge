import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useChartTheme, ChartTooltip } from './chartTheme.jsx';
import { shortDay } from '../../lib/format.js';

export default function ActivityChart({ data, label = 'Oxirgi 14 kundagi o‘qish vaqti, daqiqalarda' }) {
  const t = useChartTheme();
  const rows = data.map((d) => ({ ...d, label: shortDay(d.day) }));
  return (
    <div className="h-56 w-full" role="img" aria-label={label}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={rows} margin={{ top: 8, right: 4, left: -18, bottom: 0 }} barCategoryGap="28%">
          <CartesianGrid vertical={false} stroke={t.grid} />
          <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: t.axis, fontSize: 11 }} interval="preserveStartEnd" minTickGap={12} />
          <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fill: t.axis, fontSize: 11 }} width={44} />
          <Tooltip cursor={{ fill: t.cursor }} content={<ChartTooltip format={(v, p) => `${v} daqiqa · ${p.lessons} dars tugallandi`} />} />
          <Bar dataKey="minutes" fill={t.mark} radius={[4, 4, 0, 0]} maxBarSize={22} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
