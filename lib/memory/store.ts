// ============================================
// UNVEILS.ME — AI Memory System
// Long-term contextual memory for agents
// ============================================

import { groqComplete, selectModel } from '@/lib/groq/client'
import type { MemoryEntry, UserMemory } from '@/types'
import { nanoid } from 'nanoid'

// ─── In-Memory Store (replace with Supabase/Redis in prod) ──

const memoryStore = new Map<string, UserMemory>()

// ─── Save Memory Entry ────────────────────────

export async function saveMemory(
  userId: string,
  content: string,
  type: MemoryEntry['type'] = 'interaction',
  tags: string[] = []
): Promise<MemoryEntry> {
  const entry: MemoryEntry = {
    id: nanoid(),
    userId,
    type,
    content,
    importance: await scoreImportance(content),
    tags,
    createdAt: new Date().toISOString(),
  }

  const existing = memoryStore.get(userId)
  if (existing) {
    existing.entries.push(entry)
    existing.lastUpdated = new Date().toISOString()
  } else {
    memoryStore.set(userId, {
      userId,
      entries: [entry],
      summary: '',
      lastUpdated: new Date().toISOString(),
    })
  }

  // Compress memory if too large
  const memory = memoryStore.get(userId)!
  if (memory.entries.length > 50) {
    await compressMemory(userId)
  }

  return entry
}

// ─── Retrieve Relevant Memory ─────────────────

export function getRelevantMemory(userId: string, query: string, limit = 5): string {
  const memory = memoryStore.get(userId)
  if (!memory || memory.entries.length === 0) return ''

  // Simple keyword matching (replace with vector search in production)
  const queryWords = query.toLowerCase().split(' ').filter((w) => w.length > 3)

  const scored = memory.entries.map((entry) => {
    const entryLower = entry.content.toLowerCase()
    const score = queryWords.reduce(
      (acc, word) => acc + (entryLower.includes(word) ? 1 : 0),
      0
    ) + entry.importance

    return { entry, score }
  })

  const relevant = scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ entry }) => `[${entry.type}] ${entry.content}`)
    .join('\n')

  const summary = memory.summary ? `Summary: ${memory.summary}\n\n` : ''
  return relevant ? `${summary}Recent context:\n${relevant}` : summary
}

// ─── Memory Compression ───────────────────────

async function compressMemory(userId: string): Promise<void> {
  const memory = memoryStore.get(userId)
  if (!memory) return

  const entriesText = memory.entries
    .slice(0, 40)
    .map((e) => `[${e.type}] ${e.content}`)
    .join('\n')

  const prompt = `Compress these memory entries into a concise 3-paragraph summary.
Preserve all important preferences, goals, and patterns.
Remove redundancy. Keep the most important insights.

Entries:
${entriesText}

Return ONLY the summary text. No formatting.`

  const { text } = await groqComplete(prompt, {
    model: selectModel('quick'),
    temperature: 0.3,
    maxTokens: 512,
  })

  // Keep last 20 entries + update summary
  memory.summary = text.trim()
  memory.entries = memory.entries.slice(-20)
  memory.lastUpdated = new Date().toISOString()
}

// ─── Importance Scorer ────────────────────────

async function scoreImportance(content: string): Promise<1 | 2 | 3 | 4 | 5> {
  // Heuristic scoring (use LLM for production)
  const highImportance = [
    'goal', 'prefer', 'hate', 'love', 'always', 'never', 'important',
    'strategy', 'business', 'launch', 'decision', 'vision', 'mission',
  ]

  const lower = content.toLowerCase()
  const score = highImportance.filter((kw) => lower.includes(kw)).length

  if (score >= 4) return 5
  if (score >= 3) return 4
  if (score >= 2) return 3
  if (score >= 1) return 2
  return 1
}

// ─── Extract & Save from Conversation ────────

export async function extractAndSaveMemory(
  userId: string,
  conversationText: string
): Promise<void> {
  const prompt = `Extract important facts, preferences, goals, or insights from this conversation.
Return ONLY a JSON array of strings. Each string is one memory item. Max 5 items. Raw JSON only.

Conversation:
${conversationText}

Example output: ["User prefers dark mode design", "Goal is to launch in 3 months"]`

  try {
    const { text } = await groqComplete(prompt, {
      model: selectModel('quick'),
      temperature: 0.2,
      maxTokens: 256,
    })

    const items = JSON.parse(text.replace(/```json|```/g, '').trim()) as string[]

    await Promise.all(
      items.map((item) =>
        saveMemory(userId, item, 'preference', [])
      )
    )
  } catch {
    // Silent fail — memory extraction is non-critical
  }
}

// ─── Get Full Memory Summary ──────────────────

export function getUserMemorySummary(userId: string): string {
  const memory = memoryStore.get(userId)
  if (!memory) return 'No memory yet.'
  return memory.summary || `${memory.entries.length} memory entries stored.`
}

