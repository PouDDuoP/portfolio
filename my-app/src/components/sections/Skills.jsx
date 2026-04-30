import skills from '../data/skills.json';
import Section from '../common/Section';
import './Skills.css';

export default function Skills() {
  const technicalSkills = skills.technical.filter(s => s.category !== 'Design');
  const designSkills = skills.technical.filter(s => s.category === 'Design');
  
  return (
    <Section id="skills" title="Skills" subtitle="Herramientas que domino">
      <div className="skills">
        <div className="skills__grid">
          {/* Technical Skills */}
          <div className="skills__category">
            <h3 className="skills__category-title">Desarrollo</h3>
            <div className="skills__list">
              {technicalSkills.map((skill, index) => (
                <div key={index} className="skills__item">
                  <div className="skills__item-header">
                    <span className="skills__item-name">{skill.name}</span>
                    <span className="skills__item-level">{skill.level}%</span>
                  </div>
                  <div className="skills__bar">
                    <div 
                      className="skills__bar-fill" 
                      style={{ '--width': `${skill.level}%`, '--delay': `${index * 0.1}s` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Design Skills */}
          <div className="skills__category">
            <h3 className="skills__category-title">Diseño</h3>
            <div className="skills__list">
              {designSkills.map((skill, index) => (
                <div key={index} className="skills__item">
                  <div className="skills__item-header">
                    <span className="skills__item-name">{skill.name}</span>
                    <span className="skills__item-level">{skill.level}%</span>
                  </div>
                  <div className="skills__bar">
                    <div 
                      className="skills__bar-fill skills__bar-fill--design" 
                      style={{ '--width': `${skill.level}%`, '--delay': `${index * 0.1}s` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Soft Skills */}
          <div className="skills__category skills__category--soft">
            <h3 className="skills__category-title">Habilidades Blandas</h3>
            <div className="skills__tags">
              {skills.soft.map((skill, index) => (
                <span key={index} className="skills__tag" style={{ '--delay': `${index * 0.05}s` }}>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}