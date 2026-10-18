import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Search, Trash2 } from 'lucide-react';
import Button from '../../components/ui/Button.jsx';
import Badge from '../../components/ui/Badge.jsx';
import Dialog from '../../components/ui/Dialog.jsx';
import { Select } from '../../components/ui/Field.jsx';
import { EmptyState, ErrorState, Skeleton } from '../../components/ui/Feedback.jsx';
import { useApi } from '../../hooks/useApi.js';
import { useAction } from '../../hooks/useAction.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { api, qs } from '../../lib/api.js';
import { formatDate } from '../../lib/format.js';

export const ROLE_OPTIONS = [
  { value: 'student', label: 'O‘quvchi' },
  { value: 'teacher', label: 'O‘qituvchi' },
  { value: 'parent', label: 'Ota-ona' },
  { value: 'admin', label: 'Administrator' }
];

export default function AdminUsers() {
  const { user: me } = useAuth();
  const [search, setSearch] = useState('');
  const [q, setQ] = useState('');
  const [role, setRole] = useState('');
  const [page, setPage] = useState(1);
  const [deleting, setDeleting] = useState(null);
  const [run, busy] = useAction();
  const { data, meta, loading, error, reload, setData } = useApi(`/admin/users${qs({ q, role, page, limit: 20 })}`, { withMeta: true });

  useEffect(() => {
    const t = setTimeout(() => { setQ(search.trim()); setPage(1); }, 350);
    return () => clearTimeout(t);
  }, [search]);

  const update = async (u, patch) => {
    const d = await run(() => api.patch(`/admin/users/${u.id}`, patch), 'Saqlandi');
    if (d) setData((prev) => ({ ...prev, users: prev.users.map((x) => (x.id === u.id ? { ...x, ...d.user } : x)) }));
  };

  const remove = async () => {
    if (await run(() => api.delete(`/admin/users/${deleting.id}`), 'Foydalanuvchi va uning ma’lumotlari o‘chirildi')) {
      setDeleting(null);
      reload();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
          <label htmlFor="user-search" className="sr-only">Ism yoki email bo‘yicha qidirish</label>
          <input id="user-search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Ism yoki email" className="field pl-9" />
        </div>
        <Select className="sm:w-52" aria-label="Rol bo‘yicha filtr" placeholder="Barcha rollar" value={role} onChange={(e) => { setRole(e.target.value); setPage(1); }} options={ROLE_OPTIONS} />
      </div>

      {error ? <ErrorState error={error} onRetry={reload} /> : loading && !data ? <Skeleton className="h-64" /> : !data.users.length ? (
        <EmptyState icon={Search} title="Foydalanuvchi topilmadi" />
      ) : (
        <div className="panel overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-line text-xs text-muted">
              <tr>
                <th className="px-4 py-3 font-medium" scope="col">Foydalanuvchi</th>
                <th className="px-4 py-3 font-medium" scope="col">Rol</th>
                <th className="px-4 py-3 font-medium" scope="col">Holat</th>
                <th className="px-4 py-3 font-medium" scope="col">Ro‘yxatdan o‘tgan</th>
                <th className="px-4 py-3 font-medium" scope="col">Oxirgi kirish</th>
                <th className="px-4 py-3" scope="col"><span className="sr-only">Amallar</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {data.users.map((u) => {
                const self = u.id === me?.id;
                return (
                  <tr key={u.id}>
                    <td className="px-4 py-3">
                      <p className="font-medium text-ink">{u.name} {self && <Badge tone="primary">Siz</Badge>}</p>
                      <p className="text-xs text-muted">{u.email}</p>
                    </td>
                    <td className="px-4 py-3">
                      <select aria-label={`${u.name} roli`} disabled={self || busy} value={u.role} onChange={(e) => update(u, { role: e.target.value })} className="field h-9 w-40 py-1">
                        {ROLE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <button disabled={self || busy} onClick={() => update(u, { status: u.status === 'active' ? 'disabled' : 'active' })} className="disabled:cursor-not-allowed" aria-label={u.status === 'active' ? `${u.name} hisobini bloklash` : `${u.name} hisobini faollashtirish`}>
                        {u.status === 'active' ? <Badge tone="success">Faol</Badge> : <Badge tone="danger">Bloklangan</Badge>}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-muted">{formatDate(u.createdAt)}</td>
                    <td className="px-4 py-3 text-muted">{u.lastLoginAt ? formatDate(u.lastLoginAt, true) : '—'}</td>
                    <td className="px-4 py-3 text-right">
                      {!self && <button onClick={() => setDeleting(u)} className="rounded-control p-2 text-muted hover:bg-sunken hover:text-danger" aria-label={`${u.name}ni o‘chirish`}><Trash2 className="h-4 w-4" /></button>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {meta && meta.pages > 1 && (
        <div className="flex items-center justify-between text-sm text-muted">
          <span>{meta.total} ta foydalanuvchi</span>
          <div className="flex items-center gap-2">
            <Button size="iconSm" variant="secondary" disabled={page <= 1} onClick={() => setPage(page - 1)} aria-label="Oldingi sahifa"><ChevronLeft className="h-4 w-4" /></Button>
            <span>{page} / {meta.pages}</span>
            <Button size="iconSm" variant="secondary" disabled={page >= meta.pages} onClick={() => setPage(page + 1)} aria-label="Keyingi sahifa"><ChevronRight className="h-4 w-4" /></Button>
          </div>
        </div>
      )}
      <p className="text-xs text-muted">Rol yoki holat o‘zgarganda foydalanuvchining joriy sessiyalari bekor qilinadi.</p>

      <Dialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        title="Foydalanuvchini o‘chirish"
        size="sm"
        description={deleting ? `${deleting.name} (${deleting.email}) hisobi va unga tegishli barcha o‘quv ma’lumotlari butunlay o‘chiriladi. Bu amalni qaytarib bo‘lmaydi.` : ''}
        footer={<><Button variant="secondary" onClick={() => setDeleting(null)}>Bekor qilish</Button><Button variant="danger" loading={busy} onClick={remove}>O‘chirish</Button></>}
      />
    </div>
  );
}
