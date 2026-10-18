import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { api } from '../lib/api.js';

export default function NotificationBell() {
  const [unread, setUnread] = useState(0);
  const location = useLocation();
  useEffect(() => {
    let alive = true;
    const load = () => api.get('/notifications/unread-count').then((d) => alive && setUnread(d.unread)).catch(() => {});
    load();
    const id = setInterval(load, 60000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [location.pathname]);
  return (
    <Link to="/app/notifications" className="relative grid h-9 w-9 place-items-center rounded-control text-muted hover:bg-sunken hover:text-ink" aria-label={unread ? `Bildirishnomalar: ${unread} ta o‘qilmagan` : 'Bildirishnomalar'}>
      <Bell className="h-5 w-5" />
      {unread > 0 && <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-danger px-1 text-[10px] font-semibold text-white">{unread > 9 ? '9+' : unread}</span>}
    </Link>
  );
}
