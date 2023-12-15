'use client'

import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { Button } from './ui/Button'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/DropdownMenu'
import { UserAvatar } from './UserAvatar'
import { useRouter } from 'next/navigation'
import { PersonIcon } from '@radix-ui/react-icons'
import { signIn, signOut, useSession } from 'next-auth/react'

export function Header() {
  const router = useRouter()
  const { data: session, status } = useSession()

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
          {/* <Button variant="outline" size="sm" onClick={() => router.push('/create')}>
            <span className="hidden sm:block">Create Proposal</span>
            <span className="block sm:hidden">Create</span>
          </Button> */}

          {status === 'authenticated' ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative ml-1 h-8 w-8 rounded-full">
                  <UserAvatar name={session.user.name} src={''} size="lg" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{session.user.name}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => signIn('beeminder')}>
              <PersonIcon />
            </Button>
          )}
        </div>
      </Container>
    </header>
  )
}
