import './Button.css';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  href, 
  onClick,
  className = '',
  ...props 
}) {
  const classNames = `btn btn--${variant} btn--${size} ${className}`.trim();
  
  if (href) {
    return (
      <a href={href} className={classNames} {...props}>
        {children}
      </a>
    );
  }
  
  return (
    <button onClick={onClick} className={classNames} {...props}>
      {children}
    </button>
  );
}