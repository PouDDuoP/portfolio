import { memo } from 'react';
import skills from '../../data/skills.json';
import { useT } from '../../i18n';
import Section from '../common/Section';
import './Skills.css';

const softNameKeyMap = {
  'Español': 'Spanish',
  'Inglés': 'English',
  'Resolución de problemas': 'ProblemSolving',
  'Comunicación': 'Communication',
  'Trabajo en equipo': 'Teamwork',
  'Gestión de tiempo': 'TimeManagement',
  'Adaptabilidad': 'Adaptability'
};

const levelKeyMap = {
  'Nativo': 'native',
  'Avanzado': 'advanced',
  'Intermedio': 'intermediate'
};

// Función para convertir años a porcentaje de barra
const getWidthPercent = (years) => {
  if (years.includes('2+ meses')) return 5;
  if (years.includes('6+ meses')) return 10;
  if (years.includes('1+ año')) return 20;
  if (years.includes('2+ años')) return 40;
  if (years.includes('3+ años')) return 60;
  if (years.includes('5+ años')) return 100;
  return 50; // default
};

const Skills = memo(function Skills() {
  const { t } = useT();
  
  return (
    <Section 
      id="skills" 
      title={t('skills.title')} 
      subtitle={t('skills.subtitle')}
    >
      <div className="skills">
        <div className="skills__grid">
          {skills.categories.map((category, catIndex) => (
            <div key={catIndex} className="skills__category">
              <h3 className="skills__category-title">
                {t('skills.categories.' + category.name)}
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
                        <div className="skills__item-meta">
                           <span className="skills__item-years">
                             {t('skills.years.' + skill.years)}
                           </span>
                          {skill.type && (
                            <span className={`skills__item-type skills__item-type--${skill.type}`}>
                              {skill.type === 'personal' 
                                ? t('skills.type.personal')
                                : t('skills.type.laboral')}
                            </span>
                          )}
                        </div>
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
              {t('skills.languages')}
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
                      {t('skills.soft.' + (softNameKeyMap[skill.name] || skill.name))}: {
                        t('skills.level.' + (levelKeyMap[skill.level] || skill.level))
                      }
                    </span>
                ))}
            </div>
          </div>
          
          {/* Habilidades Blandas */}
          <div className="skills__category skills__category--soft">
            <h3 className="skills__category-title">
              {t('skills.softSkills')}
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
                      {t('skills.soft.' + (softNameKeyMap[skill.name] || skill.name))}: {
                        t('skills.level.' + (levelKeyMap[skill.level] || skill.level))
                      }
                    </span>
                  ))}
              </div>
          </div>
        </div>
      </div>
    </Section>
  );
});

export default Skills;