import { Flame, Lock, Trophy } from 'lucide-react';
import PageHeader from '../../components/PageHeader.jsx';
import Icon from '../../components/ui/Icon.jsx';
import StatTile from '../../components/StatTile.jsx';
import { ErrorState, PageSkeleton, ProgressBar } from '../../components/ui/Feedback.jsx';
import { useApi, useDocumentTitle } from '../../hooks/useApi.js';
import { formatDate } from '../../lib/format.js';

export default function Achievements() {
  useDocumentTitle('Yutuqlar');
  const { data, loading, error, reload } = useApi('/users/me/achievements');
  if (loading) return <PageSkeleton />;
  if (error) return <ErrorState error={error} onRetry={reload} />;
  const { earned, locked, level, streak } = data;
  return (
    <div>
      <PageHeader title="Yutuqlar" description="XP faqat haqiqiy o‘qish uchun beriladi: darsni testdan o‘tib tugatish, mukammal natija, topshiriq yuborish. Har bir yutuq bir marta beriladi." />
      <div className="mb-8 grid gap-3 sm:grid-cols-3">
        <div className="panel p-4 sm:col-span-2">
          <div className="flex items-end justify-between">
            <div><p className="text-sm text-muted">Daraja</p><p className="font-display text-2xl font-semibold text-ink">{level.level}-daraja · {level.xp} XP</p></div>
            <p className="text-sm text-muted">Keyingisi: {level.nextLevelXp} XP</p>
          </div>
          <ProgressBar value={level.progress} className="mt-3" />
        </div>
        <StatTile icon={Flame} label="Izchillik" value={`${streak?.current || 0} kun`} hint={`Eng uzun: ${streak?.best || 0} kun`} tone="warning" />
      </div>
      <h2 className="section-title mb-3">Qo‘lga kiritilgan ({earned.length})</h2>
      {earned.length ? (
        <ul className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {earned.map((a) => (
            <li key={a._id} className="panel flex items-center gap-3 p-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary-soft text-primary-ink"><Icon name={a.icon} /></span>
              <div className="min-w-0">
                <p className="font-medium text-ink">{a.title}</p>
                <p className="text-sm text-muted">{a.description}</p>
                <p className="text-xs text-muted">{formatDate(a.createdAt)}{a.xp ? ` · +${a.xp} XP` : ''}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mb-10 flex items-center gap-2 text-sm text-muted"><Trophy className="h-4 w-4" aria-hidden />Birinchi yutuq kasb testini yakunlaganingizda beriladi.</p>
      )}
      <h2 className="section-title mb-3">Oldinda</h2>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {locked.map((a) => (
          <li key={a.key} className="flex items-center gap-3 rounded-panel border border-dashed border-line p-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sunken text-muted"><Lock className="h-4 w-4" aria-hidden /></span>
            <div><p className="font-medium text-ink">{a.title}</p><p className="text-sm text-muted">{a.description}</p></div>
          </li>
        ))}
        <li className="flex items-center gap-3 rounded-panel border border-dashed border-line p-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sunken text-muted"><Lock className="h-4 w-4" aria-hidden /></span>
          <div><p className="font-medium text-ink">Ko‘nikma nishonlari</p><p className="text-sm text-muted">Fan bo‘yicha barcha darslarni tugatganda</p></div>
        </li>
      </ul>
    </div>
  );
}
