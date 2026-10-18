import { useCallback, useState } from 'react';
import { useToast } from '../context/ToastContext.jsx';

export function useAction() {
  const toast = useToast();
  const [busy, setBusy] = useState(false);
  const run = useCallback(
    async (fn, success) => {
      setBusy(true);
      try {
        const result = await fn();
        if (success) toast.success(success);
        return result ?? true;
      } catch (err) {
        toast.error(err);
        return false;
      } finally {
        setBusy(false);
      }
    },
    [toast]
  );
  return [run, busy];
}

export const lines = (text) => text.split('\n').map((s) => s.trim()).filter(Boolean);
