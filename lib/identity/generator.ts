// ============================================
// UNVEILS.ME — AI Identity Generation Engine
// Powered by Groq LLaMA 3.3 70B
// ============================================

import { groqComplete, extractJSON, selectModel } from '@/lib/groq/client'
import { nanoid } from 'nanoid'
import type { DigitalIdentity, IdentityType, AIAgent, ColorPalette, BrandVoice, SEOMeta } from '@/types'

// ─── Identity Generation Prompt ──────────────

function buildIdentityPrompt(
  name: string,
  type: IdentityType,
  description: string,
  subdomain: string
): string {
  return `You are the Unveils.me AI Identity Engine — the world's most advanced digital identity generator.

Generate a COMPLETE, elite-level digital identity for:
- Name: ${name}
- Type: ${type}
- Subdomain: ${subdomain}.unveils.me
- Description: ${description}

Return ONLY a valid JSON object. No preamble, no explanation, no markdown fences. Raw JSON only.

{
  "tagline": "Sharp, memorable one-liner (max 10 words, no clichés)",
  "bio": "Compelling 2-sentence bio in first person. Show personality.",
  "tone": "One word: the core communication style (e.g. Visionary, Precise, Raw, Warm)",
  "audience": "Who they serve — 8 words max, specific not generic",
  "colorPalette": {
    "primary": "#hexcode",
    "secondary": "#hexcode",
    "accent": "#hexcode",
    "background": "#hexcode (dark preferred)",
    "text": "#hexcode",
    "names": ["PrimaryName", "SecondaryName", "AccentName", "BgName", "TextName"]
  },
  "skills": ["skill1", "skill2", "skill3", "skill4", "skill5", "skill6"],
  "websiteHero": "Cinematic, punchy hero headline (5-8 words, no generic phrases)",
  "ctaText": "Strong CTA button label (2-4 words)",
  "brandVoice": {
    "personality": ["Trait1", "Trait2", "Trait3"],
    "avoids": ["Thing1", "Thing2"],
    "writingStyle": "One sentence describing their writing style",
    "emojiUsage": "none OR minimal OR moderate OR expressive"
  },
  "seoMeta": {
    "title": "SEO optimized page title with name and role",
    "description": "155-char SEO meta description",
    "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
  },
  "agents": [
    {
      "name": "Creative agent name",
      "type": "designer",
      "role": "What this agent does for them specifically",
      "emoji": "single emoji",
      "description": "2-sentence description of this agent",
      "capabilities": ["capability1", "capability2", "capability3"]
    },
    {
      "name": "Creative agent name",
      "type": "growth",
      "role": "What this agent does for them specifically",
      "emoji": "single emoji",
      "description": "2-sentence description of this agent",
      "capabilities": ["capability1", "capability2", "capability3"]
    },
    {
      "name": "Creative agent name",
      "type": "strategist",
      "role": "What this agent does for them specifically",
      "emoji": "single emoji",
      "description": "2-sentence description of this agent",
      "capabilities": ["capability1", "capability2", "capability3"]
    }
  ]
}

Rules:
- Be specific to THIS person — no generic corporate fluff
- Color palette must be cohesive and match their vibe
- Agent names should be memorable (e.g. "Nova", "Forge", "Lens")
- Make the hero headline genuinely cinematic — like Apple would write it
- The bio must sound like a real human wrote it`
}

// ─── Main Generator ───────────────────────────

export async function generateIdentity(params: {
  name: string
  type: IdentityType
  description: string
  subdomain: string
  userId: string
}): Promise<DigitalIdentity> {
  const { name, type, description, subdomain, userId } = params

  const prompt = buildIdentityPrompt(name, type, description, subdomain)

  const { text, model, latencyMs } = await groqComplete(prompt, {
    model: selectModel('identity'),
    temperature: 0.82,
    maxTokens: 2048,
  })

  console.log(`[Identity Engine] Generated in ${latencyMs}ms via ${model}`)

  type RawIdentity = {
    tagline: string
    bio: string
    tone: string
    audience: string
    colorPalette: ColorPalette
    skills: string[]
    websiteHero: string
    ctaText: string
    brandVoice: BrandVoice
    seoMeta: SEOMeta
    agents: Array<{
      name: string
      type: string
      role: string
      emoji: string
      description: string
      capabilities: string[]
    }>
  }

  const raw = extractJSON<RawIdentity>(text)
  if (!raw) throw new Error('Identity generation failed — invalid JSON response')

  // Build full identity object
  const identity: DigitalIdentity = {
    id: nanoid(),
    userId,
    subdomain,
    name,
    type,
    tagline: raw.tagline,
    bio: raw.bio,
    tone: raw.tone,
    audience: raw.audience,
    colorPalette: raw.colorPalette,
    skills: raw.skills,
    websiteHero: raw.websiteHero,
    ctaText: raw.ctaText,
    brandVoice: raw.brandVoice,
    seoMeta: raw.seoMeta,
    agents: raw.agents.map((a) => ({
      id: nanoid(),
      name: a.name,
      type: a.type as AIAgent['type'],
      role: a.role,
      emoji: a.emoji,
      description: a.description,
      capabilities: a.capabilities,
      systemPrompt: buildAgentSystemPrompt(a, name, type, raw.bio),
      model: selectModel('chat'),
      temperature: 0.75,
      isActive: true,
    })),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  return identity
}

// ─── Agent System Prompt Builder ──────────────

function buildAgentSystemPrompt(
  agent: { name: string; type: string; role: string; description: string },
  userName: string,
  userType: IdentityType,
  userBio: string
): string {
  return `You are ${agent.name}, an elite AI agent for ${userName} on Unveils.me.

Your role: ${agent.role}
User context: ${userBio}
User type: ${userType}

You are ${agent.description}

Personality:
- Speak directly and intelligently
- Be specific, never generic
- Act like a world-class expert in your domain
- Always keep ${userName}'s goals in mind
- Be proactive — suggest, don't just respond

Your responses should feel like advice from the best ${agent.type} in the world.`
}

// ─── Regenerate Single Section ────────────────

export async function regenerateSection(
  identity: DigitalIdentity,
  section: 'tagline' | 'bio' | 'websiteHero' | 'skills' | 'colorPalette'
): Promise<Partial<DigitalIdentity>> {
  const prompt = `You are the Unveils.me Identity Engine.

Regenerate ONLY the "${section}" for this identity:
Name: ${identity.name}
Type: ${identity.type}
Current bio: ${identity.bio}
Tone: ${identity.tone}

Return ONLY a JSON object with the "${section}" field. Raw JSON, no markdown.`

  const { text } = await groqComplete(prompt, {
    model: selectModel('identity'),
    temperature: 0.9,
    maxTokens: 512,
  })

  return extractJSON<Partial<DigitalIdentity>>(text) ?? {}
}

