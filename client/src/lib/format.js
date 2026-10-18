const MONTHS = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'];

export function formatDate(value, withTime = false) {
  if (!value) return '—';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '—';
  const base = `${d.getDate()}-${MONTHS[d.getMonth()]}, ${d.getFullYear()}`;
  if (!withTime) return base;
  return `${base}, ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export function shortDay(key) {
  const d = new Date(`${key}T00:00:00`);
  return `${d.getDate()}-${MONTHS[d.getMonth()].slice(0, 3)}`;
}

export function relativeTime(value) {
  const diff = (Date.now() - new Date(value).getTime()) / 1000;
  if (diff < 60) return 'hozirgina';
  if (diff < 3600) return `${Math.floor(diff / 60)} daqiqa oldin`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} soat oldin`;
  if (diff < 7 * 86400) return `${Math.floor(diff / 86400)} kun oldin`;
  return formatDate(value);
}

export function minutesLabel(m) {
  const mins = Math.round(m || 0);
  if (mins < 60) return `${mins} daq`;
  const h = Math.floor(mins / 60);
  const r = mins % 60;
  return r ? `${h} soat ${r} daq` : `${h} soat`;
}

export function toLocalInput(date) {
  const d = new Date(date);
  const off = d.getTimezoneOffset();
  return new Date(d.getTime() - off * 60000).toISOString().slice(0, 16);
}

export function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}
