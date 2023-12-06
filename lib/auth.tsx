'use client'

import { AuthDialog } from '@/components/AuthDialog'
import { setCookie, deleteCookie } from 'cookies-next'
import { createContext, useCallback, useContext, useState } from 'react'

export const KEY = 'MANIFOLD_AUTH_COOKIE'

const AuthContext = createContext<{ authKey?: string; requestAuth: () => void; clearAuth: () => void } | null>(null)

export function AuthContextProvider({ children, initialValue }: { children: React.ReactNode; initialValue?: string }) {
  const [authKey, setAuthKey] = useState(initialValue)
  const [isVisible, setIsVisisble] = useState(false)

  const value = {
    authKey: authKey,
    requestAuth: useCallback(() => setIsVisisble(true), []),
    clearAuth: useCallback(() => {
      setAuthKey(undefined)
      deleteCookie(KEY)
    }, []),
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
      <AuthDialog
        isVisible={isVisible}
        onSubmit={(authKey) => {
          setCookie(KEY, authKey)
          setAuthKey(authKey)
        }}
        onClose={() => setIsVisisble(false)}
      />
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context == undefined) {
    throw new Error('useAuthToken must be used within an AuthContextProvider')
  }

  return context
}
