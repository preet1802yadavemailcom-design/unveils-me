import { NextRequest, NextResponse } from 'next/server'
import { AIStream, AIComplete, selectModel } from '@/lib/AI/client'
import { getCurrentUser } from '@/lib/auth/supabase-server'
import { rl, makeId, incUsage } from '@/lib/ratelimit'
import { z } from 'zod'

const S = z.object({
  agent: z.object({ id:z.string(), name:z.string(), type:z.string(), role:z.string(),
                    emoji:z.string(), systemPrompt:z.string(), model:z.string(),
                    temperature:z.number(), capabilities:z.array(z.string()),
                    description:z.string(), isActive:z.boolean() }),
  message: z.string().min(1).max(4000),
  history: z.array(z.object({ role:z.enum(['user','assistant']), content:z.string(), id:z.string(), timestamp:z.string() })).default([]),
  stream: z.boolean().default(true),
})

export async function POST(req: NextRequest) {
  const user = await getCurrentUser()
  const result = await rl.chat.limit(makeId(req, user?.id))

if (!result.success) {
  return NextResponse.json(
    { success: false, error: 'Rate limit exceeded' },
    { status: 429 }
  )
}
  

  try {
    const { agent, message, history, stream } = S.parse(await req.json())
    if (user) await incUsage(user.id, 'messages')

    const historyText = history.slice(-8).map(m => `${m.role === 'user' ? 'User' : agent.name}: ${m.content}`).join('\n\n')
    const prompt = historyText ? `${historyText}\n\nUser: ${message}\n\n${agent.name}:` : `User: ${message}\n\n${agent.name}:`
    const systemPrompt = `${agent.systemPrompt}\n\nYou are ${agent.name}, an elite AI agent.\nRole: ${agent.role}\nExpertise: ${agent.capabilities.join(', ')}\n\nBe specific, brilliant, and genuinely helpful. Sound like the world's best ${agent.type}.`

   // if (stream) {

// const readable = await AIStream(
//   prompt,
//   systemPrompt,
//   selectModel('chat')
// )

//       return new Response(readable, { headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', 'X-Accel-Buffering': 'no' } })
//     }
    const { text, latencyMs } = await AIComplete(prompt, { model: selectModel('chat'), temperature: agent.temperature, maxTokens: 1024, systemPrompt })
    return NextResponse.json({ success: true, data: { reply: text }, metadata: { latency: latencyMs } })
  } catch (err: unknown) {
    return NextResponse.json({ success: false, error: err instanceof Error ? err.message : 'Failed' }, { status: 500 })
  }
}


