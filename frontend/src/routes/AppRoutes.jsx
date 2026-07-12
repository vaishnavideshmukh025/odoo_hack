import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import ForgotPassword from '../pages/ForgotPassword'
import Dashboard from '../pages/Dashboard'
import Departments from '../pages/Departments'
import Employees from '../pages/Employees'
import Categories from '../pages/Categories'
import Profile from '../pages/Profile'
import Reports from '../pages/Reports'
import ProtectedRoute from '../components/ProtectedRoute'
import { useAuth } from '../services/authService.jsx'

function AppRoutes() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/"
        element={
          <ProtectedRoute isAuthenticated={Boolean(user)}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/departments"
        element={
          <ProtectedRoute isAuthenticated={Boolean(user)}>
            <Departments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employees"
        element={
          <ProtectedRoute isAuthenticated={Boolean(user)}>
            <Employees />
          </ProtectedRoute>
        }
      />
      <Route
        path="/categories"
        element={
          <ProtectedRoute isAuthenticated={Boolean(user)}>
            <Categories />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute isAuthenticated={Boolean(user)}>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute isAuthenticated={Boolean(user)}>
            <Reports />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to={user ? '/' : '/login'} replace />} />
    </Routes>
  )
}

export default AppRoutes
