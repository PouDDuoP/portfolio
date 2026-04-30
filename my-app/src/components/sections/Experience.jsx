import experience from '../../data/experience.json';
import { useLanguage } from '../../context/LanguageContext';
import Section from '../common/Section';
import './Experience.css';

export default function Experience() {
  const { lang } = useLanguage();
  
  const formatDate = (date) => {
    if (date === 'actual') return lang === 'es' ? 'Actual' : 'Present';
    const [year, month] = date.split('-');
    const monthNamesEs = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const monthNamesEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthNames = lang === 'es' ? monthNamesEs : monthNamesEn;
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };
  
  return (
    <Section 
      id="experience" 
      title={lang === 'es' ? 'Experiencia' : 'Experience'} 
      subtitle={lang === 'es' ? 'Mi trayectoria' : 'My journey'}
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
                  {formatDate(job.startDate)} — {formatDate(job.endDate)}
                </div>
                {job.companyUrl && (
                  <a 
                    href={job.companyUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="experience__company"
                  >
                    {lang === 'es' ? job.company : job.company_en}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                    </svg>
                  </a>
                )}
                {!job.companyUrl && (
                  <span className="experience__company">
                    {lang === 'es' ? job.company : job.company_en}
                  </span>
                )}
              </div>
              
              <h3 className="experience__role">
                {lang === 'es' ? job.role : job.role_en}
              </h3>
              <span className="experience__location">
                {lang === 'es' ? job.location : job.location_en}
              </span>
              
              <ul className="experience__achievements">
                {(lang === 'es' ? job.achievements : job.achievements_en).map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
              
              <div className="experience__stack">
                {job.techStack.map((tech, i) => (
                  <span key={i} className="experience__tech">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}