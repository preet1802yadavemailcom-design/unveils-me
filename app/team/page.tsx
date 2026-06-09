import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: 'Team — Unveils.me',
  description: 'Meet the team building the AI identity infrastructure of the future internet.',
}

const TEAM = [
  { name: 'Arjun Mehta',   role: 'CEO & Co-founder',       emoji: '🚀', bio: 'Former Stripe & YC. Obsessed with AI infrastructure and the future of digital identity.' },
  { name: 'Kavya Iyer',    role: 'CTO & Co-founder',       emoji: '⚡', bio: 'Ex-Google Brain. Built ML systems at scale. Leads all AI model work at Unveils.' },
  { name: 'Vikram Nair',   role: 'Head of Engineering',    emoji: '🛠️', bio: 'Full-stack engineer who lives in the terminal. Previously at Razorpay and Zepto.' },
  { name: 'Priya Sharma',  role: 'Head of Design',         emoji: '🎨', bio: 'Award-winning product designer. Crafts every pixel of the Unveils experience.' },
  { name: 'Rohan Gupta',   role: 'Head of Growth',         emoji: '📈', bio: 'Growth engineer. Scaled two SaaS products from 0 to $1M ARR before Unveils.' },
  { name: 'Aisha Patel',   role: 'Head of Community',      emoji: '🌍', bio: 'Community architect. Building the global network of founders on Unveils.' },
]

export default function TeamPage() {
  const css = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');*{box-sizing:border-box;margin:0;padding:0}a{color:inherit;text-decoration:none}body{-webkit-font-smoothing:antialiased}`

  return (
    <main style={{ background:'#050508', color:'#fff', fontFamily:"'DM Sans',sans-serif", minHeight:'100vh' }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <nav style={{ borderBottom:'1px solid rgba(255,255,255,.055)', padding:'0 28px', height:60, display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:50, background:'rgba(5,5,8,.88)', backdropFilter:'blur(20px)' }}>
        <Link href="/" style={{ display:'flex', alignItems:'center', gap:9 }}>
          <div style={{ width:28, height:28, borderRadius:8, background:'linear-gradient(135deg,#6c5ff4,#a78bfa)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13 }}>✦</div>
          <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:15, letterSpacing:'-.02em' }}>unveils.me</span>
        </Link>
        <div style={{ display:'flex', gap:20, fontSize:14 }}>
          {([['About','/about'],['Careers','/careers'],['Contact','/contact']] as [string,string][]).map(([l,h])=>(
            <Link key={l} href={h} style={{ color:'rgba(255,255,255,.5)' }}>{l}</Link>
          ))}
        </div>
        <Link href="/auth?mode=register" style={{ padding:'9px 20px', background:'#6c5ff4', borderRadius:9999, fontSize:13, fontWeight:500, color:'#fff' }}>Get started →</Link>
      </nav>

      <div style={{ maxWidth:1000, margin:'0 auto', padding:'72px 28px' }}>
        <div style={{ textAlign:'center', marginBottom:64 }}>
          <span style={{ display:'inline-flex', alignItems:'center', padding:'5px 14px', borderRadius:9999, fontSize:12, fontWeight:500, background:'rgba(108,95,244,.1)', border:'1px solid rgba(108,95,244,.26)', color:'#a29afb', marginBottom:20 }}>Our Team</span>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:'clamp(32px,5vw,56px)', fontWeight:800, letterSpacing:'-.04em', lineHeight:1.1, marginBottom:16 }}>
            Built by a team that<br />cares deeply about identity
          </h1>
          <p style={{ fontSize:17, color:'rgba(255,255,255,.4)', maxWidth:520, margin:'0 auto' }}>
            We're a small, focused team of engineers, designers, and operators. Remote-first, impact-obsessed.
          </p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:20, marginBottom:72 }}>
          {TEAM.map(m => (
            <div key={m.name} style={{ background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.07)', borderRadius:16, padding:'28px 24px' }}>
              <div style={{ fontSize:36, marginBottom:14 }}>{m.emoji}</div>
              <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:18, marginBottom:4 }}>{m.name}</div>
              <div style={{ fontSize:13, color:'#a29afb', marginBottom:12 }}>{m.role}</div>
              <p style={{ fontSize:14, color:'rgba(255,255,255,.42)', lineHeight:1.65 }}>{m.bio}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign:'center', background:'rgba(108,95,244,.06)', border:'1px solid rgba(108,95,244,.15)', borderRadius:20, padding:'48px 32px' }}>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:28, fontWeight:800, letterSpacing:'-.035em', marginBottom:12 }}>Join us</h2>
          <p style={{ fontSize:15, color:'rgba(255,255,255,.45)', marginBottom:28, maxWidth:420, margin:'0 auto 28px' }}>We're hiring across engineering, design, and growth. Come build the identity layer of the internet.</p>
          <Link href="/careers" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'13px 28px', background:'#6c5ff4', borderRadius:9999, fontSize:14, fontWeight:500, color:'#fff' }}>View open roles →</Link>
        </div>
      </div>
      <Footer maxWidth={1000} />
    </main>
  )
}

