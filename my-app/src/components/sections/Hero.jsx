import { useState, useEffect, useRef } from 'react';
import profile from '../../data/profile.json';
import { useT } from '../../i18n/useTranslation';
import Button from '../common/Button';
import { trackEvent } from '../../utils/analytics';
import './Hero.css';

const LANGUAGES = [
  { name: 'Español', level: 'Nativo' },
  { name: 'Inglés', level: 'B1' }
];

const LANG_TRANSLATIONS = { 'Español': 'Spanish', 'Inglés': 'English' };
const LANG_LEVELS = { 'Nativo': 'native', 'B1': 'B1' };

const TITLE_KEYS = ['profile.title.0', 'profile.title.1', 'profile.title.2'];

export default function Hero() {
  const { t, lang } = useT();
  const [titleIndex, setTitleIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const subtitleRef = useRef(null);

  const fullText = t(TITLE_KEYS[titleIndex]);
  const cvUrl = lang === 'en'
    ? import.meta.env.VITE_CV_BLOB_URL_EN
    : import.meta.env.VITE_CV_BLOB_URL;
  const cvLabel = `CV-KevinAlvarado-2026-${lang === 'en' ? 'EN' : 'ES'}`;

  // Typewriter: actualiza el DOM directo sin re-renders
  useEffect(() => {
    const el = subtitleRef.current;
    if (el) el.textContent = '';
    let charIndex = 0;

    const interval = setInterval(() => {
      charIndex++;
      if (el) el.textContent = fullText.slice(0, charIndex);
      if (charIndex >= fullText.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [titleIndex, fullText]);

  // Cuando termina de escribir, pausa y cicla al siguiente título
  useEffect(() => {
    if (!isTyping) {
      const timeout = setTimeout(() => {
        setTitleIndex(prev => (prev + 1) % TITLE_KEYS.length);
        setIsTyping(true);
      }, 2500);
      return () => clearTimeout(timeout);
    }
  }, [isTyping]);
  
  return (
    <section id="hero" className="hero">
      <div className="hero__bg">
        <div className="hero__grid"></div>
        <div className="hero__glow"></div>
      </div>
      
      <div className="hero__container">
        <div className="hero__content">
          
          <h1 className="hero__title">
            <span className="hero__greeting">{t('hero.greeting')}</span>{' '}
            <span className="hero__name">{profile.fullName}</span>
          </h1>
          
          <h2 ref={subtitleRef} className={`hero__subtitle${isTyping ? ' hero__subtitle--typing' : ''}`} aria-live="polite"></h2>
          
          <p className="hero__tagline">
            {t('profile.tagline')}
          </p>
          
          <div className="hero__location">
            <svg className="hero__location-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="18" height="18">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>{profile.location}</span>
            {profile.status && (
              <>
                <span className="hero__status-sep" aria-hidden="true">|</span>
                <span className={`hero__status hero__status--${profile.status.type}`}>
                  <span className={`hero__status-dot hero__status-dot--${profile.status.type}`} />
                  <span>{t('hero.status.' + profile.status.type)}</span>
                </span>
              </>
            )}
          </div>

          <div className="hero__languages">
            <svg className="hero__lang-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <span className="hero__lang-label">{t('hero.languages')}</span>
            <div className="hero__lang-list">
              {LANGUAGES.map((lang, i) => (
                <span key={lang.name} className="hero__lang-item">
                  <span className="hero__lang-name">
                    {t('skills.soft.' + LANG_TRANSLATIONS[lang.name])}
                  </span>
                  <span className="hero__lang-level">
                    {t('skills.level.' + LANG_LEVELS[lang.level])}
                  </span>
                  {i < LANGUAGES.length - 1 && <span className="hero__lang-sep" aria-hidden="true">|</span>}
                </span>
              ))}
            </div>
          </div>
          
          <div className="hero__actions">
            <Button href="#contact" variant="primary" size="large">
              {t('hero.contact')}
            </Button>
            <Button href="#projects" variant="secondary" size="large">
              {t('hero.viewProjects')}
            </Button>
            {cvUrl && (
              <Button href={cvUrl} target="_blank" rel="noopener noreferrer" variant="secondary" size="large"
                onClick={() => trackEvent('CV', 'download', cvLabel)}>
                {t('hero.downloadCv')}
                <span className="sr-only">{t('common.opensInNewTab')}</span>
              </Button>
            )}
          </div>
        </div>
        
        <div className="hero__right">
          <div className="hero__visual">
            <div className="hero__avatar-wrapper">
              <div className="hero__avatar-ring"></div>
              <div className="hero__avatar">
                <img 
                    src={profile.avatar} 
                    alt={`${profile.fullName} - ${profile.title}`}
                    width="250"
                    height="250"
                    loading="eager"
                  />
              </div>
            </div>
          </div>
          
          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-number">8+</span>
              <span className="hero__stat-label">
                {t('hero.yearsExperience')}
              </span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-number">15+</span>
              <span className="hero__stat-label">
                {t('hero.projects')}
              </span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-number">10+</span>
              <span className="hero__stat-label">
                {t('hero.clients')}
              </span>
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