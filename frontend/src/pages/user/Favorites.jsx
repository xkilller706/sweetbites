import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, Trash2, FolderOpen } from 'lucide-react'
import Button from '@components/common/Button'
import Card from '@components/common/Card'
import EmptyState from '@components/common/EmptyState'
import Spinner from '@components/common/Spinner'
import RecipeCard from '@components/recipes/RecipeCard'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter } from '@components/ui/Dialog'
import { userService } from '@services/userService'
import { toast } from 'react-hot-toast'
import BackButton from '@components/common/BackButton'
import UpgradePremiumModal from '@components/modals/UpgradePremiumModal'
import { useAuth } from '@context/AuthContext'

const Favorites = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState([])
  const [collections, setCollections] = useState([])
  const [activeTab, setActiveTab] = useState('favorites')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [collectionToDelete, setCollectionToDelete] = useState(null)
  const [formData, setFormData] = useState({ nombre: '', descripcion: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [favoritesData, collectionsData] = await Promise.all([
        userService.getFavorites(),
        userService.getCollections().catch(() => ({ success: true, collections: [] }))
      ])

      if (favoritesData.success) {
        setFavorites(favoritesData.favorites || [])
      }

      if (collectionsData.success) {
        setCollections(collectionsData.collections || [])
      }
    } catch (error) {
      console.error('Error al cargar datos:', error)
      toast.error('Error al cargar favoritos')
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveFavorite = async (recipeId) => {
    try {
      await userService.removeFavorite(recipeId)
      setFavorites(favorites.filter(fav => fav.id !== recipeId))
      toast.success('Receta eliminada de favoritos')
    } catch (error) {
      console.error('Error al eliminar favorito:', error)
      toast.error('Error al eliminar de favoritos')
    }
  }

  const handleCreateCollection = async (e) => {
    e.preventDefault()

    if (!formData.nombre.trim()) {
      toast.error('El nombre de la colección es obligatorio')
      return
    }

    try {
      setSubmitting(true)
      const response = await userService.createCollection({
        nombre: formData.nombre,
        descripcion: formData.descripcion
      })

      if (response.success) {
        toast.success('Colección creada exitosamente')
        setShowCreateModal(false)
        setFormData({ nombre: '', descripcion: '' })
        fetchData()
      }
    } catch (error) {
      console.error('Error al crear colección:', error)
      toast.error(error.response?.data?.message || 'Error al crear la colección')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteCollection = async () => {
    if (!collectionToDelete) return

    try {
      const response = await userService.deleteCollection(collectionToDelete.id)

      if (response.success) {
        toast.success('Colección eliminada')
        setShowDeleteModal(false)
        setCollectionToDelete(null)
        setCollections(collections.filter(c => c.id !== collectionToDelete.id))
      }
    } catch (error) {
      console.error('Error al eliminar colección:', error)
      toast.error('Error al eliminar la colección')
    }
  }

  const openDeleteModal = (collection, e) => {
    e.preventDefault()
    e.stopPropagation()
    setCollectionToDelete(collection)
    setShowDeleteModal(true)
  }

  if (loading) return <Spinner fullScreen />

  return (
    <div className="py-12">
      <BackButton />
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-4xl font-bold text-neutral-gray-800">Mis Favoritos</h1>
            <p className="text-neutral-gray-600">
              Guarda tus recetas favoritas y organízalas en colecciones
            </p>
            {user?.plan === 'gratis' && (
              <div className="mt-3 inline-flex items-center gap-2 bg-warning/10 text-warning px-4 py-2 rounded-lg text-sm">
                <span className="font-medium">Plan Gratis: {favorites.length}/3 favoritos</span>
                {favorites.length >= 3 && (
                  <button
                    onClick={() => setShowUpgradeModal(true)}
                    className="underline hover:no-underline font-semibold"
                  >
                    Actualizar a Premium
                  </button>
                )}
              </div>
            )}
          </div>
          <Button variant="primary" onClick={() => navigate('/recipes')}>
            + Explorar Recetas
          </Button>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-2 border-b border-neutral-gray-200">
          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'favorites'
                ? 'border-b-2 border-primary text-primary'
                : 'text-neutral-gray-600 hover:text-neutral-gray-800'
            }`}
          >
            ❤️ Favoritos ({favorites.length})
          </button>
          <button
            onClick={() => setActiveTab('collections')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'collections'
                ? 'border-b-2 border-primary text-primary'
                : 'text-neutral-gray-600 hover:text-neutral-gray-800'
            }`}
          >
            📁 Colecciones ({collections.length})
          </button>
        </div>

        {/* Content */}
        {activeTab === 'favorites' ? (
          favorites.length === 0 ? (
            <EmptyState
              emoji="❤️"
              title="No tienes favoritos aún"
              message="Explora recetas y guarda tus favoritas haciendo clic en el corazón"
              action={
                <Button variant="primary" onClick={() => navigate('/recipes')}>
                  Explorar Recetas
                </Button>
              }
            />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {favorites.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={{
                    ...recipe,
                    categoria_emoji: recipe.categoria_icono
                  }}
                  onFavoriteToggle={handleRemoveFavorite}
                  isFavorite={true}
                />
              ))}
            </motion.div>
          )
        ) : (
          <>
            {/* Create Collection Button */}
            <div className="mb-6">
              <Button
                variant="primary"
                className="gap-2"
                onClick={() => setShowCreateModal(true)}
              >
                <Plus className="h-4 w-4" />
                Crear Colección
              </Button>
            </div>

            {collections.length === 0 ? (
              <EmptyState
                emoji="📁"
                title="No tienes colecciones"
                message="Crea colecciones para organizar tus recetas favoritas por temas"
                action={
                  <Button variant="primary" onClick={() => setShowCreateModal(true)}>
                    + Crear Colección
                  </Button>
                }
              />
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {collections.map((collection) => (
                  <Link
                    key={collection.id}
                    to={`/user/collections/${collection.id}`}
                    className="group"
                  >
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="relative overflow-hidden rounded-2xl border border-neutral-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="mb-4 flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-2xl">
                            📁
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-neutral-gray-800 group-hover:text-primary">
                              {collection.nombre}
                            </h3>
                            <p className="text-sm text-neutral-gray-500">
                              {collection.total_recetas || 0}{' '}
                              {collection.total_recetas === 1 ? 'receta' : 'recetas'}
                            </p>
                          </div>
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={(e) => openDeleteModal(collection, e)}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                          title="Eliminar colección"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      {collection.descripcion && (
                        <p className="mb-4 text-sm text-neutral-gray-600 line-clamp-2">
                          {collection.descripcion}
                        </p>
                      )}

                      <div className="flex items-center gap-2 text-sm text-primary">
                        <FolderOpen className="h-4 w-4" />
                        <span className="font-medium">Ver colección</span>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </motion.div>
            )}
          </>
        )}

        {/* Create Collection Modal */}
        <Dialog open={showCreateModal} onClose={() => setShowCreateModal(false)}>
          <DialogContent onClose={() => setShowCreateModal(false)}>
            <form onSubmit={handleCreateCollection}>
              <DialogHeader>
                <DialogTitle>Crear Nueva Colección</DialogTitle>
                <DialogDescription>
                  Organiza tus recetas favoritas en colecciones temáticas
                </DialogDescription>
              </DialogHeader>
              <DialogBody>
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-gray-700">
                      Nombre de la colección *
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-neutral-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Ej: Postres de Chocolate"
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-gray-700">
                      Descripción (opcional)
                    </label>
                    <textarea
                      className="w-full rounded-lg border border-neutral-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Describe tu colección..."
                      rows={3}
                      value={formData.descripcion}
                      onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    />
                  </div>
                </div>
              </DialogBody>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" variant="primary" loading={submitting}>
                  Crear Colección
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Collection Confirmation Modal */}
        <Dialog open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
          <DialogContent onClose={() => setShowDeleteModal(false)}>
            <DialogHeader>
              <DialogTitle>Eliminar Colección</DialogTitle>
              <DialogDescription>
                ¿Estás seguro de que quieres eliminar esta colección?
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              {collectionToDelete && (
                <div className="rounded-lg bg-neutral-gray-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">📁</div>
                    <div>
                      <p className="font-medium text-neutral-gray-800">
                        {collectionToDelete.nombre}
                      </p>
                      <p className="text-sm text-neutral-gray-600">
                        {collectionToDelete.total_recetas || 0} recetas
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-neutral-gray-600">
                    Esta acción no se puede deshacer. Las recetas no serán eliminadas, solo la
                    colección.
                  </p>
                </div>
              )}
            </DialogBody>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
                Cancelar
              </Button>
              <Button variant="danger" onClick={handleDeleteCollection}>
                Eliminar Colección
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {/* Modal de upgrade premium */}
      <UpgradePremiumModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </div>
  )
}

export default Favorites
