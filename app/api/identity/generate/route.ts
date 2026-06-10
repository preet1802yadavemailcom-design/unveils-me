import { NextRequest, NextResponse } from 'next/server'
import { generateIdentity } from '@/lib/identity/generator'
import { getCurrentUser } from '@/lib/auth/supabase-server'
import { rl, makeId, incUsage } from '@/lib/ratelimit'
import { z } from 'zod'

export const runtime = 'nodejs'

const S = z.object({
  name:        z.string().min(1).max(100),
  subdomain:   z.string().min(1).max(50).regex(/^[a-z0-9-]+$/),
  type:        z.enum(['FOUNDER','CREATOR','STARTUP','DEVELOPER','DESIGNER','ARTIST','RESEARCHER','EXECUTIVE']),
  description: z.string().min(10).max(2000),
})

export async function POST(req: NextRequest) {
  const user = await getCurrentUser()
  const result = await rl.identity.limit(makeId(req, user?.id))
  if (!result.success) return NextResponse.json({ success: false, error: 'Rate limit exceeded. Upgrade to Pro.' }, { status: 429 })
  try {
    const { default: prisma } = await import('@/lib/db/prisma')
    const body = S.parse(await req.json())
    const taken = await prisma.identity.findUnique({ where: { subdomain: body.subdomain } }).catch(() => null)
    if (taken) return NextResponse.json({ success: false, error: `"${body.subdomain}" is already taken.` }, { status: 409 })
    if (user) await incUsage(user.id, 'identityGen')
    const t0 = Date.now()
    const identity = await generateIdentity({ ...body, userId: user?.id ?? 'anonymous' })
    return NextResponse.json({ success: true, data: identity, metadata: { latency: Date.now() - t0 } })
  } catch (err: unknown) {
    if (err instanceof z.ZodError) return NextResponse.json({ success: false, error: err.errors[0].message }, { status: 400 })
    return NextResponse.json({ success: false, error: err instanceof Error ? err.message : 'Failed' }, { status: 500 })
  }
}
