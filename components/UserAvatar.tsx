'use client'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

type UserAvatarProps = {
  name: string
  src: string
}

export function UserAvatar({ name, src }: UserAvatarProps) {
  return (
    <Avatar className="h-5 w-5">
      <AvatarImage src={src} alt={name} />
      <AvatarFallback>{name[0]}</AvatarFallback>
    </Avatar>
  )
}
