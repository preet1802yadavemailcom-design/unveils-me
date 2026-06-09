// ============================================
// UNVEILS.ME — Memory Save API
// POST /api/memory/save
// ============================================

import { NextRequest, NextResponse } from 'next/server'
import { saveMemory, getRelevantMemory, getUserMemorySummary } from '@/lib/memory/store'
import { z } from 'zod'

const SaveSchema = z.object({
  action: z.literal('save'),
  userId: z.string(),
  content: z.string().min(1).max(2000),
  type: z.enum(['preference','goal','interaction','project','insight','style']).default('interaction'),
  tags: z.array(z.string()).default([]),
})

const RetrieveSchema = z.object({
  action: z.literal('retrieve'),
  userId: z.string(),
  query: z.string(),
  limit: z.number().min(1).max(20).default(5),
})

const SummarySchema = z.object({
  action: z.literal('summary'),
  userId: z.string(),
})

const RequestSchema = z.union([SaveSchema, RetrieveSchema, SummarySchema])

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const input = RequestSchema.parse(body)

    if (input.action === 'save') {
      const entry = await saveMemory(input.userId, input.content, input.type, input.tags)
      return NextResponse.json({ success: true, data: entry })
    }

    if (input.action === 'retrieve') {
      const context = getRelevantMemory(input.userId, input.query, input.limit)
      return NextResponse.json({ success: true, data: { context } })
    }

    if (input.action === 'summary') {
      const summary = getUserMemorySummary(input.userId)
      return NextResponse.json({ success: true, data: { summary } })
    }

  } catch (error: unknown) {
    console.error('[/api/memory/save]', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Memory operation failed' },
      { status: 500 }
    )
  }
}


