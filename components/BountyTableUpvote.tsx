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
import { useRouter } from 'next/navigation'

export function BountyTableUpvote({ bountyId, initialValue = 0 }: { bountyId: string; initialValue?: number }) {
  const { memory, increment } = useMarketBountyMemory()
  const { authKey, requestAuth } = useAuth()
  const bountyAmount = memory[bountyId] || initialValue
  const router = useRouter()

  const handleBounty = (amount: number) => () => {
    if (!authKey) {
      requestAuth()
      return
    }

    addBounty(bountyId, amount)
      .then(() => {
        increment(bountyId, amount)
        toast({
          title: 'Bounty added!',
        })
      })
      .catch((error) => {
        toast({
          title: 'There was an error adding your bounty',
          description: error.message,
          variant: 'destructive',
        })
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
