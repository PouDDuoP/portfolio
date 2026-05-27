import { useState, useEffect } from 'react';
import { useT } from '../../i18n/useTranslation';
import './BackToTop.css';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { t } = useT();

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

  const label = t('common.backToTop');

  return (
    <button
      type="button"
      className="back-to-top"
      onClick={scrollToTop}
      aria-label={label}
      title={label}
    >
      ↑
    </button>
  );
}
