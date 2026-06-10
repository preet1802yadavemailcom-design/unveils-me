// app/api/billing/portal/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth/supabase-server'
import { z } from 'zod'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const S = z.object({
  planId: z.enum(['PRO', 'ENTERPRISE']),
  interval: z.enum(['monthly', 'yearly']),
})

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { planId, interval } = S.parse(await req.json())
    const origin = req.headers.get('origin') ?? process.env.NEXT_PUBLIC_APP_URL!

    // ✅ Dynamic import — Prisma build time pe execute nahi hoga
    const { createCheckout } = await import('@/lib/billing/stripe')

    const url = await createCheckout({
      userId: user.id,
      email: user.email!,
      plan: planId,
      interval,
      origin,
    })

    return NextResponse.json({ success: true, data: { url } })
  } catch (err: unknown) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Failed' },
      { status: 500 }
    )
  }
}