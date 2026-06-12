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
        </div>
      </div>
    </Section>
  );
}