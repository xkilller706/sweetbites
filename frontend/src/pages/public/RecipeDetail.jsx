import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '@context/AuthContext'
import recipeService from '@services/recipeService'
import userService from '@services/userService'
import commentService from '@services/commentService'
import Button from '@components/common/Button'
import Card from '@components/common/Card'
import Badge from '@components/common/Badge'
import Spinner from '@components/common/Spinner'
import EmptyState from '@components/common/EmptyState'
import Rating from '@components/common/Rating'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from '@components/ui/Dialog'
import { formatPrepTime, getDifficultyBadge, adjustIngredientAmount } from '@utils/helpers'
import { MessageSquare, Trash2, X } from 'lucide-react'
import CommentThread from '@components/recipes/CommentThread'
import toast from 'react-hot-toast'
import BackButton from '@components/common/BackButton'
import UpgradePremiumModal from '@components/modals/UpgradePremiumModal'

const RecipeDetail = () => {
  const { id } = useParams()
  const { isAuthenticated, user } = useAuth()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [servings, setServings] = useState(1)
  const [activeStep, setActiveStep] = useState(1)
  const [cookingMode, setCookingMode] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showCollectionsModal, setShowCollectionsModal] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [collections, setCollections] = useState([])
  const [selectedCollections, setSelectedCollections] = useState(new Set())

  // Estados para comentarios y rating
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [loadingComments, setLoadingComments] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const [submittingRating, setSubmittingRating] = useState(false)

  useEffect(() => {
    loadRecipe()
    loadComments()
    if (isAuthenticated()) {
      checkFavorite()
      loadCollections()
    }
  }, [id])

  const loadRecipe = async () => {
    try {
      const response = await recipeService.getById(id)
      if (response.success) {
        setRecipe(response.recipe)
        setServings(response.recipe.porciones)
      }
    } catch (error) {
      toast.error('Error al cargar la receta')
    } finally {
      setLoading(false)
    }
  }

  const checkFavorite = async () => {
    try {
      const response = await userService.getFavorites()
      if (response.success) {
        const isFav = response.favorites.some(fav => fav.id === parseInt(id))
        setIsFavorite(isFav)
      }
    } catch (error) {
      console.error('Error al verificar favorito:', error)
    }
  }

  const loadCollections = async () => {
    try {
      const response = await userService.getCollections()
      if (response.success) {
        setCollections(response.collections || [])
      }
    } catch (error) {
      console.error('Error al cargar colecciones:', error)
    }
  }

  const handleFavoriteToggle = async () => {
    if (!isAuthenticated()) {
      toast.error('Debes iniciar sesión para guardar favoritos')
      return
    }

    try {
      if (isFavorite) {
        await userService.removeFavorite(id)
        setIsFavorite(false)
        toast.success('Receta eliminada de favoritos')
      } else {
        // Verificar límite para usuarios gratis
        if (user?.plan === 'gratis') {
          const favoritesResponse = await userService.getFavorites()
          const favoritesCount = favoritesResponse.favorites?.length || 0

          if (favoritesCount >= 3) {
            toast.error('Los usuarios gratis pueden guardar máximo 3 recetas favoritas')
            toast.info('Actualiza a Premium para favoritos ilimitados')
            setShowUpgradeModal(true)
            return
          }
        }

        await userService.addFavorite(id)
        setIsFavorite(true)
        toast.success('Receta guardada en favoritos')
      }
    } catch (error) {
      console.error('Error al actualizar favorito:', error)
      toast.error('Error al actualizar favorito')
    }
  }

  const openCollectionsModal = () => {
    if (!isAuthenticated()) {
      toast.error('Debes iniciar sesión')
      return
    }
    loadCollections()
    setShowCollectionsModal(true)
  }

  const handleCollectionToggle = (collectionId) => {
    const newSelected = new Set(selectedCollections)
    if (newSelected.has(collectionId)) {
      newSelected.delete(collectionId)
    } else {
      newSelected.add(collectionId)
    }
    setSelectedCollections(newSelected)
  }

  const handleSaveToCollections = async () => {
    try {
      for (const collectionId of selectedCollections) {
        await userService.addToCollection(collectionId, id)
      }
      toast.success('Receta agregada a las colecciones seleccionadas')
      setShowCollectionsModal(false)
      setSelectedCollections(new Set())
    } catch (error) {
      console.error('Error al agregar a colecciones:', error)
      toast.error('Error al agregar a colecciones')
    }
  }

  const adjustServings = (newServings) => {
    if (newServings < 1) return
    setServings(newServings)
  }

  const loadComments = async () => {
    try {
      setLoadingComments(true)
      const response = await commentService.getComments(id)
      if (response.success) {
        setComments(response.comments || [])
      }
    } catch (error) {
      console.error('Error al cargar comentarios:', error)
    } finally {
      setLoadingComments(false)
    }
  }

  const handleAddComment = async (e) => {
    e.preventDefault()
    if (!isAuthenticated()) {
      toast.error('Debes iniciar sesión para comentar')
      return
    }

    if (!newComment.trim()) {
      toast.error('El comentario no puede estar vacío')
      return
    }

    try {
      const response = await commentService.addComment(id, newComment)
      if (response.success) {
        toast.success('Comentario agregado')
        setNewComment('')
        loadComments()
      }
    } catch (error) {
      console.error('Error al agregar comentario:', error)
      toast.error('Error al agregar comentario')
    }
  }

  const handleDeleteComment = async (commentId) => {
    if (!confirm('¿Eliminar este comentario?')) return

    try {
      const response = await commentService.deleteComment(commentId)
      if (response.success) {
        toast.success('Comentario eliminado')
        loadComments()
      }
    } catch (error) {
      console.error('Error al eliminar comentario:', error)
      toast.error('Error al eliminar comentario')
    }
  }

  const handleRating = async (rating) => {
    if (!isAuthenticated()) {
      toast.error('Debes iniciar sesión para valorar')
      return
    }

    try {
      setSubmittingRating(true)
      const response = await commentService.rateRecipe(id, rating)
      if (response.success) {
        setUserRating(rating)
        toast.success(`Has valorado esta receta con ${rating} ${rating === 1 ? 'estrella' : 'estrellas'}`)
        // Recargar receta para actualizar el promedio
        loadRecipe()
      }
    } catch (error) {
      console.error('Error al valorar:', error)
      toast.error('Error al enviar valoración')
    } finally {
      setSubmittingRating(false)
    }
  }

  if (loading) return <Spinner fullScreen />
  if (!recipe) return <EmptyState emoji="😕" title="Receta no encontrada" message="La receta que buscas no existe" />

  const difficultyBadge = getDifficultyBadge(recipe.dificultad)

  return (
    <div className="py-12">
      <BackButton />
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm">
          <Link to="/" className="text-primary hover:underline">Inicio</Link>
          {' / '}
          <Link to="/recipes" className="text-primary hover:underline">Recetas</Link>
          {' / '}
          <span className="text-neutral-gray-600">{recipe.nombre}</span>
        </div>

        {/* Header */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <img
              src={recipe.foto_principal
                ? (recipe.foto_principal.startsWith('http') ? recipe.foto_principal : `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:3000'}${recipe.foto_principal}`)
                : "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&h=600&fit=crop"}
              alt={recipe.nombre}
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
          </div>

          <div>
            <h1 className="text-4xl font-heading text-neutral-gray-800 mb-4">{recipe.nombre}</h1>
            <p className="text-lg text-neutral-gray-600 mb-6">{recipe.descripcion}</p>

            <div className="flex gap-3 mb-6 flex-wrap">
              <Badge variant="primary">{recipe.categoria_nombre || recipe.categoria}</Badge>
              <Badge variant={difficultyBadge.bgColor}>{recipe.dificultad}</Badge>
              <Badge variant="info">⏱️ {formatPrepTime(recipe.tiempo_preparacion)}</Badge>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <span className="text-3xl text-yellow-500"></span>
              <span className="text-2xl font-bold">{parseFloat(recipe.calificacion_promedio || 0).toFixed(1)}</span>
              <span className="text-neutral-gray-500">({recipe.total_valoraciones || 0} valoraciones)</span>
            </div>

            <div className="bg-neutral-gray-100 p-4 rounded-xl mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Porciones:</span>
                <div className="flex items-center gap-3">
                  <Button size="sm" onClick={() => adjustServings(servings - 1)}>-</Button>
                  <span className="text-xl font-bold">{servings}</span>
                  <Button size="sm" onClick={() => adjustServings(servings + 1)}>+</Button>
                </div>
              </div>
              {servings !== recipe.porciones && (
                <p className="text-sm text-neutral-gray-600">
                  Receta original: {recipe.porciones} porciones
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <Button variant="primary" onClick={() => {
                if (!user || user.plan !== 'premium') {
                  toast.error('El modo cocina es exclusivo para usuarios Premium');
                  setShowUpgradeModal(true);
                  return;
                }
                setCookingMode(true);
                setActiveStep(1);
              }}>
                Modo Cocina
              </Button>
              {isAuthenticated() && (
                <>
                  <Button
                    variant={isFavorite ? "danger" : "outline"}
                    onClick={handleFavoriteToggle}
                  >
                    {isFavorite ? '❤️ Guardado' : '🤍 Guardar'}
                  </Button>
                  <Button variant="outline" onClick={openCollectionsModal}>
                    📁 Agregar a Colección
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Ingredientes */}
        <Card className="mb-8">
          <h2 className="text-2xl font-heading text-primary mb-6 flex items-center gap-2">
            📋 Ingredientes
            <span className="text-sm font-normal text-neutral-gray-500">
              ({servings} {servings === 1 ? 'porción' : 'porciones'})
            </span>
          </h2>

          {/* Agrupar ingredientes por sección */}
          {Object.entries(
            (recipe.ingredients || []).reduce((acc, ing) => {
              const section = ing.seccion || null
              if (!acc[section]) acc[section] = []
              acc[section].push(ing)
              return acc
            }, {})
          ).map(([sectionName, sectionIngredients]) => (
            <div key={sectionName || 'default'} className="mb-6 last:mb-0">
              {/* Mostrar nombre de sección si existe */}
              {sectionName && sectionName !== 'null' && (
                <h3 className="text-lg font-semibold text-neutral-gray-800 mb-3 pb-2 border-b border-neutral-gray-200">
                  🔸 {sectionName}
                </h3>
              )}

              {/* Lista de ingredientes */}
              <div className="grid md:grid-cols-2 gap-3">
                {sectionIngredients.map((ingredient, idx) => {
                  const adjustedAmount = adjustIngredientAmount(ingredient.cantidad, recipe.porciones, servings)
                  return (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-neutral-gray-50 rounded-lg hover:bg-neutral-gray-100 transition-colors">
                      <span className="text-primary font-bold text-lg flex-shrink-0">•</span>
                      <span className="text-neutral-gray-800">
                        <strong className="text-primary">{adjustedAmount} {ingredient.unidad}</strong> de {ingredient.nombre}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </Card>

        {/* Pasos */}
        <Card className="mb-8">
          <h2 className="text-2xl font-heading text-neutral-gray-800 mb-6">Preparación</h2>
          <div className="space-y-6">
            {recipe.steps?.map((step) => (
              <div key={step.numero_paso} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  {step.numero_paso}
                </div>
                <div className="flex-1">
                  <p className="text-neutral-gray-700 leading-relaxed">{step.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Valoración */}
        <Card className="mb-8">
          <h2 className="text-2xl font-heading text-neutral-gray-800 mb-4">Valoración</h2>
          <div className="flex items-center gap-4 mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-neutral-gray-800">
                {parseFloat(recipe.calificacion_promedio || 0).toFixed(1)}
              </div>
              <div className="text-sm text-neutral-gray-600">
                {recipe.total_valoraciones || 0} {recipe.total_valoraciones === 1 ? 'valoración' : 'valoraciones'}
              </div>
            </div>
            <div className="flex-1">
              <Rating value={parseFloat(recipe.calificacion_promedio || 0)} readonly size="lg" />
            </div>
          </div>

          {isAuthenticated() && (
            <div className="border-t border-neutral-gray-200 pt-4">
              <p className="text-sm font-medium text-neutral-gray-700 mb-2">
                ¿Qué te pareció esta receta?
              </p>
              <Rating
                value={userRating}
                onChange={handleRating}
                size="lg"
                showValue
              />
              {submittingRating && <p className="text-sm text-neutral-gray-500 mt-2">Enviando valoración...</p>}
            </div>
          )}
        </Card>

        {/* Comentarios */}
        <Card>
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-heading text-neutral-gray-800">
              Comentarios ({comments.length})
            </h2>
          </div>

          {/* Formulario para agregar comentario */}
          {isAuthenticated() ? (
            <form onSubmit={handleAddComment} className="mb-6 pb-6 border-b border-neutral-gray-200">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Comparte tu experiencia con esta receta..."
                className="w-full p-3 border border-neutral-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                rows="3"
              />
              <div className="mt-2 flex justify-end">
                <Button type="submit" variant="primary" disabled={!newComment.trim()}>
                  Publicar Comentario
                </Button>
              </div>
            </form>
          ) : (
            <div className="mb-6 pb-6 border-b border-neutral-gray-200 bg-neutral-gray-50 p-4 rounded-lg text-center">
              <p className="text-neutral-gray-600">
                <Link to="/auth/login" className="text-primary hover:underline font-semibold">
                  Inicia sesión
                </Link>
                {' '}para dejar un comentario
              </p>
            </div>
          )}

          {/* Lista de comentarios interactivos */}
          {loadingComments ? (
            <div className="text-center py-8">
              <Spinner />
            </div>
          ) : comments.length === 0 ? (
            <EmptyState
              emoji="💬"
              title="No hay comentarios aún"
              message="Sé el primero en comentar esta receta"
            />
          ) : (
            <div className="space-y-6">
              {comments.map((comment) => (
                <CommentThread
                  key={comment.id}
                  comment={comment}
                  recipeId={id}
                  onCommentDeleted={loadComments}
                  onReplyAdded={loadComments}
                  depth={0}
                />
              ))}
            </div>
          )}
        </Card>

        {/* Modo Cocina Mejorado - Premium */}
        {cookingMode && (
          <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
            <div className="max-w-4xl mx-auto p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-heading font-bold text-accent-chocolate">
                  Modo Cocina
                </h2>
                <button
                  onClick={() => setCookingMode(false)}
                  className="text-neutral-gray-600 hover:text-accent-chocolate transition"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Barra de progreso chocolate */}
              <div className="mb-8">
                <div className="flex justify-between text-sm mb-2 text-neutral-gray-600">
                  <span className="font-medium">
                    Paso {activeStep} de {recipe.steps?.length || 0}
                  </span>
                  <span className="font-medium">
                    {Math.round((activeStep / (recipe.steps?.length || 1)) * 100)}%
                  </span>
                </div>

                {/* Barra con efecto chocolate */}
                <div className="relative h-4 bg-secondary rounded-full overflow-hidden shadow-inner">
                  <div
                    className="absolute h-full bg-gradient-chocolate transition-all duration-500 ease-out"
                    style={{ width: `${(activeStep / (recipe.steps?.length || 1)) * 100}%` }}
                  >
                    {/* Efecto shimmer chocolate */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  </div>
                </div>
              </div>

              {/* Paso actual */}
              <Card className="mb-6 p-6 bg-accent-cream/30 border-accent-chocolate/20">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent-chocolate text-white flex items-center justify-center font-bold">
                    {activeStep}
                  </div>
                  <h3 className="text-xl font-semibold text-accent-chocolate">
                    Paso {activeStep}
                  </h3>
                </div>
                <p className="text-lg leading-relaxed text-neutral-gray-800">
                  {recipe.steps?.[activeStep - 1]?.descripcion}
                </p>
              </Card>

              {/* Botones de navegación */}
              <div className="flex gap-4">
                <Button
                  onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
                  disabled={activeStep === 1}
                  variant="secondary"
                  className="flex-1"
                >
                  Anterior
                </Button>
                <Button
                  onClick={() => setActiveStep(prev => Math.min((recipe.steps?.length || 1), prev + 1))}
                  disabled={activeStep === (recipe.steps?.length || 1)}
                  className="flex-1 bg-gradient-chocolate text-white"
                >
                  {activeStep === (recipe.steps?.length || 1) ? 'Finalizar' : 'Siguiente'}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Agregar a Colecciones */}
        <Dialog open={showCollectionsModal} onClose={() => setShowCollectionsModal(false)}>
          <DialogContent onClose={() => setShowCollectionsModal(false)}>
            <DialogHeader>
              <DialogTitle>Agregar a Colección</DialogTitle>
            </DialogHeader>
            <DialogBody>
              {collections.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="mb-4 text-neutral-gray-600">
                    No tienes colecciones aún
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setShowCollectionsModal(false)
                      window.location.href = '/user/favorites'
                    }}
                  >
                    Crear Colección
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  {collections.map((collection) => (
                    <label
                      key={collection.id}
                      className="flex items-center gap-3 rounded-lg border border-neutral-gray-200 p-3 cursor-pointer hover:bg-neutral-gray-50"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCollections.has(collection.id)}
                        onChange={() => handleCollectionToggle(collection.id)}
                        className="h-4 w-4 rounded border-neutral-gray-300 text-primary focus:ring-primary"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-neutral-gray-800">
                          📁 {collection.nombre}
                        </p>
                        <p className="text-sm text-neutral-gray-600">
                          {collection.total_recetas || 0} recetas
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </DialogBody>
            {collections.length > 0 && (
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowCollectionsModal(false)}>
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSaveToCollections}
                  disabled={selectedCollections.size === 0}
                >
                  Agregar a {selectedCollections.size} {selectedCollections.size === 1 ? 'colección' : 'colecciones'}
                </Button>
              </DialogFooter>
            )}
          </DialogContent>
        </Dialog>

        {/* Modal de upgrade premium */}
        <UpgradePremiumModal
          isOpen={showUpgradeModal}
          onClose={() => setShowUpgradeModal(false)}
        />
      </div>
    </div>
  )
}

export default RecipeDetail
