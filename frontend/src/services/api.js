import axios from 'axios'
import { API_URL } from '@utils/constants'

// Crear instancia de Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para agregar token a las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Error de respuesta del servidor
      const { status } = error.response

      if (status === 401) {
        // Token inválido o expirado - logout automático
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/auth/login'
      }

      if (status === 403) {
        console.error('No tienes permisos para esta acción')
      }

      if (status === 404) {
        console.error('Recurso no encontrado')
      }

      if (status >= 500) {
        console.error('Error del servidor. Intenta más tarde.')
      }
    } else if (error.request) {
      // Error de red
      console.error('Error de conexión. Verifica tu internet.')
    }

    return Promise.reject(error)
  }
)

export { api }
export default api
