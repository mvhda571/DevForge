import { useState } from 'react';
import { ChevronLeft, ChevronRight, ScrollText } from 'lucide-react';
import Button from '../../components/ui/Button.jsx';
import { EmptyState, ErrorState, Skeleton } from '../../components/ui/Feedback.jsx';
import { useApi } from '../../hooks/useApi.js';
import { formatDate } from '../../lib/format.js';

const ACTIONS = {
  'user.update': 'Foydalanuvchi roli/holati o‘zgartirildi',
  'user.delete': 'Foydalanuvchi o‘chirildi',
  'career.create': 'Kasb qo‘shildi',
  'career.update': 'Kasb tahrirlandi',
  'career.deactivate': 'Kasb nofaol qilindi',
  'question.update': 'Test savoli tahrirlandi',
  'lesson.update': 'Dars tahrirlandi',
  'quiz.update': 'Dars testi tahrirlandi',
  'university.create': 'Universitet qo‘shildi',
  'university.update': 'Universitet tahrirlandi',
  'university.delete': 'Universitet o‘chirildi',
  'parent_link.accept': 'Ota-ona bog‘lanishi tasdiqlandi',
  'parent_link.decline': 'Ota-ona bog‘lanishi rad etildi',
  'parent_link.revoke': 'Ota-ona bog‘lanishi bekor qilindi',
  'account.delete_self': 'Foydalanuvchi o‘z hisobini o‘chirdi',
  'auth.password_change': 'Parol o‘zgartirildi'
};

function metaSummary(meta = {}) {
  if (meta.before && meta.after) return Object.keys(meta.after).filter((k) => meta.before[k] !== meta.after[k]).map((k) => `${k}: ${meta.before[k]} → ${meta.after[k]}`).join(', ');
  if (meta.fields) return `Maydonlar: ${meta.fields.join(', ')}`;
  if (meta.slug) return meta.slug;
  if (meta.lesson) return meta.lesson;
  if (meta.role) return `Rol: ${meta.role}`;
  return '';
}

export default function AdminAudit() {
  const [page, setPage] = useState(1);
  const { data, meta, loading, error, reload } = useApi(`/admin/audit-logs?page=${page}`, { withMeta: true });
  if (error) return <ErrorState error={error} onRetry={reload} />;
  if (loading && !data) return <Skeleton className="h-64" />;
  if (!data.logs.length) return <EmptyState icon={ScrollText} title="Audit jurnali bo‘sh" description="Muhim amallar (rol o‘zgarishi, o‘chirish, kontent tahriri) shu yerda qayd etiladi." />;

  return (
    <div className="space-y-4">
      <div className="panel overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-line text-xs text-muted">
            <tr>
              <th className="px-4 py-3 font-medium" scope="col">Vaqt</th>
              <th className="px-4 py-3 font-medium" scope="col">Kim</th>
              <th className="px-4 py-3 font-medium" scope="col">Amal</th>
              <th className="px-4 py-3 font-medium" scope="col">Tafsilot</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {data.logs.map((l) => (
              <tr key={l._id}>
                <td className="whitespace-nowrap px-4 py-3 text-muted">{formatDate(l.createdAt, true)}</td>
                <td className="px-4 py-3"><p className="text-ink">{l.actor?.name || 'O‘chirilgan foydalanuvchi'}</p>{l.actor && <p className="text-xs text-muted">{l.actor.role}</p>}</td>
                <td className="px-4 py-3 text-ink">{ACTIONS[l.action] || l.action}</td>
                <td className="px-4 py-3 text-xs text-muted">{metaSummary(l.meta) || (l.targetType ? `${l.targetType} ${l.targetId}` : '—')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {meta?.pages > 1 && (
        <div className="flex items-center justify-end gap-2 text-sm text-muted">
          <Button size="iconSm" variant="secondary" disabled={page <= 1} onClick={() => setPage(page - 1)} aria-label="Oldingi sahifa"><ChevronLeft className="h-4 w-4" /></Button>
          <span>{page} / {meta.pages}</span>
          <Button size="iconSm" variant="secondary" disabled={page >= meta.pages} onClick={() => setPage(page + 1)} aria-label="Keyingi sahifa"><ChevronRight className="h-4 w-4" /></Button>
        </div>
      )}
    </div>
  );
}
