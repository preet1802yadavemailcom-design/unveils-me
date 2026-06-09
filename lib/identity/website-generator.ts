// ============================================
// UNVEILS.ME — AI Website Generation Engine
// Generates full HTML/CSS from identity
// ============================================

import { groqComplete, extractJSON, selectModel } from '@/lib/groq/client'
import type { DigitalIdentity, GeneratedWebsite, WebsiteSection, WebsiteTheme } from '@/types'
import { nanoid } from 'nanoid'

// ─── Website Content Generator ────────────────

export async function generateWebsiteContent(
  identity: DigitalIdentity,
  theme: WebsiteTheme
): Promise<GeneratedWebsite> {

  const prompt = `You are the Unveils.me Website Generation Engine.

Create a complete website content structure for:
Name: ${identity.name}
Type: ${identity.type}
Tagline: ${identity.tagline}
Bio: ${identity.bio}
Skills: ${identity.skills.join(', ')}
Audience: ${identity.audience}
Tone: ${identity.tone}
Website Hero: ${identity.websiteHero}
CTA: ${identity.ctaText}

Return ONLY a raw JSON object:
{
  "title": "page title",
  "sections": [
    {
      "id": "hero",
      "type": "hero",
      "order": 1,
      "content": {
        "headline": "${identity.websiteHero}",
        "subheadline": "compelling 15-word subheadline",
        "cta": "${identity.ctaText}",
        "ctaSecondary": "secondary action label"
      }
    },
    {
      "id": "about",
      "type": "about",
      "order": 2,
      "content": {
        "heading": "About section heading (creative, not just 'About Me')",
        "body": "3-paragraph about text, each 2-3 sentences. Compelling story arc.",
        "highlight": "One standout fact or achievement"
      }
    },
    {
      "id": "skills",
      "type": "skills",
      "order": 3,
      "content": {
        "heading": "Skills section heading",
        "items": [
          {"name": "skill", "level": 90, "description": "brief description"}
        ]
      }
    },
    {
      "id": "projects",
      "type": "projects",
      "order": 4,
      "content": {
        "heading": "Work/Projects section heading",
        "items": [
          {
            "title": "project name",
            "description": "2-sentence description",
            "tags": ["tag1", "tag2"],
            "status": "live OR in-progress OR concept"
          }
        ]
      }
    },
    {
      "id": "cta",
      "type": "cta",
      "order": 5,
      "content": {
        "heading": "Powerful closing headline",
        "body": "1-2 sentences",
        "cta": "Final CTA label",
        "subtext": "Trust signal or social proof"
      }
    }
  ]
}`

  const { text } = await groqComplete(prompt, {
    model: selectModel('website'),
    temperature: 0.8,
    maxTokens: 3000,
  })

  type RawWebsite = {
    title: string
    sections: WebsiteSection[]
  }

  const raw = extractJSON<RawWebsite>(text)
  if (!raw) throw new Error('Website generation failed')

  return {
    id: nanoid(),
    userId: identity.userId,
    identityId: identity.id,
    title: raw.title,
    sections: raw.sections,
    theme,
    createdAt: new Date().toISOString(),
  }
}

// ─── HTML/CSS Generator ───────────────────────
// Generates actual deployable HTML from website + identity

export async function generateWebsiteHTML(
  identity: DigitalIdentity,
  website: GeneratedWebsite
): Promise<string> {
  const { colorPalette, name, tagline, skills } = identity
  const { theme } = website

  const sectionsText = website.sections
    .sort((a, b) => a.order - b.order)
    .map((s) => `Section: ${s.type}\nContent: ${JSON.stringify(s.content, null, 2)}`)
    .join('\n\n---\n\n')

  const prompt = `You are an elite frontend developer. Generate a COMPLETE, production-ready single-page HTML file for a personal website.

Identity:
${sectionsText}

Design system:
- Primary color: ${colorPalette.primary}
- Secondary: ${colorPalette.secondary}
- Accent: ${colorPalette.accent}
- Background: ${colorPalette.background}
- Text: ${colorPalette.text}
- Style: ${theme.style}
- Font display: ${theme.fontDisplay}
- Font body: ${theme.fontBody}
- Animations: ${theme.animations}
- Glassmorphism: ${theme.glassmorphism}

Requirements:
1. Complete single HTML file with embedded CSS and minimal JS
2. Use Google Fonts for typography
3. Smooth scroll, hover effects
4. Fully responsive (mobile-first)
5. CSS animations on scroll (use IntersectionObserver)
6. Glassmorphism cards if enabled
7. Gradient mesh background
8. No external libraries except Google Fonts
9. The result must look like it was made by a world-class design agency

Return ONLY the raw HTML. Nothing else.`

  const { text } = await groqComplete(prompt, {
    model: selectModel('website'),
    temperature: 0.7,
    maxTokens: 4096,
  })

  // Clean up any markdown wrapper
  return text
    .replace(/^```html\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim()
}

// ─── Theme Presets ────────────────────────────

export const WEBSITE_THEMES: Record<string, WebsiteTheme> = {
  MIDNIGHT: {
    mode: 'dark',
    style: 'futuristic',
    fontDisplay: 'Syne',
    fontBody: 'DM Sans',
    animations: true,
    glassmorphism: true,
  },
  MINIMAL: {
    mode: 'light',
    style: 'minimal',
    fontDisplay: 'Playfair Display',
    fontBody: 'Inter',
    animations: false,
    glassmorphism: false,
  },
  BOLD: {
    mode: 'dark',
    style: 'bold',
    fontDisplay: 'Space Grotesk',
    fontBody: 'IBM Plex Sans',
    animations: true,
    glassmorphism: false,
  },
  ELEGANT: {
    mode: 'light',
    style: 'elegant',
    fontDisplay: 'Cormorant Garamond',
    fontBody: 'Lato',
    animations: true,
    glassmorphism: true,
  },
  BRUTALIST: {
    mode: 'light',
    style: 'brutalist',
    fontDisplay: 'Anton',
    fontBody: 'Space Mono',
    animations: false,
    glassmorphism: false,
  },
}

