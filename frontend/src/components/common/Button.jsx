import clsx from 'clsx'
import { cn } from '@utils/cn'

/**
 * Componente Button Premium Minimalista
 * @param {string} variant - 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {boolean} loading - Mostrar spinner
 * @param {boolean} disabled - Deshabilitar botón
 * @param {string} className - Clases adicionales
 * @param {ReactNode} children - Contenido del botón
 * @param {object} props - Props adicionales (onClick, type, etc.)
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  children,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-blue-300 hover:scale-105 hover:shadow-glass rounded-2xl',
    secondary: 'bg-white text-stone-700 border border-stone-200 hover:border-stone-300 hover:bg-stone-50 focus:ring-stone-200 rounded-2xl',
    outline: 'border-2 border-primary text-primary hover:bg-primary/10 hover:border-primary-dark focus:ring-blue-300 rounded-2xl',
    ghost: 'text-stone-600 hover:bg-stone-100 hover:text-stone-800 focus:ring-stone-200 rounded-xl',
    danger: 'bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 focus:ring-red-200 rounded-2xl',
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  }

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  )

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  )
}

export default Button
