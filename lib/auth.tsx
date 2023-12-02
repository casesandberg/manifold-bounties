'use client'

import { getCookie, setCookie } from 'cookies-next'
import { createContext, useContext } from 'react'

const KEY = 'MANIFOLD_AUTH_COOKIE'

const AuthContext = createContext<{ apiKey: string } | null>(null)

export const setAuthCookie = (value: string) => {
  setCookie(KEY, value)
}

export const getAuthCookie = () => {
  return getCookie(KEY)
}

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const cookie = getCookie(KEY)
  return <AuthContext.Provider value={cookie ? { apiKey: cookie } : null}>{children}</AuthContext.Provider>
}

export function useAuthToken() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthToken must be used within an AuthContextProvider')
  }

  if (context) {
    return context.apiKey
  }

  return null
}
