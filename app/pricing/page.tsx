'use client'
import Footer from '@/components/ui/Footer'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Zap, Sparkles, Building2, ArrowRight, Star, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { PLANS } from '@/lib/billing/stripe'
import toast from 'react-hot-toast'

const FAQS = [
  { q: 'Can I cancel anytime?', a: 'Yes — cancel from your dashboard settings. You keep full access until the end of your billing period. No questions asked, no penalties.' },
  { q: 'Is Pro available now?', a: "Pro access is rolling out gradually through our beta program." },
  { q: 'What AI models does Unveils.me use?', a: 'We use AI-powered Advanced AI for identity generation (~80 tok/s), Realtime AI Instant for real-time chat (~200 tok/s), and Creative AI for creative content.' },
  { q: 'Can I use my own domain?', a: 'Yes — Enterprise plan supports custom domains. Pro includes your own subdomain like yourname.unveils.me.' },
  { q: 'What happens if I hit my message limit?', a: "Your agents and identity stay live. You just can't send new messages until your quota resets on the 1st of the month or you upgrade." },
]

function PricingCard({
  planKey, plan, interval, onUpgrade, index
}: {
  planKey: string
  plan: typeof PLANS[keyof typeof PLANS]
  interval: 'monthly' | 'yearly'
  onUpgrade: (key: string, interval: string) => void
  index: number
}) {
  const price   = interval === 'yearly' ? plan.priceYearly : plan.priceMonthly
  const isPro   = planKey === 'PRO'
  const isFree  = planKey === 'FREE'

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: isPro
          ? 'linear-gradient(160deg, rgba(108,95,244,0.18) 0%, rgba(108,95,244,0.06) 100%)'
          : 'rgba(255,255,255,0.03)',
        border: isPro ? '1px solid rgba(108,95,244,0.45)' : '1px solid rgba(255,255,255,0.08)',
        boxShadow: isPro ? '0 0 60px rgba(108,95,244,0.15)' : 'none',
      }}
    >
      {/* Top gradient line for Pro */}
      {isPro && <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-400 to-transparent" />}

      {'badge' in plan && plan.badge && (
        <div className="absolute top-5 right-5">
          <span className="badge badge-brand text-xs">{plan.badge as string}</span>
        </div>
      )}

      <div className="p-8 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ background: isPro ? 'rgba(108,95,244,0.25)' : 'rgba(255,255,255,0.06)' }}>
            {planKey === 'FREE'       && <Sparkles  className="w-5 h-5" style={{ color: isPro ? '#a29afb' : 'var(--text-secondary)' }} />}
            {planKey === 'PRO'        && <Zap        className="w-5 h-5 text-brand-400" />}
            {planKey === 'ENTERPRISE' && <Building2  className="w-5 h-5" style={{ color:'var(--text-secondary)' }} />}
          </div>
          <div>
            <div className="font-display font-bold text-white">{plan.name}</div>
            <div className="text-xs" style={{ color:'var(--text-tertiary)' }}>{plan.tagline}</div>
          </div>
        </div>

        {/* Price */}
        <div className="mb-7">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-5xl font-extrabold text-white">${price}</span>
            {price > 0 && <span className="text-sm" style={{ color:'var(--text-tertiary)' }}>/mo{interval === 'yearly' ? ', billed yearly' : ''}</span>}
          </div>
          {price === 0 && <div className="text-sm mt-1" style={{ color:'var(--text-tertiary)' }}>Free forever</div>}
          {interval === 'yearly' && price > 0 && (
            <div className="text-xs mt-1.5 font-medium" style={{ color:'#34d399' }}>
              Save ${(plan.priceMonthly - price) * 12}/year vs monthly
            </div>
          )}
        </div>

        {/* CTA */}
        <button
          onClick={() => onUpgrade(planKey, interval)}
          className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold mb-7 transition-all ${
            isPro ? 'btn-primary' : 'btn-ghost'
          }`}
        >
          {isFree   ? 'Start free'          : null}
          {isPro    ? 'Join Waitlist'  : null}
          {!isFree && !isPro ? 'Contact sales' : null}
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {/* Features */}
        <ul className="space-y-3 flex-1">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <Check className="w-4 h-4 mt-0.5 flex-shrink-0"
                style={{ color: isPro ? '#a29afb' : '#34d399' }} />
              <span className="text-sm leading-snug" style={{ color:'var(--text-secondary)' }}>{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="glass-card overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-5 text-left">
        <span className="text-sm font-medium text-white pr-4">{q}</span>
        <ChevronDown className="w-4 h-4 flex-shrink-0 transition-transform" style={{ color:'var(--text-tertiary)', transform: open ? 'rotate(180deg)' : '' }} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} style={{ overflow:'hidden' }}>
            <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color:'var(--text-secondary)', borderTop:'1px solid rgba(255,255,255,0.05)', paddingTop:16 }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function PricingPage() {
  const [interval, setInterval] = useState<'monthly' | 'yearly'>('yearly')
  const [loading, setLoading]   = useState<string | null>(null)

  async function handleUpgrade(planKey: string, interval: string) {
    if (planKey === 'FREE')       { window.location.href = '/auth?mode=register'; return }
    if (planKey === 'ENTERPRISE') { window.location.href = 'mailto:official.unveilsme@gmail.com?subject=Enterprise'; return }

    setLoading(planKey)
    try {
      const res  = await fetch('/api/billing/checkout', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId: planKey, interval }),
      })
      const data = await res.json()
      if (data.success) window.location.href = data.data.url
      else if (res.status === 401) window.location.href = `/auth?redirect=/pricing`
      else toast.error(data.error ?? 'Something went wrong')
    } catch { toast.error('Network error. Please try again.') }
    finally   { setLoading(null) }
  }

  const plans = [
    { key: 'FREE',       plan: PLANS.FREE },
    { key: 'PRO',        plan: PLANS.PRO },
    { key: 'ENTERPRISE', plan: PLANS.ENTERPRISE },
  ]

  return (
    <main className="min-h-screen bg-surface-50">
      {/* Mesh */}
      <div className="mesh-gradient fixed inset-0 pointer-events-none" />
      <div className="bg-grid fixed inset-0 pointer-events-none" />

      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 glass" style={{ borderBottom:'1px solid var(--border-subtle)' }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-white">unveils.me</span>
          </Link>
          <div className="flex items-center gap-6 text-sm">
            {([['Features','/features'],['Blog','/blog'],['FAQ','/faq'],['About','/about']] as [string,string][]).map(([l,h])=>(
              <Link key={l} href={h} className="text-t3 hover:text-white transition-colors">{l}</Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth" className="btn-ghost text-sm py-2 px-4">Sign in</Link>
            <Link href="/auth?mode=register" className="btn-primary text-sm py-2 px-4">Get started free <ArrowRight className="w-3.5 h-3.5" /></Link>
          </div>
        </div>
      </nav>

      <div className="relative z-10 pt-32 pb-24 px-6">

        {/* Header */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="text-center mb-16">
          <div className="badge badge-brand mb-4 inline-flex">
            <Star className="w-3 h-3" /> Simple, transparent pricing
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4" style={{ lineHeight:1.1 }}>
            <span className="text-gradient">Invest in your</span><br />
            <span className="text-gradient">digital future</span>
          </h1>
          <p className="text-lg max-w-lg mx-auto mb-10" style={{ color:'var(--text-secondary)' }}>
            Start free. Upgrade when you&apos;re ready. Cancel anytime. Powered by AI.
          </p>

          {/* Interval toggle */}
          <div className="inline-flex items-center p-1 rounded-full" style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)' }}>
            {(['monthly','yearly'] as const).map((i) => (
              <button key={i} onClick={() => setInterval(i)}
                className="px-6 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2"
                style={{
                  background: interval === i ? 'rgba(108,95,244,0.3)' : 'transparent',
                  color: interval === i ? '#a29afb' : 'var(--text-secondary)',
                }}>
                {i === 'monthly' ? 'Monthly' : 'Yearly'}
                {i === 'yearly' && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background:'rgba(52,211,153,0.2)', color:'#34d399' }}>Save 20%</span>}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Plans */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 mb-24">
          {plans.map(({ key, plan }, i) => (
            <PricingCard key={key} planKey={key} plan={plan} interval={interval} onUpgrade={handleUpgrade} index={i} />
          ))}
        </div>

        {/* Social proof */}
        <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} className="text-center mb-20">
          <p className="text-sm mb-6" style={{ color:'var(--text-tertiary)' }}>Trusted by founders and creators</p>
          <div className="flex flex-wrap justify-center gap-6">
            {['10x faster than any website builder','Advanced AI on AI','<3s identity generation','World-class AI agents'].map((t) => (
              <div key={t} className="flex items-center gap-2 text-sm" style={{ color:'var(--text-secondary)' }}>
                <Check className="w-4 h-4 text-brand-400" />
                {t}
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-white text-center mb-8">Common questions</h2>
          <div className="space-y-3">
            {FAQS.map((faq) => <FAQ key={faq.q} {...faq} />)}
          </div>
        </div>

      </div>
      <Footer />
    </main>
  )
}

