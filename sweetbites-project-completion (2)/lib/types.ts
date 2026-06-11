// User types
export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: 'usuario' | 'editor' | 'admin'
  avatar?: string
  createdAt: string
}

// Recipe types
export interface Ingredient {
  id: string
  name: string
  quantity: number
  unit: string
}

export interface Step {
  id: string
  number: number
  description: string
}

export interface Recipe {
  id: string
  title: string
  description: string
  imageUrl: string
  category: Category
  difficulty: 'facil' | 'intermedio' | 'dificil'
  time: number // in minutes
  servings: number
  ingredients: Ingredient[]
  steps: Step[]
  rating: number
  ratingCount: number
  favoriteCount: number
  status: 'publicada' | 'pendiente' | 'rechazada'
  rejectionReason?: string
  authorId: string
  authorName: string
  createdAt: string
}

export interface Category {
  id: string
  name: string
  icon: string
  color: string
  description?: string
}

export interface Comment {
  id: string
  recipeId: string
  userId: string
  userName: string
  content: string
  createdAt: string
}

export interface Collection {
  id: string
  name: string
  userId: string
  recipeIds: string[]
  createdAt: string
}

// Form types
export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  name: string
  email: string
  phone?: string
  password: string
  confirmPassword: string
}

export interface RecipeForm {
  title: string
  description: string
  category: string
  difficulty: 'facil' | 'intermedio' | 'dificil'
  time: number
  servings: number
  ingredients: Omit<Ingredient, 'id'>[]
  steps: Omit<Step, 'id'>[]
}

// API response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Stats for admin dashboard
export interface AdminStats {
  totalUsers: number
  totalRecipes: number
  pendingRecipes: number
  totalComments: number
}
