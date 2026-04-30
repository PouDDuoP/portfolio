import profile from '../data/profile.json';
import Section from '../common/Section';
import './About.css';

export default function About() {
  return (
    <Section id="about" title="Sobre mí" subtitle="Conoce mi historia">
      <div className="about">
        <div className="about__image">
          <div className="about__image-wrapper">
            <img src={profile.avatar} alt={profile.fullName} loading="lazy" />
          </div>
          <div className="about__image-decoration"></div>
        </div>
        
        <div className="about__content">
          <p className="about__bio">{profile.bio}</p>
          
          <div className="about__values">
            <h3 className="about__values-title">Mis valores</h3>
            <ul className="about__values-list">
              {profile.values.map((value, index) => (
                <li key={index} className="about__value">
                  <span className="about__value-icon">→</span>
                  {value}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="about__info">
            <div className="about__info-item">
              <span className="about__info-label">Ubicación</span>
              <span className="about__info-value">{profile.location}</span>
            </div>
            <div className="about__info-item">
              <span className="about__info-label">Disponibilidad</span>
              <span className="about__info-value">{profile.availability}</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}