import { useState } from 'react'
import { Star } from 'lucide-react'
import { cn } from '@utils/cn'

/**
 * Componente de Rating con estrellas
 * @param {number} value - Valor actual (0-5)
 * @param {function} onChange - Callback cuando cambia el rating
 * @param {boolean} readonly - Si es solo lectura
 * @param {string} size - Tamaño: 'sm', 'md', 'lg'
 * @param {boolean} showValue - Mostrar el valor numérico
 */
const Rating = ({
  value = 0,
  onChange,
  readonly = false,
  size = 'md',
  showValue = false,
  className = ''
}) => {
  const [hoverValue, setHoverValue] = useState(0)

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  }

  const handleClick = (rating) => {
    if (!readonly && onChange) {
      onChange(rating)
    }
  }

  const handleMouseEnter = (rating) => {
    if (!readonly) {
      setHoverValue(rating)
    }
  }

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverValue(0)
    }
  }

  const displayValue = hoverValue || value

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          disabled={readonly}
          className={cn(
            'transition-all',
            !readonly && 'cursor-pointer hover:scale-110',
            readonly && 'cursor-default'
          )}
        >
          <Star
            className={cn(
              sizeClasses[size],
              'transition-colors',
              star <= displayValue
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-neutral-gray-300'
            )}
          />
        </button>
      ))}
      {showValue && (
        <span className="ml-2 text-sm font-medium text-neutral-gray-700">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  )
}

export default Rating
