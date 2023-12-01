import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { Button } from './ui/Button'

export function Header() {
  return (
    <header className="relative z-50 flex-none pt-8">
      <Container className="flex flex-wrap items-center justify-between lg:flex-nowrap">
        <div className="flex flex-row gap-4">
          <Logo className="h-12 w-auto text-slate-900" />

          {/* <MainNav /> */}
        </div>

        <div className="hidden grow flex-row justify-end gap-4 sm:flex">
          <Button variant="outline" size="sm">
            Login with Manifold
          </Button>
        </div>
      </Container>
    </header>
  )
}
