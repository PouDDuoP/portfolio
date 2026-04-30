import { useEffect, useRef } from 'react';
import profile from '../data/profile.json';
import Button from '../common/Button';
import './Hero.css';

export default function Hero() {
  const heroRef = useRef(null);
  
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
          <span className="hero__badge">{profile.availability}</span>
          
          <h1 className="hero__title">
            Hola, soy <span className="hero__name">{profile.name}</span>
          </h1>
          
          <p className="hero__subtitle">{profile.title}</p>
          
          <p className="hero__tagline">{profile.tagline}</p>
          
          <div className="hero__actions">
            <Button href="#projects" variant="primary" size="large">
              Ver proyectos
            </Button>
            <Button href="#contact" variant="secondary" size="large">
              Contactar
            </Button>
          </div>
          
          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-number">5+</span>
              <span className="hero__stat-label">Años de experiencia</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-number">25+</span>
              <span className="hero__stat-label">Proyectos completados</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-number">15+</span>
              <span className="hero__stat-label">Clientes satisfechos</span>
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
      
      <a href="#about" className="hero__scroll" aria-label="Scroll down">
        <span></span>
      </a>
    </section>
  );
}