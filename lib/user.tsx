'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { Bounty, User, getMe } from './manifold'
import { useAuth } from './auth'
import { toast } from '@/components/ui/use-toast'

const UserContext = createContext<User | null>(null)

export function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const { authKey, clearAuth, requestAuth } = useAuth()

  useEffect(() => {
    if (authKey && !user) {
      getMe()
        .then((res) => {
          if ('message' in res) {
            toast({
              title: 'There was an error with your API Key. Please add it again',
              variant: 'destructive',
            })
            clearAuth()
            requestAuth()
          } else {
            setUser(res)
          }
        })
        .catch(() => {
          toast({
            title: 'There was an error with your API Key. Please add it again',
            variant: 'destructive',
          })
          clearAuth()
          requestAuth()
        })
    } else if (user) {
      setUser(null)
    }
  }, [authKey])

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  return context
}
