import { useState } from 'react';
import projects from '../../data/projects.json';
import profile from '../../data/profile.json';
import { useLanguage } from '../../context/LanguageContext';
import Section from '../common/Section';
import Card from '../common/Card';
import './Projects.css';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const { lang } = useLanguage();
  
  const filteredProjects = projects.filter(p => {
    if (activeFilter === 'all') return true;
    return p.type === activeFilter;
  });
  
  return (
    <Section id="projects" title="Proyectos" subtitle="Trabajos realizados">
      <div className="projects__controls">
        <div className="projects__filters">
          <button 
            className={`projects__filter ${activeFilter === 'all' ? 'projects__filter--active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            Todos
          </button>
          <button 
            className={`projects__filter ${activeFilter === 'personal' ? 'projects__filter--active' : ''}`}
            onClick={() => setActiveFilter('personal')}
          >
            Personales
          </button>
          <button 
            className={`projects__filter ${activeFilter === 'laboral' ? 'projects__filter--active' : ''}`}
            onClick={() => setActiveFilter('laboral')}
          >
            Laborales
          </button>
        </div>
      </div>
      
      <div className="projects__grid">
        {filteredProjects.map((project, index) => (
          <Card key={project.id} className="project-card" style={{ '--delay': `${index * 0.1}s` }}>
            {project.image && (
              <div className="project-card__image">
                <img src={project.image} alt={lang === 'es' ? project.title : project.title_en} loading="lazy" />
                <div className="project-card__overlay">
                <div className="project-card__actions">
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-card__btn"
                      aria-label={lang === 'es' ? `Ver código de ${project.title}` : `View code of ${project.title_en}`}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.705-3.63-1.305-3.63-1.305-.54-1.38-1.335-1.755-1.335-1.755-1.095-.75.09-.735.09-.735 1.2.09 1.83 1.245 1.83 1.245 1.08 1.86 2.805 1.32 3.495 1.005.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                    </a>
                  )}
                  {project.demo && (
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-card__btn project-card__btn--primary"
                      aria-label={lang === 'es' ? `Ver demo de ${project.title}` : `View demo of ${project.title_en}`}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                      </svg>
                    </a>
                  )}
                </div>
               </div>
             </div>
            )}
            
            <div className="project-card__content">
              <h3 className="project-card__title">
                {lang === 'es' ? project.title : project.title_en}
              </h3>
              <p className="project-card__description">
                {lang === 'es' ? project.description : project.description_en}
              </p>
              
              <div className="project-card__stack">
                {project.techStack.map((tech, i) => (
                  <span key={i} className="project-card__tech">{tech}</span>
                ))}
              </div>
              
              <div className="project-card__result">
                <span className="project-card__result-label">
                  {lang === 'es' ? 'Desafío: ' : 'Challenge: '}
                </span>
                <span className="project-card__result-value">
                  {lang === 'es' ? project.challenge : project.challenge_en}
                </span>
              </div>
              
              <div className="project-card__result">
                <span className="project-card__result-label">
                  {lang === 'es' ? 'Resultado: ' : 'Result: '}
                </span>
                <span className="project-card__result-value">
                  {lang === 'es' ? project.result : project.result_en}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="projects__more">
        <a 
          href={profile.social.github} 
          target="_blank" 
          rel="noopener noreferrer"
          className="projects__more-link"
        >
          {lang === 'es' ? 'Ver todos los proyectos' : 'View all projects'}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </Section>
  );
}