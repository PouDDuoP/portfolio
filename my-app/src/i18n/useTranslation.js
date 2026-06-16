import { useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import core from './translations-core';
import fullTranslations from './translations';

export function useT() {
  const { lang, toggleLang } = useLanguage();

  const t = useCallback((key, params = {}) => {
    const entry = core[key] || fullTranslations[key];
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
