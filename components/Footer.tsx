import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'

export function Footer() {
  return (
    <footer className="flex-none py-16">
      <Container className="flex flex-col items-center justify-center">
        <p className="mt-6 text-sm text-muted-foreground md:mt-0">
          Made by <a href="https://github.com/casesandberg">case</a> for{' '}
          <a href="https://manifold.markets/">Manifold</a>
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          <a href="https://manifold.markets/case?tab=payments&a=100">Say thanks with Mana</a>
        </p>
      </Container>
    </footer>
  )
}
