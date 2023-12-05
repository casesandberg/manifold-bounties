'use client'

import { Bounty, Comment, addBounty } from '@/lib/manifold'
import { Button } from './ui/Button'
import { ClockIcon, Link1Icon, TriangleUpIcon } from '@radix-ui/react-icons'
import { UserAvatar } from './UserAvatar'
import Tiptap from './Tiptap'
import { AddCommentBox } from './AddCommentBox'
import { useAuthToken } from '@/lib/auth'
import { AuthDialog } from './AuthDialog'
import { useState } from 'react'
import { useToast } from './ui/use-toast'

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
      <div className="w-[140px]">
        <div className="flex flex-col">
          <Button variant="outline" className="gap-2 font-mono" onClick={handleBounty(10)}>
            {bounty.bountyLeft} <TriangleUpIcon />
          </Button>
          <div className="bg-border py-1 text-center text-[9px] uppercase">Bounty</div>
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-medium">{bounty.question}</h1>
        <div className="flex flex-row gap-6 pt-2 text-sm">
          <a
            className="flex flex-row items-center gap-2"
            href={`http://manifold.markets/${bounty.creatorUsername}`}
            target="_blank"
          >
            <UserAvatar name={bounty.creatorName} src={bounty.creatorAvatarUrl} />
            <div className="shrink-0">{bounty.creatorName}</div>
          </a>

          <div className="flex flex-row items-center gap-1">
            <ClockIcon />
            {new Date(bounty.createdTime).toLocaleDateString('en-us', { month: 'short', day: 'numeric' })}
          </div>

          <a
            className="flex flex-row items-center gap-1 underline-offset-4 hover:text-foreground hover:underline"
            href={bounty.url}
            target="_blank"
          >
            <Link1Icon />
            Manifold
          </a>
        </div>

        <div className="mt-4 flex flex-row gap-4">
          <Button onClick={handleBounty(250)}>I NEED IT +250</Button>
          <Button variant="outline" onClick={handleBounty(100)}>
            I WANT IT +100
          </Button>
          <Button variant="outline" onClick={handleBounty(10)}>
            I LIKE IT +10
          </Button>
        </div>

        <Tiptap content={bounty.description} editable={false} className="[& a]:opacity-0 mt-4 text-muted-foreground" />

        <h3 className="mt-4 text-xl font-medium">Comments</h3>

        <div className="mb-8 mt-2 flex flex-col gap-4">
          {filteredComments.map((comment) => (
            <div key={comment.id}>
              <a
                className="inline-flex flex-row items-center gap-2"
                href={`http://manifold.markets/${comment.userName}`}
                target="_blank"
              >
                <UserAvatar name={comment.userName} src={comment.userAvatarUrl} />
                <div className="shrink-0">{comment.userName}</div>
              </a>
              <Tiptap content={comment.content} editable={false} className="text-muted-foreground" />
            </div>
          ))}
        </div>

        <AddCommentBox />
      </div>

      <AuthDialog isVisible={isVisible} onClose={() => setIsVisisble(false)} />
    </article>
  )
}
