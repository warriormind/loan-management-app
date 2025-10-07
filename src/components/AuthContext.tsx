import React, { createContext, useContext, useEffect, useState } from 'react'
import { setAuthToken } from '../utils/api'

interface User {
  id: string
  email: string
  name?: string
  role?: string
}

interface AuthContextType {
  user: User | null
  session: any
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing demo session in localStorage
    const demoSession = localStorage.getItem('loanpro-demo-session')
    if (demoSession) {
      const sessionData = JSON.parse(demoSession)
      setUser(sessionData.user)
      setSession(sessionData)
      setAuthToken('demo-token')
    }
    setLoading(false)
  }, [])

  const handleSignIn = async (email: string, password: string) => {
    try {
      // Demo authentication - accept any credentials
      if (!email || !password) {
        throw new Error('Email and password are required')
      }

      // Create a demo user based on the provided email
      const demoUser: User = {
        id: 'demo-user-' + Date.now(),
        email: email,
        name: email.split('@')[0].replace(/[^a-zA-Z0-9]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        role: 'Admin'
      }

      const demoSession = {
        user: demoUser,
        access_token: 'demo-token-' + Date.now(),
        created_at: new Date().toISOString()
      }

      // Store session in localStorage
      localStorage.setItem('loanpro-demo-session', JSON.stringify(demoSession))
      
      setUser(demoUser)
      setSession(demoSession)
      setAuthToken(demoSession.access_token)
    } catch (error) {
      console.error('Demo sign in error:', error)
      throw error
    }
  }

  const handleSignOut = async () => {
    try {
      // Clear demo session
      localStorage.removeItem('loanpro-demo-session')
      setUser(null)
      setSession(null)
      setAuthToken(null)
    } catch (error) {
      console.error('Demo sign out error:', error)
      throw error
    }
  }

  const value = {
    user,
    session,
    loading,
    signIn: handleSignIn,
    signOut: handleSignOut
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}