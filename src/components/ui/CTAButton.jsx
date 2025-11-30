import { Link } from 'react-router-dom'

export default function CTAButton({ 
  children, 
  to, 
  href, 
  variant = 'primary',
  size = 'md',
  className = '',
  onClick
}) {
  const baseClasses = 'inline-flex items-center justify-center font-medium uppercase tracking-wider transition-all duration-300'
  
  const variantClasses = {
    primary: 'bg-white text-black hover:bg-gray-200',
    secondary: 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-black',
    ghost: 'bg-transparent text-white hover:text-gray-300 underline underline-offset-4',
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  if (to) {
    return <Link to={to} className={classes}>{children}</Link>
  }

  if (href) {
    return <a href={href} className={classes} target="_blank" rel="noopener noreferrer">{children}</a>
  }

  return <button onClick={onClick} className={classes}>{children}</button>
}
