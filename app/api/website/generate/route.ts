// ============================================
// UNVEILS.ME — Website Generation API
// POST /api/website/generate
// ============================================

import { NextRequest, NextResponse } from 'next/server'
import { generateWebsiteContent, generateWebsiteHTML, WEBSITE_THEMES } from '@/lib/identity/website-generator'
import { z } from 'zod'

const RequestSchema = z.object({
  identity: z.object({
    id: z.string(),
    userId: z.string(),
    name: z.string(),
    subdomain: z.string(),
    type: z.string(),
    tagline: z.string(),
    bio: z.string(),
    tone: z.string(),
    audience: z.string(),
    colorPalette: z.object({
      primary: z.string(),
      secondary: z.string(),
      accent: z.string(),
      background: z.string(),
      text: z.string(),
      names: z.array(z.string()),
    }),
    skills: z.array(z.string()),
    websiteHero: z.string(),
    ctaText: z.string(),
    agents: z.array(z.any()),
    brandVoice: z.any(),
    seoMeta: z.any(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  themeKey: z.string().default('MIDNIGHT'),
  includeHTML: z.boolean().default(false),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { identity, themeKey, includeHTML } = RequestSchema.parse(body)

    const theme = WEBSITE_THEMES[themeKey] ?? WEBSITE_THEMES.MIDNIGHT

    const start = Date.now()
    const website = await generateWebsiteContent(identity as Parameters<typeof generateWebsiteContent>[0], theme)

    if (includeHTML) {
      const html = await generateWebsiteHTML(identity as Parameters<typeof generateWebsiteHTML>[0], website)
      website.html = html
    }

    const latencyMs = Date.now() - start

    return NextResponse.json({
      success: true,
      data: website,
      metadata: { latency: latencyMs, model: 'Advanced AI-3.3-70b-versatile' },
    })

  } catch (error: unknown) {
    console.error('[/api/website/generate]', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Website generation failed' },
      { status: 500 }
    )
  }
}


