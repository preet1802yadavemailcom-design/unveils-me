// POST /api/billing/portal
import { NextRequest, NextResponse } from 'next/server'
import { createPortal } from '@/lib/billing/stripe'
import { getCurrentUser } from '@/lib/auth/supabase-server'
import prisma from '@/lib/db/prisma'

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) return NextResponse.json({ success:false, error:'Unauthorized' }, { status:401 })

    const dbUser = await prisma.user.findFirst({ where:{ email: user.email! } })
    if (!dbUser?.stripeCustomerId)
      return NextResponse.json({ success:false, error:'No billing account found' }, { status:400 })

    const origin = req.headers.get('origin') ?? process.env.NEXT_PUBLIC_APP_URL!
    const url = await createPortal(dbUser.stripeCustomerId, `${origin}/settings?tab=billing`)
    return NextResponse.json({ success:true, data:{ url } })
  } catch (err: unknown) {
    return NextResponse.json({ success:false, error: err instanceof Error ? err.message : 'Failed' }, { status:500 })
  }
}


