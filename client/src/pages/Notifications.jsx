import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, Bell, CalendarClock, CheckCheck, ClipboardList, HeartHandshake, Info, Trash2, Users } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import Button from '../components/ui/Button.jsx';
import Tabs from '../components/ui/Tabs.jsx';
import { EmptyState, ErrorState, Skeleton } from '../components/ui/Feedback.jsx';
import { useApi, useDocumentTitle } from '../hooks/useApi.js';
import { useToast } from '../context/ToastContext.jsx';
import { api } from '../lib/api.js';
import { cx, relativeTime } from '../lib/format.js';

const ICONS = { reminder: CalendarClock, deadline: CalendarClock, achievement: Award, group: Users, assignment: ClipboardList, parent: HeartHandshake, system: Info };

export default function Notifications() {
  useDocumentTitle('Bildirishnomalar');
  const toast = useToast();
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const { data, meta, loading, error, reload, setData } = useApi(`/notifications?page=${page}&limit=20${filter === 'unread' ? '&unread=true' : ''}`, { withMeta: true });

  const markRead = async (n) => {
    if (n.read) return;
    try {
      await api.patch(`/notifications/${n._id}/read`);
      setData((d) => ({ ...d, unread: Math.max(0, d.unread - 1), notifications: d.notifications.map((x) => (x._id === n._id ? { ...x, read: true } : x)) }));
    } catch (err) {
      toast.error(err);
    }
  };
  const markAll = async () => {
    try {
      await api.post('/notifications/read-all');
      setData((d) => ({ ...d, unread: 0, notifications: d.notifications.map((x) => ({ ...x, read: true })) }));
      toast.success('Barchasi o‘qilgan deb belgilandi');
    } catch (err) {
      toast.error(err);
    }
  };
  const remove = async (n) => {
    try {
      await api.delete(`/notifications/${n._id}`);
      setData((d) => ({ ...d, notifications: d.notifications.filter((x) => x._id !== n._id) }));
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Bildirishnomalar" description="Eslatmalar, topshiriqlar, yutuqlar va bog‘lanish so‘rovlari. Sozlamalarda qaysi turlarni olishni tanlashingiz mumkin." actions={data?.unread > 0 && <Button variant="secondary" icon={CheckCheck} onClick={markAll}>Barchasini o‘qilgan qilish</Button>} />
      <Tabs className="mb-5 w-fit" value={filter} onChange={(v) => { setFilter(v); setPage(1); }} tabs={[{ value: 'all', label: 'Barchasi' }, { value: 'unread', label: 'O‘qilmagan', count: data?.unread }]} />
      {error ? <ErrorState error={error} onRetry={reload} /> : loading && !data ? <Skeleton className="h-48" /> : !data.notifications.length ? (
        <EmptyState icon={Bell} title={filter === 'unread' ? 'O‘qilmagan bildirishnoma yo‘q' : 'Bildirishnomalar yo‘q'} description="Yangi xabarlar shu yerda paydo bo‘ladi." />
      ) : (
        <>
          <ul className="panel divide-y divide-line overflow-hidden">
            {data.notifications.map((n) => {
              const I = ICONS[n.type] || Info;
              const content = (
                <>
                  <span className={cx('mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full', n.read ? 'bg-sunken text-muted' : 'bg-primary-soft text-primary-ink')}><I className="h-4 w-4" aria-hidden /></span>
                  <div className="min-w-0 flex-1">
                    <p className={cx('text-sm', n.read ? 'text-ink/80' : 'font-semibold text-ink')}>{n.title}</p>
                    {n.body && <p className="text-sm text-muted">{n.body}</p>}
                    <p className="mt-0.5 text-xs text-muted">{relativeTime(n.createdAt)}</p>
                  </div>
                  {!n.read && <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" aria-label="O‘qilmagan" />}
                </>
              );
              return (
                <li key={n._id} className={cx('group flex items-start', !n.read && 'bg-primary-soft/20')}>
                  {n.link ? (
                    <Link to={n.link} onClick={() => markRead(n)} className="flex flex-1 gap-3 p-4 hover:bg-sunken">{content}</Link>
                  ) : (
                    <button onClick={() => markRead(n)} className="flex flex-1 gap-3 p-4 text-left hover:bg-sunken">{content}</button>
                  )}
                  <button onClick={() => remove(n)} className="m-3 rounded-control p-2 text-muted opacity-0 hover:text-danger focus:opacity-100 group-hover:opacity-100" aria-label="O‘chirish"><Trash2 className="h-4 w-4" /></button>
                </li>
              );
            })}
          </ul>
          {meta?.pages > 1 && (
            <div className="mt-4 flex items-center justify-center gap-3">
              <Button variant="secondary" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Oldingi</Button>
              <span className="text-sm text-muted">{page} / {meta.pages}</span>
              <Button variant="secondary" size="sm" disabled={page >= meta.pages} onClick={() => setPage((p) => p + 1)}>Keyingi</Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
