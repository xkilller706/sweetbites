import { motion } from 'framer-motion'
import { cn } from '@utils/cn'

/**
 * Tarjeta de estadística animada para el dashboard
 * @param {string} title - Título de la estadística
 * @param {number} value - Valor numérico
 * @param {ReactNode} icon - Icono (componente Lucide)
 * @param {string} bgColor - Color de fondo (clase Tailwind)
 * @param {string} iconColor - Color del icono (clase Tailwind)
 * @param {string} trend - Tendencia (opcional): 'up', 'down', 'neutral'
 * @param {string} trendValue - Valor de la tendencia (opcional)
 */
const StatCard = ({
  title,
  value,
  icon: Icon,
  bgColor = 'bg-blue-50',
  iconColor = 'text-blue-600',
  trend,
  trendValue,
  delay = 0
}) => {
  const trendColors = {
    up: 'text-green-600',
    down: 'text-error',
    neutral: 'text-neutral-gray-500'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="bg-white/70 backdrop-blur-md rounded-3xl border border-white/40 p-6 shadow-glass hover:shadow-premium transition-all duration-500"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-neutral-gray-600 mb-1">
            {title}
          </p>
          <motion.p
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.2 }}
            className="text-3xl font-bold text-neutral-gray-900"
          >
            {value.toLocaleString()}
          </motion.p>
          {trend && trendValue && (
            <p className={cn('text-sm mt-2 flex items-center gap-1', trendColors[trend])}>
              {trend === 'up' && '↑'}
              {trend === 'down' && '↓'}
              {trend === 'neutral' && '•'}
              <span>{trendValue}</span>
            </p>
          )}
        </div>
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: delay + 0.1 }}
          className={cn(
            'flex items-center justify-center w-12 h-12 rounded-lg',
            bgColor
          )}
        >
          <Icon className={cn('h-6 w-6', iconColor)} />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default StatCard
