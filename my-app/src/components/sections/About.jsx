import profile from '../../data/profile.json';
import { useLanguage } from '../../context/LanguageContext';
import Section from '../common/Section';
import './About.css';

export default function About() {
  const { lang } = useLanguage();
  
  return (
    <Section 
      id="about" 
      title={lang === 'es' ? 'Sobre mí' : 'About Me'} 
      subtitle={lang === 'es' ? 'Conoce mi historia' : 'Discover my story'}
    >
      <div className="about">
        <div className="about__image">
          <div className="about__image-wrapper">
            <img src={profile.avatar} alt={profile.fullName} loading="lazy" />
          </div>
          <div className="about__image-decoration"></div>
        </div>
        
        <div className="about__content">
          <p className="about__bio">
            {lang === 'es' ? profile.bio : profile.bio_en}
          </p>
          
          <div className="about__values">
            <h3 className="about__values-title">
              {lang === 'es' ? 'Mis valores' : 'My values'}
            </h3>
            <ul className="about__values-list">
              {profile.values.map((value, index) => (
                <li key={index} className="about__value">
                  <span className="about__value-icon">→</span>
                  {lang === 'es' ? value.es : value.en}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="about__info">
            <div className="about__info-item">
              <span className="about__info-label">
                {lang === 'es' ? 'Ubicación' : 'Location'}
              </span>
              <span className="about__info-value">{profile.location}</span>
            </div>
            <div className="about__info-item">
              <span className="about__info-label">
                {lang === 'es' ? 'Disponibilidad' : 'Availability'}
              </span>
              <span className="about__info-value">
                {lang === 'es' ? profile.availability : profile.availability_en}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}