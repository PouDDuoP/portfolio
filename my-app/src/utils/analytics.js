/**
 * Envía un evento a Google Analytics 4 vía gtag nativo.
 * Solo se ejecuta si gtag está disponible.
 */
export function trackEvent(category, action, label) {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', action, { event_category: category, event_label: label });
}
