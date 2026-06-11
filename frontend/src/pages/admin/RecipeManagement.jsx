import { useState, useEffect } from 'react'
import { api } from '@services/api'
import Card from '@components/common/Card'
import Button from '@components/common/Button'
import Badge from '@components/common/Badge'
import Spinner from '@components/common/Spinner'
import Input from '@components/common/Input'
import EmptyState from '@components/common/EmptyState'
import { formatRelativeDate } from '@utils/helpers'
import toast from 'react-hot-toast'
import BackButton from '@components/common/BackButton'

const RecipeManagement = () => {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: '',
    estado: '',
    categoria: ''
  })
  const [categories, setCategories] = useState([])
  const [processing, setProcessing] = useState(null) // ID de la receta en proceso

  useEffect(() => {
    loadCategories()
    loadRecipes()
  }, [])

  useEffect(() => {
    loadRecipes()
  }, [filters])

  const loadCategories = async () => {
    try {
      const response = await api.get('/categories')
      if (response.data.success) {
        setCategories(response.data.categories)
      }
    } catch (error) {
      console.error('Error al cargar categorías:', error)
    }
  }

  const loadRecipes = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filters.search) params.append('search', filters.search)
      if (filters.estado) params.append('estado', filters.estado)
      if (filters.categoria) params.append('categoria', filters.categoria)

      const response = await api.get(`/admin/recipes?${params.toString()}`)
      if (response.data.success) {
        setRecipes(response.data.recipes)
      }
    } catch (error) {
      toast.error('Error al cargar recetas')
    } finally {
      setLoading(false)
    }
  }

  const handleToggleActive = async (recipeId, currentStatus) => {
    setProcessing(recipeId)
    try {
      const response = await api.put(`/admin/recipes/${recipeId}/toggle-active`)
      if (response.data.success) {
        toast.success(response.data.message)
        loadRecipes()
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al cambiar estado')
    } finally {
      setProcessing(null)
    }
  }

  const handleDelete = async (recipeId, recipeName) => {
    if (!confirm(`¿Estás seguro de eliminar permanentemente la receta "${recipeName}"? Esta acción eliminará todos los datos asociados (comentarios, favoritos, etc.) y no se puede deshacer.`)) {
      return
    }

    setProcessing(recipeId)
    try {
      const response = await api.delete(`/admin/recipes/${recipeId}`)
      if (response.data.success) {
        toast.success('Receta eliminada permanentemente')
        loadRecipes()
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al eliminar receta')
    } finally {
      setProcessing(null)
    }
  }

  const handleApprove = async (recipeId) => {
    setProcessing(recipeId)
    try {
      const response = await api.put(`/admin/recipes/${recipeId}/approve`)
      if (response.data.success) {
        toast.success('Receta aprobada correctamente')
        loadRecipes()
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al aprobar receta')
    } finally {
      setProcessing(null)
    }
  }

  const getEstadoBadge = (estado) => {
    switch (estado) {
      case 'pendiente':
        return <Badge variant="warning">⏳ Pendiente</Badge>
      case 'publicada':
        return <Badge variant="success">✓ Publicada</Badge>
      case 'rechazada':
        return <Badge variant="error">✗ Rechazada</Badge>
      default:
        return <Badge variant="secondary">{estado}</Badge>
    }
  }

  if (loading) return <Spinner fullScreen />

  return (
    <div className="py-12">
      <BackButton />
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-4xl font-heading text-primary mb-2">Gestión de Recetas</h1>
          <p className="text-neutral-gray-600">
            Administra todas las recetas del sistema ({recipes.length} total)
          </p>
        </div>

        {/* Filtros */}
        <Card className="mb-6">
          <div className="grid md:grid-cols-3 gap-4">
            <Input
              placeholder="🔍 Buscar receta o autor..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />

            <select
              className="input"
              value={filters.estado}
              onChange={(e) => setFilters({ ...filters, estado: e.target.value })}
            >
              <option value="">Todos los estados</option>
              <option value="pendiente">⏳ Pendientes</option>
              <option value="publicada">✓ Publicadas</option>
              <option value="rechazada">✗ Rechazadas</option>
            </select>

            <select
              className="input"
              value={filters.categoria}
              onChange={(e) => setFilters({ ...filters, categoria: e.target.value })}
            >
              <option value="">Todas las categorías</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icono} {cat.nombre}
                </option>
              ))}
            </select>
          </div>
        </Card>

        {/* Lista de Recetas */}
        {recipes.length === 0 ? (
          <EmptyState
            emoji="🔍"
            title="No se encontraron recetas"
            message="Ajusta los filtros para ver más resultados"
          />
        ) : (
          <div className="space-y-4">
            {recipes.map((recipe) => (
              <Card key={recipe.id} hover>
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Imagen */}
                  <div className="md:w-32 h-32 flex-shrink-0">
                    <img
                      src={recipe.foto_principal || 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=200&h=200&fit=crop'}
                      alt={recipe.nombre}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Contenido */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-heading text-neutral-gray-800 mb-2 truncate">
                          {recipe.nombre}
                        </h3>
                        <div className="flex gap-2 flex-wrap mb-3">
                          {getEstadoBadge(recipe.estado)}
                          <Badge variant="primary">{recipe.categoria_nombre}</Badge>
                          {recipe.activo !== undefined && (
                            <Badge variant={recipe.activo ? 'success' : 'error'}>
                              {recipe.activo ? '🟢 Activa' : '🔴 Inactiva'}
                            </Badge>
                          )}
                        </div>
                        <p className="text-neutral-gray-600 text-sm mb-2 line-clamp-2">
                          {recipe.descripcion}
                        </p>
                        <div className="flex flex-wrap gap-3 text-xs text-neutral-gray-500">
                          <span> {recipe.autor_nombre}</span>
                          <span>⏱️ {recipe.tiempo_preparacion} min</span>
                          <span> {parseFloat(recipe.calificacion_promedio).toFixed(1)} ({recipe.total_valoraciones})</span>
                          <span>📅 {formatRelativeDate(recipe.fecha_creacion)}</span>
                        </div>
                        {recipe.razon_rechazo && (
                          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-xs font-semibold text-red-700 mb-1">Motivo de rechazo:</p>
                            <p className="text-xs text-red-600">{recipe.razon_rechazo}</p>
                          </div>
                        )}
                      </div>

                      {/* Acciones */}
                      <div className="flex md:flex-col gap-2 flex-wrap md:flex-nowrap">
                        {recipe.estado === 'pendiente' && (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleApprove(recipe.id)}
                            loading={processing === recipe.id}
                            className="whitespace-nowrap"
                          >
                            ✓ Aprobar
                          </Button>
                        )}

                        {recipe.estado === 'publicada' && recipe.activo !== undefined && (
                          <Button
                            variant={recipe.activo ? 'outline' : 'primary'}
                            size="sm"
                            onClick={() => handleToggleActive(recipe.id, recipe.activo)}
                            loading={processing === recipe.id}
                            className="whitespace-nowrap"
                          >
                            {recipe.activo ? '🔴 Desactivar' : '🟢 Activar'}
                          </Button>
                        )}

                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(recipe.id, recipe.nombre)}
                          loading={processing === recipe.id}
                          className="whitespace-nowrap"
                        >
                          🗑️ Eliminar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default RecipeManagement
