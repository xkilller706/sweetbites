import api from './api'

const recipeService = {
  /**
   * Obtener todas las recetas (públicas)
   * @param {object} params - { page, limit, categoria, dificultad, search }
   */
  getAll: async (params = {}) => {
    const response = await api.get('/recipes', { params })
    return response.data
  },

  /**
   * Buscar recetas
   * @param {string} query - Término de búsqueda
   */
  search: async (query) => {
    const response = await api.get('/recipes/search', { params: { q: query } })
    return response.data
  },

  /**
   * Filtrar recetas
   * @param {object} filters - { categoria, dificultad, tiempo }
   */
  filter: async (filters) => {
    const response = await api.get('/recipes/filter', { params: filters })
    return response.data
  },

  /**
   * Obtener detalle de receta
   * @param {number} id - ID de la receta
   */
  getById: async (id) => {
    const response = await api.get(`/recipes/${id}`)
    return response.data
  },

  /**
   * Crear nueva receta
   * @param {object} recipeData - Datos de la receta
   */
  create: async (recipeData) => {
    const response = await api.post('/recipes', recipeData)
    return response.data
  },

  /**
   * Actualizar receta
   * @param {number} id - ID de la receta
   * @param {object} recipeData - Datos a actualizar
   */
  update: async (id, recipeData) => {
    const response = await api.put(`/recipes/${id}`, recipeData)
    return response.data
  },

  /**
   * Eliminar receta
   * @param {number} id - ID de la receta
   */
  delete: async (id) => {
    const response = await api.delete(`/recipes/${id}`)
    return response.data
  },

  /**
   * Obtener mis recetas enviadas
   */
  getMyRecipes: async () => {
    const response = await api.get('/recipes/my-recipes')
    return response.data
  },

  /**
   * Subir imagen de receta
   * @param {FormData} formData - FormData con el archivo de imagen
   */
  uploadImage: async (formData) => {
    const response = await api.post('/recipes/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  },
}

export default recipeService
