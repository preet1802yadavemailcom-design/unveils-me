import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth/supabase-server'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    return NextResponse.json({ success: true, data: { totalViews: 0, totalChats: 0, totalClicks: 0, identityViews: [], chatSessions: [], clickEvents: [] } })
  } catch (err: unknown) {
    return NextResponse.json({ success: false, error: err instanceof Error ? err.message : 'Failed' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    console.log('[Analytics]', body)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed' }, { status: 500 })
  }
}
