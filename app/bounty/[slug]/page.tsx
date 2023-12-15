import { BountyView } from '@/components/BountyView'
import { Container } from '@/components/Container'
import { getComments, getIssueByNumber } from '@/lib/github'
import { SyncMarketMemory } from '@/lib/marketBountyMemory'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }) {
  try {
    const issue = await getIssueByNumber('beeminder/apidocs', parseInt(slug))

    return {
      title: issue.title,
    }
  } catch (error) {
    return {
      title: 'Not found',
    }
  }
}

export default async function BountyPage({ params: { slug } }: { params: { slug: string } }) {
  try {
    const issue = await getIssueByNumber('beeminder/apidocs', parseInt(slug))
    const comments = await getComments('beeminder/apidocs', parseInt(slug))

    return (
      <Container>
        <SyncMarketMemory bounties={[issue]} />
        <BountyView issue={issue} comments={comments} />
      </Container>
    )
  } catch (error) {
    notFound()
  }
}
