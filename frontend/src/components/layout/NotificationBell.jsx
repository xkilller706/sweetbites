import { useState, useEffect, useRef } from 'react'
import { Bell, Check, Trash2, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import notificationService from '@services/notificationService'
import { cn } from '@utils/cn'
import toast from 'react-hot-toast'

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    fetchNotifications()
    // Polling cada 30 segundos
    const interval = setInterval(fetchNotifications, 30000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const fetchNotifications = async () => {
    try {
      const response = await notificationService.getAll()
      if (response.success) {
        setNotifications(response.notifications || [])
        setUnreadCount(response.unreadCount || 0)
      }
    } catch (error) {
      console.error('Error al cargar notificaciones:', error)
    }
  }

  const handleMarkAsRead = async (notificationId) => {
    try {
      await notificationService.markAsRead(notificationId)
      fetchNotifications()
    } catch (error) {
      console.error('Error al marcar como leída:', error)
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      setLoading(true)
      await notificationService.markAllAsRead()
      fetchNotifications()
      toast.success('Todas marcadas como leídas')
    } catch (error) {
      console.error('Error al marcar todas como leídas:', error)
      toast.error('Error al marcar como leídas')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (notificationId) => {
    try {
      await notificationService.delete(notificationId)
      fetchNotifications()
      toast.success('Notificación eliminada')
    } catch (error) {
      console.error('Error al eliminar notificación:', error)
      toast.error('Error al eliminar')
    }
  }

  const getNotificationIcon = (tipo) => {
    const icons = {
      receta_aprobada: '',
      receta_rechazada: '',
      nuevo_comentario: '',
      nueva_valoracion: '',
      sistema: ''
    }
    return icons[tipo] || ''
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Ahora'
    if (diffMins < 60) return `Hace ${diffMins}m`
    if (diffHours < 24) return `Hace ${diffHours}h`
    if (diffDays < 7) return `Hace ${diffDays}d`
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-neutral-gray-600 hover:text-primary transition-colors"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-0 right-0 inline-flex items-center justify-center h-5 w-5 text-xs font-bold text-white bg-error rounded-full"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-elevated border border-neutral-gray-200 z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-gray-200">
              <h3 className="font-semibold text-neutral-gray-800">
                Notificaciones
              </h3>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllAsRead}
                    disabled={loading}
                    className="text-xs text-primary hover:underline"
                  >
                    Marcar todas como leídas
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-neutral-gray-500 hover:text-neutral-gray-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="text-center py-12">
                  <span className="text-6xl mb-4 block"></span>
                  <p className="text-neutral-gray-600 mb-1 font-medium">No tienes notificaciones</p>
                  <p className="text-sm text-neutral-gray-500">Te avisaremos cuando haya algo nuevo</p>
                </div>
              ) : (
                <div className="divide-y divide-neutral-gray-100">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        'p-4 hover:bg-neutral-gray-50 transition-colors',
                        !notification.leida && 'bg-blue-50/50'
                      )}
                    >
                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div className="flex-shrink-0 text-2xl">
                          {getNotificationIcon(notification.tipo)}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-neutral-gray-800 text-sm mb-0.5">
                            {notification.titulo}
                          </p>
                          <p className="text-sm text-neutral-gray-600 mb-2">
                            {notification.mensaje}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-neutral-gray-500">
                              {formatDate(notification.fecha_creacion)}
                            </span>
                            {notification.enlace && (
                              <Link
                                to={notification.enlace}
                                onClick={() => {
                                  handleMarkAsRead(notification.id)
                                  setIsOpen(false)
                                }}
                                className="text-xs text-primary hover:underline"
                              >
                                Ver →
                              </Link>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1">
                          {!notification.leida && (
                            <button
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="p-1 text-neutral-gray-400 hover:text-success transition-colors"
                              title="Marcar como leída"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(notification.id)}
                            className="p-1 text-neutral-gray-400 hover:text-error transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default NotificationBell
