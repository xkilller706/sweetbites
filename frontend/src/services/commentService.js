import api from './api'

const commentService = {
  /**
   * Obtener comentarios de una receta
   * @param {number} recipeId - ID de la receta
   */
  getComments: async (recipeId) => {
    const response = await api.get(`/comments/${recipeId}`)
    return response.data
  },

  /**
   * Agregar comentario a una receta
   * @param {number} recipeId - ID de la receta
   * @param {string} comentario - Texto del comentario
   * @param {number} parentId - ID del comentario padre (opcional, para respuestas)
   */
  addComment: async (recipeId, comentario, parentId = null) => {
    const response = await api.post(`/comments/${recipeId}`, {
      comentario,
      parent_id: parentId,
    })
    return response.data
  },

  /**
   * Responder a un comentario
   * @param {number} recipeId - ID de la receta
   * @param {number} parentId - ID del comentario padre
   * @param {string} comentario - Texto de la respuesta
   */
  replyComment: async (recipeId, parentId, comentario) => {
    const response = await api.post(`/comments/${recipeId}`, {
      comentario,
      parent_id: parentId,
    })
    return response.data
  },

  /**
   * Dar like o dislike a un comentario
   * @param {number} commentId - ID del comentario
   * @param {string} tipo - 'like' o 'dislike'
   */
  reactToComment: async (commentId, tipo) => {
    const response = await api.post(`/comments/${commentId}/react`, { tipo })
    return response.data
  },

  /**
   * Obtener mi reacción a un comentario
   * @param {number} commentId - ID del comentario
   */
  getMyReaction: async (commentId) => {
    const response = await api.get(`/comments/${commentId}/my-reaction`)
    return response.data
  },

  /**
   * Eliminar comentario
   * @param {number} commentId - ID del comentario
   */
  deleteComment: async (commentId) => {
    const response = await api.delete(`/comments/${commentId}`)
    return response.data
  },

  /**
   * Valorar receta (1-5 estrellas)
   * @param {number} recipeId - ID de la receta
   * @param {number} puntuacion - Puntuación del 1 al 5
   */
  rateRecipe: async (recipeId, puntuacion) => {
    const response = await api.post(`/comments/rate/${recipeId}`, { puntuacion })
    return response.data
  },
}

export default commentService
