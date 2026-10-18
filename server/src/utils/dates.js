const TZ_OFFSET_MIN = Number(process.env.APP_TZ_OFFSET_MINUTES ?? 300);

export function dayKey(date = new Date()) {
  const shifted = new Date(date.getTime() + TZ_OFFSET_MIN * 60000);
  return shifted.toISOString().slice(0, 10);
}

export function daysBetween(a, b) {
  return Math.round((Date.parse(b) - Date.parse(a)) / 86400000);
}

export function lastNDays(n, from = new Date()) {
  const out = [];
  for (let i = n - 1; i >= 0; i -= 1) out.push(dayKey(new Date(from.getTime() - i * 86400000)));
  return out;
}

export function startOfWeekKey(date = new Date()) {
  const shifted = new Date(date.getTime() + TZ_OFFSET_MIN * 60000);
  const dow = (shifted.getUTCDay() + 6) % 7;
  shifted.setUTCDate(shifted.getUTCDate() - dow);
  return shifted.toISOString().slice(0, 10);
}
