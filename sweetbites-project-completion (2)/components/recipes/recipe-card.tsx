'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Clock, Heart, Star, ChefHat } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Recipe } from '@/lib/types'
import { Badge } from '@/components/ui/badge'

interface RecipeCardProps {
  recipe: Recipe
  onFavoriteToggle?: (id: string) => void
  isFavorite?: boolean
}

const difficultyColors = {
  facil: 'bg-green-100 text-green-700',
  intermedio: 'bg-yellow-100 text-yellow-700',
  dificil: 'bg-orange-100 text-orange-700',
}

const difficultyLabels = {
  facil: 'Facil',
  intermedio: 'Intermedio',
  dificil: 'Dificil',
}

export function RecipeCard({ recipe, onFavoriteToggle, isFavorite = false }: RecipeCardProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg"
    >
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden">
        <Link href={`/recetas/${recipe.id}`}>
          {!imageError ? (
            <Image
              src={recipe.imageUrl}
              alt={recipe.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <span className="text-6xl">{recipe.category.icon}</span>
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
                ? 'bg-destructive text-white'
                : 'bg-white/90 text-muted-foreground hover:bg-white hover:text-destructive'
            )}
          >
            <Heart className={cn('h-5 w-5', isFavorite && 'fill-current')} />
          </button>
        )}

        {/* Stats Overlay */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-gradient-to-t from-black/60 to-transparent px-4 py-3 text-white">
          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4" />
            <span className="text-sm font-medium">{recipe.favoriteCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium">{recipe.time} min</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <Link href={`/recetas/${recipe.id}`}>
          <h3 className="mb-2 line-clamp-1 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
            {recipe.title}
          </h3>
        </Link>
        
        <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
          {recipe.description}
        </p>

        {/* Badges */}
        <div className="mb-3 flex flex-wrap gap-2">
          <Badge 
            variant="secondary"
            className="gap-1"
            style={{ backgroundColor: `${recipe.category.color}20`, color: recipe.category.color }}
          >
            <span>{recipe.category.icon}</span>
            {recipe.category.name}
          </Badge>
          <Badge className={difficultyColors[recipe.difficulty]}>
            <ChefHat className="mr-1 h-3 w-3" />
            {difficultyLabels[recipe.difficulty]}
          </Badge>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={cn(
                  'h-4 w-4',
                  star <= Math.round(recipe.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-muted'
                )}
              />
            ))}
          </div>
          <span className="ml-1 text-sm font-medium text-foreground">{recipe.rating.toFixed(1)}</span>
          <span className="text-sm text-muted-foreground">({recipe.ratingCount})</span>
        </div>
      </div>
    </motion.article>
  )
}
