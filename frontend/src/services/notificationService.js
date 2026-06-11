import api from './api'

const notificationService = {
  /**
   * Obtener todas las notificaciones del usuario
   */
  getAll: async () => {
    const response = await api.get('/notifications')
    return response.data
  },

  /**
   * Marcar notificación como leída
   * @param {number} notificationId - ID de la notificación
   */
  markAsRead: async (notificationId) => {
    const response = await api.put(`/notifications/${notificationId}/read`)
    return response.data
  },

  /**
   * Marcar todas las notificaciones como leídas
   */
  markAllAsRead: async () => {
    const response = await api.put('/notifications/read-all')
    return response.data
  },

  /**
   * Eliminar notificación
   * @param {number} notificationId - ID de la notificación
   */
  delete: async (notificationId) => {
    const response = await api.delete(`/notifications/${notificationId}`)
    return response.data
  },
}

export default notificationService
