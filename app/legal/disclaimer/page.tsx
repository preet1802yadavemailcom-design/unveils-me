// app/legal/disclaimer/page.tsx
import Link from 'next/link'
import Footer from '@/components/ui/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclaimer · Unveils.me',
  description: 'Legal disclaimer for Unveils.me.',
}

export default function Disclaimer() {
  const css = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700&family=DM+Sans:wght@400;500&display=swap'); *{box-sizing:border-box;margin:0;padding:0} a{color:#a29afb;text-decoration:underline} body{-webkit-font-smoothing:antialiased} h2{font-family:'Syne',sans-serif;font-size:19px;font-weight:700;letter-spacing:-.025em;margin:34px 0 10px;color:#fff} p,li{font-size:14.5px;color:rgba(255,255,255,.52);line-height:1.85;margin-bottom:9px} ul{padding-left:20px;margin-bottom:10px} strong{color:rgba(255,255,255,.75);font-weight:500}`

  return (
    <main style={{ background:'#050508', color:'#fff', fontFamily:"'DM Sans',sans-serif", minHeight:'100vh' }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <nav style={{ borderBottom:'1px solid rgba(255,255,255,.055)', padding:'0 28px', height:58, display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:50, background:'rgba(5,5,8,.9)', backdropFilter:'blur(20px)' }}>
        <Link href="/" style={{ display:'flex', alignItems:'center', gap:9, textDecoration:'none', color:'#fff' }}>
          <div style={{ width:26, height:26, borderRadius:7, background:'linear-gradient(135deg,#6c5ff4,#a78bfa)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12 }}>✦</div>
          <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:14 }}>unveils.me</span>
        </Link>
        <Link href="/legal/terms" style={{ fontSize:13, color:'#a29afb' }}>Terms</Link>
      </nav>

      <div style={{ maxWidth:720, margin:'0 auto', padding:'64px 28px 80px' }}>
        <div style={{ marginBottom:48 }}>
          <div style={{ fontSize:12, color:'rgba(255,255,255,.35)', marginBottom:12, letterSpacing:'.06em', textTransform:'uppercase' }}>Legal · Disclaimer</div>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:36, fontWeight:800, letterSpacing:'-.04em', lineHeight:1.1, marginBottom:14, color:'#fff' }}>Disclaimer</h1>
          <p style={{ fontSize:13, color:'rgba(255,255,255,.35)' }}>Last updated: June 1, 2025</p>
        </div>

        <h2>General disclaimer</h2>
        <p>The information and services provided on Unveils.me are for general informational and productivity purposes only. While we strive to keep information accurate and current, we make no warranties about the completeness, accuracy, reliability, or suitability of any content.</p>

        <h2>AI-generated content</h2>
        <p>Unveils.me uses artificial intelligence to generate content including identity descriptions, website copy, brand suggestions, and agent responses. <strong>AI-generated content may be inaccurate, incomplete, or outdated.</strong> Always review AI-generated content before publishing. We are not responsible for decisions made based on AI output.</p>

        <h2>Professional advice</h2>
        <p>Nothing on Unveils.me constitutes legal, financial, medical, or professional advice. Always consult a qualified professional for advice specific to your situation.</p>

        <h2>Third-party links</h2>
        <p>Our platform may contain links to third-party websites. We are not responsible for the content, privacy practices, or accuracy of any third-party site. Inclusion of a link does not imply endorsement.</p>

        <h2>Limitation of liability</h2>
        <p>To the fullest extent permitted by law, Unveils Technologies Pvt. Ltd. disclaims all liability for any direct, indirect, incidental, consequential, or punitive damages arising from your use of the platform or reliance on AI-generated content.</p>

        <h2>DMCA / Copyright infringement</h2>
        <p>If you believe content on Unveils.me infringes your copyright, send a notice to <a href="mailto:official.unveilsme@gmail.com">official.unveilsme@gmail.com</a> including:</p>
        <ul>
          <li>Your name, address, phone, and email</li>
          <li>A description of the copyrighted work you claim is infringed</li>
          <li>The URL of the infringing material</li>
          <li>A statement of good faith belief that use is not authorised</li>
          <li>Your signature (electronic acceptable)</li>
        </ul>
        <p>We will respond within 48 hours and remove infringing content promptly upon valid notice.</p>

        <h2>Contact</h2>
        <p>Legal notices: <a href="mailto:official.unveilsme@gmail.com">official.unveilsme@gmail.com</a><br />
        DMCA: <a href="mailto:official.unveilsme@gmail.com">official.unveilsme@gmail.com</a></p>
      </div>
      <Footer />
    </main>
  )
}

