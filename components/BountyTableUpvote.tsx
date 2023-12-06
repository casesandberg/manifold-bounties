'use client'

import { TriangleUpIcon } from '@radix-ui/react-icons'
import { Button } from './ui/Button'
import { useMarketBountyMemory } from '@/lib/marketBountyMemory'
import { Counter } from './Counter'
import { useAuth } from '@/lib/auth'
import { addBounty } from '@/lib/manifold'
import { toast } from './ui/use-toast'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/DropdownMenu'

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="xs" className="gap-2 font-mono">
          <Counter value={bountyAmount} /> <TriangleUpIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-26 w-26 font-mono" align="end" forceMount>
        <DropdownMenuItem onClick={handleBounty(100)}>Add +100</DropdownMenuItem>
        <DropdownMenuItem onClick={handleBounty(500)}>Add +500</DropdownMenuItem>
        <DropdownMenuItem onClick={handleBounty(1000)}>Add +1000</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
