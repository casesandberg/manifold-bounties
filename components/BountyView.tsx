'use client'

import { Bounty, Comment, addBounty } from '@/lib/manifold'
import { Button } from './ui/Button'
import { ClockIcon, ExternalLinkIcon, TriangleUpIcon } from '@radix-ui/react-icons'
import { UserAvatar } from './UserAvatar'
import Tiptap from './Tiptap'
import { AddCommentBox } from './AddCommentBox'
import { useAuthToken } from '@/lib/auth'
import { AuthDialog } from './AuthDialog'
import { useState } from 'react'
import { useToast } from './ui/use-toast'
import { UserDisplay } from './UserDisplay'

export type BountyViewProps = {
  bounty: Bounty
  comments: Array<Comment>
}

export function BountyView({ bounty, comments }: BountyViewProps) {
  const [isVisible, setIsVisisble] = useState(false)
  const authToken = useAuthToken()
  const filteredComments = comments.filter((comment) => !comment.replyToCommentId)
  const { toast } = useToast()

  const handleBounty = (amount: number) => () => {
    if (!authToken) {
      setIsVisisble(true)
      return
    }

    addBounty(bounty.id, amount, authToken)
      .then(() => {
        toast({
          title: 'Bounty added!',
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <article className="flex flex-row gap-8">
      <div className="relative w-[140px]">
        <div className="sticky top-8 flex flex-col">
          <Button variant="outline" size="lg" className="gap-2 font-mono" onClick={handleBounty(10)}>
            {bounty.bountyLeft} <TriangleUpIcon />
          </Button>
          <div className="bg-border py-1 text-center text-[9px] uppercase">Bounty</div>

          <div className="mt-12 flex flex-col gap-2">
            <Button onClick={handleBounty(1000)} size="sm">
              I NEED IT <span className="ml-2 font-mono">+1000</span>
            </Button>
            <Button variant="outline" onClick={handleBounty(250)} size="sm">
              I WANT IT <span className="ml-2 font-mono">+250</span>
            </Button>
            <Button variant="outline" onClick={handleBounty(10)} size="sm">
              I LIKE IT <span className="ml-2 font-mono">+10</span>
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
              </div>
              <div className="ml-2.5 border-l-2 pl-4">
                <Tiptap content={comment.content} editable={false} className="text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>

        <AddCommentBox />
      </div>

      <AuthDialog isVisible={isVisible} onClose={() => setIsVisisble(false)} />
    </article>
  )
}
