// lib/seo/metadata.ts — Reusable SEO metadata helpers
import type { Metadata } from 'next'

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://unveils.me'

export function buildMetadata(opts: {
  title:       string
  description: string
  path?:       string
  type?:       'website' | 'article' | 'profile'
  ogTitle?:    string
  ogSubtitle?: string
  ogColor?:    string
  noIndex?:    boolean
}): Metadata {
  const { title, description, path = '', type = 'website', ogTitle, ogSubtitle, ogColor, noIndex } = opts

  const url     = `${BASE}${path}`
  const ogt     = encodeURIComponent(ogTitle ?? title)
  const ogs     = encodeURIComponent(ogSubtitle ?? description.slice(0, 80))
  const ogc     = encodeURIComponent(ogColor ?? '#6c5ff4')
  const ogImage = `${BASE}/api/og?title=${ogt}&subtitle=${ogs}&color=${ogc}`

  return {
    title,
    description,
    metadataBase: new URL(BASE),
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      type,
      siteName: 'Unveils.me',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card:        'summary_large_image',
      title,
      description,
      images:      [ogImage],
      site:        '@unveils_me',
      creator:     '@unveils_me',
    },
  }
}

// Page-specific metadata presets
export const META = {
  home: buildMetadata({
    title:       'Unveils.me — AI Identity Operating System',
    description: 'Every human gets an intelligent digital universe under yourname.unveils.me. AI identity, website, and agents — live in 30 seconds.',
    ogColor:     '#6c5ff4',
  }),
  pricing: buildMetadata({
    title:       'Pricing · Unveils.me',
    description: 'Start free. Upgrade when ready. Pro from $19/month with 14-day free trial.',
    path:        '/pricing',
    ogColor:     '#34d399',
  }),
  features: buildMetadata({
    title:       'Features · Unveils.me',
    description: 'AI identity engine, website generator, multi-agent OS, analytics, and developer API — all in one platform.',
    path:        '/features',
  }),
  about: buildMetadata({
    title:       'About Us · Unveils.me',
    description: 'We believe every human deserves a great online identity. Our story, mission, and team.',
    path:        '/about',
    ogColor:     '#f472b6',
  }),
  blog: buildMetadata({
    title:       'Blog · Unveils.me',
    description: 'Insights on AI, digital identity, and the future of the internet.',
    path:        '/blog',
    ogColor:     '#38bdf8',
  }),
  faq: buildMetadata({
    title:       'FAQ · Unveils.me',
    description: 'Frequently asked questions about Unveils.me — plans, AI, security, and more.',
    path:        '/faq',
  }),
  careers: buildMetadata({
    title:       'Careers · Unveils.me',
    description: "We're hiring. Join us to build the future of digital identity.",
    path:        '/careers',
    ogColor:     '#34d399',
  }),
}

// Generate profile OG metadata
export function buildProfileMeta(opts: {
  name:      string
  tagline:   string
  subdomain: string
  color:     string
}): Metadata {
  return buildMetadata({
    title:       `${opts.name} · ${opts.subdomain}.unveils.me`,
    description: opts.tagline,
    path:        `/u/${opts.subdomain}`,
    type:        'profile',
    ogTitle:     opts.name,
    ogSubtitle:  opts.tagline,
    ogColor:     opts.color,
  })
}

