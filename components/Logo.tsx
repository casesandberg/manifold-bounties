import { Crosshair1Icon } from '@radix-ui/react-icons'

export function Logo(props: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <h3 className="font-display flex flex-row items-center text-2xl tracking-tighter text-muted-foreground">
      <Crosshair1Icon className="h-5 w-5" />
      <span>Manifold</span>
      <span className="font-bold text-primary">Bounties</span>
    </h3>
  )
}
