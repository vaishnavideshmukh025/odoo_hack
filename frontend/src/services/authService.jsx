import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from './apiService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const hydrateUser = async () => {
      const token = localStorage.getItem('assetflow_token')
      const userData = localStorage.getItem('assetflow_user')

      if (!token) {
        setLoading(false)
        return
      }

      if (userData) {
        setUser(JSON.parse(userData))
        setLoading(false)
        return
      }

      try {
        const response = await api.get('/auth/me')
        const profile = response.data?.data
        if (profile) {
          localStorage.setItem('assetflow_user', JSON.stringify(profile))
          setUser(profile)
        }
      } catch (error) {
        localStorage.removeItem('assetflow_token')
        localStorage.removeItem('assetflow_user')
      } finally {
        setLoading(false)
      }
    }

    hydrateUser()
  }, [])

  const login = async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials)
      const { token, user: userPayload } = response.data.data

      localStorage.setItem('assetflow_token', token)
      localStorage.setItem('assetflow_user', JSON.stringify(userPayload))
      setUser(userPayload)

      return userPayload
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.')
      throw error
    }
  }

  const signup = async (data) => {
    try {
      const response = await api.post('/auth/register', data)
      toast.success(response.data.message || 'Signup successful. Please log in.')
      return response.data
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed.')
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('assetflow_token')
    localStorage.removeItem('assetflow_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, api }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
