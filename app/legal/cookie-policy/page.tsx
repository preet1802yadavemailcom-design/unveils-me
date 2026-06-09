// app/legal/cookie-policy/page.tsx
import Link from 'next/link'
import Footer from '@/components/ui/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy · Unveils.me',
  description: 'How Unveils.me uses cookies and similar tracking technologies.',
}

export default function CookiePolicy() {
  const css = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700&family=DM+Sans:wght@400;500&display=swap'); *{box-sizing:border-box;margin:0;padding:0} a{color:#a29afb;text-decoration:underline} body{-webkit-font-smoothing:antialiased} h2{font-family:'Syne',sans-serif;font-size:19px;font-weight:700;letter-spacing:-.025em;margin:34px 0 10px;color:#fff} p,li{font-size:14.5px;color:rgba(255,255,255,.52);line-height:1.85;margin-bottom:9px} ul{padding-left:20px;margin-bottom:10px} strong{color:rgba(255,255,255,.75);font-weight:500} table{width:100%;border-collapse:collapse;margin:12px 0} td,th{padding:10px 13px;border:1px solid rgba(255,255,255,.08);font-size:13px;text-align:left;color:rgba(255,255,255,.52)} th{background:rgba(255,255,255,.04);color:rgba(255,255,255,.7);font-weight:500}`

  return (
    <main style={{ background:'#050508', color:'#fff', fontFamily:"'DM Sans',sans-serif", minHeight:'100vh' }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <nav style={{ borderBottom:'1px solid rgba(255,255,255,.055)', padding:'0 28px', height:58, display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:50, background:'rgba(5,5,8,.9)', backdropFilter:'blur(20px)' }}>
        <Link href="/" style={{ display:'flex', alignItems:'center', gap:9, textDecoration:'none', color:'#fff' }}>
          <div style={{ width:26, height:26, borderRadius:7, background:'linear-gradient(135deg,#6c5ff4,#a78bfa)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12 }}>✦</div>
          <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:14 }}>unveils.me</span>
        </Link>
        <Link href="/legal/privacy" style={{ fontSize:13, color:'#a29afb' }}>Privacy Policy</Link>
      </nav>

      <div style={{ maxWidth:720, margin:'0 auto', padding:'64px 28px 80px' }}>
        <div style={{ marginBottom:48 }}>
          <div style={{ fontSize:12, color:'rgba(255,255,255,.35)', marginBottom:12, letterSpacing:'.06em', textTransform:'uppercase' }}>Legal · Cookies</div>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:36, fontWeight:800, letterSpacing:'-.04em', lineHeight:1.1, marginBottom:14, color:'#fff' }}>Cookie Policy</h1>
          <p style={{ fontSize:13, color:'rgba(255,255,255,.35)' }}>Last updated: June 1, 2025</p>
        </div>

        <h2>What are cookies?</h2>
        <p>Cookies are small text files stored on your device when you visit a website. We use them to keep you logged in, remember your preferences, and understand how the service is used.</p>

        <h2>Cookies we use</h2>
        <table>
          <thead><tr><th>Cookie</th><th>Type</th><th>Purpose</th><th>Duration</th></tr></thead>
          <tbody>
            <tr><td>sb-auth-token</td><td>Essential</td><td>Supabase authentication session</td><td>7 days</td></tr>
            <tr><td>sb-refresh-token</td><td>Essential</td><td>Auto-refresh authentication</td><td>30 days</td></tr>
            <tr><td>unveils-theme</td><td>Preference</td><td>Dark/light mode preference</td><td>1 year</td></tr>
            <tr><td>unveils-locale</td><td>Preference</td><td>Language preference</td><td>1 year</td></tr>
            <tr><td>_vercel_analytics</td><td>Analytics</td><td>Anonymous page view tracking</td><td>Session</td></tr>
          </tbody>
        </table>

        <h2>What we do NOT use</h2>
        <ul>
          <li>No advertising or tracking cookies</li>
          <li>No third-party marketing pixels (Facebook, Google Ads, etc.)</li>
          <li>No cross-site tracking</li>
          <li>No fingerprinting technologies</li>
        </ul>

        <h2>Managing cookies</h2>
        <p>Essential cookies cannot be disabled as they are required for the service to function. You can manage preference and analytics cookies in your browser settings or via your <Link href="/settings">account settings</Link>.</p>
        <p>To disable cookies in your browser: <a href="https://www.allaboutcookies.org/manage-cookies/" target="_blank" rel="noopener noreferrer">allaboutcookies.org</a></p>

        <h2>Contact</h2>
        <p>Questions: <a href="mailto:official.unveilsme@gmail.com">official.unveilsme@gmail.com</a></p>
      </div>
      <Footer />
    </main>
  )
}

