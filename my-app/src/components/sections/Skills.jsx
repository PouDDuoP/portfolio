import skills from '../../data/skills.json';
import { useLanguage } from '../../context/LanguageContext';
import Section from '../common/Section';
import './Skills.css';

// Función para convertir años a porcentaje de barra
const getWidthPercent = (years) => {
  if (years.includes('6+ meses')) return 10;
  if (years.includes('1+ año')) return 20;
  if (years.includes('2+ años')) return 40;
  if (years.includes('3+ años')) return 60;
  if (years.includes('5+ años')) return 100;
  return 50; // default
};

const categoryTranslations = {
  'Back-end': { es: 'Back-end', en: 'Back-end' },
  'Front-end': { es: 'Front-end', en: 'Front-end' },
  'Bases de Datos': { es: 'Bases de Datos', en: 'Databases' },
  'Herrramientas': { es: 'Herrramientas', en: 'Tools' },
  'Idiomas': { es: 'Idiomas', en: 'Languages' },
  'Habilidades Blandas': { es: 'Habilidades Blandas', en: 'Soft Skills' }
};

export default function Skills() {
  const { lang } = useLanguage();
  
  return (
    <Section 
      id="skills" 
      title={lang === 'es' ? 'Habilidades' : 'Skills'} 
      subtitle={lang === 'es' ? 'Tecnologías que domino' : 'Technologies I master'}
    >
      <div className="skills">
        <div className="skills__grid">
          {skills.categories.map((category, catIndex) => (
            <div key={catIndex} className="skills__category">
              <h3 className="skills__category-title">
                {categoryTranslations[category.name]?.[lang] || category.name}
              </h3>
              <div className="skills__list">
                {category.skills.map((skill, index) => {
                  const widthPercent = getWidthPercent(skill.years);
                  return (
                    <div 
                      key={index} 
                      className="skills__item"
                      style={{ '--delay': `${catIndex * 0.15 + index * 0.05}s` }}
                    >
                      <div className="skills__item-header">
                        <span className="skills__item-name">{skill.name}</span>
                        <span className="skills__item-years">{skill.years}</span>
                      </div>
                      <div className="skills__bar">
                        <div 
                          className="skills__bar-fill" 
                          style={{ 
                            '--width': `${widthPercent}%`,
                            '--delay': `${catIndex * 0.15 + index * 0.05}s`
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          
          {/* Idiomas */}
          <div className="skills__category skills__category--soft">
            <h3 className="skills__category-title">
              {lang === 'es' ? 'Idiomas' : 'Languages'}
            </h3>
            <div className="skills__tags">
              {skills.soft
                .filter(s => s.name === 'Español' || s.name === 'Inglés')
                .map((skill, index) => (
                  <span 
                    key={index} 
                    className="skills__tag"
                    style={{ '--delay': `${index * 0.05}s` }}
                  >
                    {skill.name}: {skill.level}
                  </span>
                ))}
            </div>
          </div>
          
          {/* Habilidades Blandas */}
          <div className="skills__category skills__category--soft">
            <h3 className="skills__category-title">
              {lang === 'es' ? 'Habilidades Blandas' : 'Soft Skills'}
            </h3>
            <div className="skills__tags">
              {skills.soft
                .filter(s => s.name !== 'Español' && s.name !== 'Inglés')
                .map((skill, index) => (
                  <span 
                    key={index} 
                    className="skills__tag"
                    style={{ '--delay': `${index * 0.05}s` }}
                  >
                    {skill.name}: {skill.level}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}