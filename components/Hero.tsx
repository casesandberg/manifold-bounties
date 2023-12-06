import { Container } from '@/components/Container'
import { Button } from './ui/Button'

export function Hero() {
  return (
    <div className="relative py-20 sm:pb-24 sm:pt-36">
      <Container className="relative">
        <h1 className="font-display text-5xl font-bold tracking-tighter text-primary sm:text-7xl">
          <span className="sr-only">Manifold Community Bounties - </span>Build Manifold Together
        </h1>
        <div className="font-display mt-6 space-y-6 text-2xl tracking-tight text-muted-foreground">
          <p>
            Do you have an idea for a Manifold feature? Create and boost bounties with mana to entice our community to
            bring these feature to life!
          </p>
        </div>
        {/* <Button className="mt-10 w-full sm:hidden">Get your tickets</Button>
        <dl className="mt-10 grid grid-cols-2 gap-x-10 gap-y-6 sm:mt-16 sm:gap-x-16 sm:gap-y-10 sm:text-center lg:auto-cols-auto lg:grid-flow-col lg:grid-cols-none lg:justify-start lg:text-left">
          {[
            ['Speakers', '18'],
            ['People Attending', '2,091'],
            ['Venue', 'Staples Center'],
            ['Location', 'Los Angeles'],
          ].map(([name, value]) => (
            <div key={name}>
              <dt className="font-mono text-sm text-primary">{name}</dt>
              <dd className="mt-0.5 text-2xl font-semibold tracking-tight text-muted-foreground">{value}</dd>
            </div>
          ))}
        </dl> */}
      </Container>
    </div>
  )
}
