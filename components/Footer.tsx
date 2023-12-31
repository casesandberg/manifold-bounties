import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { ThemeModeToggle } from './ThemeModeToggle'
import { CardStackPlusIcon } from '@radix-ui/react-icons'

export function Footer() {
  return (
    <footer className="flex-none pb-8 pt-16">
      <div className="fixed bottom-4 left-4 hidden sm:block">
        <ThemeModeToggle />
      </div>

      <Container className="flex flex-col items-center justify-center gap-2">
        <p className="text-sm text-muted-foreground">
          Made by{' '}
          <a href="https://github.com/casesandberg" className="underline underline-offset-4 hover:text-foreground">
            case
          </a>{' '}
          for{' '}
          <a href="https://manifold.markets/" className="underline underline-offset-4 hover:text-foreground">
            Manifold
          </a>
        </p>

        <p className="text-sm text-muted-foreground">
          <a
            href="https://manifold.markets/case?tab=payments&a=100"
            className="flex flex-row items-center gap-2 underline-offset-4 hover:text-foreground hover:underline"
          >
            <CardStackPlusIcon className="inline" />
            Say thanks with mana
          </a>
        </p>

        <p className="text-sm text-muted-foreground">
          <a
            href="https://github.com/casesandberg/manifold-bounties"
            className="flex flex-row items-center gap-2 underline-offset-4 hover:text-foreground hover:underline"
          >
            Open Source on Github
          </a>
        </p>
      </Container>
    </footer>
  )
}
