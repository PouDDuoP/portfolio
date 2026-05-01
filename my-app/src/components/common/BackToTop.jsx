import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './BackToTop.css';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { lang } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  const label = lang === 'es' ? 'Volver arriba' : 'Back to top';

  return (
    <button
      className="back-to-top"
      onClick={scrollToTop}
      aria-label={label}
      title={label}
    >
      ↑
    </button>
  );
}
