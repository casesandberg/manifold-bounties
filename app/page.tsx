import { BountiesTable } from '@/components/BountiesTable'
import { Container } from '@/components/Container'
import { Hero } from '@/components/Hero'

export default function Home() {
  return (
    <>
      <Hero />
      <Container>
        <BountiesTable />
      </Container>
    </>
  )
}
