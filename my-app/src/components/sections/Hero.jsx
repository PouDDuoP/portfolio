import { useEffect, useRef } from 'react';
import profile from '../../data/profile.json';
import { useT } from '../../i18n/useTranslation';
import Button from '../common/Button';
import './Hero.css';

export default function Hero() {
  const heroRef = useRef(null);
  const { t } = useT();
  
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
            {t('profile.availability')}
          </span>
          
          <h1 className="hero__title">
            {t('hero.greeting')} <span className="hero__name">{profile.name}</span>
          </h1>
          
          <p className="hero__subtitle">
            {t('profile.title')}
          </p>
          
          <p className="hero__tagline">
            {t('profile.tagline')}
          </p>
          
          <div className="hero__actions">
            <Button href="#projects" variant="primary" size="large">
              {t('hero.viewProjects')}
            </Button>
            <Button href="#contact" variant="secondary" size="large">
              {t('hero.contact')}
            </Button>
            {import.meta.env.VITE_CV_BLOB_URL && (
              <Button href={import.meta.env.VITE_CV_BLOB_URL} download variant="secondary" size="large">
                {t('hero.downloadCv')}
              </Button>
            )}
          </div>
          
          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-number">5+</span>
              <span className="hero__stat-label">
                {t('hero.yearsExperience')}
              </span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-number">8</span>
              <span className="hero__stat-label">
                {t('hero.projects')}
              </span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-number">3</span>
              <span className="hero__stat-label">
                {t('hero.clients')}
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
      
      <a href="#about" className="hero__scroll" aria-label={t('hero.scrollDown')}>
        <span></span>
      </a>
    </section>
  );
}