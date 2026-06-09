// app/legal/refund/page.tsx
import Link from 'next/link'
import Footer from '@/components/ui/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Refund Policy · Unveils.me',
  description: 'Unveils.me refund and cancellation policy.',
}

export default function RefundPolicy() {
  const css = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700&family=DM+Sans:wght@400;500&display=swap'); *{box-sizing:border-box;margin:0;padding:0} a{color:#a29afb;text-decoration:underline} body{-webkit-font-smoothing:antialiased} h2{font-family:'Syne',sans-serif;font-size:19px;font-weight:700;letter-spacing:-.025em;margin:34px 0 10px;color:#fff} p,li{font-size:14.5px;color:rgba(255,255,255,.52);line-height:1.85;margin-bottom:9px} ul{padding-left:20px;margin-bottom:10px} strong{color:rgba(255,255,255,.75);font-weight:500} table{width:100%;border-collapse:collapse;margin:12px 0} td,th{padding:11px 14px;border:1px solid rgba(255,255,255,.08);font-size:13.5px;text-align:left;color:rgba(255,255,255,.55)} th{background:rgba(255,255,255,.04);color:rgba(255,255,255,.7);font-weight:500}`

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
          <Link href="/legal/privacy">Privacy</Link>
        </div>
      </nav>

      <div style={{ maxWidth:720, margin:'0 auto', padding:'64px 28px 80px' }}>
        <div style={{ marginBottom:48 }}>
          <div style={{ fontSize:12, color:'rgba(255,255,255,.35)', marginBottom:12, letterSpacing:'.06em', textTransform:'uppercase' }}>Legal · Billing</div>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:36, fontWeight:800, letterSpacing:'-.04em', lineHeight:1.1, marginBottom:14, color:'#fff' }}>Refund Policy</h1>
          <p style={{ fontSize:13, color:'rgba(255,255,255,.35)' }}>Last updated: June 1, 2025</p>
          <div style={{ marginTop:20, padding:'14px 18px', borderRadius:12, background:'rgba(52,211,153,.07)', border:'1px solid rgba(52,211,153,.2)', fontSize:14, color:'rgba(255,255,255,.55)', lineHeight:1.7 }}>
            <strong>Short version:</strong> 30-day money-back guarantee on all paid plans. No questions asked.
          </div>
        </div>

        <h2>1. Free plan</h2>
        <p>The Free plan is free. No charges, no refunds applicable.</p>

        <h2>2. Paid plans — 30-day guarantee</h2>
        <p>If you are not satisfied with your Pro or Enterprise subscription within <strong>30 days of your first payment</strong>, email us at <a href="mailto:official.unveilsme@gmail.com">official.unveilsme@gmail.com</a> and we will issue a <strong>full refund</strong> — no questions asked.</p>

        <h2>3. Refund eligibility table</h2>
        <table>
          <thead>
            <tr><th>Scenario</th><th>Eligible?</th><th>Amount</th></tr>
          </thead>
          <tbody>
            <tr><td>Within 30 days of first payment</td><td>✅ Yes</td><td>100% refund</td></tr>
            <tr><td>30–90 days, exceptional circumstances</td><td>⚠️ Case-by-case</td><td>Pro-rated</td></tr>
            <tr><td>After 90 days</td><td>❌ No</td><td>—</td></tr>
            <tr><td>Annual plan (within 30 days)</td><td>✅ Yes</td><td>100% refund</td></tr>
            <tr><td>Annual plan (after 30 days)</td><td>⚠️ Case-by-case</td><td>Remaining months</td></tr>
            <tr><td>Downgrade (Pro → Free)</td><td>❌ No</td><td>Access until period end</td></tr>
            <tr><td>Trial period cancellation</td><td>✅ Yes</td><td>No charge</td></tr>
            <tr><td>Account suspended for ToS violation</td><td>❌ No</td><td>—</td></tr>
          </tbody>
        </table>

        <h2>4. How to request a refund</h2>
        <ul>
          <li>Email <a href="mailto:official.unveilsme@gmail.com">official.unveilsme@gmail.com</a> with subject: &quot;Refund Request - [your email]&quot;</li>
          <li>Include your account email and reason (optional but helpful)</li>
          <li>We process refunds within <strong>5 business days</strong></li>
          <li>Refunds appear on your original payment method within 5–10 business days</li>
        </ul>

        <h2>5. Cancellation</h2>
        <p>Cancel your subscription anytime from <strong>Settings → Billing → Manage Subscription</strong>. Your access continues until the end of the current billing period. We do not provide partial-month refunds for monthly plans that are cancelled mid-cycle.</p>

        <h2>6. Chargebacks</h2>
        <p>We ask that you contact us before initiating a chargeback with your bank. Chargebacks result in immediate account suspension. If a chargeback is reversed in our favour, the account remains suspended.</p>

        <h2>7. GST / Tax</h2>
        <p>Indian users are charged GST as applicable. GST amounts are non-refundable once submitted to the government but we will issue a corrected GST invoice.</p>

        <h2>8. Contact</h2>
        <p>Billing questions: <a href="mailto:official.unveilsme@gmail.com">official.unveilsme@gmail.com</a><br />Response time: within 1 business day</p>
      </div>
      <Footer />
    </main>
  )
}

