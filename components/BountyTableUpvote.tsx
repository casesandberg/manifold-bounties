'use client'

import { TriangleUpIcon } from '@radix-ui/react-icons'
import { Button } from './ui/Button'
import { useMarketBountyMemory } from '@/lib/marketBountyMemory'

export function BountyTableUpvote({ bountyId }: { bountyId: string }) {
  const { memory, increment } = useMarketBountyMemory()
  const bountyAmount = memory[bountyId]

  return (
    <Button variant="outline" size="xs" className="gap-2 font-mono">
      {bountyAmount} <TriangleUpIcon />
    </Button>
  )
}
