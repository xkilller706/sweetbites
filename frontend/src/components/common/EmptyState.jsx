/**
 * Componente EmptyState
 * @param {string} emoji - Emoji a mostrar
 * @param {string} title - Título
 * @param {string} message - Mensaje descriptivo
 * @param {ReactNode} action - Botón de acción (opcional)
 */
const EmptyState = ({ emoji = '📭', title, message, action }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-7xl mb-4">{emoji}</div>
      <h3 className="text-2xl font-heading text-neutral-gray-800 mb-2">
        {title}
      </h3>
      <p className="text-neutral-gray-600 text-center max-w-md mb-6">
        {message}
      </p>
      {action && <div>{action}</div>}
    </div>
  )
}

export default EmptyState
