// ============================================
// UNVEILS.ME — Multi-Agent Orchestration
// Powered by Groq ultra-fast inference
// ============================================

import { groqComplete, groqStream, selectModel } from '@/lib/groq/client'
import type { AIAgent, AgentMessage, AgentSession, DigitalIdentity } from '@/types'
import { nanoid } from 'nanoid'

// ─── Agent Chat (Non-Streaming) ───────────────

export async function chatWithAgent(params: {
  agent: AIAgent
  messages: AgentMessage[]
  userMessage: string
  identity: DigitalIdentity
  memoryContext?: string
}): Promise<{ reply: string; latencyMs: number }> {
  const { agent, messages, userMessage, identity, memoryContext } = params

  // Build conversation history
  const history = messages.slice(-10).map((m) => ({
    role: m.role as 'user' | 'assistant',
    content: m.content,
  }))

  // Enrich system prompt with memory
  const systemPrompt = `${agent.systemPrompt}

${memoryContext ? `Context from memory:\n${memoryContext}` : ''}

User's current identity:
- Name: ${identity.name}
- Type: ${identity.type}
- Tagline: ${identity.tagline}
- Tone: ${identity.tone}
- Audience: ${identity.audience}

Always address ${identity.name} by name occasionally. Be their most trusted advisor.`

  const conversationText = [
    ...history.map((m) => `${m.role === 'user' ? 'User' : agent.name}: ${m.content}`),
    `User: ${userMessage}`,
    `${agent.name}:`,
  ].join('\n\n')

  const { text, latencyMs } = await groqComplete(conversationText, {
    model: agent.model,
    temperature: agent.temperature,
    maxTokens: 1024,
    systemPrompt,
  })

  return { reply: text.trim(), latencyMs }
}

// ─── Agent Chat (Streaming) ───────────────────

export async function streamAgentChat(params: {
  agent: AIAgent
  messages: AgentMessage[]
  userMessage: string
  identity: DigitalIdentity
}): Promise<ReadableStream<Uint8Array>> {
  const { agent, messages, userMessage, identity } = params

  const history = messages.slice(-8).map((m) => ({
    role: m.role as 'user' | 'assistant',
    content: m.content,
  }))

  const systemPrompt = `${agent.systemPrompt}

User identity: ${identity.name} — ${identity.tagline}
Respond as ${agent.name}. Be brilliant, specific, and genuinely helpful.`

  const conversationText = [
    ...history.map((m) => `${m.role === 'user' ? 'User' : agent.name}: ${m.content}`),
    `User: ${userMessage}`,
    `${agent.name}:`,
  ].join('\n\n')

  return groqStream(conversationText, {
    model: selectModel('chat'),
    temperature: agent.temperature,
    maxTokens: 1024,
    systemPrompt,
  })
}

// ─── Multi-Agent Collaboration ────────────────
// All agents work together on a single task

export async function orchestrateAgents(params: {
  task: string
  agents: AIAgent[]
  identity: DigitalIdentity
}): Promise<{ agentId: string; agentName: string; response: string }[]> {
  const { task, agents, identity } = params

  const results = await Promise.all(
    agents.map(async (agent) => {
      const prompt = `Task: ${task}

Respond as ${agent.name} (${agent.role}).
Identity context: ${identity.name} — ${identity.tagline}
Be specific. Your unique expertise: ${agent.capabilities.join(', ')}`

      const { text } = await groqComplete(prompt, {
        model: agent.model,
        temperature: agent.temperature,
        maxTokens: 512,
        systemPrompt: agent.systemPrompt,
      })

      return {
        agentId: agent.id,
        agentName: agent.name,
        response: text.trim(),
      }
    })
  )

  return results
}

// ─── Session Management ───────────────────────

export function createSession(userId: string, agentId: string): AgentSession {
  return {
    id: nanoid(),
    userId,
    agentId,
    messages: [],
    context: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

export function addMessageToSession(
  session: AgentSession,
  role: 'user' | 'assistant',
  content: string,
  agentId?: string
): AgentSession {
  const message: AgentMessage = {
    id: nanoid(),
    role,
    content,
    agentId,
    timestamp: new Date().toISOString(),
  }

  return {
    ...session,
    messages: [...session.messages, message],
    updatedAt: new Date().toISOString(),
  }
}

// ─── Suggested Prompts per Agent ──────────────

export function getSuggestedPrompts(agentType: AIAgent['type']): string[] {
  const prompts: Record<AIAgent['type'], string[]> = {
    designer: [
      'Design a color system for my brand',
      'Suggest a visual style for my website',
      'What fonts should I use?',
      'Create a brand mood board concept',
    ],
    marketer: [
      'Write 5 LinkedIn posts for this week',
      'Create a launch campaign strategy',
      'Suggest hashtags and content pillars',
      'Write a cold outreach email template',
    ],
    strategist: [
      'What should my 90-day focus be?',
      'Analyze my target market',
      'Help me position against competitors',
      'Create a business growth roadmap',
    ],
    developer: [
      'Review my tech stack choices',
      'Suggest an MVP architecture',
      'Help me write a technical spec',
      'What APIs should I integrate?',
    ],
    growth: [
      'How do I get my first 1000 users?',
      'Create a referral program idea',
      'What growth channels suit my type?',
      'Analyze my funnel and suggest fixes',
    ],
    researcher: [
      'Research my top 3 competitors',
      'What trends are shaping my industry?',
      'Find potential partnership opportunities',
      'Summarize my market landscape',
    ],
    recruiter: [
      'Write a job description for a CTO',
      'What roles should I hire first?',
      'Create interview questions for engineers',
      'Draft an equity offer template',
    ],
    content: [
      'Write a blog post outline',
      'Create a Twitter/X content calendar',
      'Draft my About page copy',
      'Write 3 newsletter subject lines',
    ],
    assistant: [
      'Summarize my week and priorities',
      'Draft an email to a potential investor',
      'Create a meeting agenda',
      'Help me prepare for a pitch',
    ],
  }
  return prompts[agentType] ?? prompts.assistant
}

