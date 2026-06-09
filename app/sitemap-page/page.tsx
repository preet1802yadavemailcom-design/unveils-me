// app/sitemap/page.tsx — Human-readable sitemap
import Link from 'next/link'
import Footer from '@/components/ui/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sitemap · Unveils.me',
  description: 'Complete list of all pages on Unveils.me.',
}

const SECTIONS = [
  {
    title: 'Main',
    links: [
      ['/','Home'],['/#features','Features section'],['/#pricing','Pricing section'],
    ]
  },
  {
    title: 'Product',
    links: [
      ['/features','All features'],
      ['/pricing','Pricing plans'],
      ['/faq','FAQ'],
      ['/u/demo','Demo profile'],
    ]
  },
  {
    title: 'Company',
    links: [
      ['/about','About us'],
      ['/team','Team'],
      ['/careers','Careers'],
      ['/blog','Blog'],
      ['/press','Press & media'],
      ['/partners','Partners'],
      ['/contact','Contact us'],
    ]
  },
  {
    title: 'Account',
    links: [
      ['/auth','Sign in'],
      ['/auth?mode=register','Create account'],
      ['/dashboard','Dashboard'],
      ['/settings','Settings'],
      ['/onboarding','Onboarding'],
    ]
  },
  {
    title: 'Legal',
    links: [
      ['/legal/terms','Terms & Conditions'],
      ['/legal/privacy','Privacy Policy'],
      ['/legal/cookie-policy','Cookie Policy'],
      ['/legal/refund','Refund Policy'],
      ['/legal/disclaimer','Disclaimer & DMCA'],
      ['/legal/gdpr','GDPR Compliance'],
    ]
  },
]

export default function SitemapPage() {
  const css = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700&family=DM+Sans:wght@400;500&display=swap'); *{box-sizing:border-box;margin:0;padding:0} a{color:inherit;text-decoration:none} body{-webkit-font-smoothing:antialiased}`

  return (
    <main style={{ background:'#050508', color:'#fff', fontFamily:"'DM Sans',sans-serif", minHeight:'100vh' }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <nav style={{ borderBottom:'1px solid rgba(255,255,255,.055)', padding:'0 28px', height:58, display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:50, background:'rgba(5,5,8,.9)', backdropFilter:'blur(20px)' }}>
        <Link href="/" style={{ display:'flex', alignItems:'center', gap:9 }}>
          <div style={{ width:26, height:26, borderRadius:7, background:'linear-gradient(135deg,#6c5ff4,#a78bfa)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12 }}>✦</div>
          <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:14 }}>unveils.me</span>
        </Link>
      </nav>

      <div style={{ maxWidth:720, margin:'0 auto', padding:'64px 28px 80px' }}>
        <div style={{ marginBottom:48 }}>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:32, fontWeight:800, letterSpacing:'-.04em', marginBottom:10, color:'#fff' }}>Sitemap</h1>
          <p style={{ fontSize:14, color:'rgba(255,255,255,.38)' }}>All pages on unveils.me · <a href="/sitemap.xml" style={{ color:'#a29afb', textDecoration:'underline' }}>XML sitemap</a></p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:28 }}>
          {SECTIONS.map(({ title, links }) => (
            <div key={title}>
              <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:13, fontWeight:700, letterSpacing:'.06em', textTransform:'uppercase', color:'rgba(255,255,255,.4)', marginBottom:12 }}>{title}</h2>
              <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
                {links.map(([href, label]) => (
                  <Link key={href} href={href}
                    style={{ fontSize:14, color:'rgba(255,255,255,.6)', transition:'color .15s', display:'flex', alignItems:'center', gap:6 }}>
                    <span style={{ fontSize:10, color:'rgba(255,255,255,.2)' }}>→</span>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer maxWidth={720} />
    </main>
  )
}

