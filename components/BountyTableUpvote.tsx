'use client'

import { TriangleUpIcon } from '@radix-ui/react-icons'
import { Button } from './ui/Button'
import { useMarketBountyMemory } from '@/lib/marketBountyMemory'
import { Counter } from './Counter'
import { useAuth } from '@/lib/auth'
import { addBounty } from '@/lib/manifold'
import { toast } from './ui/use-toast'

export function BountyTableUpvote({ bountyId, initialValue = 0 }: { bountyId: string; initialValue?: number }) {
  const { memory, increment } = useMarketBountyMemory()
  const { authKey, requestAuth } = useAuth()
  const bountyAmount = memory[bountyId] || initialValue

  const handleBounty = (amount: number) => () => {
    if (!authKey) {
      requestAuth()
      return
    }

    addBounty(bountyId, amount).then((bountyRes) => {
      if (bountyRes) {
        increment(bountyRes.toId, bountyRes.amount)
        toast({
          title: 'Bounty added!',
        })
      }
    })
  }

  return (
    <Button variant="outline" size="xs" className="gap-2 font-mono" onClick={handleBounty(10)}>
      <Counter value={bountyAmount} /> <TriangleUpIcon />
    </Button>
  )
}
