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
  const [selectedPlan, setSelectedPlan] = useState('gratis')
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
    const result = await registerUser({ ...data, plan: selectedPlan })
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

            {/* Selección de Plan */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-neutral-gray-700">
                Selecciona tu Plan
              </label>

              {/* Plan Gratis */}
              <div
                onClick={() => setSelectedPlan('gratis')}
                className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                  selectedPlan === 'gratis'
                    ? 'border-primary bg-primary/5'
                    : 'border-neutral-gray-300 hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">Plan Gratis</h3>
                    <p className="text-sm text-neutral-gray-600">Ideal para empezar</p>
                  </div>
                  <span className="text-2xl font-bold text-primary">$0</span>
                </div>
                <ul className="mt-3 space-y-1 text-sm text-neutral-gray-600">
                  <li>✓ Hasta 3 recetas favoritas</li>
                  <li>✓ Ver recetas públicas</li>
                  <li>✓ Crear hasta 5 recetas</li>
                  <li>✓ Comentar recetas</li>
                </ul>
              </div>

              {/* Plan Premium */}
              <div
                onClick={() => setSelectedPlan('premium')}
                className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                  selectedPlan === 'premium'
                    ? 'border-accent-chocolate bg-accent-chocolate/5'
                    : 'border-neutral-gray-300 hover:border-accent-chocolate/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      Plan Premium
                      <span className="text-xs bg-accent-chocolate text-white px-2 py-1 rounded">
                        Recomendado
                      </span>
                    </h3>
                    <p className="text-sm text-neutral-gray-600">Para chefs apasionados</p>
                  </div>
                  <span className="text-2xl font-bold text-accent-chocolate">$9.99/mes</span>
                </div>
                <ul className="mt-3 space-y-1 text-sm text-neutral-gray-600">
                  <li>✓ Favoritos ilimitados</li>
                  <li>✓ Recetas ilimitadas</li>
                  <li>✓ Modo cocina interactivo</li>
                  <li>✓ Descargar recetas en PDF</li>
                  <li>✓ Sin anuncios</li>
                </ul>
              </div>
            </div>

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
