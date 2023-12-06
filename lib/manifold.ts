'use server'

import { Content } from '@tiptap/react'
import { getCookie } from 'cookies-next'
import { cookies } from 'next/headers'

const MANIFOLD_API = 'https://api.manifold.markets'
const MANIFOLD_OLD_API = 'https://manifold.markets/api/v0'

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
}

export type User = {
  id: string
  name: string
  username: string
  avatarUrl: string
  balance: number
}

async function fetchApi<T>(path: string, body?: Record<string, string | number>, headers?: Record<string, string>) {
  const authKey = getCookie('MANIFOLD_AUTH_COOKIE', { cookies })

  const res = await fetch(`${MANIFOLD_API}${path}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(authKey ? { Authorization: `Key ${authKey}` } : {}),
      ...headers,
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  })

  try {
    return res.json() as T
  } catch (error) {
    console.log(error)
    throw new Error('API Error')
  }
}

async function fetchOldApi<T>(path: string, body?: Record<string, string | number>, headers?: Record<string, string>) {
  const authKey = getCookie('MANIFOLD_AUTH_COOKIE', { cookies })

  const res = await fetch(`${MANIFOLD_OLD_API}${path}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(authKey ? { Authorization: `Key ${authKey}` } : {}),
      ...headers,
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  })

  try {
    return res.json() as T
  } catch (error) {
    console.log(error)
    throw new Error('API Error')
  }
}

async function getOldApi<T>(path: string, headers?: Record<string, string>) {
  const authKey = getCookie('MANIFOLD_AUTH_COOKIE', { cookies })

  const res = await fetch(`${MANIFOLD_OLD_API}${path}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(authKey ? { Authorization: `Key ${authKey}` } : {}),
      ...headers,
    },
    cache: 'no-store',
  })

  try {
    return res.json() as T
  } catch (error) {
    console.log(error)
    throw new Error('API Error')
  }
}

export async function getBounties() {
  const bounties = await fetchApi<Array<Bounty>>('/supabasesearchcontracts', {
    contractType: 'BOUNTIED_QUESTION',
    filter: 'open',
    limit: 40,
    offset: 0,
    sort: 'bounty-amount',
    term: '',
    topicSlug: 'manifoldbountiescom',
  })
  return bounties
}

export async function getBountyBySlug(slug: string) {
  const bounty = await fetchOldApi<Bounty>(`/slug/${slug}`)
  return bounty
}

export async function getComments(bountyId: string) {
  const bounty = await fetchOldApi<Array<Comment>>(`/comments?contractId=${bountyId}`)
  return bounty
}

export async function getMe() {
  return getOldApi<User | { message: string }>(`/me`)
}

export async function addBounty(bountyId: string, amount: number, authKey: string) {
  try {
    return await fetchApi<{ amount: number; toId: string }>(
      `/add-bounty`,
      {
        amount,
        contractId: bountyId,
      },
      {
        Authorization: `Key ${authKey}`,
      },
    )
  } catch (error) {
    console.log(error)
  }
}
