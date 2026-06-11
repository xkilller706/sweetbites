import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import clsx from 'clsx'

/**
 * Componente Input reutilizable
 * @param {string} label - Etiqueta del input
 * @param {string} error - Mensaje de error
 * @param {string} type - Tipo de input
 * @param {string} className - Clases adicionales
 * @param {object} props - Props adicionales (placeholder, value, onChange, etc.)
 */
const Input = ({ label, error, type = 'text', className = '', ...props }) => {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'

  const inputClasses = clsx('input', {
    'input-error': error,
  }, className)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-neutral-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={isPassword && showPassword ? 'text' : type}
          className={inputClasses}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-gray-500 hover:text-neutral-gray-700 transition-colors focus:outline-none"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-error">{error}</p>
      )}
    </div>
  )
}

export default Input
