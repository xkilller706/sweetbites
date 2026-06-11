import { motion } from 'framer-motion'
import { cn } from '@utils/cn'

/**
 * Anillo de progreso circular animado
 * @param {number} percentage - Porcentaje (0-100)
 * @param {number} size - Tamaño en píxeles
 * @param {number} strokeWidth - Grosor del trazo
 * @param {string} color - Color del progreso
 * @param {string} label - Etiqueta central
 */
const ProgressRing = ({
  percentage = 0,
  size = 120,
  strokeWidth = 8,
  color = '#6BD080',
  label = '',
  className = ''
}) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Círculo de fondo */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Círculo de progreso */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          style={{
            strokeDasharray: circumference,
          }}
        />
      </svg>

      {/* Texto central */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-2xl font-bold text-neutral-gray-900"
        >
          {Math.round(percentage)}%
        </motion.span>
        {label && (
          <span className="text-xs text-neutral-gray-600 mt-1">
            {label}
          </span>
        )}
      </div>
    </div>
  )
}

export default ProgressRing
