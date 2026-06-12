import { useState, useMemo, useCallback } from 'react';
import projects from '../../data/projects.json';
import profile from '../../data/profile.json';
import { useT } from '../../i18n/useTranslation';
import Section from '../common/Section';
import Card from '../common/Card';
import CarouselShell from '../common/CarouselShell';
import Icon from '../common/Icon';
import './Projects.css';

const GITHUB_LABELS = {
  frontend: 'Front-end',
  backend: 'Back-end',
  mobile: 'Mobile'
};

function getGithubRepos(project) {
  if (!project.github) return [];
  if (typeof project.github === 'string') {
    return [{ label: null, url: project.github }];
  }
  return Object.entries(project.github)
    .filter(([, url]) => url)
    .map(([key, url]) => ({
      label: GITHUB_LABELS[key] || key,
      url
    }));
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const { t } = useT();
  
  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => b.date.localeCompare(a.date));
  }, []);
  
  const filteredProjects = useMemo(() => {
    return sortedProjects.filter(p => {
      if (activeFilter === 'all') return true;
      return p.type === activeFilter;
    });
  }, [activeFilter, sortedProjects]);
  
  const hasActions = useCallback((project) => {
    if (project.demo) return true;
    const repos = getGithubRepos(project);
    return repos.length > 0;
  }, []);
  
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
      
      <CarouselShell key={activeFilter} className="projects" cardWidth={340}>
        {filteredProjects.map((project) => (
          <Card key={project.id} className="project-card" hover={false}>
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
              
              {hasActions(project) && (
                <div className="project-card__actions">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-card__btn project-card__btn--primary"
                      aria-label={`${t('projects.viewDemo', { title: t('projects.' + project.id + '.title') })} - ${t('common.opensInNewTab')}`}
                    >
                      <Icon name="external" size={16} />
                      Demo
                      <span className="sr-only">{t('common.opensInNewTab')}</span>
                    </a>
                  )}
                  {getGithubRepos(project).map((repo, i) => (
                    <a
                      key={i}
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-card__btn project-card__btn--secondary"
                      aria-label={`${t('projects.viewCode', { title: t('projects.' + project.id + '.title') })} - ${t('common.opensInNewTab')}`}
                    >
                      <Icon name="github" size={16} />
                      {repo.label || t('projects.viewCodeBtn')}
                      <span className="sr-only">{t('common.opensInNewTab')}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </Card>
        ))}
      </CarouselShell>
      
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
          <span className="sr-only">{t('common.opensInNewTab')}</span>
        </a>
      </div>
    </Section>
  );
}