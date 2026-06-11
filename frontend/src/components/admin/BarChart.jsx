import { motion } from 'framer-motion'
import { cn } from '@utils/cn'

/**
 * Gráfica de barras simple con animación
 * @param {Array} data - Array de objetos { label, value, color }
 * @param {string} title - Título de la gráfica
 */
const BarChart = ({ data = [], title, className = '' }) => {
  const maxValue = Math.max(...data.map(d => d.value), 1)

  return (
    <div className={cn('bg-white rounded-xl border border-neutral-gray-200 p-6 shadow-card', className)}>
      {title && (
        <h3 className="text-lg font-semibold text-neutral-gray-800 mb-6">
          {title}
        </h3>
      )}

      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-neutral-gray-700">
                {item.label}
              </span>
              <span className="text-sm font-bold text-neutral-gray-900">
                {item.value}
              </span>
            </div>
            <div className="w-full bg-neutral-gray-100 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(item.value / maxValue) * 100}%` }}
                transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
                className={cn(
                  'h-full rounded-full',
                  item.color || 'bg-primary'
                )}
              />
            </div>
          </div>
        ))}
      </div>

      {data.length === 0 && (
        <div className="text-center py-8 text-neutral-gray-500">
          No hay datos para mostrar
        </div>
      )}
    </div>
  )
}

export default BarChart
