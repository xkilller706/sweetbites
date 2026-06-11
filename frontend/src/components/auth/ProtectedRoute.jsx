import { Navigate } from 'react-router-dom'
import { useAuth } from '@context/AuthContext'
import Spinner from '@components/common/Spinner'

/**
 * Componente para proteger rutas que requieren autenticación
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <Spinner fullScreen />
  }

  if (!isAuthenticated()) {
    return <Navigate to="/auth/login" replace />
  }

  return children
}

export default ProtectedRoute
