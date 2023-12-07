import { BountyView } from '@/components/BountyView'
import { Container } from '@/components/Container'
import { getBountyBySlug, getComments } from '@/lib/manifold'
import { SyncMarketMemory } from '@/lib/marketBountyMemory'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }) {
  try {
    const bounty = await getBountyBySlug(slug)

    return {
      title: bounty.question,
    }
  } catch (error) {
    return {
      title: 'Not found',
    }
  }
}

export default async function BountyPage({ params: { slug } }: { params: { slug: string } }) {
  try {
    const bounty = await getBountyBySlug(slug)
    const comments = await getComments(bounty.id)

    return (
      <Container>
        <SyncMarketMemory bounties={[bounty]} />
        <BountyView bounty={bounty} comments={comments} />
      </Container>
    )
  } catch (error) {
    notFound()
  }
}
