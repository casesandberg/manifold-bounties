import { getBounties } from '@/lib/manifold'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/Table'
import Link from 'next/link'
import { UserDisplay } from './UserDisplay'
import { SyncMarketMemory } from '@/lib/marketBountyMemory'
import { BountyTableUpvote } from './BountyTableUpvote'

export async function BountiesTable() {
  try {
    const bounties = await getBounties()

    const filteredBounties = bounties.filter((bounty) => bounty.bountyLeft > 0)

    return (
      <Table>
        <SyncMarketMemory bounties={bounties} />
        <TableHeader className="hidden sm:table-header-group">
          <TableRow>
            <TableHead className="w-[100px]">Bounty</TableHead>
            <TableHead>Proposal</TableHead>
            <TableHead>Posted by</TableHead>
            <TableHead>Created</TableHead>
            {/* <TableHead>Interested</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBounties.map(
            ({
              id,
              question,
              creatorAvatarUrl,
              creatorUsername,
              creatorName,
              creatorId,
              createdTime,
              slug,
              bountyLeft,
            }) => {
              return (
                <TableRow key={id} className="flex flex-col sm:table-row">
                  <TableCell className="flex pb-0 sm:justify-end sm:pb-4">
                    <BountyTableUpvote bountyId={id} initialValue={bountyLeft} />
                  </TableCell>
                  <TableCell>
                    <Link href={`/bounty/${slug}`} className="text-base font-medium visited:text-muted-foreground">
                      {question}
                    </Link>
                  </TableCell>
                  <TableCell className="pt-0 text-muted-foreground sm:pt-4">
                    <UserDisplay
                      user={{
                        id: creatorId,
                        name: creatorName,
                        username: creatorUsername,
                        avatar: creatorAvatarUrl,
                      }}
                    />
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground sm:table-cell">
                    {new Date(createdTime).toLocaleDateString('en-us', { month: 'short', day: 'numeric' })}
                  </TableCell>
                  {/* <TableCell className="align-top text-muted-foreground">{uniqueBettorCount}</TableCell> */}
                </TableRow>
              )
            },
          )}
        </TableBody>
      </Table>
    )
  } catch (_) {
    return null
  }
}
