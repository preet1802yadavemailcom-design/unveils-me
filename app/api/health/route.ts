// GET /api/health — uptime monitoring endpoint
import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET() {
  const checks: Record<string, 'ok' | 'error'> = {}

  // Check AI API key configured
  checks.AI = process.env.AI_API_KEY ? 'ok' : 'error'

  // Check Supabase configured
  checks.supabase = process.env.NEXT_PUBLIC_SUPABASE_URL ? 'ok' : 'error'

  // Check Redis configured
  checks.redis = process.env.UPSTASH_REDIS_REST_URL ? 'ok' : 'error'

  const allOk = Object.values(checks).every(v => v === 'ok')

  return NextResponse.json(
    {
      status: allOk ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      version: '2.0.0',
      checks,
      uptime: process.uptime?.() ?? 0,
    },
    {
      status: allOk ? 200 : 503,
      headers: { 'Cache-Control': 'no-store, no-cache' },
    }
  )
}


