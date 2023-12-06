'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { Bounty, User, getMe } from './manifold'
import { useAuthToken } from './auth'

const UserContext = createContext<User | null>(null)

export function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const authToken = useAuthToken()

  useEffect(() => {
    if (authToken != null) {
      getMe(authToken).then(setUser)
    }
  }, [authToken])

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  return context
}
