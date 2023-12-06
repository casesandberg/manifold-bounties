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
import { PersonIcon } from '@radix-ui/react-icons'

export function Header() {
  const user = useUser()
  const { requestAuth, clearAuth } = useAuth()
  const router = useRouter()

  return (
    <header className="relative z-50 flex-none px-0 py-4 sm:p-6">
      <Container className="flex flex-wrap items-center justify-between lg:flex-nowrap">
        <div className="flex flex-row gap-4">
          <Link href="/">
            <Logo className="h-12 w-auto" />
          </Link>

          {/* <MainNav /> */}
        </div>

        <div className="flex grow flex-row items-center justify-end gap-2 sm:gap-4">
          <Button variant="outline" size="sm" onClick={() => router.push('/create')}>
            <span className="hidden sm:block">Create Proposal</span>
            <span className="block sm:hidden">Create</span>
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative ml-1 h-8 w-8 rounded-full">
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
            <Button variant="outline" size="icon" className="h-9 w-9" onClick={requestAuth}>
              <PersonIcon />
            </Button>
          )}
        </div>
      </Container>
    </header>
  )
}
