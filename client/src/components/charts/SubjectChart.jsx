import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useChartTheme, ChartTooltip } from './chartTheme.jsx';

export default function SubjectChart({ data }) {
  const t = useChartTheme();
  const height = Math.max(120, data.length * 44 + 30);
  return (
    <div className="w-full" style={{ height }} role="img" aria-label="Fanlar bo‘yicha o‘rtacha test natijasi, foizda">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 40, left: 0, bottom: 0 }} barCategoryGap="30%">
          <CartesianGrid horizontal={false} stroke={t.grid} />
          <XAxis type="number" domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fill: t.axis, fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
          <YAxis type="category" dataKey="subject" tickLine={false} axisLine={false} tick={{ fill: t.axis, fontSize: 12 }} width={110} />
          <Tooltip cursor={{ fill: t.cursor }} content={<ChartTooltip format={(v, p) => `O‘rtacha ${v}% · ${p.lessons} ta dars testi`} />} />
          <Bar dataKey="average" fill={t.mark} radius={[0, 4, 4, 0]} maxBarSize={18}>
            <LabelList dataKey="average" position="right" formatter={(v) => `${v}%`} style={{ fill: t.axis, fontSize: 11 }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
