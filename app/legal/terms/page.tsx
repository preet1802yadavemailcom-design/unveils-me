// app/legal/terms/page.tsx
import Link from 'next/link'
import Footer from '@/components/ui/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions · Unveils.me',
  description: 'Terms of Service for using the Unveils.me platform.',
}

export default function Terms() {
  const css = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700&family=DM+Sans:wght@400;500&display=swap'); *{box-sizing:border-box;margin:0;padding:0} a{color:#a29afb;text-decoration:underline} body{-webkit-font-smoothing:antialiased} h2{font-family:'Syne',sans-serif;font-size:19px;font-weight:700;letter-spacing:-.025em;margin:34px 0 10px;color:#fff} h3{font-size:15px;font-weight:600;margin:18px 0 7px;color:rgba(255,255,255,.8)} p,li{font-size:14.5px;color:rgba(255,255,255,.52);line-height:1.85;margin-bottom:9px} ul{padding-left:20px;margin-bottom:10px} strong{color:rgba(255,255,255,.75);font-weight:500}`

  return (
    <main style={{ background:'#050508', color:'#fff', fontFamily:"'DM Sans',sans-serif", minHeight:'100vh' }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <nav style={{ borderBottom:'1px solid rgba(255,255,255,.055)', padding:'0 28px', height:58, display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:50, background:'rgba(5,5,8,.9)', backdropFilter:'blur(20px)' }}>
        <Link href="/" style={{ display:'flex', alignItems:'center', gap:9, textDecoration:'none', color:'#fff' }}>
          <div style={{ width:26, height:26, borderRadius:7, background:'linear-gradient(135deg,#6c5ff4,#a78bfa)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12 }}>✦</div>
          <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:14, letterSpacing:'-.02em' }}>unveils.me</span>
        </Link>
        <div style={{ display:'flex', gap:20, fontSize:13 }}>
          <Link href="/legal/privacy">Privacy</Link>
          <Link href="/legal/refund">Refund</Link>
        </div>
      </nav>

      <div style={{ maxWidth:720, margin:'0 auto', padding:'64px 28px 80px' }}>
        <div style={{ marginBottom:48 }}>
          <div style={{ fontSize:12, color:'rgba(255,255,255,.35)', marginBottom:12, letterSpacing:'.06em', textTransform:'uppercase' }}>Legal · Terms</div>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:36, fontWeight:800, letterSpacing:'-.04em', lineHeight:1.1, marginBottom:14, color:'#fff' }}>Terms & Conditions</h1>
          <p style={{ fontSize:13, color:'rgba(255,255,255,.35)' }}>Last updated: June 1, 2025 · Effective immediately</p>
          <div style={{ marginTop:20, padding:'14px 18px', borderRadius:12, background:'rgba(251,191,36,.07)', border:'1px solid rgba(251,191,36,.2)', fontSize:14, color:'rgba(255,255,255,.55)', lineHeight:1.7 }}>
            <strong>Please read these terms carefully</strong> before using Unveils.me. By creating an account, you agree to be bound by these terms.
          </div>
        </div>

        <h2>1. Acceptance of terms</h2>
        <p>By accessing or using Unveils.me (&quot;Service&quot;), operated by Unveils Technologies Private Limited (&quot;Company&quot;), you agree to these Terms. If you disagree, do not use the Service.</p>

        <h2>2. Eligibility</h2>
        <ul>
          <li>You must be at least 13 years old to use Unveils.me</li>
          <li>If you are under 18, you confirm you have parental consent</li>
          <li>You must provide accurate registration information</li>
          <li>One person may not maintain multiple free accounts</li>
        </ul>

        <h2>3. Your account</h2>
        <p>You are responsible for maintaining the security of your account and all activity under it. Use a strong password and enable 2FA. Notify us immediately at <a href="mailto:official.unveilsme@gmail.com">official.unveilsme@gmail.com</a> if you suspect unauthorised access.</p>

        <h2>4. Acceptable use</h2>
        <p>You may not use the Service to:</p>
        <ul>
          <li>Post illegal, harmful, threatening, or abusive content</li>
          <li>Impersonate another person or entity</li>
          <li>Generate spam, phishing content, or malware</li>
          <li>Scrape, crawl, or extract data without permission</li>
          <li>Attempt to reverse-engineer or circumvent the platform</li>
          <li>Violate any applicable local, national, or international law</li>
          <li>Generate AI content designed to deceive (deepfakes, disinformation)</li>
          <li>Use the Service for any adult, gambling, or illegal purpose</li>
        </ul>
        <p>We may suspend or terminate accounts that violate these rules without notice.</p>

        <h2>5. Content ownership</h2>
        <h3>5.1 Your content</h3>
        <p>You retain ownership of all content you create on Unveils.me. By posting content, you grant us a limited, worldwide, royalty-free licence to display and deliver it as part of the Service.</p>
        <h3>5.2 AI-generated content</h3>
        <p>AI-generated content (identities, copy, agent responses) is provided &quot;as-is&quot;. You own the output. We are not responsible for factual accuracy of AI-generated content — always review before publishing.</p>
        <h3>5.3 Platform IP</h3>
        <p>The Unveils.me platform, brand, code, and design are the exclusive property of Unveils Technologies Pvt. Ltd. and protected by copyright law.</p>

        <h2>6. Payments and billing</h2>
        <ul>
          <li>Free plan: no payment required</li>
          <li>Paid plans are billed in advance on a monthly or annual cycle</li>
          <li>All prices are in USD unless stated otherwise</li>
          <li>Taxes may apply based on your location</li>
          <li>Refunds are subject to our <Link href="/legal/refund">Refund Policy</Link></li>
          <li>We may change pricing with 30 days notice</li>
        </ul>

        <h2>7. Service availability</h2>
        <p>We aim for 99.9% uptime but do not guarantee uninterrupted service. We may perform maintenance with or without notice. We are not liable for losses caused by downtime.</p>

        <h2>8. Disclaimer of warranties</h2>
        <p>The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, express or implied. We do not warrant that AI-generated content is accurate, complete, or suitable for any purpose.</p>

        <h2>9. Limitation of liability</h2>
        <p>To the maximum extent permitted by law, Unveils Technologies Pvt. Ltd. shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits or data. Our total liability shall not exceed the amount you paid us in the 3 months preceding the claim.</p>

        <h2>10. Termination</h2>
        <p>You may cancel your account at any time from Settings. We may suspend or terminate accounts for violations of these Terms. Upon termination, your data will be deleted per our Privacy Policy.</p>

        <h2>11. Governing law</h2>
        <p>These Terms are governed by the laws of India. Disputes shall be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka, India. For EU users, mandatory local consumer protection laws also apply.</p>

        <h2>12. Changes to terms</h2>
        <p>We may update these Terms. Material changes will be communicated via email 30 days in advance. Continued use after the effective date constitutes acceptance.</p>

        <h2>13. Contact</h2>
        <p>Legal queries: <a href="mailto:official.unveilsme@gmail.com">official.unveilsme@gmail.com</a><br />
        Grievance (India, IT Act 2000): <a href="mailto:official.unveilsme@gmail.com">official.unveilsme@gmail.com</a> — Response within 30 days</p>

        <div style={{ marginTop:48, padding:'20px', borderRadius:12, background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.065)', display:'flex', gap:16, flexWrap:'wrap' }}>
          {[['Privacy Policy','/legal/privacy'],['Cookie Policy','/legal/cookie-policy'],['Refund Policy','/legal/refund'],['GDPR','/legal/gdpr'],['Disclaimer','/legal/disclaimer']].map(([l,h])=>(
            <Link key={l} href={h} style={{ fontSize:13, color:'rgba(255,255,255,.5)' }}>{l}</Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  )
}

