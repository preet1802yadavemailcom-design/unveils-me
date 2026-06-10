// ============================================
// UNVEILS.ME — Groq AI Client
// Ultra-fast inference engine
// ============================================

import Groq from 'groq-sdk'
import type { GroqConfig, GroqModel } from '@/types'

// ─── Client Singleton ─────────────────────────

let groqClient: Groq | null = null

export function getGroqClient(): Groq {
  if (!groqClient) {
    if (!process.env.GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY is not set in environment variables')
    }
    groqClient = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    })
  }
  return groqClient
}

// ─── Model Registry ───────────────────────────

export const GROQ_MODELS: Record<string, { id: GroqModel; label: string; speed: string; best: string }> = {
  FAST: {
    id: 'llama-3.1-8b-instant',
    label: 'LLaMA 3.1 8B Instant',
    speed: '~200 tok/s',
    best: 'Quick responses, chat',
  },
  BALANCED: {
    id: 'gemma2-9b-it',
    label: 'Gemma2 9B',
    speed: '~150 tok/s',
    best: 'Balanced quality/speed',
  },
  POWERFUL: {
    id: 'llama-3.3-70b-versatile',
    label: 'LLaMA 3.3 70B Versatile',
    speed: '~80 tok/s',
    best: 'Complex reasoning, identity gen',
  },
  CREATIVE: {
    id: 'llama-3.1-70b-versatile',
    label: 'LLaMA 3.1 70B Versatile',
    speed: '~100 tok/s',
    best: 'Creative writing, long context',
  },
}

// ─── Core Completion ──────────────────────────

export async function groqComplete(
  userPrompt: string,
  config: Partial<GroqConfig> = {}
): Promise<{ text: string; model: string; latencyMs: number }> {
  const client = getGroqClient()
  const start = Date.now()

  const {
    model = 'llama-3.3-70b-versatile',
    temperature = 0.7,
    maxTokens = 2048,
    systemPrompt,
  } = config

  const messages: Groq.Chat.ChatCompletionMessageParam[] = []

  if (systemPrompt) {
    messages.push({ role: 'system', content: systemPrompt })
  }
  messages.push({ role: 'user', content: userPrompt })

  const response = await client.chat.completions.create({
    model,
    messages,
    temperature,
    max_tokens: maxTokens,
    stream: false,
  })

  const text = response.choices[0]?.message?.content ?? ''
  const latencyMs = Date.now() - start

  return { text, model, latencyMs }
}

// ─── Streaming Completion ─────────────────────

export async function groqStream(
  userPrompt: string,
  config: Partial<GroqConfig> = {}
): Promise<ReadableStream<Uint8Array>> {
  const client = getGroqClient()

  const {
    model = 'llama-3.3-70b-versatile',
    temperature = 0.7,
    maxTokens = 2048,
    systemPrompt,
  } = config

  const messages: Groq.Chat.ChatCompletionMessageParam[] = []

  if (systemPrompt) {
    messages.push({ role: 'system', content: systemPrompt })
  }
  messages.push({ role: 'user', content: userPrompt })

  const stream = await client.chat.completions.create({
    model,
    messages,
    temperature,
    max_tokens: maxTokens,
    stream: true,
  })

  const encoder = new TextEncoder()

  return new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          const delta = chunk.choices[0]?.delta?.content
          if (delta) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: delta })}\n\n`))
          }
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
        controller.close()
      } catch (err) {
        controller.error(err)
      }
    },
  })
}

// ─── Smart Router ─────────────────────────────
// Picks best model based on task type

export function selectModel(task: 'identity' | 'chat' | 'website' | 'quick' | 'creative'): GroqModel {
  const routing: Record<string, GroqModel> = {
    identity: 'llama-3.3-70b-versatile',   // Deep reasoning for identity
    website:  'llama-3.3-70b-versatile',   // Rich content generation
    creative: 'llama-3.3-70b-versatile',   // Creative writing (mixtral deprecated)
    chat:     'llama-3.1-8b-instant',      // Fast agent chat
    quick:    'llama-3.1-8b-instant',      // Instant responses
  }
  return routing[task] ?? 'llama-3.3-70b-versatile'
}

// ─── JSON Extractor ───────────────────────────
// Safely extract JSON from LLM output

export function extractJSON<T>(text: string): T | null {
  try {
    // Try direct parse first
    return JSON.parse(text) as T
  } catch {
    // Try extracting from markdown code blocks
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/)
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[1].trim()) as T
      } catch { /* continue */ }
    }
    // Try finding raw JSON object
    const objectMatch = text.match(/\{[\s\S]*\}/)
    if (objectMatch) {
      try {
        return JSON.parse(objectMatch[0]) as T
      } catch { /* continue */ }
    }
    return null
  }
}


