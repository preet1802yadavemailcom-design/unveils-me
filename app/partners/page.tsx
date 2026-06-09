import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: 'Partners — Unveils.me',
  description: 'Partner with Unveils.me to build the future of AI-powered digital identity.',
}

const TIERS = [
  { name: 'Technology Partner', emoji: '🔌', desc: 'Integrate Unveils into your platform or product. Get API access, co-marketing, and technical support.', perks: ['Full API access','Co-branded landing page','Joint webinars','Dedicated support channel'] },
  { name: 'Reseller Partner', emoji: '🤝', desc: 'Resell Unveils to your customers and earn recurring revenue on every subscription you bring in.', perks: ['20% recurring commission','Partner dashboard','Sales collateral','Priority onboarding'] },
  { name: 'Community Partner', emoji: '🌍', desc: 'Creators, educators, and community builders who want to bring Unveils to their audience.', perks: ['Affiliate link','Free Pro account','Early feature access','Partner badge'] },
]

export default function PartnersPage() {
  const css = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');*{box-sizing:border-box;margin:0;padding:0}a{color:inherit;text-decoration:none}body{-webkit-font-smoothing:antialiased}`

  return (
    <main style={{ background:'#050508', color:'#fff', fontFamily:"'DM Sans',sans-serif", minHeight:'100vh' }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <nav style={{ borderBottom:'1px solid rgba(255,255,255,.055)', padding:'0 28px', height:60, display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:50, background:'rgba(5,5,8,.88)', backdropFilter:'blur(20px)' }}>
        <Link href="/" style={{ display:'flex', alignItems:'center', gap:9 }}>
          <div style={{ width:28, height:28, borderRadius:8, background:'linear-gradient(135deg,#6c5ff4,#a78bfa)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13 }}>✦</div>
          <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:15, letterSpacing:'-.02em' }}>unveils.me</span>
        </Link>
        <Link href="/auth?mode=register" style={{ padding:'9px 20px', background:'#6c5ff4', borderRadius:9999, fontSize:13, fontWeight:500, color:'#fff' }}>Get started →</Link>
      </nav>

      <div style={{ maxWidth:960, margin:'0 auto', padding:'72px 28px' }}>
        <div style={{ textAlign:'center', marginBottom:64 }}>
          <span style={{ display:'inline-flex', alignItems:'center', padding:'5px 14px', borderRadius:9999, fontSize:12, fontWeight:500, background:'rgba(108,95,244,.1)', border:'1px solid rgba(108,95,244,.26)', color:'#a29afb', marginBottom:20 }}>Partner Program</span>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:'clamp(32px,5vw,56px)', fontWeight:800, letterSpacing:'-.04em', lineHeight:1.1, marginBottom:16 }}>
            Grow together with<br />Unveils.me
          </h1>
          <p style={{ fontSize:17, color:'rgba(255,255,255,.4)', maxWidth:500, margin:'0 auto' }}>
            Join our partner ecosystem and help bring AI identity to the world. Technology partners, resellers, and community builders welcome.
          </p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:20, marginBottom:64 }}>
          {TIERS.map(t => (
            <div key={t.name} style={{ background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.07)', borderRadius:16, padding:'28px 24px' }}>
              <div style={{ fontSize:36, marginBottom:14 }}>{t.emoji}</div>
              <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:18, marginBottom:8 }}>{t.name}</div>
              <p style={{ fontSize:14, color:'rgba(255,255,255,.42)', lineHeight:1.65, marginBottom:20 }}>{t.desc}</p>
              <ul style={{ listStyle:'none', padding:0 }}>
                {t.perks.map(p=>(
                  <li key={p} style={{ fontSize:13, color:'rgba(255,255,255,.5)', marginBottom:8, display:'flex', alignItems:'center', gap:8 }}>
                    <span style={{ color:'#34d399', fontSize:12 }}>✓</span> {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ textAlign:'center', background:'rgba(108,95,244,.06)', border:'1px solid rgba(108,95,244,.15)', borderRadius:20, padding:'48px 32px' }}>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:28, fontWeight:800, letterSpacing:'-.035em', marginBottom:12 }}>Ready to partner?</h2>
          <p style={{ fontSize:15, color:'rgba(255,255,255,.45)', marginBottom:28 }}>Tell us about yourself and we'll find the right partnership fit.</p>
          <Link href="/contact" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'13px 28px', background:'#6c5ff4', borderRadius:9999, fontSize:14, fontWeight:500, color:'#fff' }}>Get in touch →</Link>
        </div>
      </div>
      <Footer maxWidth={960} />
    </main>
  )
}

