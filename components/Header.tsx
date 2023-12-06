'use client'

import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { Button } from './ui/Button'
import Link from 'next/link'
import { useUser } from '@/lib/user'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/DropdownMenu'
import { UserAvatar } from './UserAvatar'
import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/navigation'

export function Header() {
  const user = useUser()
  const { requestAuth, clearAuth } = useAuth()
  const router = useRouter()

  return (
    <header className="relative z-50 flex-none p-6">
      <Container className="flex flex-wrap items-center justify-between lg:flex-nowrap">
        <div className="flex flex-row gap-4">
          <Link href="/">
            <Logo className="h-12 w-auto" />
          </Link>

          {/* <MainNav /> */}
        </div>

        <div className="hidden grow flex-row items-center justify-end gap-4 sm:flex">
          <Button variant="outline" size="sm" onClick={() => router.push('/create')}>
            Write Proposal
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <UserAvatar name={user.name} src={user.avatarUrl} size="lg" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">@{user.username}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={clearAuth}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="sm" onClick={requestAuth}>
              Login
            </Button>
          )}
        </div>
      </Container>
    </header>
  )
}
