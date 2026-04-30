import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './Header.css';

const navLinksEs = [
  { href: '#about', label: 'Sobre mí' },
  { href: '#skills', label: 'Habilidades' },
  { href: '#projects', label: 'Proyectos' },
  { href: '#experience', label: 'Experiencia' },
  { href: '#contact', label: 'Contacto' },
];

const navLinksEn = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

export default function Header({ scrolled }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, toggleLang } = useLanguage();
  const navLinks = lang === 'es' ? navLinksEs : navLinksEn;
  
  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__container">
        <a href="#" className="header__logo">
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
              {link.label}
            </a>
          ))}
        </nav>
        
        <div className="header__actions">
          <button 
            className="header__lang-toggle"
            onClick={toggleLang}
            aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          
          <button 
            className={`header__menu-btn ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={lang === 'es' ? 'Abrir menú de navegación' : 'Toggle navigation'}
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