import { Bounty, Comment } from '@/lib/manifold'
import { Button } from './ui/Button'
import { ClockIcon, TriangleUpIcon } from '@radix-ui/react-icons'
import { UserAvatar } from './UserAvatar'
import Tiptap from './Tiptap'
import { AddCommentBox } from './AddCommentBox'

export type BountyViewProps = {
  bounty: Bounty
  comments: Array<Comment>
}

export async function BountyView({ bounty, comments }: BountyViewProps) {
  const filteredComments = comments.filter((comment) => !comment.replyToCommentId)

  return (
    <article className="flex flex-row gap-8">
      <div className="w-[140px]">
        <Button variant="outline" className="gap-2 font-mono">
          {bounty.totalBounty} <TriangleUpIcon />
        </Button>
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
    </article>
  )
}
