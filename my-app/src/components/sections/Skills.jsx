import { memo, useState, useRef, useEffect, useLayoutEffect } from 'react';
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
  const scrollDirRef = useRef('down');

  // Track scroll direction only — always active
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const curr = window.scrollY;
      scrollDirRef.current = curr > lastY ? 'down' : 'up';
      lastY = curr;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // After each render (filter change, mount, etc.), animate visible pills
  // and set up IntersectionObserver for pills below the fold
  useLayoutEffect(() => {
    const unanimated = document.querySelectorAll('.skills__pill:not([data-animated])');
    if (unanimated.length === 0) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          if (!el.dataset.animated) {
            el.dataset.animated = scrollDirRef.current;
          }
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -20px 0px' });

    unanimated.forEach(pill => {
      // If already in viewport, set immediately (before paint)
      const rect = pill.getBoundingClientRect();
      const inViewport = rect.top < window.innerHeight - 20 && rect.bottom > 0;
      if (inViewport) {
        pill.dataset.animated = scrollDirRef.current;
      } else {
        io.observe(pill);
      }
    });

    return () => io.disconnect();
  }, [searchTerm]);

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
                    <span
                      key={skill.name}
                      className="skills__pill"
                      style={{
                        '--tech-color': techColor,
                        '--tech-color-alpha': `${techColor}15`
                      }}
                    >
                      <span className="skills__pill-dot" style={{ background: techColor }}>
                        {skill.name[0]}
                      </span>
                      <span className="skills__pill-label">{skill.name}</span>
                    </span>
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
