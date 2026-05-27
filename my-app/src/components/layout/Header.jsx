import { useState } from 'react';
import { useT } from '../../i18n/useTranslation';
import { useTheme } from '../../context/ThemeContext';
import './Header.css';

const navLinks = [
  { href: '#about', key: 'nav.about' },
  { href: '#skills', key: 'nav.skills' },
  { href: '#projects', key: 'nav.projects' },
  { href: '#experience', key: 'nav.experience' },
  { href: '#education', key: 'nav.education' },
  { href: '#contact', key: 'nav.contact' },
];

export default function Header({ scrolled }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, lang, toggleLang } = useT();
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__container">
        <a href="#hero" className="header__logo">
          <span className="header__logo-text">KA</span>
          <span className="header__logo-dot"></span>
        </a>
        
        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          {navLinks.map((link) => (
            <a 
              key={link.href}
              href={link.href}
              className="header__link"
              onClick={() => setMenuOpen(false)}
            >
              {t(link.key)}
            </a>
          ))}
        </nav>
        
        <div className="header__actions">
          <button
            type="button"
            className="header__theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t('theme.toggleLight') : t('theme.toggleDark')}
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
              </svg>
            )}
          </button>
          <button 
            type="button"
            className="header__lang-toggle"
            onClick={toggleLang}
            aria-label={t('nav.switchLang')}
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          
          <button 
            type="button"
            className={`header__menu-btn ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={t('nav.menuOpen')}
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}