import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser({ token })
    }
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { username, password })
      localStorage.setItem('token', res.data.token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
      setUser({ token: res.data.token })
      return true
    } catch (error) {
      return false
    }
  }

  const register = async (username, password) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, { username, password })
      localStorage.setItem('token', res.data.token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
      setUser({ token: res.data.token })
      return true
    } catch (error) {
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    setUser(null)
  }

  const value = {
    user,
    login,
    register,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}