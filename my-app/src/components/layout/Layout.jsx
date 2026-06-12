import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import BackToTop from '../common/BackToTop';
import { useT } from '../../i18n/useTranslation';
import './Layout.css';

export default function Layout({ children }) {
  const [scrolled, setScrolled] = useState(false);
  const { t } = useT();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className={`layout ${scrolled ? 'layout--scrolled' : ''}`}>
      <a href="#main-content" className="skip-to-content">
        {t('common.skipToContent')}
      </a>
      <Header scrolled={scrolled} />
      <main id="main-content" className="layout__main">
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}