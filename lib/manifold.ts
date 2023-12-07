'use server'

import { Content } from '@tiptap/react'
import { getCookie } from 'cookies-next'
import { cookies } from 'next/headers'

const MANIFOLD_INTERNAL_API = 'https://api.manifold.markets'
const MANIFOLD_API = 'https://manifold.markets/api'

export type Bounty = {
  id: string
  slug: string
  views: 10
  totalBounty: number
  bountyLeft: number
  question: string
  creatorId: string
  groupSlugs: Array<string>
  createdTime: number
  creatorName: string
  importanceScore: number // 0-1
  lastUpdatedTime: number
  popularityScore: number // 0-1
  creatorAvatarUrl: string
  creatorUsername: string
  uniqueBettorCount: number
  creatorCreatedTime: number
  description: Content
  url: string
}

export type Comment = {
  id: string
  userId: string
  userName: string
  userUsername: string
  content: Content
  contractSlug: string
  userAvatarUrl: string
  commentId: string
  replyToCommentId?: string
  createdTime: number
  bountyAwarded?: number
}

export type User = {
  id: string
  name: string
  username: string
  avatarUrl: string
  balance: number
}

async function fetchInternalApi<T extends object>(
  method: string,
  path: string,
  body?: Record<string, string | number>,
) {
  const authKey = getCookie('MANIFOLD_AUTH_COOKIE', { cookies })

  const res = await fetch(`${MANIFOLD_INTERNAL_API}${path}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(authKey ? { Authorization: `Key ${authKey}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  })

  try {
    const json = (await res.json()) as T | { error: string } | { message: string }
    // guard against both manifold error types
    if ('error' in json) {
      throw new Error(json.error ?? 'API Error')
    } else if ('message' in json) {
      throw new Error(json.message ?? 'API Error')
    }
    return json
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function fetchApi<T extends object>(method: string, path: string, body?: Record<string, unknown>) {
  const authKey = getCookie('MANIFOLD_AUTH_COOKIE', { cookies })

  const res = await fetch(`${MANIFOLD_API}${path}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(authKey ? { Authorization: `Key ${authKey}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  })

  try {
    const json = (await res.json()) as T | { error: string } | { message: string }
    // guard against both manifold error types
    if ('error' in json) {
      throw new Error(json.error ?? 'API Error')
    } else if ('message' in json) {
      throw new Error(json.message ?? 'API Error')
    }
    return json
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function getBounties() {
  return fetchInternalApi<Array<Bounty>>('POST', '/supabasesearchcontracts', {
    contractType: 'BOUNTIED_QUESTION',
    filter: 'open',
    limit: 40,
    offset: 0,
    sort: 'bounty-amount',
    term: '',
    topicSlug: 'manifoldbountiescom',
  })
}

export async function getBountyBySlug(slug: string) {
  return fetchApi<Bounty>('GET', `/v0/slug/${slug}`)
}

export async function getComments(bountyId: string) {
  return fetchApi<Array<Comment>>('GET', `/v0/comments?contractId=${bountyId}`)
}

export async function getMe() {
  return fetchApi<User>('GET', '/v0/me')
}

export async function addComment(bountyId: string, content: Content) {
  return fetchApi<Array<Comment>>('POST', '/v0/comment', {
    contractId: bountyId,
    content,
  })
}

export async function createBounty(title: string, content: Content, totalBounty: number) {
  return fetchApi<Bounty>('POST', '/v0/market', {
    outcomeType: 'BOUNTIED_QUESTION',
    question: title,
    descriptionJson: JSON.stringify(content),
    groupIds: ['307bdc81-53c6-41f0-b8bf-6941ba90ce5f'],
    totalBounty,
  })
}

export async function addBounty(bountyId: string, amount: number) {
  return fetchApi<{ amount: number; toId: string }>('POST', `/v0/market/${bountyId}/add-bounty`, {
    amount,
  })
}
