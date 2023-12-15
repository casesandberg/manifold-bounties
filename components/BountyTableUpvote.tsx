'use client'

import { TriangleUpIcon } from '@radix-ui/react-icons'
import { Button } from './ui/Button'
import { useMarketBountyMemory } from '@/lib/marketBountyMemory'
import { Counter } from './Counter'
import { toast } from './ui/use-toast'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/DropdownMenu'
import { addBounty } from '@/lib/beeminder'

export function BountyTableUpvote({ issueId, initialValue = 0 }: { issueId: number; initialValue?: number }) {
  const { memory, increment } = useMarketBountyMemory()
  const bountyAmount = memory[issueId] || initialValue

  const handleBounty = (amount: number) => () => {
    addBounty(issueId, amount)
      .then(() => {
        increment(issueId, amount)
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
