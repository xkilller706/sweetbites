'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Users, 
  BookOpen, 
  Clock, 
  MessageSquare, 
  ArrowRight,
  TrendingUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { mockUsers, mockRecipes, pendingRecipes } from '@/lib/mock-data'

const stats = [
  {
    label: 'Total Usuarios',
    value: mockUsers.length,
    icon: Users,
    color: 'bg-primary/10 text-primary',
    href: '/admin/usuarios',
  },
  {
    label: 'Total Recetas',
    value: mockRecipes.length,
    icon: BookOpen,
    color: 'bg-secondary/20 text-secondary-foreground',
    href: '/admin/recetas',
  },
  {
    label: 'Pendientes',
    value: pendingRecipes.length,
    icon: Clock,
    color: 'bg-yellow-100 text-yellow-700',
    href: '/admin/recetas',
    highlight: true,
  },
  {
    label: 'Comentarios',
    value: 45,
    icon: MessageSquare,
    color: 'bg-blue-100 text-blue-700',
    href: '/admin/comentarios',
  },
]

const quickActions = [
  { label: 'Gestionar Usuarios', href: '/admin/usuarios', icon: Users },
  { label: 'Aprobar Recetas', href: '/admin/recetas', icon: BookOpen },
  { label: 'Ver Comentarios', href: '/admin/comentarios', icon: MessageSquare },
]

export default function AdminDashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Panel de Administracion</h1>
        <p className="text-muted-foreground">Gestiona la plataforma SweetBites</p>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={stat.href}>
              <div className={`rounded-2xl border bg-card p-6 transition-shadow hover:shadow-md ${stat.highlight ? 'border-yellow-300 ring-2 ring-yellow-100' : 'border-border'}`}>
                <div className="flex items-start justify-between">
                  <div className={`rounded-xl p-3 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  {stat.highlight && (
                    <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
                      <TrendingUp className="h-3 w-3" />
                      Pendiente
                    </span>
                  )}
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Acciones Rapidas</h2>
        <div className="flex flex-wrap gap-3">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href}>
              <Button variant="outline" className="gap-2">
                <action.icon className="h-4 w-4" />
                {action.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Users */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl border border-border bg-card p-6"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-foreground">Usuarios Recientes</h2>
            <Link href="/admin/usuarios" className="text-sm text-primary hover:underline">
              Ver todos
            </Link>
          </div>
          <div className="space-y-3">
            {mockUsers.slice(0, 4).map((user) => (
              <div key={user.id} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-semibold text-white">
                  {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                  user.role === 'admin' ? 'bg-red-100 text-red-700' :
                  user.role === 'editor' ? 'bg-blue-100 text-blue-700' :
                  'bg-primary/10 text-primary'
                }`}>
                  {user.role === 'admin' ? 'Admin' : user.role === 'editor' ? 'Editor' : 'Usuario'}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pending Recipes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl border border-border bg-card p-6"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-foreground">Recetas Pendientes</h2>
            <Link href="/admin/recetas" className="text-sm text-primary hover:underline">
              Ver todas
            </Link>
          </div>
          {pendingRecipes.length > 0 ? (
            <div className="space-y-3">
              {pendingRecipes.map((recipe) => (
                <div key={recipe.id} className="flex items-center gap-3 rounded-lg bg-yellow-50 p-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100 text-2xl">
                    {recipe.category.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{recipe.title}</p>
                    <p className="text-sm text-muted-foreground">Por: {recipe.authorName}</p>
                  </div>
                  <Link href="/admin/recetas">
                    <Button size="sm" variant="outline" className="gap-1">
                      Revisar
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <span className="mb-2 text-4xl">✅</span>
              <p className="text-muted-foreground">No hay recetas pendientes</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
