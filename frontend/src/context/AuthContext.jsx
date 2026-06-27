import { createContext, useContext, useState, useEffect } from 'react'
import authService from '@services/authService'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Cargar usuario al montar el componente
  useEffect(() => {
    const initAuth = () => {
      const currentUser = authService.getCurrentUser()
      setUser(currentUser)
      setLoading(false)
    }

    initAuth()
  }, [])

  /**
   * Registrar nuevo usuario
   */
  const register = async (userData) => {
    try {
      const response = await authService.register(userData)

      if (response.success) {
        return { success: true }
      }

      toast.error(response.message || 'Error al registrar usuario')
      return { success: false, message: response.message }
    } catch (error) {
      const message = error.response?.data?.message || 'Error al registrar usuario'
      toast.error(message)
      return { success: false, message }
    }
  }

  /**
   * Iniciar sesión
   */
  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials)

      if (response.success) {
        setUser(response.user)
        toast.success('¡Bienvenido!')
        return { success: true, user: response.user }
      }

      toast.error(response.message || 'Error al iniciar sesión')
      return { success: false, message: response.message }
    } catch (error) {
      const message = error.response?.data?.message || 'Error al iniciar sesión'
      toast.error(message)
      return { success: false, message }
    }
  }

  /**
   * Cerrar sesión
   */
  const logout = () => {
    // Limpiar estado local primero
    setUser(null)

    // Mostrar toast antes de redirigir
    toast.success('Sesión cerrada correctamente')

    // authService.logout() ya maneja la redirección y limpieza completa
    // No retornamos nada porque authService.logout() hace window.location.href
    authService.logout()
  }

  /**
   * Actualizar perfil
   */
  const updateProfile = async (profileData) => {
    try {
      const response = await authService.updateProfile(profileData)

      if (response.success) {
        const updatedUser = { ...user, ...profileData }
        setUser(updatedUser)
        toast.success('Perfil actualizado exitosamente')
        return { success: true }
      }

      toast.error(response.message || 'Error al actualizar perfil')
      return { success: false }
    } catch (error) {
      const message = error.response?.data?.message || 'Error al actualizar perfil'
      toast.error(message)
      return { success: false, message }
    }
  }

  /**
   * Verificar si está autenticado
   */
  const isAuthenticated = () => {
    return !!user
  }

  /**
   * Verificar si es admin
   */
  const isAdmin = () => {
    return user?.rol === 'admin'
  }

  /**
   * Verificar si tiene plan premium
   */
  const isPremium = () => {
    return user?.plan === 'premium'
  }

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    updateProfile,
    isAuthenticated,
    isAdmin,
    isPremium,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }
  return context
}

export default AuthContext
