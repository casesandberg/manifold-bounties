import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { ThemeModeToggle } from './ThemeModeToggle'

export function Footer() {
  return (
    <footer className="flex-none py-16">
      <div className="fixed bottom-4 left-4">
        <ThemeModeToggle />
      </div>

      <Container className="flex flex-col items-center justify-center gap-4">
        <p className="mt-6 text-sm text-muted-foreground md:mt-0">
          Made by{' '}
          <a href="https://github.com/casesandberg" className="underline-offset-4 hover:underline">
            case
          </a>{' '}
          for{' '}
          <a href="https://manifold.markets/" className="underline-offset-4 hover:underline">
            Manifold
          </a>
        </p>

        <p className="mt-6 text-sm text-muted-foreground md:mt-0">
          <a href="https://manifold.markets/case?tab=payments&a=100" className="underline-offset-4 hover:underline">
            Say thanks with mana
          </a>
        </p>
      </Container>
    </footer>
  )
}
