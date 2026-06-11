'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, FolderHeart, Plus, Trash2, X } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { RecipeCard } from '@/components/recipes/recipe-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { mockRecipes, mockUsers } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

// Mock current user
const currentUser = mockUsers[0]

// Mock favorites - in a real app this would come from the database
const mockFavorites = mockRecipes.slice(0, 4)

const mockCollections = [
  { id: '1', name: 'Para Navidad', recipeCount: 8 },
  { id: '2', name: 'Cumpleanos', recipeCount: 5 },
  { id: '3', name: 'Postres Rapidos', recipeCount: 12 },
]

export default function FavoritesPage() {
  const [activeTab, setActiveTab] = useState<'favorites' | 'collections'>('favorites')
  const [favorites, setFavorites] = useState(mockFavorites)
  const [collections, setCollections] = useState(mockCollections)
  const [isCreatingCollection, setIsCreatingCollection] = useState(false)
  const [newCollectionName, setNewCollectionName] = useState('')

  const handleRemoveFavorite = (id: string) => {
    setFavorites(favorites.filter(r => r.id !== id))
  }

  const handleCreateCollection = () => {
    if (newCollectionName.trim()) {
      setCollections([
        ...collections,
        { id: Date.now().toString(), name: newCollectionName, recipeCount: 0 }
      ])
      setNewCollectionName('')
      setIsCreatingCollection(false)
    }
  }

  const handleDeleteCollection = (id: string) => {
    setCollections(collections.filter(c => c.id !== id))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={currentUser} />
      
      <main className="flex-1 bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Favoritos</h1>
            <p className="text-muted-foreground">Tus recetas guardadas y colecciones</p>
          </div>

          {/* Tabs */}
          <div className="mb-8 flex gap-2">
            <button
              onClick={() => setActiveTab('favorites')}
              className={cn(
                'flex items-center gap-2 rounded-full px-6 py-2.5 font-medium transition-colors',
                activeTab === 'favorites'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              <Heart className="h-4 w-4" />
              Favoritos ({favorites.length})
            </button>
            <button
              onClick={() => setActiveTab('collections')}
              className={cn(
                'flex items-center gap-2 rounded-full px-6 py-2.5 font-medium transition-colors',
                activeTab === 'collections'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              <FolderHeart className="h-4 w-4" />
              Colecciones ({collections.length})
            </button>
          </div>

          {/* Content */}
          {activeTab === 'favorites' ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key="favorites"
            >
              {favorites.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {favorites.map((recipe) => (
                    <div key={recipe.id} className="relative">
                      <RecipeCard 
                        recipe={recipe} 
                        isFavorite
                        onFavoriteToggle={handleRemoveFavorite}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <span className="mb-4 text-6xl">💔</span>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">
                    No tienes favoritos
                  </h3>
                  <p className="mb-6 text-muted-foreground">
                    Explora recetas y guarda tus favoritas para encontrarlas facilmente
                  </p>
                  <Button asChild className="bg-primary text-primary-foreground">
                    <a href="/recetas">Explorar Recetas</a>
                  </Button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key="collections"
            >
              {/* Create Collection Button */}
              {!isCreatingCollection && (
                <Button
                  onClick={() => setIsCreatingCollection(true)}
                  className="mb-6 bg-primary text-primary-foreground"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Nueva Coleccion
                </Button>
              )}

              {/* Create Collection Form */}
              {isCreatingCollection && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 flex items-center gap-3"
                >
                  <Input
                    placeholder="Nombre de la coleccion..."
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                    className="max-w-xs"
                    autoFocus
                  />
                  <Button onClick={handleCreateCollection} className="bg-primary text-primary-foreground">
                    Crear
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setIsCreatingCollection(false)
                      setNewCollectionName('')
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </motion.div>
              )}

              {collections.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {collections.map((collection) => (
                    <motion.div
                      key={collection.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="group relative rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
                    >
                      <button
                        onClick={() => handleDeleteCollection(collection.id)}
                        className="absolute right-4 top-4 rounded-lg p-2 text-muted-foreground opacity-0 transition-opacity hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
                        <FolderHeart className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="mb-1 font-semibold text-foreground">{collection.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {collection.recipeCount} recetas
                      </p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <span className="mb-4 text-6xl">📁</span>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">
                    No tienes colecciones
                  </h3>
                  <p className="mb-6 text-muted-foreground">
                    Crea colecciones para organizar tus recetas favoritas
                  </p>
                  <Button
                    onClick={() => setIsCreatingCollection(true)}
                    className="bg-primary text-primary-foreground"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Crear primera coleccion
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
