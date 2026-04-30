import { useEffect, useRef } from 'react';
import profile from '../../data/profile.json';
import { useLanguage } from '../../context/LanguageContext';
import Button from '../common/Button';
import './Hero.css';

export default function Hero() {
  const heroRef = useRef(null);
  const { lang } = useLanguage();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <section id="hero" className="hero" ref={heroRef}>
      <div className="hero__bg">
        <div className="hero__grid"></div>
        <div className="hero__glow"></div>
      </div>
      
      <div className="hero__container">
        <div className="hero__content">
          <span className="hero__badge">
            {lang === 'es' ? profile.availability : profile.availability_en}
          </span>
          
          <h1 className="hero__title">
            {lang === 'es' ? 'Hola, soy' : 'Hello, I\'m'} <span className="hero__name">{profile.name}</span>
          </h1>
          
          <p className="hero__subtitle">
            {lang === 'es' ? profile.title : profile.title_en}
          </p>
          
          <p className="hero__tagline">
            {lang === 'es' ? profile.tagline : profile.tagline_en}
          </p>
          
          <div className="hero__actions">
            <Button href="#projects" variant="primary" size="large">
              {lang === 'es' ? 'Ver proyectos' : 'View projects'}
            </Button>
            <Button href="#contact" variant="secondary" size="large">
              {lang === 'es' ? 'Contactar' : 'Contact'}
            </Button>
          </div>
          
          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-number">5+</span>
              <span className="hero__stat-label">
                {lang === 'es' ? 'Años de experiencia' : 'Years of experience'}
              </span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-number">6</span>
              <span className="hero__stat-label">
                {lang === 'es' ? 'Proyectos completados' : 'Projects completed'}
              </span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-number">1</span>
              <span className="hero__stat-label">
                {lang === 'es' ? 'Empresa' : 'Company'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="hero__visual">
          <div className="hero__avatar-wrapper">
            <div className="hero__avatar-ring"></div>
            <div className="hero__avatar">
              <img 
                  src={profile.avatar} 
                  alt={`${profile.fullName} - ${profile.title}`}
                  loading="eager"
                />
            </div>
          </div>
        </div>
      </div>
      
      <a href="#about" className="hero__scroll" aria-label={lang === 'es' ? 'Desplazarse hacia abajo' : 'Scroll down'}>
        <span></span>
      </a>
    </section>
  );
}