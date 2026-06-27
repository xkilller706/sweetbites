import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '@context/AuthContext'
import Button from '@components/common/Button'
import Input from '@components/common/Input'
import toast from 'react-hot-toast'

const Register = () => {
  const { register: registerUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      nombre: '',
      email: '',
      password: '',
      confirmPassword: '',
      telefono: '',
    },
  })

  // Limpiar formulario al montar el componente
  useEffect(() => {
    reset()
  }, [])

  const onSubmit = async (data) => {
    setLoading(true)
    const result = await registerUser({ ...data, plan: 'gratis' })
    setLoading(false)

    if (result.success) {
      toast.success('¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.')
      setTimeout(() => navigate('/auth/login'), 1500)
    } else {
      toast.error(result.message || 'Error al registrar usuario')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-heading text-white mb-2">Únete a SweetBites</h2>
          <p className="text-white opacity-90">Crea tu cuenta y comparte tus recetas</p>
        </div>

        <div className="bg-white rounded-2xl shadow-elevated p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Nombre Completo"
              type="text"
              placeholder="María García"
              error={errors.nombre?.message}
              {...register('nombre', {
                required: 'El nombre es obligatorio',
                minLength: {
                  value: 3,
                  message: 'Mínimo 3 caracteres',
                },
              })}
            />

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
              placeholder="Mínimo 8 caracteres"
              error={errors.password?.message}
              {...register('password', {
                required: 'La contraseña es obligatoria',
                minLength: {
                  value: 8,
                  message: 'Mínimo 8 caracteres',
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: 'Debe contener mayúscula, minúscula, número y carácter especial (@$!%*?&)',
                },
              })}
            />

            <Input
              label="Confirmar Contraseña"
              type="password"
              placeholder="Repite tu contraseña"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword', {
                required: 'Debes confirmar la contraseña',
                validate: (value) =>
                  value === watch('password') || 'Las contraseñas no coinciden',
              })}
            />

            <Input
              label="Teléfono (opcional)"
              type="tel"
              placeholder="3001234567"
              error={errors.telefono?.message}
              {...register('telefono')}
            />

            <Button type="submit" variant="primary" className="w-full" loading={loading}>
              Crear Cuenta
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-neutral-gray-600">
              ¿Ya tienes cuenta?{' '}
              <Link to="/auth/login" className="text-primary font-semibold hover:underline">
                Inicia sesión
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

export default Register
