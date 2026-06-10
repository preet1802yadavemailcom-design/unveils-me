import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth/supabase-server'
import { sendWelcomeEmail } from '@/lib/email/resend'
import { z } from 'zod'

const S = z.object({
  name: z.string().min(1).max(100),
  subdomain: z.string().min(1).max(50).regex(/^[a-z0-9-]+$/),
  type: z.string(),
  goals: z.array(z.string()),
  description: z.string().min(10).max(2000),
})

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    const { default: prisma } = await import('@/lib/db/prisma')
    const body = S.parse(await req.json())
    const existing = await prisma.identity.findUnique({ where: { subdomain: body.subdomain } })
    if (existing) return NextResponse.json({ success: false, error: 'Subdomain already taken' }, { status: 409 })
    await prisma.user.update({ where: { email: user.email! }, data: { name: body.name, username: body.subdomain, onboarded: true } })
    sendWelcomeEmail(user.email!, body.name).catch(() => {})
    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    if (err instanceof z.ZodError) return NextResponse.json({ success: false, error: err.errors[0].message }, { status: 400 })
    return NextResponse.json({ success: false, error: err instanceof Error ? err.message : 'Failed' }, { status: 500 })
  }
}
