import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@context/AuthContext'
import Spinner from '@components/common/Spinner'
import toast from 'react-hot-toast'

const VerifyEmail = () => {
  const navigate = useNavigate()
  const { verifyMagicLink } = useAuth()
  const [status, setStatus] = useState('verifying') // 'verifying' | 'success' | 'error'

  useEffect(() => {
    const handleVerification = async () => {
      try {
        const result = await verifyMagicLink()

        if (result.success) {
          setStatus('success')
          toast.success(`¡Bienvenido ${result.user.nombre}!`)

          // Redirigir según rol después de 1 segundo
          setTimeout(() => {
            if (result.user.rol === 'admin') {
              navigate('/admin')
            } else {
              navigate('/recipes')
            }
          }, 1000)
        } else {
          setStatus('error')
          toast.error(result.message || 'Error al verificar el enlace')
        }
      } catch (error) {
        setStatus('error')
        toast.error('Error al procesar el enlace mágico')
        console.error('Error en verificación:', error)
      }
    }

    handleVerification()
  }, [verifyMagicLink, navigate])

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-elevated p-8 text-center">
          {status === 'verifying' && (
            <div className="space-y-4">
              <Spinner size="lg" className="mx-auto" />
              <h2 className="text-2xl font-heading text-neutral-gray-900">
                Verificando tu enlace...
              </h2>
              <p className="text-neutral-gray-600">Por favor espera un momento</p>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-4">
              <div className="text-6xl mb-4"></div>
              <h2 className="text-2xl font-heading text-neutral-gray-900">¡Verificación exitosa!</h2>
              <p className="text-neutral-gray-600">Redirigiendo...</p>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <div className="text-6xl mb-4"></div>
              <h2 className="text-2xl font-heading text-neutral-gray-900">Error de verificación</h2>
              <p className="text-neutral-gray-600">
                El enlace puede haber expirado o ser inválido.
              </p>
              <button
                onClick={() => navigate('/auth/login')}
                className="mt-6 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
              >
                Volver al inicio de sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VerifyEmail
