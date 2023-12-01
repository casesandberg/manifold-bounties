import { getBounties } from '@/lib/manifold'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { TriangleUpIcon } from '@radix-ui/react-icons'
import { Badge } from './ui/badge'
import { Button } from './ui/Button'
import { Avatar } from './ui/avatar'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { UserAvatar } from './UserAvatar'

export async function BountiesTable() {
  const bounties = await getBounties()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Bounty</TableHead>
          <TableHead>Proposal</TableHead>
          <TableHead>Posted by</TableHead>
          <TableHead>Created</TableHead>
          {/* <TableHead>Interested</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {bounties.map(
          ({
            id,
            question,
            creatorAvatarUrl,
            creatorUsername,
            creatorName,
            createdTime,
            totalBounty,
            uniqueBettorCount,
          }) => {
            return (
              <TableRow key={id}>
                <TableCell className="flex justify-end">
                  <Button variant="outline" size="xs" className="gap-2">
                    {totalBounty} <TriangleUpIcon />
                  </Button>
                </TableCell>
                <TableCell className="font-medium">{question}</TableCell>
                <TableCell className="text-muted-foreground">
                  <a
                    className="flex flex-row items-center gap-2"
                    href={`http://manifold.markets/${creatorUsername}`}
                    target="_blank"
                  >
                    <UserAvatar name={creatorName} src={creatorAvatarUrl} />
                    <div className="shrink-0">{creatorName}</div>
                  </a>
                </TableCell>
                <TableCell className="text-muted-foreground">
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
}
