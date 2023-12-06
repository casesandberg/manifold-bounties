import { BountyView } from '@/components/BountyView'
import { Container } from '@/components/Container'
import { getBountyBySlug, getComments } from '@/lib/manifold'
import { SyncMarketMemory } from '@/lib/marketBountyMemory'
import { notFound } from 'next/navigation'

export default async function BountyPage({ params: { slug } }: { params: { slug: string } }) {
  const bounty = await getBountyBySlug(slug)

  if ('error' in bounty) {
    notFound()
  }
  const comments = await getComments(bounty.id)

  return (
    <Container>
      <SyncMarketMemory bounties={[bounty]} />
      <BountyView bounty={bounty} comments={comments} />
    </Container>
  )
}
