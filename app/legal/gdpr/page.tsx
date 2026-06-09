// app/legal/gdpr/page.tsx
import Link from 'next/link'
import Footer from '@/components/ui/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GDPR Compliance · Unveils.me',
  description: 'How Unveils.me complies with the EU General Data Protection Regulation.',
}

export default function GDPRPage() {
  const css = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700&family=DM+Sans:wght@400;500&display=swap'); *{box-sizing:border-box;margin:0;padding:0} a{color:#a29afb;text-decoration:underline} body{-webkit-font-smoothing:antialiased} h2{font-family:'Syne',sans-serif;font-size:19px;font-weight:700;letter-spacing:-.025em;margin:34px 0 10px;color:#fff} h3{font-size:15px;font-weight:600;margin:18px 0 7px;color:rgba(255,255,255,.8)} p,li{font-size:14.5px;color:rgba(255,255,255,.52);line-height:1.85;margin-bottom:9px} ul{padding-left:20px;margin-bottom:10px} strong{color:rgba(255,255,255,.75);font-weight:500}`

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
          <div style={{ fontSize:12, color:'rgba(255,255,255,.35)', marginBottom:12, letterSpacing:'.06em', textTransform:'uppercase' }}>Legal · EU/EEA</div>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:36, fontWeight:800, letterSpacing:'-.04em', lineHeight:1.1, marginBottom:14, color:'#fff' }}>GDPR Compliance</h1>
          <p style={{ fontSize:13, color:'rgba(255,255,255,.35)' }}>Last updated: June 1, 2025</p>
          <div style={{ marginTop:20, padding:'14px 18px', borderRadius:12, background:'rgba(56,189,248,.07)', border:'1px solid rgba(56,189,248,.2)', fontSize:14, color:'rgba(255,255,255,.55)', lineHeight:1.7 }}>
            Unveils.me is fully compliant with the EU General Data Protection Regulation (GDPR) for all users in the European Economic Area.
          </div>
        </div>

        <h2>Your GDPR rights</h2>
        <p>As an EU/EEA resident, you have the following rights under GDPR. Exercise any of these by emailing <a href="mailto:official.unveilsme@gmail.com">official.unveilsme@gmail.com</a>. We will respond within 30 days.</p>

        {[
          { right:'Right to access (Art. 15)', desc:'Request a copy of all personal data we hold about you. We will provide it in a machine-readable format within 30 days.' },
          { right:'Right to rectification (Art. 16)', desc:'Request correction of inaccurate or incomplete personal data. You can also update most data directly in your account settings.' },
          { right:'Right to erasure / "right to be forgotten" (Art. 17)', desc:'Request deletion of all your personal data. We will delete your account and all associated data within 30 days, except where we are legally required to retain certain records.' },
          { right:'Right to data portability (Art. 20)', desc:'Request your data in a structured, machine-readable format (JSON/CSV) to transfer to another service.' },
          { right:'Right to restriction (Art. 18)', desc:'Request that we limit how we process your data while a complaint is under investigation.' },
          { right:'Right to object (Art. 21)', desc:'Object to processing based on legitimate interests. We will stop unless we have compelling legitimate grounds.' },
          { right:'Right to withdraw consent', desc:'Where processing is based on consent (e.g. marketing emails), you can withdraw at any time without affecting prior processing.' },
        ].map(({ right, desc }) => (
          <div key={right} style={{ padding:'18px 20px', borderRadius:12, background:'rgba(255,255,255,.02)', border:'1px solid rgba(255,255,255,.055)', marginBottom:10 }}>
            <strong style={{ display:'block', marginBottom:6, color:'#fff', fontSize:14 }}>{right}</strong>
            <p style={{ margin:0 }}>{desc}</p>
          </div>
        ))}

        <h2>Data transfers outside EU</h2>
        <p>We use the following processors outside the EU/EEA. All transfers are covered by Standard Contractual Clauses (SCCs) or equivalent adequacy decisions:</p>
        <ul>
          <li><strong>AI Inc.</strong> (USA) — AI inference. SCCs in place. Data not retained by AI.</li>
          <li><strong>Stripe Inc.</strong> (USA) — Payment processing. Stripe is certified under EU-US Data Privacy Framework.</li>
          <li><strong>Vercel Inc.</strong> (USA) — Hosting. SCCs in place. Edge network may cache in multiple regions.</li>
          <li><strong>Upstash</strong> (USA/EU) — Redis cache. Data stored in EU region where possible.</li>
        </ul>

        <h2>Data Protection Officer</h2>
        <p>For GDPR-specific queries:<br />
        <a href="mailto:official.unveilsme@gmail.com">official.unveilsme@gmail.com</a><br />
        Unveils Technologies Pvt. Ltd., Bangalore, India</p>

        <h2>Supervisory authority</h2>
        <p>If you are unsatisfied with how we handle your data, you have the right to lodge a complaint with your local EU data protection authority. A list of EU DPAs is available at <a href="https://edpb.europa.eu" target="_blank" rel="noopener noreferrer">edpb.europa.eu</a>.</p>

        <div style={{ marginTop:40, padding:'18px 20px', borderRadius:12, background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.065)', display:'flex', gap:16, flexWrap:'wrap' }}>
          {[['Privacy Policy','/legal/privacy'],['Cookie Policy','/legal/cookie-policy'],['Terms','/legal/terms'],['Data Deletion','/settings']].map(([l,h])=>(
            <Link key={l} href={h} style={{ fontSize:13, color:'rgba(255,255,255,.5)' }}>{l}</Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  )
}

