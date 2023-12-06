'use client'

import { TriangleUpIcon } from '@radix-ui/react-icons'
import { Button } from './ui/Button'
import { useMarketBountyMemory } from '@/lib/marketBountyMemory'
import { Counter } from './Counter'

export function BountyTableUpvote({ bountyId, initialValue = 0 }: { bountyId: string; initialValue?: number }) {
  const { memory, increment } = useMarketBountyMemory()
  const bountyAmount = memory[bountyId] || initialValue

  return (
    <Button variant="outline" size="xs" className="gap-2 font-mono">
      <Counter value={bountyAmount} /> <TriangleUpIcon />
    </Button>
  )
}
