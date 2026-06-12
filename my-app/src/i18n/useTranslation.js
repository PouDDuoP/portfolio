import { useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import core from './translations-core';

// Carga diferida del resto de traducciones — empieza inmediatamente pero no bloquea el bundle crítico
let fullTranslations = null;
import('./translations').then(m => {
  fullTranslations = m.default;
});

export function useT() {
  const { lang, toggleLang } = useLanguage();

  const t = useCallback((key, params = {}) => {
    // Busca primero en core (eager), luego en full (lazy — llega en paralelo)
    const entry = core[key] || (fullTranslations && fullTranslations[key]);
    if (!entry) return key;

    let text = entry[lang] || entry['es'] || key;

    // Simple interpolation: replace {{key}} with value
    for (const [k, v] of Object.entries(params)) {
      text = text.replaceAll(`{{${k}}}`, v);
    }

    return text;
  }, [lang]);

  return { t, lang, toggleLang };
}
