// app/sitemap.ts — Auto-generated dynamic sitemap
import type { MetadataRoute } from 'next'

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://unveils.me'
const NOW  = new Date()

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}`,            lastModified: NOW, changeFrequency: 'daily',   priority: 1.0 },
    { url: `${BASE}/pricing`,    lastModified: NOW, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/features`,   lastModified: NOW, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/about`,      lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/blog`,       lastModified: NOW, changeFrequency: 'daily',   priority: 0.8 },
    { url: `${BASE}/contact`,    lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/faq`,        lastModified: NOW, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/careers`,    lastModified: NOW, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/team`,       lastModified: NOW, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/press`,      lastModified: NOW, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/partners`,   lastModified: NOW, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/legal/terms`,    lastModified: NOW, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/legal/privacy`,  lastModified: NOW, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/legal/cookie-policy`, lastModified: NOW, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE}/legal/refund`,    lastModified: NOW, changeFrequency: 'yearly', priority: 0.2 },
  ]

  // Blog posts
  const blogSlugs = ['AI-fastest-ai-inference','digital-identity-future','advanced-ai-guide','personal-branding-ai','launching-saas-checklist','multi-agent-systems']
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map(slug => ({
    url: `${BASE}/blog/${slug}`, lastModified: NOW, changeFrequency: 'monthly' as const, priority: 0.7,
  }))

  // Dynamic: published identity profiles
  let profilePages: MetadataRoute.Sitemap = []
  try {
    const { default: prisma } = await import('@/lib/db/prisma')
    const identities = await prisma.identity.findMany({
      where: { isPublished: true },
      select: { subdomain: true, updatedAt: true },
      take: 1000,
    })
    profilePages = identities.map(i => ({
      url: `https://${i.subdomain}.${process.env.NEXT_PUBLIC_APP_DOMAIN ?? 'unveils.me'}`,
      lastModified: i.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))
  } catch { /* DB not configured */ }

  return [...staticPages, ...blogPages, ...profilePages]
}

