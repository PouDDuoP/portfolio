import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'

if (import.meta.env.VITE_GA_ID) {
  // Difiere gtag para no bloquear el render inicial ni causar forced reflow
  const initGtag = () => {
    const gaId = import.meta.env.VITE_GA_ID;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', gaId);
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(initGtag, { timeout: 2000 });
  } else {
    setTimeout(initGtag, 1000);
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
)