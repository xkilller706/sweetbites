import { useState, useEffect } from 'react'
import { useAuth } from '@context/AuthContext'
import { useForm } from 'react-hook-form'
import Button from '@components/common/Button'
import Input from '@components/common/Input'
import Card from '@components/common/Card'
import userService from '@services/userService'
import toast from 'react-hot-toast'
import BackButton from '@components/common/BackButton'
import { Camera, Award } from 'lucide-react' // Si lucide-react no está, usa otros íconos
import UpgradePremiumModal from '@components/modals/UpgradePremiumModal'

const Profile = () => {
  const { user, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [changingPassword, setChangingPassword] = useState(false)
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
    defaultValues: {
      nombre: user?.nombre || '',
      email: user?.email || '',
      telefono: user?.telefono || '',
      bio: user?.bio || ''
    }
  })

  const { register: registerPassword, handleSubmit: handleSubmitPassword, formState: { errors: errorsPassword }, reset: resetPassword } = useForm()

  useEffect(() => {
    if (user) {
      reset({
        nombre: user.nombre,
        email: user.email,
        telefono: user.telefono || '',
        bio: user.bio || ''
      })
    }
  }, [user, reset])

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('La imagen debe ser menor a 5MB')
      return
    }

    // Validar tipo
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      toast.error('Solo se permiten imágenes JPG, PNG o WebP')
      return
    }

    const formData = new FormData()
    formData.append('photo', file)

    setUploadingPhoto(true)
    try {
      const response = await userService.uploadProfilePhoto(formData)
      if (response.success) {
        toast.success('Foto de perfil actualizada')
        // Actualizar el contexto con la nueva foto
        await updateProfile({ foto_perfil: response.photoUrl })
        // Recargar para ver el cambio
        window.location.reload()
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al subir foto')
    } finally {
      setUploadingPhoto(false)
    }
  }

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await updateProfile(data)
      setIsEditing(false)
      toast.success('Perfil actualizado correctamente')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al actualizar perfil')
    } finally {
      setLoading(false)
    }
  }

  const onSubmitPassword = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error('Las contraseñas no coinciden')
      return
    }

    setChangingPassword(true)
    try {
      await userService.changePassword(data.currentPassword, data.newPassword)
      toast.success('Contraseña actualizada correctamente')
      setShowPasswordForm(false)
      resetPassword()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al cambiar contraseña')
    } finally {
      setChangingPassword(false)
    }
  }

  const getInitials = (name) => {
    return name
      ?.split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || '??'
  }

  const getRoleBadge = (rol) => {
    const badges = {
      admin: { bg: 'bg-error', text: 'Administrador' },
      editor: { bg: 'bg-info', text: 'Editor' },
      usuario: { bg: 'bg-primary', text: 'Usuario' }
    }
    return badges[rol] || badges.usuario
  }

  const roleBadge = getRoleBadge(user?.rol)

  return (
    <div className="py-12">
      <BackButton />
      <div className="container-custom max-w-4xl">
        <h1 className="text-4xl font-heading text-primary mb-2">Mi Perfil</h1>
        <p className="text-neutral-gray-600 mb-8">
          Gestiona tu información personal
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div>
            <Card>
              <div className="text-center">
                {/* Foto de perfil con botón de cámara */}
                <div className="relative inline-block mb-4">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-primary flex items-center justify-center mx-auto">
                    {user?.foto_perfil ? (
                      <img
                        src={user.foto_perfil}
                        alt={user.nombre}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-4xl font-bold text-white">
                        {getInitials(user?.nombre)}
                      </span>
                    )}
                  </div>

                  {/* Botón de cámara */}
                  <label
                    htmlFor="photo-upload"
                    className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-primary-dark transition shadow-lg"
                    title="Cambiar foto de perfil"
                  >
                    <Camera size={20} />
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoChange}
                      disabled={uploadingPhoto}
                    />
                  </label>
                </div>

                {uploadingPhoto && (
                  <p className="text-sm text-neutral-gray-600 mb-2">Subiendo foto...</p>
                )}

                <h2 className="text-xl font-heading text-neutral-gray-800 mb-2">
                  {user?.nombre}
                </h2>

                {/* Badge de rol */}
                <div className="flex justify-center mb-2">
                  <span className={`${roleBadge.bg} text-white text-sm px-3 py-1 rounded-full`}>
                    {roleBadge.text}
                  </span>
                </div>

                {/* Badge de plan Premium/Gratis */}
                <div className="flex justify-center mb-4">
                  {user?.plan === 'premium' ? (
                    <div className="inline-flex items-center gap-2 bg-gradient-chocolate text-white px-4 py-2 rounded-full">
                      <Award size={16} />
                      <span className="font-semibold text-sm">Premium</span>
                    </div>
                  ) : (
                    <div className="inline-block">
                      <div className="bg-secondary text-neutral-gray-700 px-4 py-2 rounded-full mb-2">
                        <span className="font-semibold text-sm">Plan Gratis</span>
                      </div>
                      <button
                        onClick={() => setShowUpgradeModal(true)}
                        className="text-xs text-primary hover:text-primary-dark font-semibold hover:underline block w-full"
                      >
                        Actualizar a Premium
                      </button>
                    </div>
                  )}
                </div>

                <p className="text-sm text-neutral-gray-600">
                  Miembro desde {user?.fecha_registro ? new Date(user.fecha_registro).toLocaleDateString('es-ES', { year: 'numeric', month: 'long' }) : 'Fecha no disponible'}
                </p>
              </div>
            </Card>

            <Card className="mt-4">
              <h3 className="font-semibold mb-3">Estadísticas</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-gray-600">Recetas creadas</span>
                  <span className="font-bold text-primary">0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-gray-600">Favoritos</span>
                  <span className="font-bold text-primary">0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-gray-600">Comentarios</span>
                  <span className="font-bold text-primary">0</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            <Card>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-heading">Información Personal</h2>
                {!isEditing && (
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    ✏️ Editar
                  </Button>
                )}
              </div>

              {!isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-gray-500 mb-1">
                      Nombre Completo
                    </label>
                    <p className="text-neutral-gray-800 text-lg">{user?.nombre}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-gray-500 mb-1">
                      Correo Electrónico
                    </label>
                    <p className="text-neutral-gray-800 text-lg">{user?.email}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-gray-500 mb-1">
                      Teléfono
                    </label>
                    <p className="text-neutral-gray-800 text-lg">
                      {user?.telefono || 'No especificado'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-gray-500 mb-1">
                      Biografía
                    </label>
                    <p className="text-neutral-gray-800 text-lg">
                      {user?.bio || 'No has agregado una biografía aún'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-gray-500 mb-1">
                      Rol
                    </label>
                    <p className="text-neutral-gray-800 text-lg capitalize">{user?.rol}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <Input
                    label="Nombre Completo"
                    placeholder="Tu nombre"
                    error={errors.nombre?.message}
                    {...register('nombre', {
                      required: 'El nombre es obligatorio',
                      minLength: { value: 3, message: 'Mínimo 3 caracteres' }
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
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Email inválido'
                      }
                    })}
                  />

                  <Input
                    label="Teléfono (Opcional)"
                    type="tel"
                    placeholder="+57 300 123 4567"
                    error={errors.telefono?.message}
                    {...register('telefono')}
                  />

                  {/* Campo de biografía */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-gray-700 mb-2">
                      Biografía
                    </label>
                    <textarea
                      {...register('bio')}
                      rows={4}
                      maxLength={500}
                      placeholder="Cuéntanos sobre ti y tu pasión por la repostería..."
                      className="w-full px-4 py-2 border border-neutral-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    />
                    <p className="text-xs text-neutral-gray-500 mt-1">
                      {watch('bio')?.length || 0}/500 caracteres
                    </p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button type="submit" variant="primary" loading={loading}>
                      Guardar Cambios
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false)
                        reset()
                      }}
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              )}
            </Card>

            <Card className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-heading">Cambiar Contraseña</h2>
                {!showPasswordForm && (
                  <Button variant="outline" onClick={() => setShowPasswordForm(true)}>
                    Cambiar Contraseña
                  </Button>
                )}
              </div>

              {!showPasswordForm ? (
                <p className="text-neutral-gray-600">
                  Haz clic en el botón para cambiar tu contraseña de acceso.
                </p>
              ) : (
                <form onSubmit={handleSubmitPassword(onSubmitPassword)} className="space-y-4">
                  <Input
                    label="Contraseña Actual"
                    type="password"
                    placeholder="••••••••"
                    error={errorsPassword.currentPassword?.message}
                    {...registerPassword('currentPassword', {
                      required: 'La contraseña actual es obligatoria'
                    })}
                  />

                  <Input
                    label="Nueva Contraseña"
                    type="password"
                    placeholder="••••••••"
                    error={errorsPassword.newPassword?.message}
                    {...registerPassword('newPassword', {
                      required: 'La nueva contraseña es obligatoria',
                      minLength: {
                        value: 6,
                        message: 'Mínimo 6 caracteres'
                      }
                    })}
                  />

                  <Input
                    label="Confirmar Nueva Contraseña"
                    type="password"
                    placeholder="••••••••"
                    error={errorsPassword.confirmPassword?.message}
                    {...registerPassword('confirmPassword', {
                      required: 'Confirma tu nueva contraseña'
                    })}
                  />

                  <div className="flex gap-3 pt-2">
                    <Button type="submit" variant="primary" loading={changingPassword}>
                      Cambiar Contraseña
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowPasswordForm(false)
                        resetPassword()
                      }}
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              )}
            </Card>
          </div>
        </div>

        {/* Modal de upgrade premium */}
        <UpgradePremiumModal
          isOpen={showUpgradeModal}
          onClose={() => setShowUpgradeModal(false)}
        />
      </div>
    </div>
  )
}

export default Profile
