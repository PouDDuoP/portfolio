import './Card.css';

export default function Card({ 
  children, 
  className = '',
  hover = true,
  onClick,
  ...props 
}) {
  const classNames = `card ${hover ? 'card--hover' : ''} ${className}`.trim();
  
  return (
    <div 
      className={classNames} 
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...props}
    >
      {children}
    </div>
  );
}