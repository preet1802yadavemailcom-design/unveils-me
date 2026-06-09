// ============================================
// UNVEILS.ME — Rate Limiting + Cache (Upstash)
// ============================================

import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// ─── Redis singleton ──────────────────────────
export const redis = new Redis({
  url:   process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// ─── Rate limiters ────────────────────────────
export const rl = {
  // Identity generation: 10/hr (free), apply stricter for free users in route
  identity: new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(10, '1 h'),  analytics: true, prefix: 'rl:identity' }),
  // Chat: 30/min
  chat:     new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(30, '1 m'),  analytics: true, prefix: 'rl:chat'     }),
  // Website gen: 5/hr
  website:  new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(5,  '1 h'),  analytics: true, prefix: 'rl:website'  }),
  // Auth: 5 attempts / 15 min (brute-force protection)
  auth:     new Ratelimit({ redis, limiter: Ratelimit.fixedWindow(5,    '15 m'), analytics: true, prefix: 'rl:auth'     }),
  // General API: 200/min
  api:      new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(200, '1 m'), analytics: true, prefix: 'rl:api'      }),
}

// ─── Apply rate limit ─────────────────────────
export async function applyRateLimit(
  limiter: Ratelimit,
  id: string
): Promise<{ ok: boolean; remaining: number; reset: number }> {
  const { success, remaining, reset } = await limiter.limit(id)
  return { ok: success, remaining, reset }
}

// ─── Build identifier ─────────────────────────
export function makeId(req: Request, userId?: string): string {
  if (userId) return `user:${userId}`
  const ip =
    (req.headers as Headers).get('x-forwarded-for')?.split(',')[0]?.trim() ??
    (req.headers as Headers).get('x-real-ip') ??
    'anon'
  return `ip:${ip}`
}

// ─── Cache helpers ────────────────────────────
export async function cacheGet<T>(key: string): Promise<T | null> {
  try { return await redis.get<T>(key) }
  catch { return null }
}

export async function cacheSet<T>(key: string, value: T, ttl = 3600): Promise<void> {
  try { await redis.set(key, value, { ex: ttl }) }
  catch { /* silent */ }
}

export async function cacheDel(key: string): Promise<void> {
  try { await redis.del(key) }
  catch { /* silent */ }
}

// ─── Monthly usage counter ────────────────────
function monthKey(userId: string, feat: string): string {
  const ym = new Date().toISOString().slice(0, 7) // "2025-06"
  return `usage:${userId}:${feat}:${ym}`
}

export async function incUsage(userId: string, feat: string): Promise<number> {
  const key = monthKey(userId, feat)
  const n   = await redis.incr(key)
  if (n === 1) await redis.expire(key, 60 * 60 * 24 * 35) // expire after ~35 days
  return n
}

export async function getUsage(userId: string, feat: string): Promise<number> {
  return (await redis.get<number>(monthKey(userId, feat))) ?? 0
}

// ─── Session store ────────────────────────────
export async function setSession(key: string, value: unknown, ttl = 86400): Promise<void> {
  await redis.set(`sess:${key}`, JSON.stringify(value), { ex: ttl })
}

export async function getSession<T>(key: string): Promise<T | null> {
  const raw = await redis.get<string>(`sess:${key}`)
  if (!raw) return null
  try { return JSON.parse(raw) as T }
  catch { return null }
}

