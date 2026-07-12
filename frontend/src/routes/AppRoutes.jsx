import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import ForgotPassword from '../pages/ForgotPassword'
import Dashboard from '../pages/Dashboard'
import Vehicles from '../pages/Vehicles'
import Breakdowns from '../pages/Breakdowns'
import Mechanics from '../pages/Mechanics'
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
        path="/vehicles"
        element={
          <ProtectedRoute isAuthenticated={Boolean(user)}>
            <Vehicles />
          </ProtectedRoute>
        }
      />
      <Route
        path="/breakdowns"
        element={
          <ProtectedRoute isAuthenticated={Boolean(user)}>
            <Breakdowns />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mechanics"
        element={
          <ProtectedRoute isAuthenticated={Boolean(user)}>
            <Mechanics />
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
