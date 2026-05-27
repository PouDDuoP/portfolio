import './Card.css';

export default function Card({ 
  children, 
  className = '',
  hover = true,
  onClick,
  ...props 
}) {
  const classNames = `card ${hover ? 'card--hover' : ''} ${className}`.trim();

  const interactiveProps = onClick
    ? {
        onClick,
        onKeyDown: (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick(e);
          }
        },
        role: 'button',
        tabIndex: 0,
      }
    : {};
  
  return (
    <div 
      className={classNames} 
      {...interactiveProps}
      {...props}
    >
      {children}
    </div>
  );
}