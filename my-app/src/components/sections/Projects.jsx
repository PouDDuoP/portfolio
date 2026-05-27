import { useState, useMemo } from 'react';
import projects from '../../data/projects.json';
import profile from '../../data/profile.json';
import { useT } from '../../i18n/useTranslation';
import Section from '../common/Section';
import Card from '../common/Card';
import './Projects.css';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const { t } = useT();
  
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      if (activeFilter === 'all') return true;
      return p.type === activeFilter;
    });
  }, [activeFilter]);
  
  return (
    <Section id="projects" title={t('projects.title')} subtitle={t('projects.subtitle')}>
      <div className="projects__controls">
        <div className="projects__filters">
          <button 
            type="button"
            className={`projects__filter ${activeFilter === 'all' ? 'projects__filter--active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            {t('projects.filter.all')}
          </button>
          <button 
            type="button"
            className={`projects__filter ${activeFilter === 'personal' ? 'projects__filter--active' : ''}`}
            onClick={() => setActiveFilter('personal')}
          >
            {t('projects.filter.personal')}
          </button>
          <button 
            type="button"
            className={`projects__filter ${activeFilter === 'laboral' ? 'projects__filter--active' : ''}`}
            onClick={() => setActiveFilter('laboral')}
          >
            {t('projects.filter.professional')}
          </button>
        </div>
      </div>
      
      <div className="projects__grid">
        {filteredProjects.map((project, index) => (
          <Card key={project.id} className="project-card" style={{ '--delay': `${index * 0.1}s` }}>
            <div className="project-card__content">
              <h3 className="project-card__title">
                {t('projects.' + project.id + '.title')}
              </h3>
              <p className="project-card__description">
                {t('projects.' + project.id + '.description')}
              </p>
              
              <div className="project-card__stack">
                {project.techStack.map((tech) => (
                  <span key={tech} className="project-card__tech">{tech}</span>
                ))}
              </div>
              
              <div className="project-card__result">
                <span className="project-card__result-label">
                  {t('projects.challenge')}
                </span>
                <span className="project-card__result-value">
                  {t('projects.' + project.id + '.challenge')}
                </span>
              </div>
              
              <div className="project-card__result">
                <span className="project-card__result-label">
                  {t('projects.result')}
                </span>
                <span className="project-card__result-value">
                  {t('projects.' + project.id + '.result')}
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
          {t('projects.viewAll')}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </Section>
  );
}