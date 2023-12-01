import { Container } from '@/components/Container'

export function Hero() {
  return (
    <div className="relative py-20 sm:pb-24 sm:pt-36">
      <Container className="relative">
        <h1 className="font-display text-5xl font-bold tracking-tighter text-blue-600 sm:text-7xl">
          <span className="sr-only">DeceptiConf - </span>A design conference for the dark side.
        </h1>
        <div className="mt-6 space-y-6 font-display text-2xl tracking-tight text-blue-900">
          <p>
            The next generation of web users are tech-savvy and suspicious. They know how to use dev tools, they can
            detect a phishing scam from a mile away, and they certainly aren’t accepting any checks from Western Union.
          </p>
          <p>
            At DeceptiConf you’ll learn about the latest dark patterns being developed to trick even the smartest
            visitors, and you’ll learn how to deploy them without ever being detected.
          </p>
        </div>
        <button href="#" className="mt-10 w-full sm:hidden">
          Get your tickets
        </button>
        <dl className="mt-10 grid grid-cols-2 gap-x-10 gap-y-6 sm:mt-16 sm:gap-x-16 sm:gap-y-10 sm:text-center lg:auto-cols-auto lg:grid-flow-col lg:grid-cols-none lg:justify-start lg:text-left">
          {[
            ['Speakers', '18'],
            ['People Attending', '2,091'],
            ['Venue', 'Staples Center'],
            ['Location', 'Los Angeles'],
          ].map(([name, value]) => (
            <div key={name}>
              <dt className="font-mono text-sm text-blue-600">{name}</dt>
              <dd className="mt-0.5 text-2xl font-semibold tracking-tight text-blue-900">{value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </div>
  )
}
