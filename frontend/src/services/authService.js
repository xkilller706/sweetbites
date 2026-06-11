import api from './api'

const authService = {
  /**
   * Registrar nuevo usuario
   * @param {object} userData - { nombre, email, password, telefono }
   */
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData)
      return { success: true, data: response.data }
    } catch (error) {
      const message = error.response?.data?.message || 'Error al registrar usuario'
      return { success: false, message }
    }
  },

  /**
   * Iniciar sesión
   * @param {object} credentials - { email, password }
   */
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials)

      if (response.data.success) {
        const { token, user } = response.data

        // Guardar token y usuario en localStorage
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))

        return { success: true, user }
      }

      return { success: false, message: response.data.message }
    } catch (error) {
      const message = error.response?.data?.message || 'Error al iniciar sesión'
      return { success: false, message }
    }
  },

  /**
   * Cerrar sesión
   */
  logout: () => {
    // Limpiar localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    sessionStorage.clear()

    // Redirigir a inicio
    window.location.href = '/'
  },

  /**
   * Obtener perfil del usuario autenticado
   */
  getProfile: async () => {
    const response = await api.get('/auth/profile')
    return response.data
  },

  /**
   * Actualizar perfil
   * @param {object} profileData - { nombre, telefono, foto_perfil }
   */
  updateProfile: async (profileData) => {
    const response = await api.put('/auth/profile', profileData)

    if (response.data.success) {
      // Actualizar usuario en localStorage
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
      const updatedUser = { ...currentUser, ...profileData }
      localStorage.setItem('user', JSON.stringify(updatedUser))
    }

    return response.data
  },

  /**
   * Obtener usuario actual desde localStorage
   */
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  },

  /**
   * Verificar si está autenticado
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('token')
  },

  /**
   * Verificar si es admin
   */
  isAdmin: () => {
    const user = authService.getCurrentUser()
    return user?.rol === 'admin'
  },

  /**
   * Verificar si es editor o admin
   */
  isEditor: () => {
    const user = authService.getCurrentUser()
    return user?.rol === 'editor' || user?.rol === 'admin'
  },
}

export default authService
