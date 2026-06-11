import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import recipeService from '@services/recipeService'
import categoryService from '@services/categoryService'
import userService from '@services/userService'
import RecipeCard from '@components/recipes/RecipeCard'
import Button from '@components/common/Button'
import Spinner from '@components/common/Spinner'
import EmptyState from '@components/common/EmptyState'
import { useAuth } from '@context/AuthContext'
import { toast } from 'react-hot-toast'

const Recipes = () => {
  const { isAuthenticated } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()
  const [recipes, setRecipes] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('categoria') || '')
  const [selectedDifficulty, setSelectedDifficulty] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [favoritesIds, setFavoritesIds] = useState(new Set())

  useEffect(() => {
    loadCategories()
    loadRecipes()
    if (isAuthenticated()) {
      loadFavorites()
    }
  }, [selectedCategory, selectedDifficulty, isAuthenticated])

  const loadCategories = async () => {
    try {
      const response = await categoryService.getAll()
      if (response.success) {
        setCategories(response.categories)
      }
    } catch (error) {
      console.error('Error al cargar categorías:', error)
    }
  }

  const loadFavorites = async () => {
    try {
      const response = await userService.getFavorites()
      if (response.success) {
        const ids = new Set(response.favorites.map(fav => fav.id))
        setFavoritesIds(ids)
      }
    } catch (error) {
      console.error('Error al cargar favoritos:', error)
    }
  }

  const handleFavoriteToggle = async (recipeId) => {
    if (!isAuthenticated()) {
      toast.error('Debes iniciar sesión para guardar favoritos')
      return
    }

    try {
      if (favoritesIds.has(recipeId)) {
        await userService.removeFavorite(recipeId)
        setFavoritesIds(prev => {
          const newSet = new Set(prev)
          newSet.delete(recipeId)
          return newSet
        })
        toast.success('Receta eliminada de favoritos')
      } else {
        await userService.addFavorite(recipeId)
        setFavoritesIds(prev => new Set(prev).add(recipeId))
        toast.success('Receta guardada en favoritos')
      }
    } catch (error) {
      console.error('Error al actualizar favorito:', error)
      toast.error('Error al actualizar favorito')
    }
  }

  const loadRecipes = async () => {
    setLoading(true)
    try {
      const filters = {}
      if (selectedCategory) filters.categoria = selectedCategory
      if (selectedDifficulty) filters.dificultad = selectedDifficulty

      const response = await recipeService.filter(filters)
      if (response.success) {
        setRecipes(response.recipes)
      }
    } catch (error) {
      console.error('Error al cargar recetas:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return loadRecipes()

    setLoading(true)
    try {
      const response = await recipeService.search(searchQuery)
      if (response.success) {
        setRecipes(response.recipes)
      }
    } catch (error) {
      console.error('Error en búsqueda:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-heading text-primary mb-4">Explora Nuestras Recetas</h1>
          <p className="text-xl text-neutral-gray-600">Encuentra la receta perfecta para ti</p>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar recetas..."
              className="input flex-1"
            />
            <Button type="submit">Buscar</Button>
          </div>
        </form>

        {/* Filters */}
        <div className="flex gap-4 mb-8 flex-wrap justify-center">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input w-auto min-w-[220px] pr-10"
          >
            <option value="">Todas las categorías</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.nombre}>
                {cat.icono} {cat.nombre}
              </option>
            ))}
          </select>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="input w-auto min-w-[220px] pr-10"
          >
            <option value="">Todas las dificultades</option>
            <option value="Fácil">Fácil</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Difícil">Difícil</option>
          </select>

          {(selectedCategory || selectedDifficulty || searchQuery) && (
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory('')
                setSelectedDifficulty('')
                setSearchQuery('')
                loadRecipes()
              }}
            >
              Limpiar filtros
            </Button>
          )}
        </div>

        {/* Recipes Grid */}
        {loading ? (
          <Spinner />
        ) : recipes.length === 0 ? (
          <EmptyState
            emoji="🔍"
            title="No se encontraron recetas"
            message="Intenta con otros filtros o términos de búsqueda"
            action={
              <Button variant="primary" onClick={() => {
                setSelectedCategory('')
                setSelectedDifficulty('')
                setSearchQuery('')
                loadRecipes()
              }}>
                Ver todas las recetas
              </Button>
            }
          />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={{
                  ...recipe,
                  categoria_emoji: recipe.categoria_icono
                }}
                onFavoriteToggle={isAuthenticated() ? handleFavoriteToggle : undefined}
                isFavorite={favoritesIds.has(recipe.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Recipes
