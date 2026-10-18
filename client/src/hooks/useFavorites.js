import { useCallback, useEffect, useState } from 'react';
import { api } from '../lib/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export function useFavorites(kind) {
  const { user } = useAuth();
  const toast = useToast();
  const [ids, setIds] = useState(new Set());
  const enabled = user?.role === 'student';

  useEffect(() => {
    if (!enabled) return;
    api.get(`/favorites?kind=${kind}`).then((d) => setIds(new Set(d[kind].map((f) => String(f.refId))))).catch(() => {});
  }, [enabled, kind]);

  const toggle = useCallback(
    async (refId) => {
      const id = String(refId);
      const had = ids.has(id);
      try {
        if (had) await api.delete(`/favorites/by-ref/${kind}/${id}`);
        else await api.post('/favorites', { kind, refId: id });
        setIds((prev) => {
          const next = new Set(prev);
          if (had) next.delete(id);
          else next.add(id);
          return next;
        });
        toast.success(had ? 'Saqlanganlardan olib tashlandi' : 'Saqlanganlarga qo‘shildi');
      } catch (err) {
        toast.error(err);
      }
    },
    [ids, kind, toast]
  );

  return { enabled, has: (id) => ids.has(String(id)), toggle };
}
