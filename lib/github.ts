'use server'

import { Content } from '@tiptap/react'
import { getCookie } from 'cookies-next'
import { cookies } from 'next/headers'

const GITHUB_API = 'https://api.github.com'

export type Issue = {
  id: number
  html_url: string
  title: string
  body: string
  user: User
  number: number
  pull_request?: unknown
  comments?: number
  created_at: string
  updated_at: string
}

export type Comment = {
  id: number
  html_url: string
  body: string
  user: User
  created_at: string
  updated_at: string
}

export type User = {
  login: string
  id: number
  avatar_url: string
}

async function fetchApi<T extends object>(method: string, path: string, body?: Record<string, unknown>) {
  const authKey = getCookie('MANIFOLD_AUTH_COOKIE', { cookies })

  const res = await fetch(`${GITHUB_API}${path}`, {
    method,
    headers: {
      Accept: 'application/vnd.github+json',
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

export async function getIssues(repoPath: `${string}/${string}`) {
  return fetchApi<Array<Issue>>('GET', `/repos/${repoPath}/issues`)
}

export async function getIssueByNumber(repoPath: `${string}/${string}`, number: number) {
  return fetchApi<Issue>('GET', `/repos/${repoPath}/issues/${number}`)
}

export async function getComments(repoPath: `${string}/${string}`, number: number) {
  return fetchApi<Array<Comment>>('GET', `/repos/${repoPath}/issues/${number}/comments`)
}
