'use client'
import Footer from '@/components/ui/Footer'
import { motion } from 'framer-motion'
import Link from 'next/link'

const FEATURES = [
  {
    category: 'AI Identity',
    color: '#6c5ff4',
    emoji: '🧠',
    items: [
      { title:'AI Identity Engine', desc:'Complete digital identity from one prompt. Tagline, bio, tone, audience, brand voice — all in under 5 seconds powered by Advanced AI.' },
      { title:'Brand Color System', desc:'AI-generated color palette based on color psychology and your personality. Primary, secondary, accent, background — all cohesive.' },
      { title:'SEO Meta Generation', desc:'Optimised title tags, meta descriptions, and keyword sets generated automatically for every identity.' },
      { title:'Digital Twin', desc:'Over time your AI learns your communication style and can represent you online authentically.' },
    ]
  },
  {
    category: 'Website Generation',
    color: '#34d399',
    emoji: '🌐',
    items: [
      { title:'One-click websites', desc:'Full HTML/CSS website from your identity. Responsive, animated, SEO-optimised. Agency quality in 5 seconds.' },
      { title:'5 design themes', desc:'Midnight, Minimal, Bold, Elegant, Brutalist — each with unique typography and visual language.' },
      { title:'Custom subdomain', desc:'Every identity gets yourname.unveils.me automatically. Custom domains available on Enterprise.' },
      { title:'Live preview', desc:'See your website in real-time before publishing. Edit sections, swap themes, republish instantly.' },
    ]
  },
  {
    category: 'AI Agents',
    color: '#f472b6',
    emoji: '🤖',
    items: [
      { title:'6 specialist agents', desc:'Nova (strategy), Lens (design), Forge (engineering), Pulse (marketing), Scout (research), Quill (content).' },
      { title:'Streaming chat', desc:'Real-time token streaming via AI. Responses in milliseconds, not seconds. ~200 tokens/sec.' },
      { title:'Agent memory', desc:'Each agent remembers your past conversations and preferences. Gets smarter over time.' },
      { title:'Multi-agent tasks', desc:'Assign a task to all agents simultaneously and get different expert perspectives at once.' },
    ]
  },
  {
    category: 'Analytics',
    color: '#38bdf8',
    emoji: '📊',
    items: [
      { title:'Real-time analytics', desc:'Profile views, agent sessions, website visits, token usage — all live in your dashboard.' },
      { title:'Traffic sources', desc:'See exactly where your visitors come from: direct, social, search, referral.' },
      { title:'Country breakdown', desc:'Understand your global audience with country-level visitor data.' },
      { title:'AI insights', desc:'Your agents analyse your performance and proactively suggest growth actions.' },
    ]
  },
  {
    category: 'Security',
    color: '#fb923c',
    emoji: '🔒',
    items: [
      { title:'Zero-trust architecture', desc:'Every request authenticated and authorised. Row-level security on all database tables.' },
      { title:'Rate limiting', desc:'Upstash Redis rate limiting on all endpoints. Brute-force and abuse protection built in.' },
      { title:'2FA', desc:'Two-factor authentication available for all accounts. TOTP and email OTP supported.' },
      { title:'Prompt injection defense', desc:'All AI inputs sanitised to prevent prompt injection attacks and jailbreaking.' },
    ]
  },
  {
    category: 'Developer',
    color: '#a78bfa',
    emoji: '⚡',
    items: [
      { title:'REST API', desc:'Full API access on Pro and Enterprise plans. Generate identities, chat with agents, retrieve analytics programmatically.' },
      { title:'API keys', desc:'Manage API keys with granular scopes, expiry dates, and usage monitoring.' },
      { title:'Webhooks', desc:'Subscribe to events: identity created, agent message, website published, subscription changed.' },
      { title:'Open-source friendly', desc:'Built on Next.js, Prisma, Supabase, and AI. Fork, self-host, and contribute.' },
    ]
  },
]

