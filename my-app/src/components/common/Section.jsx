import './Section.css';

export default function Section({ 
  id, 
  title, 
  subtitle, 
  children, 
  className = '',
  dark = false 
}) {
  return (
    <section 
      id={id} 
      className={`section ${dark ? 'section--dark' : ''} ${className}`.trim()}
    >
      <div className="section__container">
        {(title || subtitle) && (
          <div className="section__header">
            {subtitle && <span className="section__subtitle">{subtitle}</span>}
            {title && <h2 className="section__title">{title}</h2>}
          </div>
        )}
        <div className="section__content">
          {children}
        </div>
      </div>
    </section>
  );
}