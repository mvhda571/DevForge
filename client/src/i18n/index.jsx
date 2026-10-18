import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import uz from './uz.js';

const dictionaries = { uz };
export const LOCALES = [{ code: 'uz', label: 'O‘zbekcha' }];

const I18nContext = createContext(null);

function lookup(dict, key) {
  return key.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), dict);
}

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState(() => {
    try {
      const saved = localStorage.getItem('df-locale');
      return saved && dictionaries[saved] ? saved : 'uz';
    } catch {
      return 'uz';
    }
  });

  const setLocale = useCallback((code) => {
    if (!dictionaries[code]) return;
    setLocaleState(code);
    try {
      localStorage.setItem('df-locale', code);
    } catch {
      /* storage unavailable */
    }
    document.documentElement.lang = code;
  }, []);

  const t = useCallback(
    (key, vars) => {
      const value = lookup(dictionaries[locale], key) ?? lookup(dictionaries.uz, key) ?? key;
      if (typeof value !== 'string' || !vars) return value;
      return value.replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? `{${k}}`));
    },
    [locale]
  );

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useT() {
  return useContext(I18nContext).t;
}

export function useI18n() {
  return useContext(I18nContext);
}
