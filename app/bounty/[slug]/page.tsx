import { BountyView } from '@/components/BountyView'
import { Container } from '@/components/Container'
import { getBountyBySlug, getComments } from '@/lib/manifold'
import { SyncMarketMemory } from '@/lib/marketBountyMemory'

export default async function BountyPage({ params: { slug } }: { params: { slug: string } }) {
  const bounty = await getBountyBySlug(slug)
  const comments = await getComments(bounty.id)

  return (
    <Container>
      <SyncMarketMemory bounties={[bounty]} />
      <BountyView bounty={bounty} comments={comments} />
    </Container>
  )
}
