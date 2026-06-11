import clsx from 'clsx'

/**
 * Componente Card reutilizable
 * @param {ReactNode} children - Contenido de la card
 * @param {string} className - Clases adicionales
 * @param {boolean} hover - Efecto hover (elevación)
 * @param {object} props - Props adicionales (onClick, etc.)
 */
const Card = ({ children, className = '', hover = false, ...props }) => {
  const classes = clsx('card p-6', {
    'card-hover cursor-pointer': hover,
  }, className)

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

export default Card
