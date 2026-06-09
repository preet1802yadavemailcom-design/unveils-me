// ============================================
// UNVEILS.ME — Stripe Billing Layer
// Plans · Checkout · Portal · Webhooks
// ============================================

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
  typescript: true,
})

// ─── Plan definitions ─────────────────────────

export const PLANS = {
  FREE: {
    id: 'free',
    name: 'Free',
    tagline: 'Start exploring AI identity',
    priceMonthly: 0,
    priceYearly: 0,
    stripePriceMonthly: null as string | null,
    stripePriceYearly: null as string | null,
    features: [
      '1 digital identity',
      '3 AI agents',
      '100 AI messages / month',
      'Basic website generator',
      'unveils.me subdomain',
      'Community support',
    ],
    limits: { identities: 1, agents: 3, messages: 100, websites: 2, memoryEntries: 50, apiKeys: 0 },
    badge: null as string | null,
  },
  PRO: {
    id: 'pro',
    name: 'Pro',
    tagline: 'For serious creators & founders',
    priceMonthly: 19,
    priceYearly: 15,
    stripePriceMonthly: process.env.STRIPE_PRO_MONTHLY ?? null,
    stripePriceYearly: process.env.STRIPE_PRO_YEARLY ?? null,
    features: [
      '5 digital identities',
      'Unlimited AI agents',
      '5,000 AI messages / month',
      'Advanced website generator',
      'Custom subdomain',
      'AI memory system (1k entries)',
      'Analytics dashboard',
      '1 API key',
      'Priority email support',
      'Remove Unveils.me branding',
    ],
    limits: { identities: 5, agents: -1, messages: 5000, websites: 20, memoryEntries: 1000, apiKeys: 1 },
    badge: 'Most Popular',
  },
  ENTERPRISE: {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'For teams & power users',
    priceMonthly: 99,
    priceYearly: 79,
    stripePriceMonthly: process.env.STRIPE_ENT_MONTHLY ?? null,
    stripePriceYearly: process.env.STRIPE_ENT_YEARLY ?? null,
    features: [
      'Unlimited identities',
      'Unlimited AI agents',
      'Unlimited AI messages',
      'Custom domain support',
      'Unlimited AI memory',
      'Advanced analytics & exports',
      'Unlimited API keys',
      'White-label option',
      'Team collaboration (coming)',
      'Dedicated Slack support',
      'SLA guarantee',
    ],
    limits: { identities: -1, agents: -1, messages: -1, websites: -1, memoryEntries: -1, apiKeys: -1 },
    badge: 'Best Value',
  },
} as const

export type PlanKey = keyof typeof PLANS

// ─── Check feature access ─────────────────────
export function withinLimit(plan: PlanKey, feature: keyof typeof PLANS.FREE.limits, usage: number): boolean {
  const limit = PLANS[plan].limits[feature]
  return limit === -1 || usage < limit
}

export function getLimit(plan: PlanKey, feature: keyof typeof PLANS.FREE.limits): number {
  return PLANS[plan].limits[feature]
}

// ─── Create Checkout Session ──────────────────
export async function createCheckout(opts: {
  userId: string
  email: string
  plan: 'PRO' | 'ENTERPRISE'
  interval: 'monthly' | 'yearly'
  origin: string
}): Promise<string> {
  const { userId, email, plan, interval, origin } = opts
  const p = PLANS[plan]
  const priceId = interval === 'yearly' ? p.stripePriceYearly : p.stripePriceMonthly
  if (!priceId) throw new Error(`No Stripe price configured for ${plan} ${interval}`)

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer_email: email,
    line_items: [{ price: priceId, quantity: 1 }],
    allow_promotion_codes: true,
    subscription_data: {
      trial_period_days: 14,
      metadata: { userId, plan },
    },
    metadata: { userId, plan },
    success_url: `${origin}/dashboard?upgraded=1&plan=${plan.toLowerCase()}`,
    cancel_url: `${origin}/pricing`,
  })

  return session.url!
}

// ─── Customer portal ──────────────────────────
export async function createPortal(customerId: string, returnUrl: string): Promise<string> {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })
  return session.url
}

// ─── Validate webhook signature ───────────────
export function constructWebhookEvent(payload: string, sig: string): Stripe.Event {
  return stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET!)
}

