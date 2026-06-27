import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, Heart, Star, ChefHat } from 'lucide-react'
import { cn } from '@utils/cn'
import { UPLOAD_URL } from '@utils/constants'

const difficultyColors = {
  'Fácil': 'bg-green-100 text-green-700',
  'Intermedio': 'bg-yellow-100 text-yellow-700',
  'Difícil': 'bg-orange-100 text-orange-700',
}

export default function RecipeCard({ recipe, onFavoriteToggle, isFavorite = false }) {
  const [imageError, setImageError] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group overflow-hidden rounded-3xl border border-stone-100 bg-white/70 backdrop-blur-md shadow-subtle hover:shadow-premium hover:border-white/60 transition-all duration-500"
    >
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden">
        <Link to={`/recipes/${recipe.id}`}>
          {!imageError && recipe.foto_principal ? (
            <img
              src={recipe.foto_principal.startsWith('http') ? recipe.foto_principal : `${UPLOAD_URL}${recipe.foto_principal.replace('/uploads', '')}`}
              alt={recipe.nombre}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-neutral-gray-100">
              <span className="text-6xl">{recipe.categoria_emoji || ''}</span>
            </div>
          )}
        </Link>

        {/* Favorite Button */}
        {onFavoriteToggle && (
          <button
            onClick={(e) => {
              e.preventDefault()
              onFavoriteToggle(recipe.id)
            }}
            className={cn(
              'absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full transition-all',
              isFavorite
                ? 'bg-error text-white'
                : 'bg-white/90 text-neutral-gray-600 hover:bg-white hover:text-error'
            )}
          >
            <Heart className={cn('h-5 w-5', isFavorite && 'fill-current')} />
          </button>
        )}

        {/* Stats Overlay */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-gradient-to-t from-black/60 to-transparent px-4 py-3 text-white">
          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4" />
            <span className="text-sm font-medium">{recipe.total_favoritos || 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium">{recipe.tiempo_preparacion} min</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <Link to={`/recipes/${recipe.id}`}>
          <h3 className="mb-2 line-clamp-1 text-lg font-semibold text-neutral-gray-800 transition-colors group-hover:text-primary">
            {recipe.nombre}
          </h3>
        </Link>

        <p className="mb-3 line-clamp-2 text-sm text-neutral-gray-600">
          {recipe.descripcion}
        </p>

        {/* Badges */}
        <div className="mb-3 flex flex-wrap gap-2">
          {/* Category Badge */}
          {recipe.categoria_nombre && (
            <span
              className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold"
              style={{
                backgroundColor: `${recipe.categoria_color}20`,
                color: recipe.categoria_color
              }}
            >
              <span>{recipe.categoria_emoji}</span>
              {recipe.categoria_nombre}
            </span>
          )}

          {/* Difficulty Badge */}
          <span className={cn(
            'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold',
            difficultyColors[recipe.dificultad] || 'bg-neutral-gray-100 text-neutral-gray-700'
          )}>
            <ChefHat className="h-3 w-3" />
            {recipe.dificultad}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={cn(
                  'h-4 w-4',
                  star <= Math.round(Number(recipe.calificacion_promedio) || 0)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-neutral-gray-300'
                )}
              />
            ))}
          </div>
          <span className="ml-1 text-sm font-medium text-neutral-gray-800">
            {(Number(recipe.calificacion_promedio) || 0).toFixed(1)}
          </span>
          <span className="text-sm text-neutral-gray-500">
            ({recipe.total_valoraciones || 0})
          </span>
        </div>
      </div>
    </motion.article>
  )
}
