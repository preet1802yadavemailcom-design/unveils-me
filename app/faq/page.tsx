'use client'
import Footer from '@/components/ui/Footer'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  {
    cat: 'Getting started',
    items: [
      { q:'What is Unveils.me?', a:'Unveils.me is an AI-native digital identity platform. You describe yourself in a few sentences, and our AI (powered by AI + Advanced AI) generates your complete digital identity — tagline, bio, brand colors, AI agents, website, and more — in under 5 seconds.' },
      { q:'Is it really free?', a:'Yes. Our Free plan is completely free, forever. No credit card required to sign up. You get 1 identity, 3 AI agents, 100 AI messages per month, and your own subdomain at yourname.unveils.me.' },
      { q:'How long does it take to set up?', a:'From signing up to having a live profile: under 60 seconds. Type your name, describe yourself in 2-3 sentences, and your identity goes live instantly at yourname.unveils.me.' },
      { q:'Do I need any design or coding skills?', a:'Absolutely not. That is the entire point. Our AI handles everything — design, copywriting, branding, SEO, and your AI agent team. You just describe yourself in plain language.' },
    ]
  },
  {
    cat: 'AI & Technology',
    items: [
      { q:'What AI models does Unveils.me use?', a:'We use AI-powered inference for ultra-fast responses. For identity generation we use Advanced AI Versatile (~80 tokens/sec). For real-time agent chat we use Realtime AI Instant (~200 tokens/sec). For creative content, Creative AI. Our smart router picks the best model for each task.' },
      { q:'How fast is the AI?', a:'AI delivers the fastest LLM inference available — typically 80-200 tokens per second. A complete identity generation takes 3-5 seconds. Agent chat responses are nearly instant.' },
      { q:'What is the Digital Twin?', a:'Over time, your AI agents learn your communication style, preferences, workflows, and goals. Eventually they become capable of drafting emails, responding to enquiries, and creating content that genuinely sounds like you. This is your Digital Twin — an AI that represents you online.' },
      { q:'Is my data used to train AI models?', a:'No. Your data is never used to train any AI models — ours or third-party providers. Your identity and conversations are private. We take data ownership seriously.' },
    ]
  },
  {
    cat: 'Billing & Plans',
    items: [
      { q:'What is included in the Pro plan?', a:'Pro (Coming Soonnth, or $15/month billed yearly) includes: 5 digital identities, unlimited AI agents, 5,000 AI messages per month, custom subdomain, AI memory system, analytics dashboard, 1 API key, priority support, and no Unveils.me branding on your profile.' },
      { q:'Can I cancel anytime?', a:'Yes, absolutely. Cancel from your dashboard settings at any time. You keep full access until the end of your current billing period. No penalties, no questions asked.' },
      { q:'Is there a free trial for Pro?', a:Pro access is currently rolling out through limited beta invitations. You need to add a payment method to start, but you will not be charged until day 15. Cancel any time before that and pay nothing.' },
      { q:'Do you offer refunds?', a:"If you're not satisfied within the first 30 days, contact us at official.unveilsme@gmail.com and we'll issue a full refund. After 30 days, we offer pro-rated refunds at our discretion. See our Refund Policy for full details." },
      { q:'Do you support Indian payment methods (UPI, Razorpay)?', a:'Currently we process payments via Stripe (cards, international). Razorpay / UPI support is on our roadmap and coming soon for Indian users.' },
    ]
  },
  {
    cat: 'Privacy & Security',
    items: [
      { q:"Who can see my profile?", a:'By default, your profile at yourname.unveils.me is public and indexed by search engines. You can make it private or password-protected from your dashboard settings at any time.' },
      { q:'Is my data secure?', a:'Yes. We use end-to-end encryption, zero-trust architecture, Supabase Row Level Security, and Upstash Redis for rate limiting. All data is stored on servers compliant with GDPR and Indian data protection laws.' },
      { q:'Are you GDPR compliant?', a:'Yes. We are fully GDPR compliant. You can export or delete all your data at any time from your account settings. See our GDPR page and Privacy Policy for details.' },
      { q:'Can I delete my account and all data?', a:'Yes. Go to Settings → Account → Delete Account. This permanently deletes your profile, identity, agent history, and all associated data within 30 days.' },
    ]
  },
  {
    cat: 'Technical',
    items: [
      { q:'How do subdomains work?', a:'When you create an identity with subdomain "arjun", your profile goes live at arjun.unveils.me. This works via DNS wildcard routing and Next.js middleware. No additional setup needed on your end.' },
      { q:'Can I use my own custom domain?', a:'Custom domains (like arjun.com pointing to your Unveils.me profile) are available on the Enterprise plan. Pro users get a custom subdomain on unveils.me.' },
      { q:'Is there an API?', a:'Yes. Pro users get 1 API key and Enterprise users get unlimited keys. You can use the API to programmatically generate identities, chat with agents, retrieve analytics, and more. See our API documentation.' },
      { q:'What frameworks/tech does Unveils.me use?', a:'Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, Prisma + Supabase (PostgreSQL), Upstash Redis, Stripe, AI SDK, Resend for emails. Deployed on Vercel.' },
    ]
  },
]

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:index*.04 }}
      style={{ borderRadius:14, overflow:'hidden', background:open ? 'rgba(108,95,244,.06)' : 'rgba(255,255,255,.02)', border:`1px solid ${open ? 'rgba(108,95,244,.22)' : 'rgba(255,255,255,.055)'}`, transition:'all .2s' }}>
      <button onClick={() => setOpen(!open)}
        style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'18px 20px', background:'none', border:'none', cursor:'pointer', fontFamily:'inherit', textAlign:'left', gap:12 }}>
        <span style={{ fontSize:14, fontWeight:500, color:'#fff', lineHeight:1.5 }}>{q}</span>
        <ChevronDown className="w-4 h-4 flex-shrink-0" style={{ color:'rgba(255,255,255,.4)', transition:'transform .2s', transform:open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height:0 }} animate={{ height:'auto' }} exit={{ height:0 }} style={{ overflow:'hidden' }}>
            <p style={{ padding:'0 20px 18px', fontSize:14, color:'rgba(255,255,255,.5)', lineHeight:1.8, borderTop:'1px solid rgba(255,255,255,.055)', paddingTop:14 }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQPage() {
  const [cat, setCat] = useState(FAQS[0].cat)
  const active = FAQS.find(f => f.cat === cat)!
  const css = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap'); *{box-sizing:border-box;margin:0;padding:0} a{color:inherit;text-decoration:none} body{-webkit-font-smoothing:antialiased}`

  return (
    <main style={{ background:'#050508', color:'#fff', fontFamily:"'DM Sans',sans-serif", minHeight:'100vh' }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <nav style={{ borderBottom:'1px solid rgba(255,255,255,.055)', padding:'0 28px', height:60, display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:50, background:'rgba(5,5,8,.88)', backdropFilter:'blur(20px)' }}>
        <Link href="/" style={{ display:'flex', alignItems:'center', gap:9 }}>
          <div style={{ width:28, height:28, borderRadius:8, background:'linear-gradient(135deg,#6c5ff4,#a78bfa)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13 }}>✦</div>
          <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:15, letterSpacing:'-.02em' }}>unveils.me</span>
        </Link>
        <div style={{ display:'flex', gap:20, fontSize:14 }}>
          {([['Features','/features'],['Pricing','/pricing'],['Blog','/blog'],['About','/about']] as [string,string][]).map(([l,h])=>(
            <Link key={l} href={h} style={{ color:'rgba(255,255,255,.45)' }}>{l}</Link>
          ))}
        </div>
        <Link href="/auth?mode=register" style={{ padding:'9px 20px', background:'#6c5ff4', borderRadius:9999, fontSize:13, fontWeight:500, color:'#fff' }}>Get started →</Link>
      </nav>

      <div style={{ maxWidth:840, margin:'0 auto', padding:'72px 28px' }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} style={{ textAlign:'center', marginBottom:56 }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'5px 14px', borderRadius:9999, fontSize:12, fontWeight:500, background:'rgba(108,95,244,.1)', border:'1px solid rgba(108,95,244,.26)', color:'#a29afb', marginBottom:20 }}>FAQ</span>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:'clamp(30px,4.5vw,52px)', fontWeight:800, letterSpacing:'-.04em', lineHeight:1.1, marginBottom:16, background:'linear-gradient(160deg,#fff 35%,rgba(255,255,255,.45))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
            Frequently asked<br />questions
          </h1>
          <p style={{ fontSize:16, color:'rgba(255,255,255,.42)', lineHeight:1.75 }}>Everything you need to know. Can&apos;t find an answer? <a href="mailto:official.unveilsme@gmail.com" style={{ color:'#a29afb', textDecoration:'underline' }}>Email us</a>.</p>
        </motion.div>

        {/* Category tabs */}
        <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:32, justifyContent:'center' }}>
          {FAQS.map(({ cat:c }) => (
            <button key={c} onClick={() => setCat(c)}
              style={{ padding:'8px 18px', borderRadius:9999, fontSize:13, fontWeight:500, border:'none', cursor:'pointer', fontFamily:'inherit', transition:'all .15s',
                background:cat===c ? 'rgba(108,95,244,.2)' : 'rgba(255,255,255,.04)',
                color:cat===c ? '#a29afb' : 'rgba(255,255,255,.45)',
                outline:cat===c ? '1px solid rgba(108,95,244,.3)' : 'none' }}>
              {c}
            </button>
          ))}
        </div>

        {/* FAQ items */}
        <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:56 }}>
          {active.items.map(({ q, a }, i) => <FAQItem key={q} q={q} a={a} index={i} />)}
        </div>

        {/* Still need help */}
        <div style={{ textAlign:'center', padding:'40px 32px', borderRadius:20, background:'rgba(255,255,255,.02)', border:'1px solid rgba(255,255,255,.055)' }}>
          <div style={{ fontSize:28, marginBottom:12 }}>💬</div>
          <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:18, fontWeight:700, marginBottom:8 }}>Still have questions?</h3>
          <p style={{ fontSize:14, color:'rgba(255,255,255,.42)', marginBottom:20 }}>Our team replies to every message within 24 hours.</p>
          <Link href="/contact" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'12px 24px', background:'#6c5ff4', borderRadius:9999, fontSize:14, fontWeight:500, color:'#fff' }}>Contact support →</Link>
        </div>
      </div>
      <Footer />
    </main>
  )
}