export default function FeaturesPage() {
  const css = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap'); *{box-sizing:border-box;margin:0;padding:0} a{color:inherit;text-decoration:none} body{-webkit-font-smoothing:antialiased}`

  return (
    <main style={{ background:'#050508', color:'#fff', fontFamily:"'DM Sans',sans-serif", minHeight:'100vh' }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <nav style={{ borderBottom:'1px solid rgba(255,255,255,.055)', padding:'0 28px', height:60, display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:50, background:'rgba(5,5,8,.88)', backdropFilter:'blur(20px)' }}>
        <Link href="/" style={{ display:'flex', alignItems:'center', gap:9 }}>
          <div style={{ width:28, height:28, borderRadius:8, background:'linear-gradient(135deg,#6c5ff4,#a78bfa)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13 }}>✦</div>
          <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:15, letterSpacing:'-.02em' }}>unveils.me</span>
        </Link>
        <div style={{ display:'flex', gap:24, fontSize:14 }}>
          {[['Pricing','/pricing'],['FAQ','/faq'],['About','/about']].map(([l,h])=>(
            <Link key={l} href={h} style={{ color:'rgba(255,255,255,.5)', transition:'color .2s' }}>{l}</Link>
          ))}
        </div>
        <Link href="/auth?mode=register" style={{ padding:'9px 20px', background:'#6c5ff4', borderRadius:9999, fontSize:13, fontWeight:500, color:'#fff' }}>Get started →</Link>
      </nav>

      <div style={{ maxWidth:1060, margin:'0 auto', padding:'80px 28px' }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} style={{ textAlign:'center', marginBottom:80 }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'5px 14px', borderRadius:9999, fontSize:12, fontWeight:500, background:'rgba(108,95,244,.1)', border:'1px solid rgba(108,95,244,.26)', color:'#a29afb', marginBottom:22 }}>Everything included</span>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:'clamp(34px,5vw,62px)', fontWeight:800, letterSpacing:'-.04em', lineHeight:1.08, marginBottom:20, background:'linear-gradient(160deg,#fff 35%,rgba(255,255,255,.42))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
            Every feature you need<br />to dominate your niche
          </h1>
          <p style={{ fontSize:18, color:'rgba(255,255,255,.42)', lineHeight:1.75, maxWidth:520, margin:'0 auto' }}>
            One platform. AI identity, website generation, agent team, analytics, and developer API — all included.
          </p>
        </motion.div>

        {FEATURES.map(({ category, color, emoji, items }, ci) => (
          <div key={category} style={{ marginBottom:72 }}>
            <motion.div initial={{ opacity:0, x:-16 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} style={{ display:'flex', alignItems:'center', gap:12, marginBottom:28 }}>
              <div style={{ width:40, height:40, borderRadius:12, background:`${color}18`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>{emoji}</div>
              <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:22, fontWeight:700, letterSpacing:'-.03em', color:'#fff' }}>{category}</h2>
              <div style={{ height:1, flex:1, background:'rgba(255,255,255,.055)' }} />
            </motion.div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:12 }}>
              {items.map(({ title, desc }, i) => (
                <motion.div key={title} initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*.07 }}
                  style={{ padding:24, borderRadius:16, background:'rgba(255,255,255,.025)', border:'1px solid rgba(255,255,255,.055)', transition:'all .2s' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
                    <div style={{ width:8, height:8, borderRadius:'50%', background:color, flexShrink:0 }} />
                    <div style={{ fontSize:14, fontWeight:500, color:'#fff' }}>{title}</div>
                  </div>
                  <p style={{ fontSize:13, color:'rgba(255,255,255,.42)', lineHeight:1.7, margin:0 }}>{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        <div style={{ textAlign:'center', padding:'56px 32px', borderRadius:24, background:'rgba(108,95,244,.07)', border:'1px solid rgba(108,95,244,.2)', marginTop:20 }}>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:30, fontWeight:800, letterSpacing:'-.04em', marginBottom:14 }}>Ready to get started?</h2>
          <p style={{ fontSize:16, color:'rgba(255,255,255,.45)', marginBottom:28 }}>Free forever. No credit card. Live in 30 seconds.</p>
          <div style={{ display:'flex', gap:12, justifyContent:'center' }}>
            <Link href="/auth?mode=register" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'14px 28px', background:'#6c5ff4', borderRadius:9999, fontSize:14, fontWeight:500, color:'#fff' }}>✦ Create free identity</Link>
            <Link href="/pricing" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'14px 22px', border:'1px solid rgba(255,255,255,.12)', borderRadius:9999, fontSize:14, color:'rgba(255,255,255,.6)' }}>View pricing →</Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

