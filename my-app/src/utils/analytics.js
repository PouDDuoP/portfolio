import ReactGA from 'react-ga4';

/**
 * Envía un evento a Google Analytics 4.
 * Solo se ejecuta si VITE_GA_ID está configurado.
 */
export function trackEvent(category, action, label) {
  if (!import.meta.env.VITE_GA_ID) return;
  ReactGA.event({ category, action, label });
}
