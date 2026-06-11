// API Base URL
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
export const UPLOAD_URL = import.meta.env.VITE_UPLOAD_URL || 'http://localhost:3000/uploads'
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'SweetBites'

// Roles de usuario
export const ROLES = {
  USUARIO: 'usuario',
  EDITOR: 'editor',
  ADMIN: 'admin',
}

// Estados de recetas
export const RECIPE_STATUS = {
  PUBLICADA: 'publicada',
  BORRADOR: 'borrador',
  ARCHIVADA: 'archivada',
  PENDIENTE: 'pendiente',
  RECHAZADA: 'rechazada',
}

// Dificultades
export const DIFFICULTIES = [
  { value: 'Fácil', label: 'Fácil', color: '#6BD080' },
  { value: 'Intermedio', label: 'Intermedio', color: '#F5DBA5' },
  { value: 'Difícil', label: 'Difícil', color: '#EF4444' },
]

// Tiempos de preparación (para filtros)
export const PREP_TIMES = [
  { value: 'rapido', label: 'Menos de 30 min', max: 30 },
  { value: 'medio', label: '30-60 min', min: 30, max: 60 },
  { value: 'largo', label: 'Más de 1 hora', min: 60 },
]

// Unidades de medida para ingredientes
export const UNITS = [
  'gramos',
  'kilogramos',
  'ml',
  'litros',
  'taza',
  'tazas',
  'cucharada',
  'cucharadas',
  'cucharadita',
  'cucharaditas',
  'unidad',
  'unidades',
  'pizca',
  'al gusto',
]

// Mensajes de error comunes
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Error de conexión. Verifica tu internet.',
  SERVER_ERROR: 'Error del servidor. Intenta más tarde.',
  UNAUTHORIZED: 'No estás autenticado. Inicia sesión.',
  FORBIDDEN: 'No tienes permisos para esta acción.',
  NOT_FOUND: 'Recurso no encontrado.',
  VALIDATION_ERROR: 'Datos inválidos. Revisa el formulario.',
}

// Mensajes de éxito comunes
export const SUCCESS_MESSAGES = {
  LOGIN: '¡Bienvenido de vuelta!',
  REGISTER: '¡Cuenta creada exitosamente!',
  RECIPE_CREATED: '¡Receta enviada! Espera aprobación.',
  RECIPE_UPDATED: 'Receta actualizada exitosamente.',
  RECIPE_DELETED: 'Receta eliminada.',
  COMMENT_ADDED: 'Comentario publicado.',
  FAVORITE_ADDED: 'Agregado a favoritos.',
  FAVORITE_REMOVED: 'Quitado de favoritos.',
}

// Paginación
export const DEFAULT_PAGE_SIZE = 12
export const DEFAULT_PAGE = 1
