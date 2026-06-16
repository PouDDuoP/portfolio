import experience from '../../data/experience.json';
import { useT } from '../../i18n/useTranslation';
import Section from '../common/Section';
import './Experience.css';

export default function Experience() {
  const { t } = useT();
  
  const formatDate = (date) => {
    if (date === 'actual') return t('experience.present');
    const [year, month] = date.split('-');
    return `${t('experience.months.' + (parseInt(month) - 1))} ${year}`;
  };
  
  return (
    <Section 
      id="experience" 
      title={t('experience.title')} 
      subtitle={t('experience.subtitle')}
    >
      <div className="experience__timeline">
        {experience.map((job, index) => (
          <div key={job.id} className="experience__item" style={{ '--delay': `${index * 0.15}s` }}>
            <div className="experience__marker">
              <div className="experience__dot"></div>
              {index < experience.length - 1 && <div className="experience__line"></div>}
            </div>
            
            <div className="experience__content">
              <div className="experience__header">
                <div className="experience__date">
                  {formatDate(job.startDate)} - {formatDate(job.endDate)}
                </div>
                {job.companyUrl && (
                  <a 
                    href={job.companyUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="experience__company"
                  >
                    {t('experience.' + job.id + '.company')}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                    </svg>
                    <span className="sr-only">{t('common.opensInNewTab')}</span>
                  </a>
                )}
                {!job.companyUrl && (
                  <span className="experience__company">
                    {t('experience.' + job.id + '.company')}
                  </span>
                )}
              </div>
              
              <h3 className="experience__role">
                {t('experience.' + job.id + '.role')}
              </h3>
              <span className="experience__location">
                {t('experience.' + job.id + '.location')}
              </span>
              
              {job.projects ? (
                <div className="experience__projects">
                  {(() => {
                    let globalIdx = 0;
                    return job.projects.map(project => {
                      const startIdx = globalIdx;
                      globalIdx += project.achievements.length;
                      return (
                        <div key={project.name} className="experience__project">
                          <h4 className="experience__project-name">{project.name}</h4>
                          <ul className="experience__achievements">
                            {project.achievements.map((achievement, i) => (
                              <li key={achievement}>
                                {t(`experience.${job.id}.achievements.${startIdx + i}`)}
                              </li>
                            ))}
                          </ul>
                          {project.techStack?.length > 0 && (
                            <div className="experience__stack">
                              {project.techStack.map(tech => (
                                <span key={tech} className="experience__tech">{tech}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    });
                  })()}
                </div>
              ) : (
                <>
                  <ul className="experience__achievements">
                    {job.achievements.map((achievement, idx) => (
                      <li key={achievement}>{t('experience.' + job.id + '.achievements.' + idx)}</li>
                    ))}
                  </ul>
                  <div className="experience__stack">
                    {job.techStack.map((tech) => (
                      <span key={tech} className="experience__tech">{tech}</span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}