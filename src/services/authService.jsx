import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const AuthContext = createContext(null)

const api = axios.create({
  baseURL: 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('assetflow_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('assetflow_token')
    const userData = localStorage.getItem('assetflow_user')

    if (token && userData) {
      setUser(JSON.parse(userData))
    }
    setLoading(false)
  }, [])

  const login = async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials)
      const { token, user: userPayload } = response.data

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
      const response = await api.post('/auth/signup', data)
      toast.success('Signup successful. Please log in.')
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
