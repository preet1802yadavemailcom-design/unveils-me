// lib/analytics/track.ts — Client-side event tracking

type EventName =
  | 'page_view'
  | 'identity_generated'
  | 'agent_message_sent'
  | 'website_generated'
  | 'signup_started'
  | 'signup_completed'
  | 'upgrade_clicked'
  | 'checkout_started'
  | 'checkout_completed'
  | 'profile_viewed'
  | 'cta_clicked'
  | 'feature_used'

interface EventProperties {
  [key: string]: string | number | boolean | null | undefined
}

// ─── Main track function ──────────────────────
export async function track(event: EventName, properties: EventProperties = {}): Promise<void> {
  try {
    // Send to our analytics API
    await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, properties, timestamp: new Date().toISOString() }),
    })

    // Also send to Vercel Analytics if available
    if (typeof window !== 'undefined' && (window as Window & { va?: (e: string, p?: object) => void }).va) {
      (window as Window & { va?: (e: string, p?: object) => void }).va!(event, properties)
    }

    // Console in dev
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] ${event}`, properties)
    }
  } catch {
    // Analytics should never break the app
  }
}

// ─── Page view tracking ───────────────────────
export function trackPageView(path: string): void {
  track('page_view', { path, referrer: document.referrer || null, title: document.title })
}

// ─── Conversion tracking ──────────────────────
export function trackSignupStart(source: string): void {
  track('signup_started', { source })
}

export function trackSignupComplete(plan: string): void {
  track('signup_completed', { plan })
}

export function trackUpgradeClick(from: string, to: string): void {
  track('upgrade_clicked', { from_plan: from, to_plan: to })
}

export function trackIdentityGenerated(type: string, latency: number): void {
  track('identity_generated', { identity_type: type, latency_ms: latency })
}

export function trackAgentMessage(agentType: string): void {
  track('agent_message_sent', { agent_type: agentType })
}

// ─── Google Analytics (gtag) helper ──────────
export function initGoogleAnalytics(measurementId: string): void {
  if (typeof window === 'undefined') return
  const script = document.createElement('script')
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  script.async = true
  document.head.appendChild(script)

  const w = window as Window & { dataLayer?: unknown[] }
  w.dataLayer = w.dataLayer ?? []
  function gtag(...args: unknown[]) { w.dataLayer!.push(args) }
  gtag('js', new Date())
  gtag('config', measurementId)
}

