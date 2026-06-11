import { Navigate } from 'react-router-dom'
import { useAuth } from '@context/AuthContext'
import Spinner from '@components/common/Spinner'

/**
 * Componente para proteger rutas que requieren rol de administrador
 */
const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth()

  if (loading) {
    return <Spinner fullScreen />
  }

  if (!isAuthenticated()) {
    return <Navigate to="/auth/login" replace />
  }

  if (!isAdmin()) {
    return <Navigate to="/" replace />
  }

  return children
}

export default AdminRoute
