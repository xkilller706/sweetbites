'use client'

import { useState, useMemo, use } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Users, 
  Heart, 
  Star, 
  Minus, 
  Plus, 
  X,
  ChefHat,
  BookOpen
} from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { mockRecipes } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { Ingredient } from '@/lib/types'

interface RecipeDetailPageProps {
  params: Promise<{ id: string }>
}

const difficultyLabels = {
  facil: 'Facil',
  intermedio: 'Intermedio',
  dificil: 'Dificil',
}

const difficultyColors = {
  facil: 'bg-green-100 text-green-700',
  intermedio: 'bg-yellow-100 text-yellow-700',
  dificil: 'bg-orange-100 text-orange-700',
}

export default function RecipeDetailPage({ params }: RecipeDetailPageProps) {
  const { id } = use(params)
  const recipe = mockRecipes.find((r) => r.id === id)
  
  const [servings, setServings] = useState(recipe?.servings || 8)
  const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(new Set())
  const [isCookingMode, setIsCookingMode] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [imageError, setImageError] = useState(false)

  if (!recipe) {
    notFound()
  }

  const adjustedIngredients = useMemo(() => {
    const ratio = servings / recipe.servings
    return recipe.ingredients.map((ing) => ({
      ...ing,
      quantity: Math.round(ing.quantity * ratio * 10) / 10,
    }))
  }, [servings, recipe.servings, recipe.ingredients])

  const toggleIngredient = (id: string) => {
    setCheckedIngredients((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 bg-background">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-muted/30">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground">Inicio</Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/recetas" className="hover:text-foreground">Recetas</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{recipe.title}</span>
            </nav>
          </div>
        </div>

        {/* Recipe Header */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 lg:grid-cols-5">
              {/* Image */}
              <div className="lg:col-span-3">
                <div className="relative aspect-video overflow-hidden rounded-2xl">
                  {!imageError ? (
                    <Image
                      src={recipe.imageUrl}
                      alt={recipe.title}
                      fill
                      className="object-cover"
                      priority
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted">
                      <span className="text-8xl">{recipe.category.icon}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Info Card */}
              <div className="lg:col-span-2">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h1 className="mb-3 text-2xl font-bold text-foreground lg:text-3xl">
                    {recipe.title}
                  </h1>
                  <p className="mb-4 text-muted-foreground">
                    {recipe.description}
                  </p>

                  {/* Badges */}
                  <div className="mb-4 flex flex-wrap gap-2">
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

                  {/* Meta Info */}
                  <div className="mb-6 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{recipe.time} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{recipe.servings} porciones</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="mb-6 flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            'h-5 w-5',
                            star <= Math.round(recipe.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-muted'
                          )}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-foreground">{recipe.rating.toFixed(1)}</span>
                    <span className="text-muted-foreground">({recipe.ratingCount} valoraciones)</span>
                  </div>

                  {/* Servings Calculator */}
                  <div className="mb-6 rounded-xl bg-primary/5 p-4">
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      Porciones
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setServings(Math.max(1, servings - 1))}
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
                      >
                        <Minus className="h-5 w-5" />
                      </button>
                      <span className="w-12 text-center text-2xl font-bold text-foreground">
                        {servings}
                      </span>
                      <button
                        onClick={() => setServings(servings + 1)}
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3">
                    <Button 
                      size="lg" 
                      className="w-full gap-2 bg-primary text-primary-foreground"
                      onClick={() => setIsCookingMode(true)}
                    >
                      <ChefHat className="h-5 w-5" />
                      Modo Cocina
                    </Button>
                    <Button variant="outline" size="lg" className="w-full gap-2">
                      <Heart className="h-5 w-5" />
                      Guardar en Favoritos
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ingredients & Steps */}
        <section className="pb-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 lg:grid-cols-5">
              {/* Ingredients */}
              <div className="lg:col-span-2">
                <div className="sticky top-20 rounded-2xl border border-border bg-card p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-foreground">Ingredientes</h2>
                    <span className="text-sm text-muted-foreground">
                      Para {servings} porciones
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {adjustedIngredients.map((ing) => (
                      <li key={ing.id}>
                        <label className="flex cursor-pointer items-start gap-3">
                          <Checkbox
                            checked={checkedIngredients.has(ing.id)}
                            onCheckedChange={() => toggleIngredient(ing.id)}
                            className="mt-0.5"
                          />
                          <span className={cn(
                            'transition-colors',
                            checkedIngredients.has(ing.id) && 'text-muted-foreground line-through'
                          )}>
                            <strong>{ing.quantity} {ing.unit}</strong> de {ing.name}
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Steps */}
              <div className="lg:col-span-3">
                <h2 className="mb-6 text-xl font-bold text-foreground">Preparacion</h2>
                <div className="space-y-4">
                  {recipe.steps.map((step, index) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={cn(
                        'flex gap-4 rounded-xl p-4 transition-colors',
                        index % 2 === 0 ? 'bg-muted/50' : 'bg-card'
                      )}
                    >
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                        {step.number}
                      </div>
                      <p className="pt-2 leading-relaxed text-foreground">
                        {step.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Author Info */}
        <section className="border-t border-border bg-muted/30 py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-lg font-semibold text-white">
                {recipe.authorName.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <p className="font-medium text-foreground">Receta de {recipe.authorName}</p>
                <p className="text-sm text-muted-foreground">
                  Publicada el {new Date(recipe.createdAt).toLocaleDateString('es-ES', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Cooking Mode Modal */}
      <AnimatePresence>
        {isCookingMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          >
            <button
              onClick={() => setIsCookingMode(false)}
              className="absolute right-4 top-4 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="mx-auto max-w-2xl text-center text-white">
              {/* Header */}
              <div className="mb-8 flex items-center justify-center gap-2">
                <span className="text-3xl">🍰</span>
                <span className="text-xl font-semibold">Modo Cocina</span>
              </div>

              {/* Step Counter */}
              <div className="mb-8">
                <span className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2 text-xl font-bold text-primary-foreground">
                  {currentStep + 1} / {recipe.steps.length}
                </span>
              </div>

              {/* Current Step */}
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
              >
                <p className="text-2xl leading-relaxed md:text-3xl">
                  {recipe.steps[currentStep].description}
                </p>
              </motion.div>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="gap-2 border-white/30 text-white hover:bg-white/10 disabled:opacity-30"
                >
                  <ChevronLeft className="h-5 w-5" />
                  Anterior
                </Button>
                <Button
                  size="lg"
                  onClick={() => {
                    if (currentStep === recipe.steps.length - 1) {
                      setIsCookingMode(false)
                      setCurrentStep(0)
                    } else {
                      setCurrentStep(currentStep + 1)
                    }
                  }}
                  className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {currentStep === recipe.steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}
