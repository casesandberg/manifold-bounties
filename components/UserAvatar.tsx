'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'

type UserAvatarProps = {
  name: string
  src: string
  size?: 'md' | 'xl'
}

export function UserAvatar({ name, src, size = 'md' }: UserAvatarProps) {
  return (
    <Avatar className={size === 'md' ? 'h-5 w-5' : 'h-12 w-12'}>
      <AvatarImage src={src} alt={name} />
      <AvatarFallback>{name[0]}</AvatarFallback>
    </Avatar>
  )
}
