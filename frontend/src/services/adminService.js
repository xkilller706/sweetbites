import { api } from './api'

export const adminService = {
  // ========== ESTADÍSTICAS ==========

  getStats: async () => {
    const response = await api.get('/admin/stats')
    return response.data
  },

  getRecentUsers: async () => {
    const response = await api.get('/admin/recent-users')
    return response.data
  },

  getPendingRecipesSummary: async () => {
    const response = await api.get('/admin/pending-recipes-summary')
    return response.data
  },

  // ========== GESTIÓN DE USUARIOS ==========

  getUsers: async (filters = {}) => {
    const response = await api.get('/admin/users', { params: filters })
    return response.data
  },

  updateUserRole: async (userId, rol) => {
    const response = await api.put(`/admin/users/${userId}/role`, { rol })
    return response.data
  },

  deleteUser: async (userId) => {
    const response = await api.delete(`/admin/users/${userId}`)
    return response.data
  },

  // ========== GESTIÓN DE RECETAS ==========

  getRecipes: async (filters = {}) => {
    const response = await api.get('/admin/recipes', { params: filters })
    return response.data
  },

  getPendingRecipes: async () => {
    const response = await api.get('/admin/recipes/pending')
    return response.data
  },

  approveRecipe: async (recipeId) => {
    const response = await api.put(`/admin/recipes/${recipeId}/approve`)
    return response.data
  },

  rejectRecipe: async (recipeId, motivo) => {
    const response = await api.put(`/admin/recipes/${recipeId}/reject`, { motivo })
    return response.data
  },

  deleteRecipe: async (recipeId) => {
    const response = await api.delete(`/admin/recipes/${recipeId}`)
    return response.data
  },

  toggleRecipeActive: async (recipeId) => {
    const response = await api.put(`/admin/recipes/${recipeId}/toggle-active`)
    return response.data
  },

  // ========== GESTIÓN DE COMENTARIOS ==========

  getComments: async (filters = {}) => {
    const response = await api.get('/admin/comments', { params: filters })
    return response.data
  },

  deleteComment: async (commentId) => {
    const response = await api.delete(`/admin/comments/${commentId}`)
    return response.data
  },
}

export default adminService
