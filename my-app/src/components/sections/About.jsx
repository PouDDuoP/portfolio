import profile from '../../data/profile.json';
import { useT } from '../../i18n/useTranslation';
import Section from '../common/Section';
import './About.css';

export default function About() {
  const { t } = useT();
  
  return (
    <Section 
      id="about" 
      title={t('about.title')} 
      subtitle={t('about.subtitle')}
    >
      <div className="about">
        <div className="about__content">
          <div className="about__bio">
            <p className="about__bio-text">
              {t('profile.bio')}
            </p>
          </div>

          <div className="about__values">
            <h3 className="about__values-title">
              {t('about.values')}
            </h3>
            <ul className="about__values-list">
              {profile.values.map((value) => (
                <li key={value} className="about__value">
                  <span className="about__value-icon">→</span>
                  {t('profile.values.' + index)}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="about__info">
            <div className="about__info-item">
              <span className="about__info-label">
                {t('about.location')}
              </span>
              <span className="about__info-value">{profile.location}</span>
            </div>
            <div className="about__info-item">
              <span className="about__info-label">
                {t('about.availability')}
              </span>
              <span className="about__info-value">
                {t('profile.availability')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}