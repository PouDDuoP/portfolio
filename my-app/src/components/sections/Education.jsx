import education from '../../data/education.json';
import { useT } from '../../i18n/useTranslation';
import Section from '../common/Section';
import './Education.css';

export default function Education() {
  const { t } = useT();
  
  return (
    <Section 
      id="education" 
      title={t('education.title')} 
      subtitle={t('education.subtitle')}
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
                <span className="education__year">{cert.startDate} - {cert.endDate}</span>
                {cert.verified && (
                  <span className="education__verified" aria-label={t('education.verifiedLabel')}>
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    {t('education.verified')}
                  </span>
                )}
              </div>
              
              <h3 className="education__degree">
                {t('education.' + cert.id + '.degree')}
              </h3>
              
              <a 
                href={cert.institutionUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="education__institution"
              >
                {t('education.' + cert.id + '.institution')}
              </a>
              
              <p className="education__description">
                {t('education.' + cert.id + '.description')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}