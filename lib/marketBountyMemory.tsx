'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { Bounty } from './manifold'

type MarketBountyMemory = Record<string, number>

const MarketBountyMemoryContext = createContext<{
  memory: MarketBountyMemory
  setMemory: (memory: MarketBountyMemory) => void
  increment: (marketId: string, amount: number) => void
} | null>(null)

export function MarketBountyMemoryContextProvider({ children }: { children: React.ReactNode }) {
  const [memory, setMemory] = useState<MarketBountyMemory>({})

  const value = {
    memory,
    setMemory: useCallback((memory: MarketBountyMemory) => setMemory((prev) => ({ ...prev, ...memory })), []),
    increment: useCallback(
      (marketId: string, amount: number) =>
        setMemory((prev) => ({ ...prev, [marketId]: (prev[marketId] || 0) + amount })),
      [],
    ),
  }

  return <MarketBountyMemoryContext.Provider value={value}>{children}</MarketBountyMemoryContext.Provider>
}

export function useMarketBountyMemory() {
  const context = useContext(MarketBountyMemoryContext)
  if (context == undefined) {
    throw new Error('useMarketBountyMemory must be used within an MarketBountyMemoryContextProvider')
  }

  return context
}

export function SyncMarketMemory({ bounties }: { bounties: Array<Bounty> }) {
  const { setMemory } = useMarketBountyMemory()

  useEffect(() => {
    setMemory(bounties.reduce((acc, bounty) => ({ ...acc, [bounty.id]: bounty.bountyLeft }), {}))
  }, [bounties, setMemory])

  return null
}
