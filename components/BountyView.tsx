'use client'

import { Bounty } from '@/lib/manifold'
import { Button } from './ui/Button'
import { ClockIcon, TriangleUpIcon } from '@radix-ui/react-icons'
import { UserAvatar } from './UserAvatar'
import Tiptap from './Tiptap'

export type BountyViewProps = {
  bounty: Bounty
}

export function BountyView({ bounty }: BountyViewProps) {
  console.log(bounty)

  console.log(bounty.description)
  return (
    <article className="flex flex-row gap-8">
      <div className="w-[140px]">
        <Button variant="outline" className="gap-2 font-mono">
          {bounty.totalBounty} <TriangleUpIcon />
        </Button>
      </div>
      <div>
        <h1 className="text-2xl">{bounty.question}</h1>
        <div className="flex flex-row gap-6 pt-2 text-sm">
          <a
            className="flex flex-row items-center gap-2"
            href={`http://manifold.markets/${bounty.creatorUsername}`}
            target="_blank"
          >
            <UserAvatar name={bounty.creatorName} src={bounty.creatorAvatarUrl} />
            <div className="shrink-0">{bounty.creatorName}</div>
          </a>

          <div className="flex flex-row items-center gap-2">
            <ClockIcon />
            {new Date(bounty.createdTime).toLocaleDateString('en-us', { month: 'short', day: 'numeric' })}
          </div>
        </div>

        <div className="mt-4 flex flex-row gap-4">
          <Button>I NEED IT +250</Button>
          <Button variant="outline">I WANT IT +100</Button>
          <Button variant="outline">I LIKE IT +10</Button>
        </div>

        <Tiptap content={bounty.description} editable={false} className="mt-4 text-muted-foreground" />
      </div>
    </article>
  )
}
