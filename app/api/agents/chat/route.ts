```ts id="juhm32"
import { NextRequest, NextResponse } from 'next/server'
import { AIComplete, selectModel } from '@/lib/AI/client'
import { getCurrentUser } from '@/lib/auth/supabase-server'
import { rl, incUsage } from '@/lib/ratelimit'
import { z } from 'zod'

export const runtime = 'nodejs'

const S = z.object({
  agent: z.object({
    id: z.string(),
    name: z.string(),
    type: z.string(),
    role: z.string(),
    emoji: z.string(),
    systemPrompt: z.string(),
    model: z.string(),
    temperature: z.number(),
    capabilities: z.array(z.string()),
    description: z.string(),
    isActive: z.boolean(),
  }),
  message: z.string().min(1).max(4000),
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string(),
        id: z.string(),
        timestamp: z.string(),
      })
    )
    .default([]),
})

export async function POST(req: NextRequest) {
  const user = await getCurrentUser()

  const ip =
    req.headers.get('x-forwarded-for') ??
    req.headers.get('x-real-ip') ??
    'anonymous'

  const result = await rl.chat.limit(user?.id || ip)

  if (!result.success) {
    return NextResponse.json(
      {
        success: false,
        error: 'Rate limit exceeded',
      },
      { status: 429 }
    )
  }

  try {
    const { agent, message, history } = S.parse(await req.json())

    if (user) {
      await incUsage(user.id, 'messages')
    }

    const historyText = history
      .slice(-8)
      .map((m) => `${m.role === 'user' ? 'User' : agent.name}: ${m.content}`)
      .join('\n\n')

    const prompt = historyText
      ? `${historyText}\n\nUser: ${message}\n\n${agent.name}:`
      : `User: ${message}\n\n${agent.name}:`

    const systemPrompt = `
${agent.systemPrompt}

You are ${agent.name}, an elite AI agent.
Role: ${agent.role}
Expertise: ${agent.capabilities.join(', ')}

Be specific, brilliant, and genuinely helpful.
`

    const text = await AIComplete(
      prompt,
      systemPrompt,
      selectModel('chat')
    )

    return NextResponse.json({
      success: true,
      data: {
        reply: text,
      },
    })
  } catch (err: unknown) {
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : 'Failed',
      },
      { status: 500 }
    )
  }
}
```
