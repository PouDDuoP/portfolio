import { memo, useState, useCallback, useEffect } from 'react';
import skills from '../../data/skills.json';
import { useT } from '../../i18n/useTranslation';
import Section from '../common/Section';
import './Skills.css';

const TECH_COLORS = {
  'Node.js': '#339933',
  'Express': '#787878',
  'Python': '#4B8BBE',
  'Django': '#2D8A4E',
  'PHP': '#8892BF',
  'ASP': '#7c5cfc',
  'JavaScript': '#C7A600',
  'jQuery': '#1976D2',
  'Bootstrap': '#7952B3',
  'CSS': '#1572B6',
  'HTML': '#E34F26',
  'Angular': '#DD0031',
  'Tailwind CSS': '#06B6D4',
  'Flutter': '#1389FD',
  'SQL Server': '#CC2927',
  'Oracle Database': '#F80000',
  'PostgreSQL': '#4169E1',
  'MySQL': '#4479A1',
  'Git': '#F05032',
  'SourceTree': '#2684FF',
  'Jira': '#2684FF',
  'Docker': '#2496ED',
  'GitHub': '#6e40c9',
  'Bitbucket': '#2684FF',
  'OpenCode': '#0E9BBF'
};

const getTechColor = (name) => TECH_COLORS[name] || 'var(--color-primary)';



const Skills = memo(function Skills() {
  const { t } = useT();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState(null);

  const handleSelect = useCallback((skill) => {
    setSelectedSkill(prev => prev?.name === skill.name ? null : skill);
  }, []);

  const handleKeyDown = useCallback((e, skill) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedSkill(prev => prev?.name === skill.name ? null : skill);
    }
  }, []);

  useEffect(() => {
    if (selectedSkill) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedSkill]);

  // Compute filtered data
  const filteredCategories = searchTerm
    ? skills.categories
        .map(category => ({
          ...category,
          skills: category.skills.filter(skill =>
            skill.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        }))
        .filter(category => category.skills.length > 0)
    : skills.categories;

  const categoryExamples = selectedSkill?.examples || [];
  const color = selectedSkill ? getTechColor(selectedSkill.name) : 'var(--color-primary)';

  return (
    <Section 
      id="skills" 
      title={t('skills.title')} 
      subtitle={t('skills.subtitle')}
    >
      <div className="skills">
        <div className="skills__search-wrapper">
          <div className="skills__search-inner">
            <svg className="skills__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              type="text"
              className="skills__search"
              placeholder={t('skills.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label={t('skills.search')}
            />
            {searchTerm && (
              <button
                type="button"
                className="skills__search-clear"
                onClick={() => setSearchTerm('')}
                aria-label={t('skills.clearSearch')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
                  <path d="M18 6L6 18"/>
                  <path d="M6 6l12 12"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Detail Modal */}
        {selectedSkill && (
          <div className="skills__modal-overlay" onClick={() => setSelectedSkill(null)}>
            <div
              className="skills__modal"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-label={selectedSkill.name}
            >
              <button
                type="button"
                className="skills__modal-close"
                onClick={() => setSelectedSkill(null)}
                aria-label={t('skills.closeModal')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                  <path d="M18 6L6 18"/>
                  <path d="M6 6l12 12"/>
                </svg>
              </button>

              <div className="skills__modal-header">
                <span
                  className="skills__modal-icon"
                  style={{
                    background: color,
                    color: '#fff'
                  }}
                >
                  {selectedSkill.name[0]}
                </span>
                <div>
                  <h3 className="skills__modal-title" style={{ color }}>
                    {selectedSkill.name}
                  </h3>
                  <div className="skills__modal-meta">
                    <span className="skills__modal-badge" style={{ background: `${color}20`, color }}>
                      {t('skills.years.' + selectedSkill.years)}
                    </span>
                    <span className={`skills__modal-badge skills__modal-badge--${selectedSkill.type}`}>
                      {selectedSkill.type === 'personal'
                        ? t('skills.type.personal')
                        : t('skills.type.laboral')}
                    </span>
                  </div>
                </div>
              </div>

              {categoryExamples.length > 0 && (
                <div className="skills__modal-body">
                  <h4 className="skills__modal-subtitle">{t('skills.examples')}</h4>
                  <ul className="skills__modal-list">
                    {categoryExamples.map((ex, i) => (
                      <li key={i} className="skills__modal-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true" style={{ color, flexShrink: 0, marginTop: 3 }}>
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                          <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                        <span>{t(`skills.examples.${selectedSkill.name}.${i}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="skills__grid">
          {filteredCategories.map((category) => (
            <div key={category.name} className="skills__category">
              <h3 className="skills__category-title">
                {t('skills.categories.' + category.name)}
              </h3>
              <div className="skills__pill-grid">
                {category.skills.map((skill) => {
                  const techColor = getTechColor(skill.name);
                  return (
                    <button
                      key={skill.name}
                      type="button"
                      className={`skills__pill${selectedSkill?.name === skill.name ? ' skills__pill--active' : ''}`}
                      style={{
                        '--tech-color': techColor,
                        '--tech-color-alpha': `${techColor}15`
                      }}
                      onClick={() => handleSelect(skill)}
                      onKeyDown={(e) => handleKeyDown(e, skill)}
                      aria-label={`${skill.name} - ${t('skills.years.' + skill.years)}`}
                    >
                      <span className="skills__pill-dot" style={{ background: techColor }}>
                        {skill.name[0]}
                      </span>
                      <span className="skills__pill-label">{skill.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
});

export default Skills;
