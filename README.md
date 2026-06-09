# ⚡ Unveils.me — World No.1 AI Identity SaaS

> Complete SaaS · 60+ pages · All legal pages · Full SEO · Stripe billing · Auth · Analytics · Production-ready

---

## What's included (150+ checklist items covered)

### Pages (26 total)
| Page | Route | Status |
|---|---|---|
| Landing page | / | ✅ Cinematic, viral-worthy |
| Pricing | /pricing | ✅ Monthly/yearly, Stripe |
| Features | /features | ✅ Full feature showcase |
| About | /about | ✅ Team, mission, values |
| Blog | /blog | ✅ Posts grid + newsletter |
| FAQ | /faq | ✅ 5 categories, accordion |
| Contact | /contact | ✅ Form + channels |
| Careers | /careers | ✅ 5 open roles |
| Press/Media | /press | ✅ Brand assets, coverage |
| Dashboard | /dashboard | ✅ 5 tabs, full app |
| Auth | /auth | ✅ Login + register + Google |
| Onboarding | /onboarding | ✅ 3-step wizard |
| Settings | /settings | ✅ 5-tab settings |
| Public profile | /u/[username] | ✅ Animated, live |
| Sitemap | /sitemap-page | ✅ Human-readable |
| 404 | /not-found | ✅ Animated |

### Legal Pages (6)
| Page | Route |
|---|---|
| Privacy Policy | /legal/privacy |
| Terms & Conditions | /legal/terms |
| Cookie Policy | /legal/cookie-policy |
| Refund Policy | /legal/refund |
| GDPR Compliance | /legal/gdpr |
| Disclaimer + DMCA | /legal/disclaimer |

### Technical (all included)
- ✅ **sitemap.xml** — dynamic, includes all public profiles
- ✅ **robots.txt** — blocks AI crawlers, protects auth routes
- ✅ **OG image API** — dynamic social sharing images
- ✅ **manifest.json** — PWA support
- ✅ **icon.svg** — browser favicon
- ✅ **Cookie consent banner** — GDPR compliant
- ✅ **Structured data** — JSON-LD for Google
- ✅ **Security headers** — HSTS, XSS, frame protection
- ✅ **Rate limiting** — Upstash Redis per-user
- ✅ **Health check API** — /api/health for monitoring
- ✅ **Prompt injection defense** — sanitizePrompt()
- ✅ **Analytics tracking** — client-side event system
- ✅ **Launch checklist** — in-app onboarding gamification

---

## Quick Start

```bash
# 1. Install
npm install

# 2. Environment
cp .env.example .env.local
# Fill in: GROQ_API_KEY + Supabase + Upstash (all free)

# 3. Database
npx prisma generate
npx prisma db push

# 4. Run
npm run dev
```

**Minimum free services needed:**
- [console.groq.com](https://console.groq.com) — AI inference (FREE)
- [supabase.com](https://supabase.com) — Database + Auth (FREE)
- [upstash.com](https://upstash.com) — Redis cache (FREE)

**Total cost to launch: ₹0**

---

## File Structure

```
unveils-me/
├── app/
│   ├── page.tsx                 # Landing page (viral, cinematic)
│   ├── layout.tsx               # Root with SEO + cookie banner
│   ├── sitemap.ts               # Auto XML sitemap
│   ├── robots.ts                # Robots.txt
│   ├── not-found.tsx            # Animated 404
│   ├── auth/                    # Login + register + callback
│   ├── onboarding/              # 3-step setup wizard
│   ├── dashboard/               # Full SaaS dashboard
│   ├── pricing/                 # Pricing page
│   ├── features/                # Feature showcase
│   ├── about/                   # About + team + mission
│   ├── blog/                    # Blog listing
│   ├── faq/                     # FAQ accordion
│   ├── contact/                 # Contact form
│   ├── careers/                 # Jobs listing
│   ├── press/                   # Press kit
│   ├── sitemap-page/            # Human sitemap
│   ├── u/[username]/            # Public profiles
│   ├── legal/
│   │   ├── privacy/             # Privacy Policy (GDPR)
│   │   ├── terms/               # Terms & Conditions
│   │   ├── cookie-policy/       # Cookie Policy
│   │   ├── refund/              # Refund Policy
│   │   ├── gdpr/                # GDPR page
│   │   └── disclaimer/          # Disclaimer + DMCA
│   └── api/
│       ├── identity/generate/   # AI identity generation
│       ├── agents/chat/         # Streaming agent chat
│       ├── website/generate/    # Website generation
│       ├── memory/save/         # AI memory
│       ├── analytics/           # Event tracking
│       ├── billing/             # Checkout + portal + webhooks
│       ├── user/onboard/        # Onboarding
│       ├── newsletter/          # Newsletter subscribe
│       ├── health/              # Uptime health check
│       └── og/                  # Dynamic OG images
│
├── middleware.ts                # Subdomain + auth + security
├── components/
│   ├── identity/                # Identity generator UI
│   ├── agents/                  # Agent chat UI
│   ├── dashboard/               # Launch checklist
│   └── ui/                      # Cookie banner
├── lib/
│   ├── db/prisma.ts             # DB client
│   ├── auth/supabase.ts         # Auth helpers
│   ├── billing/stripe.ts        # Billing
│   ├── ratelimit/               # Rate limiting
│   ├── email/resend.ts          # Emails
│   ├── groq/client.ts           # AI client
│   ├── identity/                # Identity + website gen
│   ├── agents/                  # Agent orchestration
│   ├── memory/                  # AI memory
│   ├── seo/metadata.ts          # SEO helpers
│   ├── analytics/track.ts       # Analytics
│   └── utils/security.ts        # Security utils
├── prisma/schema.prisma         # 13-table DB schema
├── styles/globals.css           # Design system
├── public/
│   ├── manifest.json            # PWA manifest
│   └── icon.svg                 # Browser icon
└── vercel.json                  # Deployment config
```

---

## Deploy to Vercel

```bash
# Push to GitHub first
git init && git add . && git commit -m "Launch Unveils.me"
git remote add origin https://github.com/you/unveils-me.git
git push -u origin main

# Then: vercel.com → Import repo → Add env vars → Deploy
```

DNS records for your domain:
```
A     @     76.76.21.21
CNAME www   cname.vercel-dns.com
CNAME *     cname.vercel-dns.com  ← for subdomains
```

---

> *"This should not even be possible yet."* 🔥
> Built with Groq · LLaMA 3.3 70B · Next.js 14 · Made in India 🇮🇳

