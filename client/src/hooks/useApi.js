import { useCallback, useEffect, useRef, useState } from 'react';
import { api } from '../lib/api.js';

export function useApi(path, { enabled = true, withMeta = false } = {}) {
  const [state, setState] = useState({ data: null, meta: null, loading: Boolean(path && enabled), error: null });
  const controllerRef = useRef(null);

  const load = useCallback(async () => {
    if (!path || !enabled) return;
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const res = withMeta ? await api.getWithMeta(path, { signal: controller.signal }) : { data: await api.get(path, { signal: controller.signal }) };
      if (!controller.signal.aborted) setState({ data: res.data, meta: res.meta || null, loading: false, error: null });
    } catch (err) {
      if (err.name !== 'AbortError') setState((s) => ({ ...s, loading: false, error: err }));
    }
  }, [path, enabled, withMeta]);

  useEffect(() => {
    load();
    return () => controllerRef.current?.abort();
  }, [load]);

  const setData = useCallback((updater) => setState((s) => ({ ...s, data: typeof updater === 'function' ? updater(s.data) : updater })), []);

  return { ...state, reload: load, setData };
}

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — DevForge` : 'DevForge — Kelajagingni o‘zing yarat';
  }, [title]);
}
