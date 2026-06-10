import { NextRequest, NextResponse } from 'next/server'
import { AIComplete, selectModel } from '@/lib/AI/client'
import { getCurrentUser } from '@/lib/auth/supabase-server'
import { rl, makeId, incUsage } from '@/lib/ratelimit'
import { z } from 'zod'

export const runtime = 'nodejs'

const S = z.object({
  agent: z.object({
    id: z.string(), name: z.string(), type: z.string(),
    role: z.string(), emoji: z.string(), systemPrompt: z.string(),
    temperature: z.number().default(0.8),
    capabilities: z.array(z.string()).default([]),
    description: z.string().default(''),
  }),
  message: z.string().min(1).max(4000),
  history: z.array(z.object({
    role: z.enum(['user','assistant']),
    content: z.string(),
  })).default([]),
})

export async function POST(req: NextRequest) {
  const user = await getCurrentUser()
  const result = await rl.chat.limit(makeId(req, user?.id))
  if (!result.success) return NextResponse.json({ success: false, error: 'Rate limit exceeded' }, { status: 429 })

  try {
    const { agent, message, history } = S.parse(await req.json())
    if (user) await incUsage(user.id, 'messages')

    const historyText = history.slice(-8)
      .map(m => `${m.role === 'user' ? 'User' : agent.name}: ${m.content}`)
      .join('\n\n')

    const prompt = historyText ? `${historyText}\n\nUser: ${message}` : message
    const systemPrompt = `${agent.systemPrompt}\n\nYou are ${agent.name}. Role: ${agent.role}. Be specific and brilliant.`

    const reply = await AIComplete(prompt, systemPrompt, selectModel('chat'))
    return NextResponse.json({ success: true, data: { reply, agent: agent.name }, metadata: { latency: 0 } })
  } catch (err: unknown) {
    return NextResponse.json({ success: false, error: err instanceof Error ? err.message : 'Failed' }, { status: 500 })
  }
}
