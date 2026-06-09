// ============================================
// UNVEILS.ME — Global Type Definitions
// ============================================

// ─── Identity ────────────────────────────────

export type IdentityType =
  | 'FOUNDER'
  | 'CREATOR'
  | 'STARTUP'
  | 'DEVELOPER'
  | 'DESIGNER'
  | 'ARTIST'
  | 'RESEARCHER'
  | 'EXECUTIVE'

export interface ColorPalette {
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
  names: string[]
}

export interface DigitalIdentity {
  id: string
  userId: string
  subdomain: string          // e.g. "arjun"
  name: string
  type: IdentityType
  tagline: string
  bio: string
  tone: string
  audience: string
  colorPalette: ColorPalette
  skills: string[]
  websiteHero: string
  ctaText: string
  agents: AIAgent[]
  brandVoice: BrandVoice
  seoMeta: SEOMeta
  createdAt: string
  updatedAt: string
}

export interface BrandVoice {
  personality: string[]      // e.g. ["Bold", "Curious", "Direct"]
  avoids: string[]           // e.g. ["Jargon", "Passive voice"]
  writingStyle: string
  emojiUsage: 'none' | 'minimal' | 'moderate' | 'expressive'
}

export interface SEOMeta {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
}

// ─── AI Agents ───────────────────────────────

export type AgentType =
  | 'assistant'
  | 'designer'
  | 'marketer'
  | 'developer'
  | 'strategist'
  | 'researcher'
  | 'recruiter'
  | 'content'
  | 'growth'

export interface AIAgent {
  id: string
  name: string
  type: AgentType
  role: string
  emoji: string
  description: string
  capabilities: string[]
  systemPrompt: string
  model: GroqModel
  temperature: number
  isActive: boolean
}

export interface AgentMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  agentId?: string
  timestamp: string
  metadata?: Record<string, unknown>
}

export interface AgentSession {
  id: string
  userId: string
  agentId: string
  messages: AgentMessage[]
  context: string
  createdAt: string
  updatedAt: string
}

// ─── Website Generation ───────────────────────

export interface WebsiteSection {
  id: string
  type: 'hero' | 'about' | 'skills' | 'projects' | 'contact' | 'social' | 'cta' | 'testimonials'
  content: Record<string, unknown>
  order: number
}

export interface GeneratedWebsite {
  id: string
  userId: string
  identityId: string
  title: string
  sections: WebsiteSection[]
  theme: WebsiteTheme
  html?: string
  css?: string
  publishedAt?: string
  createdAt: string
}

export interface WebsiteTheme {
  mode: 'dark' | 'light'
  style: 'minimal' | 'bold' | 'futuristic' | 'elegant' | 'brutalist'
  fontDisplay: string
  fontBody: string
  animations: boolean
  glassmorphism: boolean
}

// ─── Memory System ────────────────────────────

export interface MemoryEntry {
  id: string
  userId: string
  type: 'preference' | 'goal' | 'interaction' | 'project' | 'insight' | 'style'
  content: string
  embedding?: number[]
  importance: 1 | 2 | 3 | 4 | 5
  tags: string[]
  createdAt: string
}

export interface UserMemory {
  userId: string
  entries: MemoryEntry[]
  summary: string
  lastUpdated: string
}

// ─── Groq Models ─────────────────────────────

export type GroqModel =
  | 'llama-3.3-70b-versatile'
  | 'llama-3.1-70b-versatile'
  | 'llama-3.1-8b-instant'
  | 'gemma2-9b-it'
  | 'llama3-70b-8192'

export interface GroqConfig {
  model: GroqModel
  temperature?: number
  maxTokens?: number
  stream?: boolean
  systemPrompt?: string
}

// ─── User ─────────────────────────────────────

export interface UnveilsUser {
  id: string
  email: string
  name: string
  avatarUrl?: string
  plan: 'free' | 'pro' | 'enterprise'
  identities: DigitalIdentity[]
  agents: AIAgent[]
  createdAt: string
}

// ─── API Responses ────────────────────────────

export interface APIResponse<T> {
  success: boolean
  data?: T
  error?: string
  metadata?: {
    model?: string
    latency?: number
    tokens?: number
  }
}

export interface StreamChunk {
  type: 'text' | 'done' | 'error'
  content: string
}
