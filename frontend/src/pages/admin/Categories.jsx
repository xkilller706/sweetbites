import { useState, useEffect } from 'react'
import categoryService from '@services/categoryService'
import Card from '@components/common/Card'
import Button from '@components/common/Button'
import Input from '@components/common/Input'
import Modal from '@components/common/Modal'
import Spinner from '@components/common/Spinner'
import Badge from '@components/common/Badge'
import toast from 'react-hot-toast'
import BackButton from '@components/common/BackButton'

const Categories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState({ isOpen: false, mode: 'create', category: null })
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    icono: '',
    color: '#6BD080'
  })
  const [submitting, setSubmitting] = useState(false)

  const PRESET_COLORS = [
    { name: 'Verde Menta', hex: '#6BD080' },
    { name: 'Verde Agua', hex: '#A4C3B2' },
    { name: 'Azul Pastel', hex: '#B5C7E8' },
    { name: 'Lavanda', hex: '#D4A5D4' },
    { name: 'Amarillo', hex: '#F5DBA5' },
    { name: 'Rosa Suave', hex: '#F5B5C7' },
    { name: 'Beige', hex: '#DED6D1' }
  ]

  const PRESET_ICONS = ['', '🍪', '🍨', '🍫', '🥧', '', '', '🍩', '🥮', '🍮', '🧇', '🍭']

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const response = await categoryService.getAll()
      if (response.success) {
        setCategories(response.categories)
      }
    } catch (error) {
      toast.error('Error al cargar categorías')
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (mode, category = null) => {
    if (mode === 'edit' && category) {
      setFormData({
        nombre: category.nombre,
        descripcion: category.descripcion || '',
        icono: category.icono || '',
        color: category.color || '#6BD080'
      })
    } else {
      setFormData({
        nombre: '',
        descripcion: '',
        icono: '',
        color: '#6BD080'
      })
    }
    setModal({ isOpen: true, mode, category })
  }

  const handleCloseModal = () => {
    setModal({ isOpen: false, mode: 'create', category: null })
    setFormData({ nombre: '', descripcion: '', icono: '', color: '#6BD080' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.nombre.trim()) {
      toast.error('El nombre es obligatorio')
      return
    }

    setSubmitting(true)
    try {
      let response
      if (modal.mode === 'create') {
        response = await categoryService.create(formData)
      } else {
        response = await categoryService.update(modal.category.id, formData)
      }

      if (response.success) {
        toast.success(modal.mode === 'create' ? 'Categoría creada' : 'Categoría actualizada')
        handleCloseModal()
        loadCategories()
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al guardar categoría')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (categoryId) => {
    if (!confirm('¿Estás seguro de eliminar esta categoría? Si tiene recetas asociadas, no se podrá eliminar.')) {
      return
    }

    try {
      const response = await categoryService.delete(categoryId)
      if (response.success) {
        toast.success('Categoría eliminada')
        loadCategories()
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al eliminar categoría')
    }
  }

  if (loading) return <Spinner fullScreen />

  return (
    <div className="py-12">
      <BackButton />
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-heading text-primary mb-2">Gestión de Categorías</h1>
            <p className="text-neutral-gray-600">
              Administra las categorías de recetas
            </p>
          </div>
          <Button variant="primary" onClick={() => handleOpenModal('create')}>
            + Nueva Categoría
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category.id} hover>
              <div className="flex items-start gap-4">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ backgroundColor: `${category.color}20`, color: category.color }}
                >
                  {category.icono}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-heading text-neutral-gray-800 mb-1 truncate">
                    {category.nombre}
                  </h3>
                  {category.descripcion && (
                    <p className="text-sm text-neutral-gray-600 line-clamp-2 mb-3">
                      {category.descripcion}
                    </p>
                  )}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenModal('edit', category)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(category.id)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Create/Edit Modal */}
        <Modal
          isOpen={modal.isOpen}
          onClose={handleCloseModal}
          title={modal.mode === 'create' ? 'Nueva Categoría' : 'Editar Categoría'}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nombre de la Categoría"
              placeholder="Ej: Tortas"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              required
            />

            <div>
              <label className="block text-sm font-medium text-neutral-gray-700 mb-2">
                Descripción (Opcional)
              </label>
              <textarea
                className="input min-h-[80px]"
                placeholder="Describe esta categoría..."
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-gray-700 mb-2">
                Ícono
              </label>
              <div className="flex gap-2 flex-wrap mb-2">
                {PRESET_ICONS.map((icon, index) => (
                  <button
                    key={`${icon}-${index}`}
                    type="button"
                    className={`w-12 h-12 rounded-lg border-2 text-2xl ${
                      formData.icono === icon
                        ? 'border-primary bg-primary/10'
                        : 'border-neutral-gray-200 hover:border-neutral-gray-300'
                    }`}
                    onClick={() => setFormData({ ...formData, icono: icon })}
                  >
                    {icon}
                  </button>
                ))}
              </div>
              <input
                type="text"
                className="input"
                placeholder="O escribe un emoji personalizado"
                value={formData.icono}
                onChange={(e) => setFormData({ ...formData, icono: e.target.value })}
                maxLength={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-gray-700 mb-2">
                Color
              </label>
              <div className="flex gap-2 flex-wrap mb-2">
                {PRESET_COLORS.map((preset) => (
                  <button
                    key={preset.hex}
                    type="button"
                    className={`w-12 h-12 rounded-lg border-2 ${
                      formData.color === preset.hex
                        ? 'border-neutral-gray-800 scale-110'
                        : 'border-neutral-gray-200'
                    }`}
                    style={{ backgroundColor: preset.hex }}
                    onClick={() => setFormData({ ...formData, color: preset.hex })}
                    title={preset.name}
                  />
                ))}
              </div>
              <input
                type="color"
                className="input h-12 cursor-pointer"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              />
            </div>

            {/* Preview */}
            <div className="bg-neutral-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-neutral-gray-600 mb-2">Vista Previa:</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                  style={{ backgroundColor: `${formData.color}20`, color: formData.color }}
                >
                  {formData.icono}
                </div>
                <span className="font-heading text-lg">{formData.nombre || 'Categoría'}</span>
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <Button type="button" variant="outline" onClick={handleCloseModal}>
                Cancelar
              </Button>
              <Button type="submit" variant="primary" loading={submitting}>
                {modal.mode === 'create' ? 'Crear' : 'Guardar'} Categoría
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  )
}

export default Categories
