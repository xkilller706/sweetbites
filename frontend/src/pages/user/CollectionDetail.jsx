import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Trash2, Plus } from 'lucide-react'
import RecipeCard from '@components/recipes/RecipeCard'
import Button from '@components/common/Button'
import Spinner from '@components/common/Spinner'
import EmptyState from '@components/common/EmptyState'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter } from '@components/ui/Dialog'
import { userService } from '@services/userService'
import { toast } from 'react-hot-toast'
import BackButton from '@components/common/BackButton'

const CollectionDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [collection, setCollection] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [recipeToRemove, setRecipeToRemove] = useState(null)

  useEffect(() => {
    fetchCollection()
  }, [id])

  const fetchCollection = async () => {
    try {
      setLoading(true)
      const data = await userService.getCollectionById(id)

      if (data.success) {
        setCollection(data.collection)
      }
    } catch (error) {
      console.error('Error al cargar colección:', error)
      toast.error('Error al cargar la colección')
      navigate('/user/favorites')
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveRecipe = async () => {
    if (!recipeToRemove) return

    try {
      const data = await userService.removeFromCollection(id, recipeToRemove.id)

      if (data.success) {
        toast.success('Receta eliminada de la colección')
        setShowDeleteDialog(false)
        setRecipeToRemove(null)
        fetchCollection()
      }
    } catch (error) {
      console.error('Error al eliminar receta:', error)
      toast.error('Error al eliminar la receta de la colección')
    }
  }

  const openRemoveDialog = (recipe) => {
    setRecipeToRemove(recipe)
    setShowDeleteDialog(true)
  }

  if (loading) {
    return <Spinner fullScreen />
  }

  if (!collection) {
    return (
      <div className="flex min-h-screen items-center justify-center">
      <BackButton />
        <EmptyState
          emoji="📁"
          title="Colección no encontrada"
          message="La colección que buscas no existe o no tienes acceso a ella"
          action={
            <Button variant="primary" onClick={() => navigate('/user/favorites')}>
              Volver a Favoritos
            </Button>
          }
        />
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/user/favorites"
            className="mb-4 inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a Favoritos
          </Link>

          <div className="flex items-start justify-between">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <span className="text-4xl">📁</span>
                <h1 className="text-3xl font-bold text-neutral-gray-800">{collection.nombre}</h1>
              </div>

              {collection.descripcion && (
                <p className="text-neutral-gray-600 max-w-2xl">{collection.descripcion}</p>
              )}

              <p className="mt-2 text-sm text-neutral-gray-500">
                {collection.total_recetas || 0} {collection.total_recetas === 1 ? 'receta' : 'recetas'}
              </p>
            </div>

            <Link to="/recipes">
              <Button variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Agregar Recetas
              </Button>
            </Link>
          </div>
        </div>

        {/* Recipes Grid */}
        {collection.recipes && collection.recipes.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {collection.recipes.map((recipe) => (
              <div key={recipe.id} className="relative">
                <RecipeCard
                  recipe={{
                    ...recipe,
                    categoria_emoji: recipe.categoria_icono,
                  }}
                />

                {/* Remove from Collection Button */}
                <button
                  onClick={() => openRemoveDialog(recipe)}
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-red-600 shadow-md transition-all hover:bg-red-50 hover:text-red-700"
                  title="Eliminar de la colección"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </motion.div>
        ) : (
          <EmptyState
            emoji="📁"
            title="Colección vacía"
            message="Aún no has agregado recetas a esta colección"
            action={
              <Link to="/recipes">
                <Button variant="primary" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Explorar Recetas
                </Button>
              </Link>
            }
          />
        )}

        {/* Remove Recipe Confirmation Dialog */}
        <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
          <DialogContent onClose={() => setShowDeleteDialog(false)}>
            <DialogHeader>
              <DialogTitle>Eliminar de la Colección</DialogTitle>
              <DialogDescription>
                ¿Estás seguro de que quieres eliminar esta receta de la colección?
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              {recipeToRemove && (
                <div className="rounded-lg bg-neutral-gray-50 p-4">
                  <p className="font-medium text-neutral-gray-800">{recipeToRemove.nombre}</p>
                  <p className="mt-1 text-sm text-neutral-gray-600">
                    La receta solo se eliminará de esta colección, no se borrará de la plataforma.
                  </p>
                </div>
              )}
            </DialogBody>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                Cancelar
              </Button>
              <Button variant="danger" onClick={handleRemoveRecipe}>
                Eliminar de la Colección
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default CollectionDetail
