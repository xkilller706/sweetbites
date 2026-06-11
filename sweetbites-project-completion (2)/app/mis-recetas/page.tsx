'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Clock, 
  Users, 
  Calendar, 
  Eye, 
  Plus, 
  AlertTriangle,
  ChefHat 
} from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { mockRecipes, pendingRecipes, mockUsers } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { Recipe } from '@/lib/types'

const currentUser = mockUsers[0]

// Combine all recipes for "my recipes"
const myRecipes: Recipe[] = [
  ...mockRecipes.filter(r => r.authorId === '1').map(r => ({ ...r, status: 'publicada' as const })),
  ...pendingRecipes,
  {
    ...mockRecipes[0],
    id: '99',
    title: 'Galletas de Mantequilla',
    description: 'Receta rechazada por falta de informacion',
    status: 'rechazada',
    rejectionReason: 'La receta no especifica la temperatura de horneado. Por favor, agrega la temperatura exacta en grados Celsius.',
  }
]

const statusConfig = {
  publicada: { label: 'Publicada', color: 'bg-green-100 text-green-700', icon: '✅' },
  pendiente: { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-700', icon: '⏳' },
  rechazada: { label: 'Rechazada', color: 'bg-red-100 text-red-700', icon: '❌' },
}

const difficultyLabels = {
  facil: 'Facil',
  intermedio: 'Intermedio',
  dificil: 'Dificil',
}

type FilterStatus = 'todas' | 'pendiente' | 'publicada' | 'rechazada'

export default function MyRecipesPage() {
  const [filter, setFilter] = useState<FilterStatus>('todas')

  const filteredRecipes = myRecipes.filter(recipe => 
    filter === 'todas' || recipe.status === filter
  )

  const counts = {
    todas: myRecipes.length,
    pendiente: myRecipes.filter(r => r.status === 'pendiente').length,
    publicada: myRecipes.filter(r => r.status === 'publicada').length,
    rechazada: myRecipes.filter(r => r.status === 'rechazada').length,
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={currentUser} />
      
      <main className="flex-1 bg-background py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Mis Recetas</h1>
              <p className="text-muted-foreground">Gestiona las recetas que has enviado</p>
            </div>
            <Link href="/crear-receta">
              <Button className="gap-2 bg-primary text-primary-foreground">
                <Plus className="h-4 w-4" />
                Nueva Receta
              </Button>
            </Link>
          </div>

          {/* Filter Tabs */}
          <div className="mb-8 flex flex-wrap gap-2">
            {(['todas', 'pendiente', 'publicada', 'rechazada'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  filter === status
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                )}
              >
                {status === 'todas' ? 'Todas' : statusConfig[status].label} ({counts[status]})
              </button>
            ))}
          </div>

          {/* Recipes List */}
          {filteredRecipes.length > 0 ? (
            <div className="space-y-4">
              {filteredRecipes.map((recipe) => (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex flex-col gap-4 sm:flex-row">
                    {/* Image */}
                    <div className="relative h-32 w-full flex-shrink-0 overflow-hidden rounded-xl sm:w-40">
                      <Image
                        src={recipe.imageUrl}
                        alt={recipe.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col">
                      <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                        <h3 className="text-lg font-semibold text-foreground">{recipe.title}</h3>
                        <Badge className={statusConfig[recipe.status].color}>
                          {statusConfig[recipe.status].icon} {statusConfig[recipe.status].label}
                        </Badge>
                      </div>

                      <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                        {recipe.description}
                      </p>

                      {/* Meta */}
                      <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <Badge 
                          variant="secondary"
                          className="gap-1"
                          style={{ backgroundColor: `${recipe.category.color}20`, color: recipe.category.color }}
                        >
                          <span>{recipe.category.icon}</span>
                          {recipe.category.name}
                        </Badge>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {recipe.time} min
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {recipe.servings}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(recipe.createdAt).toLocaleDateString('es-ES', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </div>

                      {/* Status Message */}
                      {recipe.status === 'pendiente' && (
                        <div className="mb-3 flex items-center gap-2 rounded-lg bg-yellow-50 px-3 py-2 text-sm text-yellow-800">
                          <span className="text-lg">🟡</span>
                          En revision por administrador
                        </div>
                      )}

                      {recipe.status === 'rechazada' && recipe.rejectionReason && (
                        <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
                          <div className="mb-1 flex items-center gap-2 font-medium">
                            <AlertTriangle className="h-4 w-4" />
                            Motivo del rechazo:
                          </div>
                          <p>{recipe.rejectionReason}</p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="mt-auto flex gap-2">
                        {recipe.status === 'publicada' && (
                          <Link href={`/recetas/${recipe.id}`}>
                            <Button variant="outline" size="sm" className="gap-1">
                              <Eye className="h-4 w-4" />
                              Ver Publicada
                            </Button>
                          </Link>
                        )}
                        {recipe.status === 'pendiente' && (
                          <Button variant="outline" size="sm" className="gap-1">
                            <Eye className="h-4 w-4" />
                            Ver Detalles
                          </Button>
                        )}
                        {recipe.status === 'rechazada' && (
                          <Link href="/crear-receta">
                            <Button size="sm" className="gap-1 bg-primary text-primary-foreground">
                              <Plus className="h-4 w-4" />
                              Crear Nueva Version
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <span className="mb-4 text-6xl">📝</span>
              <h3 className="mb-2 text-xl font-semibold text-foreground">
                No tienes recetas {filter !== 'todas' && statusConfig[filter as keyof typeof statusConfig]?.label.toLowerCase()}
              </h3>
              <p className="mb-6 text-muted-foreground">
                Crea tu primera receta y compartela con la comunidad
              </p>
              <Link href="/crear-receta">
                <Button className="gap-2 bg-primary text-primary-foreground">
                  <Plus className="h-4 w-4" />
                  Crear Receta
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
