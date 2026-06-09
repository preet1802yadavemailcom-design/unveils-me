'use client'
import Footer from '@/components/ui/Footer'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) { toast.error('Please fill all required fields'); return }
    setLoading(true)
    // In production: POST to /api/support/contact
    await new Promise(r => setTimeout(r, 1200))
    setSent(true)
    setLoading(false)
    toast.success('Message sent! We reply within 24 hours.')
  }

  const CHANNELS = [
    { icon:'📧', label:'Email support',    val:'official.unveilsme@gmail.com',      href:'mailto:official.unveilsme@gmail.com',     desc:'General enquiries' },
    { icon:'🐦', label:'Twitter / X',      val:'@unveils_me',           href:'https://twitter.com/unveils_me', desc:'Quick questions' },
    { icon:'💼', label:'Business',         val:'official.unveilsme@gmail.com',   href:'mailto:official.unveilsme@gmail.com',  desc:'Partnerships & enterprise' },
    { icon:'🔒', label:'Security',         val:'official.unveilsme@gmail.com',   href:'mailto:official.unveilsme@gmail.com',  desc:'Responsible disclosure' },
  ]

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
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} style={{ marginBottom:56, textAlign:'center' }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'5px 14px', borderRadius:9999, fontSize:12, fontWeight:500, background:'rgba(108,95,244,.1)', border:'1px solid rgba(108,95,244,.26)', color:'#a29afb', marginBottom:20 }}>Get in touch</span>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:'clamp(32px,4.5vw,52px)', fontWeight:800, letterSpacing:'-.04em', lineHeight:1.1, marginBottom:16, background:'linear-gradient(160deg,#fff 35%,rgba(255,255,255,.45))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
            We'd love to hear<br />from you
          </h1>
          <p style={{ fontSize:16, color:'rgba(255,255,255,.45)', lineHeight:1.75 }}>We reply to every message within 24 hours. Usually much faster.</p>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:20, alignItems:'start' }}>
          {/* Channels */}
          <div>
            <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:700, marginBottom:16, color:'rgba(255,255,255,.7)' }}>Other ways to reach us</h2>
            <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:28 }}>
              {CHANNELS.map(({ icon, label, val, href, desc }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ display:'flex', alignItems:'center', gap:14, padding:'16px 18px', borderRadius:14, background:'rgba(255,255,255,.025)', border:'1px solid rgba(255,255,255,.06)', transition:'all .15s' }}>
                  <span style={{ fontSize:22, flexShrink:0 }}>{icon}</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, fontWeight:500, color:'#fff', marginBottom:2 }}>{label}</div>
                    <div style={{ fontSize:12, color:'rgba(255,255,255,.4)' }}>{val}</div>
                  </div>
                  <div style={{ fontSize:11, color:'rgba(255,255,255,.3)', flexShrink:0 }}>{desc}</div>
                </a>
              ))}
            </div>
            <div style={{ padding:20, borderRadius:14, background:'rgba(108,95,244,.07)', border:'1px solid rgba(108,95,244,.18)' }}>
              <div style={{ fontSize:13, fontWeight:500, color:'#a29afb', marginBottom:6 }}>📍 Office</div>
              <p style={{ fontSize:13, color:'rgba(255,255,255,.45)', lineHeight:1.65 }}>Unveils.me<br />Bangalore, Karnataka<br />India 560001</p>
            </div>
          </div>

          {/* Form */}
          <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ delay:.1 }}
            style={{ padding:32, borderRadius:20, background:'rgba(255,255,255,.025)', border:'1px solid rgba(255,255,255,.065)' }}>
            {sent ? (
              <div style={{ textAlign:'center', padding:'32px 0' }}>
                <div style={{ fontSize:48, marginBottom:16 }}>✅</div>
                <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:700, marginBottom:8 }}>Message sent!</h3>
                <p style={{ fontSize:14, color:'rgba(255,255,255,.45)', marginBottom:20 }}>We'll reply to {form.email} within 24 hours.</p>
                <button onClick={() => { setSent(false); setForm({ name:'', email:'', subject:'', message:'' }) }}
                  style={{ padding:'10px 20px', borderRadius:9999, background:'rgba(255,255,255,.08)', border:'1px solid rgba(255,255,255,.12)', color:'rgba(255,255,255,.7)', fontSize:13, cursor:'pointer', fontFamily:'inherit' }}>
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:14 }}>
                <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:18, fontWeight:700, marginBottom:4 }}>Send a message</h2>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                  {[['name','Your name','text',true],['email','Email address','email',true]].map(([id,ph,type,req])=>(
                    <div key={id as string}>
                      <label style={{ display:'block', fontSize:11, fontWeight:500, color:'rgba(255,255,255,.4)', marginBottom:5, textTransform:'uppercase', letterSpacing:'.06em' }}>{id as string} {req && '*'}</label>
                      <input type={type as string} placeholder={ph as string} required={req as boolean} value={form[id as keyof typeof form]}
                        onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
                        style={{ width:'100%', padding:'10px 13px', borderRadius:10, background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.09)', color:'#fff', fontSize:13, fontFamily:'inherit', outline:'none' }} />
                    </div>
                  ))}
                </div>
                <div>
                  <label style={{ display:'block', fontSize:11, fontWeight:500, color:'rgba(255,255,255,.4)', marginBottom:5, textTransform:'uppercase', letterSpacing:'.06em' }}>Subject</label>
                  <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    style={{ width:'100%', padding:'10px 13px', borderRadius:10, background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.09)', color: form.subject ? '#fff' : 'rgba(255,255,255,.35)', fontSize:13, fontFamily:'inherit', outline:'none' }}>
                    <option value="" disabled>Select a topic</option>
                    {['General question','Technical support','Billing & pricing','Partnership / enterprise','Bug report','Feature request','Media enquiry','Other'].map(o=><option key={o} value={o} style={{ background:'#1a1a2a', color:'#fff' }}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display:'block', fontSize:11, fontWeight:500, color:'rgba(255,255,255,.4)', marginBottom:5, textTransform:'uppercase', letterSpacing:'.06em' }}>Message *</label>
                  <textarea placeholder="Tell us anything — the more detail the better..." required rows={5} value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    style={{ width:'100%', padding:'10px 13px', borderRadius:10, background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.09)', color:'#fff', fontSize:13, fontFamily:'inherit', resize:'vertical', outline:'none', lineHeight:1.65 }} />
                </div>
                <button type="submit" disabled={loading}
                  style={{ padding:'13px', borderRadius:12, background:'#6c5ff4', color:'#fff', fontSize:14, fontWeight:500, border:'none', cursor:'pointer', fontFamily:'inherit', opacity:loading ? .7 : 1, transition:'opacity .2s' }}>
                  {loading ? 'Sending…' : 'Send message →'}
                </button>
                <p style={{ fontSize:12, color:'rgba(255,255,255,.3)', textAlign:'center' }}>
                  By submitting you agree to our <Link href="/legal/privacy" style={{ color:'rgba(255,255,255,.5)', textDecoration:'underline' }}>Privacy Policy</Link>.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

