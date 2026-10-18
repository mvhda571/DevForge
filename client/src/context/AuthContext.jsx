import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api.js';

const AuthContext = createContext(null);

export const HOME_BY_ROLE = { student: '/app', teacher: '/teacher', parent: '/parent', admin: '/admin' };

export function homeFor(user) {
  if (!user) return '/login';
  if (user.role === 'student' && !user.onboardingCompleted) return '/onboarding';
  return HOME_BY_ROLE[user.role] || '/app';
}

export function AuthProvider({ children }) {
  const [state, setState] = useState({ user: null, profile: null, level: null, loading: true });

  const apply = useCallback((data) => setState({ user: data?.user || null, profile: data?.profile || null, level: data?.level || null, loading: false }), []);

  const refresh = useCallback(async () => {
    try {
      apply(await api.get('/auth/me'));
    } catch {
      apply(null);
    }
  }, [apply]);

  useEffect(() => {
    refresh();
    const onUnauthorized = () => setState((s) => (s.user ? { user: null, profile: null, level: null, loading: false } : s));
    window.addEventListener('df:unauthorized', onUnauthorized);
    return () => window.removeEventListener('df:unauthorized', onUnauthorized);
  }, [refresh]);

  const login = useCallback(async (email, password) => {
    const data = await api.post('/auth/login', { email, password });
    apply(data);
    return data.user;
  }, [apply]);

  const register = useCallback(async (payload) => {
    const data = await api.post('/auth/register', payload);
    apply(data);
    return data.user;
  }, [apply]);

  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      apply(null);
    }
  }, [apply]);

  const value = useMemo(() => ({ ...state, login, register, logout, refresh, setSession: apply }), [state, login, register, logout, refresh, apply]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
