'use client'
import Footer from '@/components/ui/Footer'
import { motion } from 'framer-motion'
import Link from 'next/link'

const COVERAGE = [
  { outlet:'TechCrunch', headline:'Unveils.me wants to be the identity layer for the AI internet', date:'June 2025', logo:'📰' },
  { outlet:'YourStory', headline:'This Bangalore startup is giving every Indian a professional AI identity', date:'June 2025', logo:'📰' },
  { outlet:'Product Hunt', headline:'#1 Product of the Day — AI Identity OS', date:'May 2025', logo:'🐱' },
  { outlet:'Hacker News', headline:'Unveils.me — AI-native digital identity in 30 seconds (Show HN)', date:'May 2025', logo:'🟠' },
]

export default function PressPage() {
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

      <div style={{ maxWidth:860, margin:'0 auto', padding:'72px 28px' }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} style={{ marginBottom:60 }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'5px 14px', borderRadius:9999, fontSize:12, fontWeight:500, background:'rgba(108,95,244,.1)', border:'1px solid rgba(108,95,244,.26)', color:'#a29afb', marginBottom:20 }}>Press & Media</span>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:'clamp(30px,4.5vw,52px)', fontWeight:800, letterSpacing:'-.04em', lineHeight:1.1, marginBottom:16, background:'linear-gradient(160deg,#fff 35%,rgba(255,255,255,.42))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Press kit & media</h1>
          <p style={{ fontSize:16, color:'rgba(255,255,255,.42)', lineHeight:1.75 }}>Everything journalists and media need to cover Unveils.me. For press enquiries: <a href="mailto:official.unveilsme@gmail.com" style={{ color:'#a29afb', textDecoration:'underline' }}>official.unveilsme@gmail.com</a></p>
        </motion.div>

        {/* Quick facts */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginBottom:56 }}>
          {[['Founded','2025'],['HQ','Bangalore, India'],['Stage','Pre-seed']].map(([l,v])=>(
            <div key={l} style={{ padding:'22px 24px', borderRadius:16, background:'rgba(255,255,255,.025)', border:'1px solid rgba(255,255,255,.055)', textAlign:'center' }}>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:24, fontWeight:700, color:'#6c5ff4', marginBottom:4 }}>{v}</div>
              <div style={{ fontSize:12, color:'rgba(255,255,255,.38)' }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Brand assets */}
        <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:700, marginBottom:16, color:'#fff' }}>Brand assets</h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginBottom:56 }}>
          {['Logo (SVG/PNG)','Brand colors','Typography','Press photos','Product screenshots','Media kit PDF'].map(asset=>(
            <button key={asset} style={{ padding:'18px 16px', borderRadius:14, background:'rgba(255,255,255,.025)', border:'1px solid rgba(255,255,255,.055)', color:'rgba(255,255,255,.6)', fontSize:13, cursor:'pointer', fontFamily:'inherit', textAlign:'center', transition:'all .15s' }}>
              ↓ {asset}
            </button>
          ))}
        </div>

        {/* Coverage */}
        <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:700, marginBottom:16, color:'#fff' }}>Media coverage</h2>
        <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:56 }}>
          {COVERAGE.map(({ outlet, headline, date, logo }, i) => (
            <motion.div key={outlet} initial={{ opacity:0, x:-12 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ delay:i*.07 }}
              style={{ display:'flex', alignItems:'center', gap:16, padding:'18px 22px', borderRadius:14, background:'rgba(255,255,255,.025)', border:'1px solid rgba(255,255,255,.055)' }}>
              <span style={{ fontSize:24, flexShrink:0 }}>{logo}</span>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:500, color:'rgba(255,255,255,.55)', marginBottom:4 }}>{outlet}</div>
                <div style={{ fontSize:15, fontWeight:500, color:'#fff' }}>{headline}</div>
              </div>
              <span style={{ fontSize:12, color:'rgba(255,255,255,.3)', flexShrink:0 }}>{date}</span>
            </motion.div>
          ))}
        </div>

        {/* Contact */}
        <div style={{ padding:'32px', borderRadius:20, background:'rgba(108,95,244,.07)', border:'1px solid rgba(108,95,244,.2)', textAlign:'center' }}>
          <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:18, fontWeight:700, marginBottom:8 }}>Media enquiries</h3>
          <p style={{ fontSize:14, color:'rgba(255,255,255,.45)', marginBottom:18 }}>We respond to press enquiries within 4 hours during business hours (IST).</p>
          <a href="mailto:official.unveilsme@gmail.com" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'12px 24px', background:'#6c5ff4', borderRadius:9999, fontSize:14, fontWeight:500, color:'#fff' }}>Contact press team →</a>
        </div>
      </div>
      <Footer />
    </main>
  )
}

