import { format, formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

/**
 * Formatear fecha a texto legible
 * @param {string|Date} date - Fecha a formatear
 * @param {string} formatStr - Formato (default: 'dd/MM/yyyy')
 * @returns {string} Fecha formateada
 */
export const formatDate = (date, formatStr = 'dd/MM/yyyy') => {
  if (!date) return ''
  return format(new Date(date), formatStr, { locale: es })
}

/**
 * Formatear fecha relativa (hace X tiempo)
 * @param {string|Date} date - Fecha
 * @returns {string} Texto relativo
 */
export const formatRelativeDate = (date) => {
  if (!date) return ''
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: es })
}

/**
 * Truncar texto
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string} Texto truncado
 */
export const truncate = (text, maxLength = 100) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

/**
 * Obtener iniciales de nombre
 * @param {string} name - Nombre completo
 * @returns {string} Iniciales
 */
export const getInitials = (name) => {
  if (!name) return '?'
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

/**
 * Formatear tiempo de preparación
 * @param {number} minutes - Minutos
 * @returns {string} Texto formateado
 */
export const formatPrepTime = (minutes) => {
  if (!minutes) return 'No especificado'
  if (minutes < 60) return `${minutes} min`
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (mins === 0) return `${hours}h`
  return `${hours}h ${mins}min`
}

/**
 * Calcular cantidad de ingrediente ajustada por porciones
 * @param {number} originalAmount - Cantidad original
 * @param {number} originalServings - Porciones originales
 * @param {number} newServings - Porciones nuevas
 * @returns {number} Cantidad ajustada
 */
export const adjustIngredientAmount = (originalAmount, originalServings, newServings) => {
  if (!originalAmount || !originalServings || !newServings) return originalAmount
  const ratio = newServings / originalServings
  const adjusted = originalAmount * ratio
  // Redondear a 2 decimales
  return Math.round(adjusted * 100) / 100
}

/**
 * Validar email
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

/**
 * Validar contraseña (mínimo 8 caracteres)
 * @param {string} password
 * @returns {boolean}
 */
export const isValidPassword = (password) => {
  return password && password.length >= 8
}

/**
 * Generar color de fondo para avatar basado en nombre
 * @param {string} name
 * @returns {string} Código de color hex
 */
export const getAvatarColor = (name) => {
  const colors = [
    '#6BD080', // Verde menta
    '#A4C3B2', // Verde agua
    '#B5C7E8', // Azul pastel
    '#D4A5D4', // Lavanda pastel
    '#F5DBA5', // Amarillo pastel
    '#F5B5C7', // Rosa pastel
  ]
  const index = name?.charCodeAt(0) % colors.length || 0
  return colors[index]
}

/**
 * Obtener badge de estado de receta
 * @param {string} status
 * @returns {object} { label, color, bgColor }
 */
export const getRecipeStatusBadge = (status) => {
  const badges = {
    publicada: { label: 'Publicada', color: 'text-green-700', bgColor: 'bg-green-100' },
    pendiente: { label: 'Pendiente', color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
    rechazada: { label: 'Rechazada', color: 'text-red-700', bgColor: 'bg-red-100' },
    borrador: { label: 'Borrador', color: 'text-gray-700', bgColor: 'bg-gray-100' },
    archivada: { label: 'Archivada', color: 'text-gray-500', bgColor: 'bg-gray-50' },
  }
  return badges[status] || badges.borrador
}

/**
 * Obtener badge de dificultad
 * @param {string} difficulty
 * @returns {object} { label, color, bgColor }
 */
export const getDifficultyBadge = (difficulty) => {
  const badges = {
    'Fácil': { label: 'Fácil', color: 'text-green-700', bgColor: 'bg-green-100' },
    'Intermedio': { label: 'Intermedio', color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
    'Difícil': { label: 'Difícil', color: 'text-red-700', bgColor: 'bg-red-100' },
  }
  return badges[difficulty] || badges['Intermedio']
}

/**
 * Debounce function
 * @param {Function} func
 * @param {number} wait
 * @returns {Function}
 */
export const debounce = (func, wait = 300) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Obtener URL de imagen o placeholder
 * @param {string} imagePath
 * @param {string} type - 'recipe' | 'profile'
 * @returns {string}
 */
export const getImageUrl = (imagePath, type = 'recipe') => {
  if (!imagePath) {
    // Placeholder de Unsplash según tipo
    if (type === 'profile') {
      return 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'
    }
    return 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&h=600&fit=crop'
  }

  // Si ya es URL completa, retornar tal cual
  if (imagePath.startsWith('http')) {
    return imagePath
  }

  // Si es ruta local, concatenar con UPLOAD_URL
  const UPLOAD_URL = import.meta.env.VITE_UPLOAD_URL || 'http://localhost:3000/uploads'
  return `${UPLOAD_URL}/${imagePath}`
}
