import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from '@components/auth/ProtectedRoute'
import AdminRoute from '@components/auth/AdminRoute'

// Páginas públicas
import Home from '@pages/public/Home'
import Recipes from '@pages/public/Recipes'
import RecipeDetail from '@pages/public/RecipeDetail'
import About from '@pages/public/About'
import Contact from '@pages/public/Contact'
import NotFound from '@pages/public/NotFound'

// Páginas de autenticación
import Login from '@pages/auth/Login'
import Register from '@pages/auth/Register'
import VerifyEmail from '@pages/auth/VerifyEmail'

// Páginas de usuario
import Profile from '@pages/user/Profile'
import Favorites from '@pages/user/Favorites'
import CollectionDetail from '@pages/user/CollectionDetail'
import CreateRecipe from '@pages/user/CreateRecipe'
import EditRecipe from '@pages/user/EditRecipe'
import MyRecipes from '@pages/user/MyRecipes'

// Páginas de administrador
import Dashboard from '@pages/admin/Dashboard'
import Users from '@pages/admin/Users'
import RecipeApproval from '@pages/admin/RecipeApproval'
import RecipeManagement from '@pages/admin/RecipeManagement'
import Categories from '@pages/admin/Categories'
import CommentModeration from '@pages/admin/CommentModeration'

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/recipes/:id" element={<RecipeDetail />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* Rutas de Autenticación */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/verify-email" element={<VerifyEmail />} />

      {/* Rutas de Usuario (Protegidas) */}
      <Route
        path="/user/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/favorites"
        element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/collections/:id"
        element={
          <ProtectedRoute>
            <CollectionDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/my-recipes"
        element={
          <ProtectedRoute>
            <MyRecipes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/create-recipe"
        element={
          <ProtectedRoute>
            <CreateRecipe />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/edit-recipe/:id"
        element={
          <ProtectedRoute>
            <EditRecipe />
          </ProtectedRoute>
        }
      />

      {/* Rutas de Admin (Protegidas + Admin) */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <Users />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/recipes/pending"
        element={
          <AdminRoute>
            <RecipeApproval />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/recipes"
        element={
          <AdminRoute>
            <RecipeManagement />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/categories"
        element={
          <AdminRoute>
            <Categories />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/comments"
        element={
          <AdminRoute>
            <CommentModeration />
          </AdminRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
