import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Users,
  BookOpen,
  Clock,
  MessageSquare,
  TrendingUp,
  Eye,
  Settings,
  Star
} from 'lucide-react'
import { adminService } from '@services/adminService'
import StatCard from '@components/admin/StatCard'
import BarChart from '@components/admin/BarChart'
import ProgressRing from '@components/admin/ProgressRing'
import { Skeleton } from '@components/ui/Skeleton'
import { toast } from 'react-hot-toast'

const Dashboard = () => {
  const [stats, setStats] = useState(null)
  const [recentUsers, setRecentUsers] = useState([])
  const [pendingRecipes, setPendingRecipes] = useState([])
  const [categoryStats, setCategoryStats] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const [statsData, usersData, recipesData] = await Promise.all([
        adminService.getStats(),
        adminService.getRecentUsers(),
        adminService.getPendingRecipesSummary()
      ])

      if (statsData.success) {
        setStats(statsData.stats)

        // Simular datos de categorías (en producción vendría del backend)
        setCategoryStats([
          { label: 'Tortas', value: Math.floor(statsData.stats.totalRecetas * 0.3), color: 'bg-gradient-to-r from-green-400 to-green-500' },
          { label: 'Galletas', value: Math.floor(statsData.stats.totalRecetas * 0.25), color: 'bg-gradient-to-r from-blue-400 to-blue-500' },
          { label: 'Postres Fríos', value: Math.floor(statsData.stats.totalRecetas * 0.20), color: 'bg-gradient-to-r from-purple-400 to-purple-500' },
          { label: 'Chocolates', value: Math.floor(statsData.stats.totalRecetas * 0.15), color: 'bg-gradient-to-r from-yellow-400 to-yellow-500' },
          { label: 'Otros', value: Math.floor(statsData.stats.totalRecetas * 0.10), color: 'bg-gradient-to-r from-pink-400 to-pink-500' },
        ])
      }
      if (usersData.success) {
        setRecentUsers(usersData.users)
      }
      if (recipesData.success) {
        setPendingRecipes(recipesData.recipes)
      }
    } catch (error) {
      console.error('Error al cargar dashboard:', error)
      toast.error('Error al cargar los datos del dashboard')
    } finally {
      setLoading(false)
    }
  }

  const quickActions = [
    { label: 'Gestionar Usuarios', href: '/admin/users', icon: Users },
    { label: 'Aprobar Recetas', href: '/admin/recipes/pending', icon: Clock },
    { label: 'Gestionar Recetas', href: '/admin/recipes', icon: BookOpen },
    { label: 'Ver Categorías', href: '/admin/categories', icon: Settings },
  ]

  const getInitials = (name) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getRoleBadgeColor = (rol) => {
    switch (rol) {
      case 'admin':
        return 'bg-red-100 text-red-700'
      case 'editor':
        return 'bg-blue-100 text-blue-700'
      default:
        return 'bg-primary/10 text-primary'
    }
  }

  const getRoleLabel = (rol) => {
    switch (rol) {
      case 'admin':
        return 'Admin'
      case 'editor':
        return 'Editor'
      default:
        return 'Usuario'
    }
  }

  const approvalRate = stats
    ? ((stats.totalRecetas / (stats.totalRecetas + stats.recetasPendientes)) * 100)
    : 0

  return (
    <div className="py-8 bg-[#FDFBF7] min-h-screen relative overflow-hidden">
      {/* Mesh Gradients */}
      <div className="absolute top-0 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-primary/15 opacity-30 blur-[100px]" />
      <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-[#F5E6D3] opacity-20 blur-[100px]" />

      <div className="container mx-auto px-4 relative z-0">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-stone-800 to-primary bg-clip-text text-transparent mb-2">
            Panel de Administración
          </h1>
          <p className="text-stone-600 text-lg font-light">Gestiona la plataforma SweetBites</p>
        </motion.div>

        {/* Stats Cards - Bento Grid */}
        {loading ? (
          <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32 rounded-3xl" />
            ))}
          </div>
        ) : stats && (
          <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Usuarios"
              value={stats.totalUsuarios}
              icon={Users}
              bgColor="bg-blue-50"
              iconColor="text-blue-600"
              trend="up"
              trendValue="+12% este mes"
              delay={0}
            />
            <StatCard
              title="Total Recetas"
              value={stats.totalRecetas}
              icon={BookOpen}
              bgColor="bg-green-50"
              iconColor="text-green-600"
              trend="up"
              trendValue="+8 esta semana"
              delay={0.1}
            />
            <StatCard
              title="Pendientes"
              value={stats.recetasPendientes}
              icon={Clock}
              bgColor="bg-yellow-50"
              iconColor="text-yellow-600"
              trend="neutral"
              trendValue="Requieren revisión"
              delay={0.2}
            />
            <StatCard
              title="Comentarios"
              value={stats.totalComentarios}
              icon={MessageSquare}
              bgColor="bg-purple-50"
              iconColor="text-purple-600"
              trend="up"
              trendValue="+24 hoy"
              delay={0.3}
            />
          </div>
        )}

        {/* Charts Section */}
        <div className="mb-8 grid gap-6 lg:grid-cols-3">
          {/* Gráfica de Categorías */}
          {loading ? (
            <div className="lg:col-span-2">
              <Skeleton className="h-96 rounded-xl" />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2"
            >
              <BarChart
                title="Recetas por Categoría"
                data={categoryStats}
              />
            </motion.div>
          )}

          {/* Tasa de Aprobación */}
          {loading ? (
            <Skeleton className="h-96 rounded-xl" />
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl border border-neutral-gray-200 p-6 shadow-card"
            >
              <h3 className="text-lg font-semibold text-neutral-gray-800 mb-6">
                Tasa de Aprobación
              </h3>
              <div className="flex flex-col items-center justify-center py-4">
                <ProgressRing
                  percentage={approvalRate}
                  size={140}
                  strokeWidth={10}
                  color="#6BD080"
                  label="Aprobadas"
                />
                <div className="mt-6 text-center">
                  <p className="text-sm text-neutral-gray-600 mb-2">
                    {stats?.totalRecetas} recetas publicadas
                  </p>
                  <p className="text-sm text-neutral-gray-600">
                    {stats?.recetasPendientes} pendientes de revisión
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <h2 className="mb-4 text-lg font-semibold text-neutral-gray-800">Acciones Rápidas</h2>
          <div className="flex flex-wrap gap-3">
            {quickActions.map((action) => (
              <Link key={action.href} to={action.href}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 rounded-lg border border-neutral-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-gray-700 transition-all hover:shadow-md hover:border-primary"
                >
                  <action.icon className="h-4 w-4" />
                  {action.label}
                </motion.button>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Users */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="rounded-xl border border-neutral-gray-200 bg-white p-6 shadow-card"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-neutral-gray-800">Usuarios Recientes</h2>
              <Link to="/admin/users" className="text-sm text-primary hover:underline flex items-center gap-1">
                Ver todos
                <TrendingUp className="h-3 w-3" />
              </Link>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="mb-1 h-4 w-32" />
                      <Skeleton className="h-3 w-48" />
                    </div>
                  </div>
                ))}
              </div>
            ) : recentUsers.length > 0 ? (
              <div className="space-y-3">
                {recentUsers.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-gray-50 transition-colors"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-semibold text-white shadow-md">
                      {getInitials(user.nombre)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-neutral-gray-800">{user.nombre}</p>
                      <p className="text-sm text-neutral-gray-600">{user.email}</p>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getRoleBadgeColor(
                        user.rol
                      )}`}
                    >
                      {getRoleLabel(user.rol)}
                    </span>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <span className="mb-2 text-4xl">👥</span>
                <p className="text-neutral-gray-600">No hay usuarios recientes</p>
              </div>
            )}
          </motion.div>

          {/* Pending Recipes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="rounded-xl border border-neutral-gray-200 bg-white p-6 shadow-card"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-neutral-gray-800">Recetas Pendientes</h2>
              <Link to="/admin/recipes/pending" className="text-sm text-primary hover:underline flex items-center gap-1">
                Ver todas
                <TrendingUp className="h-3 w-3" />
              </Link>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3 rounded-lg bg-yellow-50 p-3">
                    <Skeleton className="h-12 w-12 rounded-lg" />
                    <div className="flex-1">
                      <Skeleton className="mb-1 h-4 w-40" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            ) : pendingRecipes.length > 0 ? (
              <div className="space-y-3">
                {pendingRecipes.map((recipe, index) => (
                  <motion.div
                    key={recipe.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-yellow-50 to-yellow-100 p-3 hover:shadow-md transition-shadow"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow-sm text-2xl">
                      {recipe.categoria_icono || ''}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-neutral-gray-800">{recipe.nombre}</p>
                      <p className="text-sm text-neutral-gray-600">Por: {recipe.autor_nombre}</p>
                    </div>
                    <Link to="/admin/recipes/pending">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-1 rounded-lg border border-neutral-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-gray-700 transition-colors hover:bg-neutral-gray-50 shadow-sm"
                      >
                        <Eye className="h-3 w-3" />
                        Revisar
                      </motion.button>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <span className="mb-2 text-4xl"></span>
                <p className="font-medium text-neutral-gray-800 mb-1">¡Todo al día!</p>
                <p className="text-sm text-neutral-gray-600">No hay recetas pendientes de aprobación</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
