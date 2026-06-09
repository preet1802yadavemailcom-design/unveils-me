'use client'
import Footer from '@/components/ui/Footer'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

const TEAM = [
  {
    name: 'Preet Yadav',
    role: 'Founder, CEO & Solo Developer',
    emoji: '🚀',
    bio: 'Visionary solo founder building next-generation AI products and futuristic digital experiences from the ground up. Passionate about scalable technology, human-centered innovation, and creating impactful solutions that solve real-world problems. From product strategy and UI/UX design to full-stack development and AI integration — every part of the journey is crafted independently with relentless dedication and ambition.'
  },
]
const VALUES = [
  { icon:'🌏', title:'Identity for all humans', desc:'Every person on Earth deserves a powerful digital presence — not just those with money or technical skills.' },
  { icon:'⚡', title:'Speed is a feature',       desc:'3 seconds to a complete identity. We respect your time as the most precious resource you have.' },
  { icon:'🔒', title:'Privacy by default',       desc:'Your data belongs to you. We will never sell it, mine it, or use it to train AI without consent.' },
  { icon:'🌱', title:'Grow with you',            desc:'Your AI agents learn and evolve alongside you. The platform gets smarter the more you use it.' },
]

export default function AboutPage() {
  return (
    <main style={{ background:'#050508', color:'#fff', fontFamily:"'DM Sans',sans-serif", minHeight:'100vh' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap'); *{box-sizing:border-box;margin:0;padding:0} a{color:inherit;text-decoration:none}`}</style>

      {/* Nav */}
      <nav style={{ borderBottom:'1px solid rgba(255,255,255,.055)', padding:'0 28px', height:60, display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:50, background:'rgba(5,5,8,.88)', backdropFilter:'blur(20px)' }}>
        <Link href="/" style={{ display:'flex', alignItems:'center', gap:9 }}>
          <div style={{ width:28, height:28, borderRadius:8, background:'linear-gradient(135deg,#6c5ff4,#a78bfa)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13 }}>✦</div>
          <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:15, letterSpacing:'-.02em' }}>unveils.me</span>
        </Link>
        <div style={{ display:'flex', gap:20, fontSize:14 }}>
          {([['Features','/features'],['Pricing','/pricing'],['Blog','/blog']] as [string,string][]).map(([l,h])=>(
            <Link key={l} href={h} style={{ color:'rgba(255,255,255,.5)' }}>{l}</Link>
          ))}
        </div>
        <Link href="/auth?mode=register" style={{ display:'flex', alignItems:'center', gap:7, padding:'9px 20px', background:'#6c5ff4', borderRadius:9999, fontSize:13, fontWeight:500, color:'#fff' }}>
          Get started <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </nav>

      <div style={{ maxWidth:820, margin:'0 auto', padding:'80px 28px' }}>

        {/* Hero */}
        <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} style={{ marginBottom:80, textAlign:'center' }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'5px 14px', borderRadius:9999, fontSize:12, fontWeight:500, background:'rgba(108,95,244,.1)', border:'1px solid rgba(108,95,244,.26)', color:'#a29afb', marginBottom:24 }}>Our story</span>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:'clamp(36px,5vw,60px)', fontWeight:800, letterSpacing:'-.04em', lineHeight:1.08, marginBottom:22, background:'linear-gradient(160deg,#fff 35%,rgba(255,255,255,.45))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
            We believe every human<br />deserves a great online identity
          </h1>
          <p style={{ fontSize:17, color:'rgba(255,255,255,.5)', lineHeight:1.8, maxWidth:560, margin:'0 auto' }}>
            Unveils.me was built out of frustration. Great website builders were too slow, too expensive, and too manual. AI was powerful but hard to use. We combined both — and made it instant.
          </p>
        </motion.div>

        {/* Mission + Vision */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:72 }}>
          {[
            { label:'Our Mission', icon:'🎯', text:"To give every person on Earth a powerful, intelligent digital identity — in seconds, not weeks. No design skills required. No budget needed. Just describe yourself and we handle the rest." },
            { label:'Our Vision',  icon:'🌍', text:'A future internet where your digital identity is as unique as you are — AI-powered, always evolving, and truly yours. Where "go build a website" means opening unveils.me and typing one sentence.' },
          ].map(({ label, icon, text }) => (
            <motion.div key={label} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              style={{ padding:32, borderRadius:20, background:'rgba(255,255,255,.025)', border:'1px solid rgba(255,255,255,.065)' }}>
              <div style={{ fontSize:28, marginBottom:14 }}>{icon}</div>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:700, marginBottom:12, color:'#a29afb' }}>{label}</div>
              <p style={{ fontSize:14, color:'rgba(255,255,255,.5)', lineHeight:1.75 }}>{text}</p>
            </motion.div>
          ))}
        </div>

        {/* Values */}
        <div style={{ marginBottom:80 }}>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:28, fontWeight:800, letterSpacing:'-.035em', marginBottom:32, background:'linear-gradient(160deg,#fff 35%,rgba(255,255,255,.45))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>What we believe</h2>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            {VALUES.map(({ icon, title, desc }, i) => (
              <motion.div key={title} initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*.08 }}
                style={{ padding:28, borderRadius:16, background:'rgba(255,255,255,.02)', border:'1px solid rgba(255,255,255,.055)', display:'flex', gap:16 }}>
                <span style={{ fontSize:24, flexShrink:0 }}>{icon}</span>
                <div>
                  <div style={{ fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:700, marginBottom:6 }}>{title}</div>
                  <p style={{ fontSize:13, color:'rgba(255,255,255,.45)', lineHeight:1.7 }}>{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div style={{ marginBottom:72 }}>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:28, fontWeight:800, letterSpacing:'-.035em', marginBottom:8, background:'linear-gradient(160deg,#fff 35%,rgba(255,255,255,.45))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>The team</h2>
          <p style={{ fontSize:14, color:'rgba(255,255,255,.4)', marginBottom:28 }}>Small team. Big ambitions. Backed by deep expertise.</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:12 }}>
            {TEAM.map(({ name, role, emoji, bio }, i) => (
              <motion.div key={name} initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*.08 }}
                style={{ padding:24, borderRadius:16, background:'rgba(255,255,255,.02)', border:'1px solid rgba(255,255,255,.055)' }}>
                <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:14 }}>
                  <div style={{ width:44, height:44, borderRadius:12, background:'linear-gradient(135deg,#6c5ff4,#a78bfa)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>{emoji}</div>
                  <div>
                    <div style={{ fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:700 }}>{name}</div>
                    <div style={{ fontSize:12, color:'rgba(255,255,255,.4)', marginTop:2 }}>{role}</div>
                  </div>
                </div>
                <p style={{ fontSize:13, color:'rgba(255,255,255,.45)', lineHeight:1.7 }}>{bio}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:2, padding:'40px 0', borderTop:'1px solid rgba(255,255,255,.055)', borderBottom:'1px solid rgba(255,255,255,.055)', marginBottom:72, textAlign:'center' }}>
          {[['2025','Founded'],['India 🇮🇳','Headquartered'],['∞','Ambition']].map(([v,l])=>(
            <div key={l}>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:32, fontWeight:800, letterSpacing:'-.04em', color:'#6c5ff4', marginBottom:6 }}>{v}</div>
              <div style={{ fontSize:13, color:'rgba(255,255,255,.38)' }}>{l}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign:'center' }}>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:28, fontWeight:800, letterSpacing:'-.035em', marginBottom:14 }}>Join us on this mission</h2>
          <p style={{ fontSize:15, color:'rgba(255,255,255,.45)', marginBottom:28 }}>Build your AI identity today. Free forever.</p>
          <div style={{ display:'flex', gap:12, justifyContent:'center' }}>
            <Link href="/auth?mode=register" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'13px 26px', background:'#6c5ff4', borderRadius:9999, fontSize:14, fontWeight:500, color:'#fff' }}>✦ Get started free</Link>
            <Link href="/careers" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'13px 22px', border:'1px solid rgba(255,255,255,.12)', borderRadius:9999, fontSize:14, color:'rgba(255,255,255,.6)' }}>Join the team →</Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

