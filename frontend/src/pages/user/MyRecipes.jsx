import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import recipeService from '@services/recipeService'
import Button from '@components/common/Button'
import Card from '@components/common/Card'
import Badge from '@components/common/Badge'
import Spinner from '@components/common/Spinner'
import EmptyState from '@components/common/EmptyState'
import { formatRelativeDate } from '@utils/helpers'
import toast from 'react-hot-toast'
import BackButton from '@components/common/BackButton'

const MyRecipes = () => {
  const navigate = useNavigate()
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, pendiente, publicada, rechazada

  useEffect(() => {
    loadMyRecipes()
  }, [])

  const loadMyRecipes = async () => {
    try {
      const response = await recipeService.getMyRecipes()
      if (response.success) {
        setRecipes(response.recipes)
      }
    } catch (error) {
      toast.error('Error al cargar tus recetas')
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status) => {
    const badges = {
      pendiente: { variant: 'warning', text: '⏳ Pendiente' },
      publicada: { variant: 'success', text: '✓ Publicada' },
      rechazada: { variant: 'error', text: '✗ Rechazada' },
      borrador: { variant: 'info', text: '📝 Borrador' }
    }
    return badges[status] || badges.pendiente
  }

  const filteredRecipes = recipes.filter(recipe => {
    if (filter === 'all') return true
    return recipe.estado === filter
  })

  if (loading) return <Spinner fullScreen />

  const statusCounts = {
    all: recipes.length,
    pendiente: recipes.filter(r => r.estado === 'pendiente').length,
    publicada: recipes.filter(r => r.estado === 'publicada').length,
    rechazada: recipes.filter(r => r.estado === 'rechazada').length
  }

  return (
    <div className="py-12">
      <BackButton />
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-heading text-primary mb-2">Mis Recetas</h1>
            <p className="text-neutral-gray-600">
              Gestiona tus recetas enviadas
            </p>
          </div>
          <Button variant="primary" onClick={() => navigate('/user/create-recipe')}>
            + Nueva Receta
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
              filter === 'all'
                ? 'bg-primary text-white'
                : 'bg-neutral-gray-200 text-neutral-gray-700 hover:bg-neutral-gray-300'
            }`}
          >
            Todas ({statusCounts.all})
          </button>
          <button
            onClick={() => setFilter('pendiente')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
              filter === 'pendiente'
                ? 'bg-warning text-white'
                : 'bg-neutral-gray-200 text-neutral-gray-700 hover:bg-neutral-gray-300'
            }`}
          >
            Pendientes ({statusCounts.pendiente})
          </button>
          <button
            onClick={() => setFilter('publicada')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
              filter === 'publicada'
                ? 'bg-success text-white'
                : 'bg-neutral-gray-200 text-neutral-gray-700 hover:bg-neutral-gray-300'
            }`}
          >
            Publicadas ({statusCounts.publicada})
          </button>
          <button
            onClick={() => setFilter('rechazada')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
              filter === 'rechazada'
                ? 'bg-error text-white'
                : 'bg-neutral-gray-200 text-neutral-gray-700 hover:bg-neutral-gray-300'
            }`}
          >
            Rechazadas ({statusCounts.rechazada})
          </button>
        </div>

        {/* Recipe List */}
        {filteredRecipes.length === 0 ? (
          <EmptyState
            emoji="📝"
            title={filter === 'all' ? 'No tienes recetas' : `No tienes recetas ${filter}s`}
            message={filter === 'all' ? 'Crea tu primera receta para compartir con la comunidad' : ''}
            action={
              filter === 'all' && (
                <Button variant="primary" onClick={() => navigate('/user/create-recipe')}>
                  Crear Receta
                </Button>
              )
            }
          />
        ) : (
          <div className="space-y-4">
            {filteredRecipes.map((recipe) => {
              const statusBadge = getStatusBadge(recipe.estado)

              return (
                <Card key={recipe.id} className="hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Image */}
                    <div className="md:w-48 h-48 flex-shrink-0">
                      <img
                        src={recipe.imagen || 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=400&fit=crop'}
                        alt={recipe.nombre}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                        <div>
                          <h3 className="text-2xl font-heading text-neutral-gray-800 mb-2">
                            {recipe.nombre}
                          </h3>
                          <p className="text-neutral-gray-600 line-clamp-2 mb-3">
                            {recipe.descripcion}
                          </p>
                          <div className="flex gap-2 flex-wrap">
                            <Badge variant={statusBadge.variant}>{statusBadge.text}</Badge>
                            <Badge variant="primary">{recipe.categoria_nombre || recipe.categoria}</Badge>
                            <Badge variant="secondary">{recipe.dificultad}</Badge>
                          </div>
                        </div>
                      </div>

                      {/* Rejection Reason */}
                      {recipe.estado === 'rechazada' && recipe.estado_rechazo && (
                        <div className="bg-error/10 border border-error/30 p-4 rounded-lg mb-4">
                          <p className="text-sm font-semibold text-error mb-1">Motivo del rechazo:</p>
                          <p className="text-sm text-neutral-gray-700">{recipe.estado_rechazo}</p>
                        </div>
                      )}

                      {/* Meta Info */}
                      <div className="flex flex-wrap gap-4 text-sm text-neutral-gray-500 mb-4">
                        <span>⏱️ {recipe.tiempo_preparacion} min</span>
                        <span>👥 {recipe.porciones} porciones</span>
                        <span>📅 {formatRelativeDate(recipe.fecha_creacion)}</span>
                        {recipe.estado === 'publicada' && (
                          <>
                            <span> {parseFloat(recipe.calificacion_promedio || 0).toFixed(1)}</span>
                            <span>💬 {recipe.total_comentarios || 0} comentarios</span>
                          </>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/user/edit-recipe/${recipe.id}`)}
                        >
                          Editar
                        </Button>
                        {recipe.estado === 'publicada' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/recipes/${recipe.id}`)}
                          >
                            Ver Publicada
                          </Button>
                        )}
                        {recipe.estado === 'pendiente' && (
                          <div className="text-sm text-warning flex items-center gap-2">
                            <span className="inline-block w-2 h-2 bg-warning rounded-full animate-pulse"></span>
                            En revisión por administrador
                          </div>
                        )}
                        {recipe.estado === 'rechazada' && (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => navigate('/user/create-recipe')}
                          >
                            Crear Nueva Versión
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyRecipes
