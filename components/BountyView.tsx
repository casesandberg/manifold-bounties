'use client'

import _ from 'lodash'
import { Bounty, Comment, addBounty } from '@/lib/manifold'
import { Button } from './ui/Button'
import { ClockIcon, ExternalLinkIcon, TriangleUpIcon } from '@radix-ui/react-icons'
import Tiptap from './Tiptap'
import { AddCommentBox } from './AddCommentBox'
import { useAuth } from '@/lib/auth'
import { useToast } from './ui/use-toast'
import { UserDisplay } from './UserDisplay'
import { useMarketBountyMemory } from '@/lib/marketBountyMemory'
import { Counter } from './Counter'
import { Badge } from './ui/Badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/DropdownMenu'
import { useRouter } from 'next/navigation'

export type BountyViewProps = {
  bounty: Bounty
  comments: Array<Comment>
}

export function BountyView({ bounty, comments }: BountyViewProps) {
  const { authKey, requestAuth } = useAuth()
  const orderedComments = _.orderBy(comments, 'createdTime', 'asc')
  const filteredComments = orderedComments.filter((comment) => !comment.replyToCommentId)
  const { toast } = useToast()
  const { memory, increment } = useMarketBountyMemory()
  const router = useRouter()
  const bountyAmount = memory[bounty.id] || bounty.bountyLeft

  const handleBounty = (amount: number) => () => {
    if (!authKey) {
      requestAuth()
      return
    }

    addBounty(bounty.id, amount).then((bountyRes) => {
      if (bountyRes && 'success' in bountyRes) {
        router.refresh()
        // increment(bountyRes.toId, bountyRes.amount)
        toast({
          title: 'Bounty added!',
        })
      }
    })
  }

  return (
    <article className="flex flex-col gap-8 sm:flex-row">
      <div className="relative w-[150px]">
        <div className="sticky top-8 flex flex-col">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="lg" className="gap-2 font-mono text-xl">
                <Counter value={bountyAmount} height={42} /> <TriangleUpIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-26 w-26 font-mono" align="end" forceMount>
              <DropdownMenuItem onClick={handleBounty(100)}>Add +100</DropdownMenuItem>
              <DropdownMenuItem onClick={handleBounty(500)}>Add +500</DropdownMenuItem>
              <DropdownMenuItem onClick={handleBounty(1000)}>Add +1000</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="bg-border py-1 text-center text-[9px] uppercase">Bounty</div>

          <div className="mt-12 hidden flex-col gap-2 sm:flex">
            <Button variant="outline" onClick={handleBounty(1000)} size="sm" className="font-mono">
              I NEED IT +1000
            </Button>
            <Button variant="outline" onClick={handleBounty(500)} size="sm" className="font-mono">
              I WANT IT +500
            </Button>
            <Button variant="outline" onClick={handleBounty(100)} size="sm" className="font-mono">
              I LIKE IT +100
            </Button>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-medium">{bounty.question}</h1>
        <div className="flex flex-row gap-6 pt-2 text-sm">
          <UserDisplay
            user={{
              id: bounty.creatorId,
              name: bounty.creatorName,
              username: bounty.creatorUsername,
              avatar: bounty.creatorAvatarUrl,
            }}
          />

          <div className="flex flex-row items-center gap-1">
            <ClockIcon />
            {new Date(bounty.createdTime).toLocaleDateString('en-us', { month: 'short', day: 'numeric' })}
          </div>

          <a
            className="flex flex-row items-center gap-1 underline-offset-4 hover:text-foreground hover:underline"
            href={bounty.url}
            target="_blank"
          >
            Manifold
            <ExternalLinkIcon />
          </a>
        </div>

        <Tiptap content={bounty.description} editable={false} className="[& a]:opacity-0 mt-4 text-muted-foreground" />

        <h3 className="mt-12 text-xl font-medium">Comments</h3>

        <div className="mb-8 mt-4 flex flex-col gap-4">
          {filteredComments.map((comment) => (
            <div key={comment.id}>
              <div className="flex flex-row items-center gap-4">
                <UserDisplay
                  user={{
                    id: comment.userId,
                    name: comment.userName,
                    username: comment.userUsername,
                    avatar: comment.userAvatarUrl,
                  }}
                />
                <div className="text-sm text-muted-foreground">
                  {new Date(comment.createdTime).toLocaleDateString('en-us', { month: 'short', day: 'numeric' })}
                </div>

                {comment.bountyAwarded ? (
                  <Badge variant="default" className="font-mono uppercase">
                    {comment.bountyAwarded} awarded
                  </Badge>
                ) : null}
              </div>
              <div className="ml-2.5 border-l-2 pl-4">
                <Tiptap content={comment.content} editable={false} className="text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>

        <AddCommentBox bountyId={bounty.id} />
      </div>
    </article>
  )
}
