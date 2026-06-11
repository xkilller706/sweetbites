import { api } from './api'

export const userService = {
  // Favoritos
  getFavorites: async () => {
    const response = await api.get('/users/favorites')
    return response.data
  },

  addFavorite: async (recipeId) => {
    const response = await api.post(`/users/favorites/${recipeId}`)
    return response.data
  },

  removeFavorite: async (recipeId) => {
    const response = await api.delete(`/users/favorites/${recipeId}`)
    return response.data
  },

  checkFavorite: async (recipeId) => {
    const response = await api.get(`/users/favorites/${recipeId}/check`)
    return response.data
  },

  // Colecciones
  getCollections: async () => {
    const response = await api.get('/users/collections')
    return response.data
  },

  getCollectionById: async (collectionId) => {
    const response = await api.get(`/users/collections/${collectionId}`)
    return response.data
  },

  createCollection: async (data) => {
    const response = await api.post('/users/collections', data)
    return response.data
  },

  deleteCollection: async (collectionId) => {
    const response = await api.delete(`/users/collections/${collectionId}`)
    return response.data
  },

  addToCollection: async (collectionId, recipeId) => {
    const response = await api.post(`/users/collections/${collectionId}/recipes/${recipeId}`)
    return response.data
  },

  removeFromCollection: async (collectionId, recipeId) => {
    const response = await api.delete(`/users/collections/${collectionId}/recipes/${recipeId}`)
    return response.data
  },

  // Cambiar contraseña
  changePassword: async (currentPassword, newPassword) => {
    const response = await api.put('/users/change-password', {
      currentPassword,
      newPassword
    })
    return response.data
  },

  // Funcionalidades Premium
  upgradePremium: async () => {
    const response = await api.post('/users/upgrade-premium')
    return response.data
  },

  uploadProfilePhoto: async (formData) => {
    const response = await api.post('/users/profile/photo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  },

  updateBio: async (bio) => {
    const response = await api.put('/users/profile/bio', { bio })
    return response.data
  },
}

export default userService
