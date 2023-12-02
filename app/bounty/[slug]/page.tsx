import { BountyView } from '@/components/BountyView'
import { Container } from '@/components/Container'
import { getBountyBySlug, getComments } from '@/lib/manifold'

export default async function BountyPage({ params: { slug } }: { params: { slug: string } }) {
  const bounty = await getBountyBySlug(slug)
  const comments = await getComments(bounty.id)

  return (
    <Container>
      <BountyView bounty={bounty} comments={comments} />
    </Container>
  )
}
