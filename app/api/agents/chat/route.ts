import { NextRequest, NextResponse } from 'next/server'
import { AIComplete, selectModel } from '@/lib/AI/client'
import { getCurrentUser } from '@/lib/auth/supabase-server'
import { rl, incUsage } from '@/lib/ratelimit'
import { z } from 'zod'

// runtime fix: Supabase/Prisma ke liye nodejs zaroori hai
export const runtime = 'nodejs';

const S = z.object({
  agent: z.object({ 
    id: z.string(), name: z.string(), type: z.string(), role: z.string(),
    emoji: z.string(), systemPrompt: z.string(), model: z.string(),
    temperature: z.number(), capabilities: z.array(z.string()),
    description: z.string(), isActive: z.boolean() 
  }),
  message: z.string().min(1).max(4000),
  history: z.array(z.object({ 
    role: z.enum(['user', 'assistant']), 
    content: z.string(), 
    id: z.string(), 
    timestamp: z.string() 
  })).default([]),
  stream: z.boolean().default(true),
})

export async function POST(req: NextRequest) {
  const user = await getCurrentUser()
  
  // Ratelimit check
const ip =
  req.headers.get('x-forwarded-for') ??
  req.headers.get('x-real-ip') ??
  'anonymous'

const result = await rl.chat.limit(user?.id ?? ip)

  if (!result.success) {
    return NextResponse.json(
      { success: false, error: 'Rate limit exceeded' },
      { status: 429 }
    )
  }

  try {
    const body = await req.json()
    const { agent, message, history } = S.parse(body)
    
    if (user) await incUsage(user.id, 'messages')

    const historyText = history.slice(-8)
      .map(m => `${m.role === 'user' ? 'User' : agent.name}: ${m.content}`)
      .join('\n\n')
      
    const prompt = historyText 
      ? `${historyText}\n\nUser: ${message}\n\n${agent.name}:` 
      : `User: ${message}\n\n${agent.name}:`
      
    const systemPrompt = `${agent.systemPrompt}\n\nYou are ${agent.name}, an elite AI agent.\nRole: ${agent.role}\nExpertise: ${agent.capabilities.join(', ')}\n\nBe specific, brilliant, and genuinely helpful.`

    // AI Complete call
    const reply = await AIComplete(
      prompt,
      systemPrompt,
      selectModel('chat')
    )

    return NextResponse.json({ 
      success: true, 
      data: { reply: reply }, 
      metadata: { latency: 0 } 
    })
    
  } catch (err: unknown) {
    console.error("Chat API Error:", err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Failed to process request' }, 
      { status: 500 }
    )
  }
}