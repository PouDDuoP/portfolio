import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import BackToTop from '../common/BackToTop';
import './Layout.css';

export default function Layout({ children }) {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className={`layout ${scrolled ? 'layout--scrolled' : ''}`}>
      <Header scrolled={scrolled} />
      <main className="layout__main">
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}