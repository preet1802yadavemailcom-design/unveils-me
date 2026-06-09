// app/legal/privacy/page.tsx — GDPR-compliant Privacy Policy
import Link from 'next/link'
import Footer from '@/components/ui/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy · Unveils.me',
  description: 'How Unveils.me collects, uses, and protects your personal data.',
}

const LAST_UPDATED = 'June 1, 2025'
const BASE = 'https://unveils.me'

export default function PrivacyPolicy() {
  const css = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700&family=DM+Sans:wght@400;500&display=swap'); *{box-sizing:border-box;margin:0;padding:0} a{color:#a29afb;text-decoration:underline} body{-webkit-font-smoothing:antialiased} h2{font-family:'Syne',sans-serif;font-size:20px;font-weight:700;letter-spacing:-.025em;margin:36px 0 12px;color:#fff} h3{font-size:15px;font-weight:600;margin:20px 0 8px;color:rgba(255,255,255,.8)} p,li{font-size:14.5px;color:rgba(255,255,255,.55);line-height:1.85;margin-bottom:10px} ul{padding-left:20px;margin-bottom:10px} strong{color:rgba(255,255,255,.75);font-weight:500}`

  return (
    <main style={{ background:'#050508', color:'#fff', fontFamily:"'DM Sans',sans-serif", minHeight:'100vh' }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <nav style={{ borderBottom:'1px solid rgba(255,255,255,.055)', padding:'0 28px', height:58, display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:50, background:'rgba(5,5,8,.9)', backdropFilter:'blur(20px)' }}>
        <Link href="/" style={{ display:'flex', alignItems:'center', gap:9, textDecoration:'none', color:'#fff' }}>
          <div style={{ width:26, height:26, borderRadius:7, background:'linear-gradient(135deg,#6c5ff4,#a78bfa)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12 }}>✦</div>
          <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:14, letterSpacing:'-.02em' }}>unveils.me</span>
        </Link>
        <div style={{ display:'flex', gap:20, fontSize:13 }}>
          <Link href="/legal/terms">Terms</Link>
          <Link href="/legal/cookie-policy">Cookies</Link>
          <Link href="/legal/gdpr">GDPR</Link>
        </div>
      </nav>

      <div style={{ maxWidth:720, margin:'0 auto', padding:'64px 28px 80px' }}>
        <div style={{ marginBottom:48 }}>
          <div style={{ fontSize:12, color:'rgba(255,255,255,.35)', marginBottom:12, letterSpacing:'.06em', textTransform:'uppercase' }}>Legal · Privacy</div>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:36, fontWeight:800, letterSpacing:'-.04em', lineHeight:1.1, marginBottom:14, color:'#fff' }}>Privacy Policy</h1>
          <p style={{ fontSize:13, color:'rgba(255,255,255,.35)' }}>Last updated: {LAST_UPDATED} · Effective immediately</p>
          <div style={{ marginTop:20, padding:'14px 18px', borderRadius:12, background:'rgba(108,95,244,.07)', border:'1px solid rgba(108,95,244,.18)', fontSize:14, color:'rgba(255,255,255,.55)', lineHeight:1.7 }}>
            <strong>Summary:</strong> We collect minimal data, never sell it, use it only to run the service, and you can delete everything at any time.
          </div>
        </div>

        <h2>1. Who we are</h2>
        <p>Unveils.me (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is operated by Unveils Technologies Private Limited, Bangalore, India. We build and operate the AI identity platform at <a href={BASE}>{BASE}</a>.</p>
        <p><strong>Data Controller:</strong> Unveils Technologies Pvt. Ltd.<br /><strong>Contact:</strong> <a href="mailto:official.unveilsme@gmail.com">official.unveilsme@gmail.com</a></p>

        <h2>2. Data we collect</h2>
        <h3>2.1 Data you provide</h3>
        <ul>
          <li><strong>Account information:</strong> name, email address, password (hashed), profile photo</li>
          <li><strong>Identity content:</strong> descriptions you type, skills, goals, biography</li>
          <li><strong>Payment information:</strong> billing details processed by Stripe (we never store card numbers)</li>
          <li><strong>Communications:</strong> messages you send via contact forms or support</li>
        </ul>
        <h3>2.2 Data collected automatically</h3>
        <ul>
          <li><strong>Usage data:</strong> pages visited, features used, session duration</li>
          <li><strong>Device data:</strong> browser type, operating system, screen size</li>
          <li><strong>IP address:</strong> used for rate limiting and fraud prevention only</li>
          <li><strong>Cookies:</strong> authentication session, preferences (see Cookie Policy)</li>
        </ul>
        <h3>2.3 Data we do NOT collect</h3>
        <ul>
          <li>We do not collect biometric data</li>
          <li>We do not read your private files or clipboard</li>
          <li>We do not use your data to train AI models (yours or ours)</li>
          <li>We do not sell your data — ever</li>
        </ul>

        <h2>3. How we use your data</h2>
        <ul>
          <li>To create and manage your account and identity</li>
          <li>To power AI generation features (your descriptions are sent to AI API; see Section 7)</li>
          <li>To process payments via Stripe</li>
          <li>To send transactional emails (account confirmation, receipts)</li>
          <li>To improve the product (aggregated, anonymised analytics only)</li>
          <li>To comply with legal obligations</li>
        </ul>

        <h2>4. Legal basis (GDPR)</h2>
        <p>For users in the EU/EEA, we process your data under:</p>
        <ul>
          <li><strong>Contract performance:</strong> to provide the service you signed up for</li>
          <li><strong>Legitimate interests:</strong> security, fraud prevention, product improvement</li>
          <li><strong>Consent:</strong> marketing emails (you can withdraw at any time)</li>
          <li><strong>Legal obligation:</strong> financial records, regulatory compliance</li>
        </ul>

        <h2>5. Data sharing</h2>
        <p>We share data only with:</p>
        <ul>
          <li><strong>Supabase</strong> (database hosting — EU/US)</li>
          <li><strong>AI Inc.</strong> (AI inference — US) — your descriptions are sent to generate identity content. AI does not store or train on your data.</li>
          <li><strong>Stripe Inc.</strong> (payment processing — US)</li>
          <li><strong>Upstash</strong> (Redis caching — EU/US)</li>
          <li><strong>Resend</strong> (transactional email — US)</li>
          <li><strong>Vercel</strong> (hosting and edge network — global)</li>
        </ul>
        <p>We never share data with advertising networks, data brokers, or any third party for marketing purposes.</p>

        <h2>6. Data retention</h2>
        <ul>
          <li>Active accounts: data retained while your account is active</li>
          <li>Deleted accounts: all personal data deleted within 30 days of account deletion</li>
          <li>Billing records: retained for 7 years to comply with Indian financial regulations</li>
          <li>Server logs: deleted after 90 days</li>
        </ul>

        <h2>7. AI and your data</h2>
        <p>When you use our AI features, your text descriptions are sent to AI&apos;s API for inference. We have a Data Processing Agreement with AI. <strong>Your data is not used to train AI&apos;s models</strong>. Generated content (identities, agent responses) is stored in our database and associated with your account.</p>

        <h2>8. Your rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li><strong>Access</strong> all data we hold about you</li>
          <li><strong>Correct</strong> inaccurate data</li>
          <li><strong>Delete</strong> your account and all associated data</li>
          <li><strong>Export</strong> your data in a portable format</li>
          <li><strong>Object</strong> to certain processing</li>
          <li><strong>Withdraw consent</strong> for marketing at any time</li>
        </ul>
        <p>Exercise these rights via Settings → Account, or email <a href="mailto:official.unveilsme@gmail.com">official.unveilsme@gmail.com</a>. We respond within 30 days.</p>

        <h2>9. Security</h2>
        <p>We protect your data with:</p>
        <ul>
          <li>HTTPS/TLS encryption in transit</li>
          <li>AES-256 encryption at rest (Supabase)</li>
          <li>Row-level security on all database tables</li>
          <li>Regular security audits</li>
          <li>2FA available for all accounts</li>
          <li>Password hashing with bcrypt</li>
        </ul>

        <h2>10. Cookies</h2>
        <p>We use essential cookies for authentication and session management. See our <Link href="/legal/cookie-policy">Cookie Policy</Link> for full details.</p>

        <h2>11. Children</h2>
        <p>Unveils.me is not intended for children under 13. We do not knowingly collect data from children. If you believe a child has provided us data, contact <a href="mailto:official.unveilsme@gmail.com">official.unveilsme@gmail.com</a> and we will delete it immediately.</p>

        <h2>12. Changes to this policy</h2>
        <p>We will notify you of material changes via email and in-app notification. Continued use of the service after the effective date constitutes acceptance.</p>

        <h2>13. Contact</h2>
        <p>Questions about this policy: <a href="mailto:official.unveilsme@gmail.com">official.unveilsme@gmail.com</a><br />
        Grievance Officer (India): <a href="mailto:official.unveilsme@gmail.com">official.unveilsme@gmail.com</a><br />
        Postal: Unveils Technologies Pvt. Ltd., Bangalore, Karnataka, India 560001</p>

        <div style={{ marginTop:48, padding:'20px', borderRadius:12, background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.065)', display:'flex', gap:16, flexWrap:'wrap' }}>
          {[['Terms & Conditions','/legal/terms'],['Cookie Policy','/legal/cookie-policy'],['GDPR','/legal/gdpr'],['Refund Policy','/legal/refund'],['Disclaimer','/legal/disclaimer']].map(([l,h])=>(
            <Link key={l} href={h} style={{ fontSize:13, color:'rgba(255,255,255,.5)' }}>{l}</Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  )
}

