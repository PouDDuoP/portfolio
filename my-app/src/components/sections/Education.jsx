import education from '../../data/education.json';
import { useLanguage } from '../../context/LanguageContext';
import Section from '../common/Section';
import './Education.css';

export default function Education() {
  const { lang } = useLanguage();
  
  return (
    <Section 
      id="education" 
      title={lang === 'es' ? 'Educación' : 'Education'} 
      subtitle={lang === 'es' ? 'Formación continua' : 'Continuous learning'}
    >
      <div className="education__grid">
        {education.map((cert, index) => (
          <div key={cert.id} className="education__card" style={{ '--delay': `${index * 0.1}s` }}>
            <div className="education__icon">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                <path d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 0v-7l4 2-4 5z"/>
              </svg>
            </div>
            
            <div className="education__content">
              <div className="education__header">
                <span className="education__year">{cert.startDate} — {cert.endDate}</span>
                {cert.verified && (
                  <span className="education__verified" aria-label={lang === 'es' ? 'Certificado verificado' : 'Verified certificate'}>
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    {lang === 'es' ? 'Verificado' : 'Verified'}
                  </span>
                )}
              </div>
              
              <h3 className="education__degree">{cert.degree}</h3>
              
              <a 
                href={cert.institutionUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="education__institution"
              >
                {cert.institution}
              </a>
              
              <p className="education__description">
                {lang === 'es' ? cert.description : cert.description_en}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}