import clsx from 'clsx'

/**
 * Componente Badge
 * @param {string} variant - 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
 * @param {ReactNode} children - Contenido del badge
 * @param {string} className - Clases adicionales
 */
const Badge = ({ variant = 'primary', children, className = '' }) => {
  const baseClasses = 'badge'

  const variantClasses = {
    primary: 'badge-primary',
    secondary: 'badge-secondary',
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error',
    info: 'badge-info',
  }

  const classes = clsx(baseClasses, variantClasses[variant], className)

  return <span className={classes}>{children}</span>
}

export default Badge
