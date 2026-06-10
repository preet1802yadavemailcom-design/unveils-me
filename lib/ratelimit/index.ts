import { NextRequest } from 'next/server'

export function makeId(req: NextRequest, userId?: string): string {
  if (userId) return userId
  return req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'anonymous'
}

export async function incUsage(userId: string, type: string) {
  return true
}

export const rl = {
  auth:     { limit: async (_: string) => ({ success: true, remaining: 100 }) },
  identity: { limit: async (_: string) => ({ success: true, remaining: 10 }) },
  chat:     { limit: async (_: string) => ({ success: true, remaining: 50 }) },
  api:      { limit: async (_: string) => ({ success: true, remaining: 100 }) },
}
