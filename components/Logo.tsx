import { Crosshair1Icon } from '@radix-ui/react-icons'

export function Logo(props: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <h3 className="font-display flex flex-row items-center text-lg tracking-tighter text-muted-foreground sm:text-2xl">
      <Crosshair1Icon className="h-3 w-3 sm:h-5 sm:w-5" />
      <span>Manifold</span>
      <span className="font-bold text-primary">Bounties</span>
    </h3>
  )
}
