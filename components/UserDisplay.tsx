import { ExternalLinkIcon } from '@radix-ui/react-icons'
import { UserAvatar } from './UserAvatar'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/HoverCard'

export type UserDisplayProps = {
  user: {
    id: string
    name: string
    username: string
    avatar: string
  }
}
export function UserDisplay({ user }: UserDisplayProps) {
  return (
    <HoverCard>
      <HoverCardTrigger className="inline-flex cursor-pointer flex-row items-center gap-2">
        <UserAvatar name={user.name} src={user.avatar} />
        <div className="shrink-0">{user.name}</div>
      </HoverCardTrigger>
      <HoverCardContent className="flex flex-col">
        <div className="flex flex-row gap-2">
          <UserAvatar size="xl" name={user.name} src={user.avatar} />

          <div className="flex flex-col">
            <div className="text-lg font-medium">{user.name}</div>
            <div className="text-sm text-muted-foreground">@{user.username}</div>
          </div>
        </div>

        <a
          className="mt-4 flex flex-row items-center gap-1 text-sm underline underline-offset-4 hover:text-foreground"
          href={`http://manifold.markets/${user.username}`}
          target="_blank"
        >
          Manifold Profile
          <ExternalLinkIcon />
        </a>
      </HoverCardContent>
    </HoverCard>
  )
}
