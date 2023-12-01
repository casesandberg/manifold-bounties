'use client'

import Link from 'next/link'

import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...props}>
      <Link
        href="/"
        className={cn(
          'flex-shrink-0 text-sm font-medium transition-colors hover:text-primary',
          pathname !== '/' && ' text-muted-foreground',
        )}
      >
        Top Proposals
      </Link>
      <Link
        href="/new"
        className={cn(
          'text-sm font-medium transition-colors hover:text-primary',
          pathname !== '/new' && ' text-muted-foreground',
        )}
      >
        New
      </Link>
      <Link
        href="/complete"
        className={cn(
          'text-sm font-medium transition-colors hover:text-primary',
          pathname !== '/complete' && ' text-muted-foreground',
        )}
      >
        Complete
      </Link>
    </nav>
  )
}
