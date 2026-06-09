import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth/supabase-server'
import { cacheGet, cacheSet } from '@/lib/ratelimit'

export async function GET(req: NextRequest) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  const cached = await cacheGet(`analytics:dash:${user.id}`)
  if (cached) return NextResponse.json({ success: true, data: cached })
  const now = Date.now()
  const data = {
    overview: {
      profileViews:  { value: 2847, change: 18.2, trend: 'up' },
      agentMessages: { value: 142,  change: 32.1, trend: 'up' },
      websiteVisits: { value: 1203, change: 24.5, trend: 'up' },
      tokensUsed:    { value: 84200, change: 12.3, trend: 'up' },
    },
    chartData: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(now - (29 - i) * 86400000).toISOString().slice(0, 10),
      views: Math.floor(Math.random() * 180 + 40),
      messages: Math.floor(Math.random() * 25 + 3),
    })),
    topAgents: [
      { name: 'Nova',  messages: 52, emoji: '🧠' },
      { name: 'Lens',  messages: 38, emoji: '🎨' },
      { name: 'Forge', messages: 31, emoji: '⚡' },
    ],
    trafficSources: [
      { source: 'Direct', visits: 512, pct: 42 },
      { source: 'Social', visits: 361, pct: 30 },
      { source: 'Search', visits: 241, pct: 20 },
      { source: 'Referral', visits: 89, pct: 8 },
    ],
    countries: [
      { country: 'India', flag: '🇮🇳', visits: 580 },
      { country: 'USA', flag: '🇺🇸', visits: 310 },
      { country: 'UK', flag: '🇬🇧', visits: 128 },
    ],
    usageThisMonth: { messages: 142, identities: 1, websites: 1, memoryEntries: 23 },
  }
  await cacheSet(`analytics:dash:${user.id}`, data, 300)
  return NextResponse.json({ success: true, data })
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser()
    const body = await req.json()
    console.log('[Analytics]', { userId: user?.id, event: body.event })
    return NextResponse.json({ success: true })
  } catch { return NextResponse.json({ success: false }, { status: 500 }) }
}


