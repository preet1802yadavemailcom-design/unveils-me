import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth/supabase-server'
import { sendWelcomeEmail } from '@/lib/email/resend'
import { z } from 'zod'

const OnboardSchema = z.object({
  name:        z.string().min(1).max(100),
  subdomain:   z.string().min(1).max(50).regex(/^[a-z0-9-]+$/),
  type:        z.string(),
  goals:       z.array(z.string()),
  description: z.string().min(5).max(2000),
})

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    const { default: prisma } = await import('@/lib/db/prisma')
    const body = OnboardSchema.parse(await req.json())
    const dbUser = await prisma.user.upsert({
      where:  { email: user.email! },
      update: { name: body.name, username: body.subdomain, onboarded: true },
      create: { id: user.id, email: user.email!, name: body.name, username: body.subdomain, plan: 'FREE', onboarded: true },
    })
    await Promise.all(body.goals.map(goal =>
      prisma.memory.create({ data: { userId: dbUser.id, type: 'GOAL', content: goal, importance: 4, tags: ['onboarding'] } }).catch(() => {})
    ))
    await prisma.memory.create({ data: { userId: dbUser.id, type: 'INSIGHT', content: body.description, importance: 5, tags: ['onboarding', 'description'] } }).catch(() => {})
    sendWelcomeEmail(user.email!, body.name).catch(() => {})
    return NextResponse.json({ success: true, data: { user: dbUser } })
  } catch (err: unknown) {
    if (err instanceof z.ZodError) return NextResponse.json({ success: false, error: err.errors[0].message }, { status: 400 })
    return NextResponse.json({ success: false, error: err instanceof Error ? err.message : 'Failed' }, { status: 500 })
  }
}

export async function GET(_req: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    const { default: prisma } = await import('@/lib/db/prisma')
    const dbUser = await prisma.user.findFirst({
      where:   { email: user.email! },
      include: {
        identities:   { select: { id: true, subdomain: true, name: true, type: true, isPublished: true, viewCount: true } },
        subscription: { select: { plan: true, status: true, stripeCurrentPeriodEnd: true, cancelAtPeriodEnd: true } },
        _count:       { select: { memories: true, agentSessions: true } },
      },
    })
    return NextResponse.json({ success: true, data: dbUser })
  } catch (err: unknown) {
    return NextResponse.json({ success: false, error: err instanceof Error ? err.message : 'Failed' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    const { default: prisma } = await import('@/lib/db/prisma')
    const body = await req.json()
    const allowed = ['name', 'bio', 'avatarUrl'] as const
    const data: Record<string, string> = {}
    for (const key of allowed) { if (body[key] !== undefined) data[key] = String(body[key]) }
    const updated = await prisma.user.update({ where: { email: user.email! }, data })
    return NextResponse.json({ success: true, data: updated })
  } catch (err: unknown) {
    return NextResponse.json({ success: false, error: err instanceof Error ? err.message : 'Failed' }, { status: 500 })
  }
}
