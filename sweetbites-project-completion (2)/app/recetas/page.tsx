'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, SlidersHorizontal, X } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { RecipeCard } from '@/components/recipes/recipe-card'
import { CategoryCard } from '@/components/recipes/category-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { categories, mockRecipes } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const difficulties = [
  { value: 'facil', label: 'Facil', color: 'bg-green-100 text-green-700 hover:bg-green-200' },
  { value: 'intermedio', label: 'Intermedio', color: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' },
  { value: 'dificil', label: 'Dificil', color: 'bg-orange-100 text-orange-700 hover:bg-orange-200' },
]

export default function RecipesPage() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const filteredRecipes = useMemo(() => {
    return mockRecipes.filter((recipe) => {
      const matchesSearch = recipe.title.toLowerCase().includes(search.toLowerCase()) ||
        recipe.description.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = !selectedCategory || recipe.category.id === selectedCategory
      const matchesDifficulty = !selectedDifficulty || recipe.difficulty === selectedDifficulty
      return matchesSearch && matchesCategory && matchesDifficulty
    })
  }, [search, selectedCategory, selectedDifficulty])

  const clearFilters = () => {
    setSearch('')
    setSelectedCategory(null)
    setSelectedDifficulty(null)
  }

  const hasFilters = search || selectedCategory || selectedDifficulty

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 bg-background">
        {/* Header */}
        <section className="border-b border-border bg-muted/30 py-8">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <h1 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">
                Catalogo de Recetas
              </h1>
              <p className="text-muted-foreground">
                Descubre deliciosas recetas de reposteria
              </p>
            </div>

            {/* Search Bar */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar brownies, cheesecake, galletas..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-12 pl-10 text-base"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2 md:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filtros
                {hasFilters && (
                  <Badge className="ml-1 h-5 w-5 rounded-full bg-primary p-0 text-xs text-primary-foreground">
                    !
                  </Badge>
                )}
              </Button>
            </div>

            {/* Desktop Filters */}
            <div className="mt-6 hidden md:block">
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-sm font-medium text-foreground">Categoria:</span>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                      className={cn(
                        'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors',
                        selectedCategory === cat.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      )}
                    >
                      <span>{cat.icon}</span>
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <span className="text-sm font-medium text-foreground">Dificultad:</span>
                <div className="flex flex-wrap gap-2">
                  {difficulties.map((diff) => (
                    <button
                      key={diff.value}
                      onClick={() => setSelectedDifficulty(selectedDifficulty === diff.value ? null : diff.value)}
                      className={cn(
                        'rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
                        selectedDifficulty === diff.value
                          ? 'ring-2 ring-primary ring-offset-2'
                          : '',
                        diff.color
                      )}
                    >
                      {diff.label}
                    </button>
                  ))}
                </div>
                {hasFilters && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                    Limpiar filtros
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 space-y-4 rounded-xl border border-border bg-card p-4 md:hidden"
              >
                <div>
                  <span className="mb-2 block text-sm font-medium text-foreground">Categoria</span>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                        className={cn(
                          'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors',
                          selectedCategory === cat.id
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        )}
                      >
                        <span>{cat.icon}</span>
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="mb-2 block text-sm font-medium text-foreground">Dificultad</span>
                  <div className="flex flex-wrap gap-2">
                    {difficulties.map((diff) => (
                      <button
                        key={diff.value}
                        onClick={() => setSelectedDifficulty(selectedDifficulty === diff.value ? null : diff.value)}
                        className={cn(
                          'rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
                          selectedDifficulty === diff.value
                            ? 'ring-2 ring-primary ring-offset-2'
                            : '',
                          diff.color
                        )}
                      >
                        {diff.label}
                      </button>
                    ))}
                  </div>
                </div>

                {hasFilters && (
                  <Button variant="ghost" onClick={clearFilters} className="w-full">
                    <X className="mr-2 h-4 w-4" />
                    Limpiar filtros
                  </Button>
                )}
              </motion.div>
            )}
          </div>
        </section>

        {/* Results */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <p className="mb-6 text-sm text-muted-foreground">
              {filteredRecipes.length} receta{filteredRecipes.length !== 1 ? 's' : ''} encontrada{filteredRecipes.length !== 1 ? 's' : ''}
            </p>

            {filteredRecipes.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <span className="mb-4 text-6xl">😕</span>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  No encontramos recetas
                </h3>
                <p className="mb-6 text-muted-foreground">
                  Intenta con otros filtros o una busqueda diferente
                </p>
                <Button onClick={clearFilters}>
                  Limpiar filtros
                </Button>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
