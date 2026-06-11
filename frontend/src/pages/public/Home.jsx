import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Sparkles } from 'lucide-react'
import RecipeCard from '@components/recipes/RecipeCard'
import CategoryCard from '@components/recipes/CategoryCard'
import { api } from '@services/api'
import { userService } from '@services/userService'
import { useAuth } from '@context/AuthContext'
import { toast } from 'react-hot-toast'

const features = [
  {
    icon: '📖',
    title: 'Instrucciones Paso a Paso',
    description: 'Cada receta con ingredientes precisos y pasos numerados fáciles de seguir.',
  },
  {
    icon: '⭐',
    title: 'Valoraciones Reales',
    description: 'Descubre qué opinan otros reposteros sobre cada receta.',
  },
  {
    icon: '❤️',
    title: 'Colecciones Personalizadas',
    description: 'Organiza tus recetas favoritas en colecciones propias.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

const Home = () => {
  const { isAuthenticated } = useAuth()
  const [categories, setCategories] = useState([])
  const [featuredRecipes, setFeaturedRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [favoritesIds, setFavoritesIds] = useState(new Set())

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener categorías
        const categoriesResponse = await api.get('/categories')
        if (categoriesResponse.data.success) {
          setCategories(categoriesResponse.data.categories.slice(0, 6))
        }

        // Obtener recetas destacadas
        const recipesResponse = await api.get('/recipes')
        if (recipesResponse.data.success) {
          setFeaturedRecipes(recipesResponse.data.recipes.slice(0, 6))
        }

        // Obtener favoritos si está autenticado
        if (isAuthenticated()) {
          try {
            const favoritesResponse = await userService.getFavorites()
            if (favoritesResponse.success) {
              const ids = new Set(favoritesResponse.favorites.map(fav => fav.id))
              setFavoritesIds(ids)
            }
          } catch (error) {
            console.error('Error al cargar favoritos:', error)
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [isAuthenticated])

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

  return (
    <div className="flex min-h-screen flex-col bg-[#FDFBF7] relative">
      {/* Mesh Gradients Globales */}
      <div className="fixed top-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-primary/20 opacity-50 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-[#F5E6D3] opacity-30 blur-[100px] pointer-events-none" />

      <main className="flex-1 relative z-0">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white py-24 lg:py-32">
          {/* Formas Geométricas Flotantes Modernas - Estilo Rive */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Círculo grande azul */}
            <motion.div
              animate={{
                y: [0, -30, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-[10%] top-[15%] w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 blur-xl"
            />

            {/* Cuadrado rotado beige */}
            <motion.div
              animate={{
                y: [0, 40, 0],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute right-[15%] top-[25%] w-24 h-24 rounded-2xl bg-gradient-to-br from-[#F5E6D3]/30 to-[#F5E6D3]/10 blur-lg transform rotate-45"
            />

            {/* Círculo pequeño azul */}
            <motion.div
              animate={{
                y: [0, -40, 0],
                x: [0, 20, 0],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-[25%] left-[15%] w-20 h-20 rounded-full bg-primary/15 blur-lg"
            />

            {/* Rectángulo horizontal */}
            <motion.div
              animate={{
                y: [0, 30, 0],
                rotate: [0, -45, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-[30%] right-[12%] w-28 h-16 rounded-3xl bg-gradient-to-r from-primary/10 to-[#F5E6D3]/20 blur-xl"
            />

            {/* Líneas decorativas sutiles */}
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-[40%] left-[5%] w-40 h-1 rounded-full bg-gradient-to-r from-transparent via-primary/20 to-transparent"
            />
          </div>

          <div className="container relative mx-auto px-4 z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl text-center"
            >
              <h1 className="mb-6 text-4xl font-bold leading-tight text-stone-800 md:text-5xl lg:text-6xl">
                Comparte tus Mejores{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">
                  Recetas de Repostería
                </span>
              </h1>
              <p className="mb-8 text-lg text-stone-600 md:text-xl font-light">
                Únete a la comunidad de reposteros más dulce. Descubre, guarda y comparte recetas deliciosas.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link to="/recipes">
                  <button className="flex items-center gap-2 rounded-2xl bg-primary px-8 py-3.5 font-medium text-white transition-all hover:bg-primary-dark hover:shadow-glass hover:scale-105 duration-300">
                    <Search className="h-5 w-5" />
                    Explorar Recetas
                  </button>
                </Link>
                <Link to="/auth/register">
                  <button className="flex items-center gap-2 rounded-2xl border-2 border-primary px-8 py-3.5 font-medium text-primary transition-all hover:bg-primary/10 hover:scale-105 duration-300">
                    <Sparkles className="h-5 w-5" />
                    Crear Cuenta
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-neutral-beige py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-neutral-gray-800 md:text-4xl">
                Por qué <span className="text-primary">SweetBites</span>?
              </h2>
              <p className="mx-auto max-w-2xl text-neutral-gray-600">
                Todo lo que necesitas para convertirte en un experto repostero
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-8 md:grid-cols-3"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group rounded-2xl border border-neutral-gray-200 bg-white p-8 text-center transition-all hover:border-primary/30 hover:shadow-lg"
                >
                  <span className="mb-4 inline-block text-5xl">{feature.icon}</span>
                  <h3 className="mb-3 text-xl font-semibold text-neutral-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-neutral-gray-800 md:text-4xl">
                Explora por Categoría
              </h2>
              <p className="mx-auto max-w-2xl text-neutral-gray-600">
                Encuentra la receta perfecta para cada ocasión
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap items-center justify-center gap-6"
            >
              {categories.map((category) => (
                <motion.div key={category.id} variants={itemVariants}>
                  <CategoryCard
                    category={{
                      id: category.id,
                      nombre: category.nombre,
                      icon: category.icono,
                      color: category.color,
                    }}
                    size="lg"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Featured Recipes Section */}
        <section className="bg-neutral-beige py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 flex items-center justify-between"
            >
              <div>
                <h2 className="mb-2 text-3xl font-bold text-neutral-gray-800 md:text-4xl">
                  Recetas Destacadas
                </h2>
                <p className="text-neutral-gray-600">Las favoritas de nuestra comunidad</p>
              </div>
              <Link to="/recipes">
                <button className="hidden rounded-full border border-neutral-gray-300 px-4 py-2 text-sm font-medium text-neutral-gray-700 transition-colors hover:bg-white sm:flex">
                  Ver todas
                </button>
              </Link>
            </motion.div>

            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-96 animate-pulse rounded-2xl bg-neutral-gray-200"></div>
                ))}
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {featuredRecipes.map((recipe) => (
                  <motion.div key={recipe.id} variants={itemVariants}>
                    <RecipeCard
                      recipe={{
                        ...recipe,
                        categoria_emoji: recipe.categoria_icono,
                      }}
                      onFavoriteToggle={isAuthenticated() ? handleFavoriteToggle : undefined}
                      isFavorite={favoritesIds.has(recipe.id)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}

            <div className="mt-8 text-center sm:hidden">
              <Link to="/recipes">
                <button className="rounded-full border border-neutral-gray-300 px-6 py-2 text-sm font-medium text-neutral-gray-700 transition-colors hover:bg-white">
                  Ver todas las recetas
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary/5 py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mx-auto max-w-2xl text-center"
            >
              <span className="mb-4 inline-block text-6xl">👨‍🍳</span>
              <h2 className="mb-4 text-3xl font-bold text-neutral-gray-800 md:text-4xl">
                ¿Listo para compartir tu receta?
              </h2>
              <p className="mb-8 text-lg text-neutral-gray-600">
                Únete a cientos de reposteros que ya comparten sus creaciones con la comunidad
              </p>
              <Link to="/auth/register">
                <button className="flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-medium text-white transition-colors hover:bg-primary-dark mx-auto">
                  <Sparkles className="h-5 w-5" />
                  Crear Cuenta Gratis
                </button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home
