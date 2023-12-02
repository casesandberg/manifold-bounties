import { BountyView } from '@/components/BountyView'
import { Container } from '@/components/Container'
import { getBountyBySlug } from '@/lib/manifold'

export default async function BountyPage({ params: { slug } }: { params: { slug: string } }) {
  const bounty = await getBountyBySlug(slug)

  return (
    <Container>
      <BountyView bounty={bounty} />
    </Container>
  )
}
