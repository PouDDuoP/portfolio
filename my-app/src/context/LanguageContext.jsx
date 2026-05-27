import { createContext, use, useState, useCallback, useEffect, useMemo } from 'react';

const LanguageContext = createContext();

function getInitialLang() {
  try {
    return localStorage.getItem('portfolio-lang') || 'es';
  } catch {
    return 'es';
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang);

  const toggleLang = useCallback(() => {
    setLang(prev => {
      const next = prev === 'es' ? 'en' : 'es';
      try {
        localStorage.setItem('portfolio-lang', next);
      } catch {}
      return next;
    });
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  
  const value = useMemo(() => ({ lang, toggleLang }), [lang, toggleLang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = use(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}