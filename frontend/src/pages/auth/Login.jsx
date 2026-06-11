import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '@context/AuthContext'
import Button from '@components/common/Button'
import Input from '@components/common/Input'
import toast from 'react-hot-toast'

const Login = () => {
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // Limpiar formulario al montar el componente
  useEffect(() => {
    reset()
  }, [])

  const onSubmit = async (data) => {
    setLoading(true)
    const result = await login(data)
    setLoading(false)

    if (result.success) {
      navigate('/recipes')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-heading text-white mb-2">Bienvenido a SweetBites</h2>
          <p className="text-white opacity-90">Inicia sesión para continuar</p>
        </div>

        <div className="bg-white rounded-2xl shadow-elevated p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Correo Electrónico"
              type="email"
              placeholder="tu@email.com"
              error={errors.email?.message}
              {...register('email', {
                required: 'El email es obligatorio',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Email inválido',
                },
              })}
            />

            <Input
              label="Contraseña"
              type="password"
              placeholder="Tu contraseña"
              error={errors.password?.message}
              {...register('password', {
                required: 'La contraseña es obligatoria',
              })}
            />

            <Button type="submit" variant="primary" className="w-full" loading={loading}>
              Iniciar Sesión
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-neutral-gray-600">
              ¿No tienes cuenta?{' '}
              <Link to="/auth/register" className="text-primary font-semibold hover:underline">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-white hover:underline">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
