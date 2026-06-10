import { NextRequest, NextResponse } from 'next/server'
import { rl, makeId } from '@/lib/ratelimit'
import { z } from 'zod'

const S = z.object({
  email: z.string().email(),
  source: z.string().default('website'),
})

export async function POST(req: NextRequest) {
  const result = await rl.auth.limit(makeId(req))
  if (!result.success) return NextResponse.json({ success: false, error: 'Too many requests' }, { status: 429 })
  try {
    const { email } = S.parse(await req.json())
    console.log(`[Newsletter] Subscribed: ${email}`)
    return NextResponse.json({ success: true, message: "You are subscribed!" })
  } catch (err: unknown) {
    if (err instanceof z.ZodError) return NextResponse.json({ success: false, error: err.errors[0].message }, { status: 400 })
    return NextResponse.json({ success: false, error: 'Failed' }, { status: 500 })
  }
}
