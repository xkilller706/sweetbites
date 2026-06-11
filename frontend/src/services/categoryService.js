import api from './api'

const categoryService = {
  /**
   * Obtener todas las categorías (público)
   */
  getAll: async () => {
    const response = await api.get('/categories')
    return response.data
  },

  /**
   * Obtener categoría por ID
   * @param {number} id
   */
  getById: async (id) => {
    const response = await api.get(`/categories/${id}`)
    return response.data
  },

  /**
   * Crear categoría (admin)
   * @param {object} categoryData - { nombre, descripcion, icono, color }
   */
  create: async (categoryData) => {
    const response = await api.post('/categories', categoryData)
    return response.data
  },

  /**
   * Actualizar categoría (admin)
   * @param {number} id
   * @param {object} categoryData
   */
  update: async (id, categoryData) => {
    const response = await api.put(`/categories/${id}`, categoryData)
    return response.data
  },

  /**
   * Eliminar categoría (admin)
   * @param {number} id
   */
  delete: async (id) => {
    const response = await api.delete(`/categories/${id}`)
    return response.data
  },
}

export default categoryService
