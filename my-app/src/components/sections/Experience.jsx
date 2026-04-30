import experience from '../data/experience.json';
import Section from '../common/Section';
import './Experience.css';

export default function Experience() {
  const formatDate = (date) => {
    if (date === 'actual') return 'Actual';
    const [year, month] = date.split('-');
    const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };
  
  return (
    <Section id="experience" title="Experiencia" subtitle="Mi trayectoria">
      <div className="experience">
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
                      {job.company}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                      </svg>
                    </a>
                  )}
                  {!job.companyUrl && (
                    <span className="experience__company">{job.company}</span>
                  )}
                </div>
                
                <h3 className="experience__role">{job.role}</h3>
                <span className="experience__location">{job.location}</span>
                
                <ul className="experience__achievements">
                  {job.achievements.map((achievement, i) => (
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
      </div>
    </Section>
  );
}