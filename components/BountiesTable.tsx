import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/Table'
import Link from 'next/link'
import { UserDisplay } from './UserDisplay'
import { BountyTableUpvote } from './BountyTableUpvote'
import { getIssues } from '@/lib/github'

export async function BountiesTable() {
  try {
    const issues = await getIssues('beeminder/apidocs')

    const filteredBounties = issues.filter((issue) => {
      return !issue.pull_request // Github PRs are also issues
    })

    return (
      <Table>
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
          {filteredBounties.map(({ id, number, title, user, created_at }) => {
            return (
              <TableRow key={id} className="flex flex-col sm:table-row">
                <TableCell className="flex pb-0 sm:justify-end sm:pb-4">
                  <BountyTableUpvote issueId={number} initialValue={1} />
                </TableCell>
                <TableCell>
                  <Link href={`/bounty/${number}`} className="text-base font-medium visited:text-muted-foreground">
                    {title}
                  </Link>
                </TableCell>
                <TableCell className="pt-0 text-muted-foreground sm:pt-4">
                  <UserDisplay
                    user={{
                      id: user.id,
                      username: user.login,
                      avatar: user.avatar_url,
                    }}
                  />
                </TableCell>
                <TableCell className="hidden text-muted-foreground sm:table-cell">
                  {new Date(created_at).toLocaleDateString('en-us', { month: 'short', day: 'numeric' })}
                </TableCell>
                {/* <TableCell className="align-top text-muted-foreground">{uniqueBettorCount}</TableCell> */}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    )
  } catch (_) {
    return null
  }
}
