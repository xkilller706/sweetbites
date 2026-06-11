import { useState } from 'react'
import { X, CreditCard, Check } from 'lucide-react'
import Button from '@components/common/Button'
import Input from '@components/common/Input'
import { useForm } from 'react-hook-form'
import userService from '@services/userService'
import toast from 'react-hot-toast'
import { useAuth } from '@context/AuthContext'

const UpgradePremiumModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false)
  const { user, updateProfile } = useAuth()

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: ''
    }
  })

  if (!isOpen) return null

  const onSubmit = async (data) => {
    setLoading(true)

    // Simular proceso de pago (2 segundos)
    await new Promise(resolve => setTimeout(resolve, 2000))

    try {
      // Actualizar plan a premium (endpoint falso - solo cambia en BD)
      const response = await userService.upgradePremium()

      if (response.success) {
        toast.success('¡Bienvenido a Premium! Disfruta de todas las funcionalidades')
        await updateProfile({ plan: 'premium' })
        onClose()
      }
    } catch (error) {
      toast.error('Error al procesar el pago')
    } finally {
      setLoading(false)
    }
  }

  const features = [
    'Acceso a todas las recetas premium',
    'Búsquedas ilimitadas',
    'Favoritos ilimitados',
    'Modo cocina interactivo',
    'Descarga de recetas en PDF',
    'Sin anuncios'
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-primary p-6 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-heading font-bold text-white">
                Actualiza a Premium
              </h2>
              <p className="text-white/90 mt-1">
                Desbloquea todas las funcionalidades de SweetBites
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Precio */}
          <div className="text-center mb-8">
            <div className="text-5xl font-bold text-accent-chocolate mb-2">
              $9.99
              <span className="text-xl text-neutral-gray-500">/mes</span>
            </div>
            <p className="text-neutral-gray-600">
              Primer mes gratis • Cancela cuando quieras
            </p>
          </div>

          {/* Características */}
          <div className="mb-8">
            <h3 className="font-semibold text-lg mb-4 text-accent-chocolate">
              Qué incluye Premium:
            </h3>
            <div className="grid gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                    <Check size={16} className="text-success" />
                  </div>
                  <span className="text-neutral-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Formulario de pago (simulado) */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="border-t pt-6">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="text-accent-chocolate" />
                <h3 className="font-semibold text-lg">Información de pago</h3>
              </div>

              <p className="text-sm text-warning bg-warning/10 p-3 rounded-lg mb-4">
                Este es un formulario de prueba para proyecto académico. No se realizará ningún cargo real.
              </p>

              <Input
                label="Número de tarjeta"
                placeholder="1234 5678 9012 3456"
                {...register('cardNumber', {
                  required: 'El número de tarjeta es requerido',
                  pattern: {
                    value: /^[0-9]{16}$/,
                    message: 'Ingresa 16 dígitos'
                  }
                })}
                error={errors.cardNumber?.message}
                maxLength={16}
              />

              <Input
                label="Nombre en la tarjeta"
                placeholder="JUAN PÉREZ"
                {...register('cardName', {
                  required: 'El nombre es requerido'
                })}
                error={errors.cardName?.message}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Fecha de expiración"
                  placeholder="MM/AA"
                  {...register('expiryDate', {
                    required: 'La fecha es requerida',
                    pattern: {
                      value: /^(0[1-9]|1[0-2])\/[0-9]{2}$/,
                      message: 'Formato: MM/AA'
                    }
                  })}
                  error={errors.expiryDate?.message}
                  maxLength={5}
                />

                <Input
                  label="CVV"
                  placeholder="123"
                  type="password"
                  {...register('cvv', {
                    required: 'El CVV es requerido',
                    pattern: {
                      value: /^[0-9]{3,4}$/,
                      message: '3 o 4 dígitos'
                    }
                  })}
                  error={errors.cvv?.message}
                  maxLength={4}
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full bg-gradient-primary text-white py-3"
              loading={loading}
            >
              {loading ? 'Procesando...' : 'Actualizar a Premium'}
            </Button>

            <p className="text-xs text-center text-neutral-gray-500">
              Al actualizar aceptas los términos y condiciones
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpgradePremiumModal
