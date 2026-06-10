'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, Sparkles, ChevronDown } from 'lucide-react'
import type { AIAgent, AgentMessage } from '@/types'

// ─── Demo agents (in prod, loaded from identity) ─────

const DEMO_AGENTS: AIAgent[] = [
  {
    id: 'agent-1',
    name: 'Nova',
    type: 'strategist',
    role: 'Business strategy & growth',
    emoji: '🧠',
    description: 'Elite business strategist',
    capabilities: ['Strategy', 'Growth', 'Market analysis'],
    systemPrompt: 'You are Nova, an elite business strategist AI agent.',
    model: 'llama-3.1-8b-instant',
    temperature: 0.75,
    isActive: true,
  },
  {
    id: 'agent-2',
    name: 'Lens',
    type: 'designer',
    role: 'Visual design & brand',
    emoji: '🎨',
    description: 'World-class designer AI',
    capabilities: ['Design', 'Branding', 'Typography'],
    systemPrompt: 'You are Lens, a world-class design AI agent.',
    model: 'llama-3.1-8b-instant',
    temperature: 0.8,
    isActive: true,
  },
  {
    id: 'agent-3',
    name: 'Forge',
    type: 'developer',
    role: 'Code, architecture & tech',
    emoji: '⚡',
    description: 'Senior engineer AI',
    capabilities: ['Architecture', 'Code review', 'APIs'],
    systemPrompt: 'You are Forge, a senior full-stack engineering AI agent.',
    model: 'llama-3.1-8b-instant',
    temperature: 0.65,
    isActive: true,
  },
  {
    id: 'agent-4',
    name: 'Pulse',
    type: 'marketer',
    role: 'Marketing & content',
    emoji: '📡',
    description: 'Growth & marketing AI',
    capabilities: ['Content', 'SEO', 'Campaigns'],
    systemPrompt: 'You are Pulse, an expert marketing and growth AI agent.',
    model: 'llama-3.1-8b-instant',
    temperature: 0.85,
    isActive: true,
  },
]

const SUGGESTED_PROMPTS: Record<string, string[]> = {
  'agent-1': ['What should my 90-day strategy be?', 'Analyze my competitive positioning', 'Help me create a growth roadmap'],
  'agent-2': ['Design a color system for my brand', 'Suggest my brand typography', 'Create a visual identity brief'],
  'agent-3': ['Review my tech stack choices', 'Suggest an MVP architecture', 'Help me write a technical spec'],
  'agent-4': ['Write 5 LinkedIn posts for this week', 'Create a content calendar', 'Suggest my best marketing channels'],
}

export default function AgentChat() {
  const [activeAgent, setActiveAgent] = useState<AIAgent>(DEMO_AGENTS[0])
  const [messages, setMessages] = useState<Record<string, AgentMessage[]>>({})
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [streamingText, setStreamingText] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const agentMessages = messages[activeAgent.id] ?? []

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [agentMessages, streamingText])

  async function sendMessage(text?: string) {
    const content = (text ?? input).trim()
    if (!content || loading) return

    setInput('')
    setLoading(true)
    setStreamingText('')

    const userMsg: AgentMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => ({
      ...prev,
      [activeAgent.id]: [...(prev[activeAgent.id] ?? []), userMsg],
    }))

    try {
      const res = await fetch('/api/agents/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentId: activeAgent.id,
          agent: activeAgent,
          message: content,
          history: agentMessages.slice(-8),
          stream: true,
        }),
      })

      if (!res.ok) throw new Error('Chat failed')

      // Handle streaming
      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      let fullText = ''

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          const lines = chunk.split('\n').filter((l) => l.startsWith('data: '))

          for (const line of lines) {
            const data = line.replace('data: ', '').trim()
            if (data === '[DONE]') break
            try {
              const { text } = JSON.parse(data)
              fullText += text
              setStreamingText(fullText)
            } catch { /* ignore parse errors */ }
          }
        }
      }

      const assistantMsg: AgentMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: fullText || 'I apologize, I encountered an error.',
        agentId: activeAgent.id,
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => ({
        ...prev,
        [activeAgent.id]: [...(prev[activeAgent.id] ?? []), assistantMsg],
      }))
      setStreamingText('')
    } catch {
      const errMsg: AgentMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        agentId: activeAgent.id,
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => ({
        ...prev,
        [activeAgent.id]: [...(prev[activeAgent.id] ?? []), errMsg],
      }))
      setStreamingText('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-white mb-2">AI Agent Team</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Your personal AI team, powered by AI ultra-fast inference.
        </p>
      </div>

      <div className="flex gap-4 h-[600px]">

        {/* ── Agent List ── */}
        <div
          className="w-52 flex-shrink-0 rounded-2xl overflow-hidden flex flex-col"
          style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)' }}
        >
          <div className="p-3" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
            <p className="text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>YOUR AGENTS</p>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {DEMO_AGENTS.map((agent) => (
              <button
                key={agent.id}
                onClick={() => setActiveAgent(agent)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 text-left transition-all"
                style={{
                  background: activeAgent.id === agent.id ? 'rgba(108,95,244,0.15)' : 'transparent',
                  border: `1px solid ${activeAgent.id === agent.id ? 'rgba(108,95,244,0.25)' : 'transparent'}`,
                }}
              >
                <span className="text-lg">{agent.emoji}</span>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-white truncate">{agent.name}</div>
                  <div className="text-xs truncate" style={{ color: 'var(--text-tertiary)' }}>{agent.role}</div>
                </div>
                {(messages[agent.id]?.length ?? 0) > 0 && (
                  <span
                    className="ml-auto w-2 h-2 rounded-full bg-brand-400 flex-shrink-0"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Chat Area ── */}
        <div
          className="flex-1 rounded-2xl flex flex-col overflow-hidden"
          style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)' }}
        >
          {/* Header */}
          <div
            className="px-5 py-4 flex items-center gap-3 flex-shrink-0"
            style={{ borderBottom: '1px solid var(--border-subtle)' }}
          >
            <span className="text-2xl">{activeAgent.emoji}</span>
            <div>
              <div className="font-medium text-white">{activeAgent.name}</div>
              <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{activeAgent.role}</div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                AI · {activeAgent.model.split('-').slice(0, 2).join(' ')}
              </span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {agentMessages.length === 0 && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-4"
              >
                <div className="text-center mb-6">
                  <span className="text-4xl">{activeAgent.emoji}</span>
                  <p className="font-medium text-white mt-3">Hey, I&apos;m {activeAgent.name}</p>
                  <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                    {activeAgent.role}. How can I help?
                  </p>
                </div>
                <div className="space-y-2">
                  {(SUGGESTED_PROMPTS[activeAgent.id] ?? []).map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      className="w-full text-left text-sm px-4 py-3 rounded-xl transition-all"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            <AnimatePresence>
              {agentMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mr-2 mt-0.5 text-sm"
                    >
                      {activeAgent.emoji}
                    </div>
                  )}
                  <div
                    className="max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed"
                    style={
                      msg.role === 'user'
                        ? { background: 'rgba(108,95,244,0.25)', color: '#fff', borderBottomRightRadius: 4 }
                        : { background: 'rgba(255,255,255,0.06)', color: 'var(--text-primary)', borderBottomLeftRadius: 4 }
                    }
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Streaming */}
            {streamingText && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mr-2 mt-0.5 text-sm">
                  {activeAgent.emoji}
                </div>
                <div
                  className="max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed"
                  style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-primary)', borderBottomLeftRadius: 4 }}
                >
                  {streamingText}
                  <span className="inline-block w-1 h-4 bg-brand-400 ml-0.5 animate-pulse" />
                </div>
              </motion.div>
            )}

            {loading && !streamingText && (
              <div className="flex justify-start">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mr-2 mt-0.5 text-sm">
                  {activeAgent.emoji}
                </div>
                <div
                  className="px-4 py-3 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                >
                  <div className="dot-loader"><span /><span /><span /></div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 flex-shrink-0" style={{ borderTop: '1px solid var(--border-subtle)' }}>
            <div className="flex gap-2">
              <textarea
                className="input-field flex-1 resize-none"
                placeholder={`Ask ${activeAgent.name} anything…`}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage()
                  }
                }}
                style={{ minHeight: 44, maxHeight: 120 }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                className="btn-primary px-4 py-2 disabled:opacity-40"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs mt-2" style={{ color: 'var(--text-tertiary)' }}>
              Powered by AI · {activeAgent.model} · Enter to send
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


