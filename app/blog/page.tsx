'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import Footer from '@/components/ui/Footer'

const POSTS = [
  { slug:'AI-fastest-ai-inference',  title:'Why AI is the fastest AI inference on the planet',       excerpt:'We benchmarked every major AI provider. Here is why we chose AI and why 200 tokens/sec changes everything for real-time products.', author:'Arjun Mehta',  date:'June 10, 2025', readTime:'6 min',  tag:'AI',       color:'#6c5ff4' },
  { slug:'digital-identity-future',    title:'The next layer of the internet is your AI identity',       excerpt:'Every major platform shift created a new identity layer. Web 1.0 had email. Web 2.0 had social profiles. AI-native web has Unveils.me.',  author:'Kavya Iyer',   date:'June 5, 2025',  readTime:'8 min',  tag:'Vision',   color:'#38bdf8' },
  { slug:'Advanced AI-33-70b-guide',         title:'Advanced AI Systems for Digital Identity', excerpt:'A deep dive into Advanced AI, its capabilities, and why it is the best choice for generating high-quality digital identities at scale.', author:'Vikram Nair',  date:'May 28, 2025',  readTime:'10 min', tag:'Technical', color:'#34d399' },
  { slug:'personal-branding-ai',       title:'Personal branding in the AI age: what actually works',    excerpt:'Traditional personal branding advice is dead. Here is what founders, creators, and developers actually need in 2025.',                      author:'Priya Sharma', date:'May 20, 2025',  readTime:'7 min',  tag:'Strategy', color:'#f472b6' },
  { slug:'launching-saas-checklist',   title:'The complete SaaS launch checklist (150+ items)',          excerpt:"We launched Unveils.me after going through 150+ items. Here's the full checklist so you don't miss anything critical.",                   author:'Arjun Mehta',  date:'May 12, 2025',  readTime:'12 min', tag:'Launch',   color:'#fb923c' },
  { slug:'multi-agent-systems',        title:'Building multi-agent systems that actually work',          excerpt:"Everyone is talking about AI agents. Very few are building agent systems that genuinely collaborate. Here's our approach.",                author:'Kavya Iyer',   date:'May 5, 2025',   readTime:'9 min',  tag:'AI',       color:'#a78bfa' },
]

const TAGS = ['All', 'AI', 'Vision', 'Technical', 'Strategy', 'Launch']

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState('All')
  const css = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap'); *{box-sizing:border-box;margin:0;padding:0} a{color:inherit;text-decoration:none} body{-webkit-font-smoothing:antialiased}`
  const filtered = activeTag === 'All' ? POSTS : POSTS.filter(p => p.tag === activeTag)

  return (
    <main style={{ background:'#050508', color:'#fff', fontFamily:"'DM Sans',sans-serif", minHeight:'100vh' }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* Nav */}
      <nav style={{ borderBottom:'1px solid rgba(255,255,255,.055)', padding:'0 28px', height:60, display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:50, background:'rgba(5,5,8,.88)', backdropFilter:'blur(20px)' }}>
        <Link href="/" style={{ display:'flex', alignItems:'center', gap:9 }}>
          <div style={{ width:28, height:28, borderRadius:8, background:'linear-gradient(135deg,#6c5ff4,#a78bfa)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13 }}>✦</div>
          <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:15, letterSpacing:'-.02em' }}>unveils.me</span>
        </Link>
        <div style={{ display:'flex', gap:20, fontSize:14 }}>
          {([['Features','/features'],['Pricing','/pricing'],['About','/about']] as [string,string][]).map(([l,h])=>(
            <Link key={l} href={h} style={{ color:'rgba(255,255,255,.45)' }}>{l}</Link>
          ))}
        </div>
        <Link href="/auth?mode=register" style={{ padding:'9px 20px', background:'#6c5ff4', borderRadius:9999, fontSize:13, fontWeight:500, color:'#fff' }}>Get started →</Link>
      </nav>

      <div style={{ maxWidth:920, margin:'0 auto', padding:'72px 28px 96px' }}>

        {/* Header */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} style={{ marginBottom:52, textAlign:'center' }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'5px 14px', borderRadius:9999, fontSize:12, fontWeight:500, background:'rgba(108,95,244,.1)', border:'1px solid rgba(108,95,244,.26)', color:'#a29afb', marginBottom:20 }}>Blog</span>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:'clamp(30px,4.5vw,52px)', fontWeight:800, letterSpacing:'-.04em', lineHeight:1.1, marginBottom:14, background:'linear-gradient(160deg,#fff 35%,rgba(255,255,255,.42))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
            Thoughts on AI,<br />identity & the future web
          </h1>
          <p style={{ fontSize:16, color:'rgba(255,255,255,.4)' }}>From the team building the identity infrastructure of the future internet.</p>
        </motion.div>

        {/* Tag filter */}
        <div style={{ display:'flex', gap:8, marginBottom:40, flexWrap:'wrap', justifyContent:'center' }}>
          {TAGS.map(t => (
            <button key={t} onClick={() => setActiveTag(t)}
              style={{ padding:'7px 16px', borderRadius:9999, fontSize:13, fontWeight:500, cursor:'pointer', border:'1px solid', fontFamily:'inherit', transition:'all .15s',
                background: activeTag === t ? '#6c5ff4' : 'transparent',
                borderColor: activeTag === t ? '#6c5ff4' : 'rgba(255,255,255,.12)',
                color: activeTag === t ? '#fff' : 'rgba(255,255,255,.45)' }}>
              {t}
            </button>
          ))}
        </div>

        {/* Featured post */}
        {filtered[0] && (
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
            <Link href={`/blog/${filtered[0].slug}`} style={{ display:'block', padding:36, borderRadius:22, background:'rgba(108,95,244,.07)', border:'1px solid rgba(108,95,244,.2)', marginBottom:24, textDecoration:'none', transition:'all .2s', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:0, right:0, width:300, height:300, background:'radial-gradient(circle, rgba(108,95,244,.15) 0%, transparent 70%)', pointerEvents:'none' }} />
              <span style={{ padding:'4px 12px', borderRadius:9999, fontSize:11, fontWeight:500, background:'rgba(108,95,244,.2)', color:'#a29afb', border:'1px solid rgba(108,95,244,.3)' }}>Featured</span>
              <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:'clamp(20px,3vw,30px)', fontWeight:800, letterSpacing:'-.03em', margin:'16px 0 12px', lineHeight:1.2 }}>{filtered[0].title}</h2>
              <p style={{ fontSize:15, color:'rgba(255,255,255,.5)', lineHeight:1.75, marginBottom:20, maxWidth:600 }}>{filtered[0].excerpt}</p>
              <div style={{ display:'flex', alignItems:'center', gap:14, fontSize:13, color:'rgba(255,255,255,.38)' }}>
                <span>{filtered[0].author}</span><span>·</span><span>{filtered[0].date}</span><span>·</span><span>{filtered[0].readTime} read</span>
                <span style={{ marginLeft:'auto', color:'#a29afb', fontWeight:500 }}>Read article →</span>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:14, marginBottom:64 }}>
          {filtered.slice(1).map(({ slug, title, excerpt, author, date, readTime, tag, color }, i) => (
            <motion.div key={slug} initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*.07 }}>
              <Link href={`/blog/${slug}`} style={{ display:'flex', flexDirection:'column', height:'100%', padding:26, borderRadius:18, background:'rgba(255,255,255,.025)', border:'1px solid rgba(255,255,255,.055)', textDecoration:'none', transition:'border-color .2s' }}>
                <span style={{ padding:'3px 10px', borderRadius:9999, fontSize:11, fontWeight:500, background:`${color}15`, color, border:`1px solid ${color}28`, marginBottom:14, alignSelf:'flex-start' }}>{tag}</span>
                <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:700, letterSpacing:'-.025em', lineHeight:1.4, marginBottom:10, flex:1, color:'#fff' }}>{title}</h3>
                <p style={{ fontSize:13, color:'rgba(255,255,255,.42)', lineHeight:1.7, marginBottom:16 }}>{excerpt.slice(0,100)}…</p>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, color:'rgba(255,255,255,.3)' }}>
                  <span>{author}</span>
                  <span>{readTime} read</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Newsletter CTA */}
        <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
          style={{ padding:'36px', borderRadius:20, background:'rgba(255,255,255,.025)', border:'1px solid rgba(255,255,255,.055)', textAlign:'center' }}>
          <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:700, marginBottom:8 }}>Get new posts in your inbox</h3>
          <p style={{ fontSize:14, color:'rgba(255,255,255,.4)', marginBottom:20 }}>We write about AI, identity, and building the future. No spam, ever.</p>
          <form onSubmit={async (e) => {
            e.preventDefault()
            const fd = new FormData(e.currentTarget)
            await fetch('/api/newsletter', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email: fd.get('email'), source:'blog' }) })
            ;(e.target as HTMLFormElement).reset()
            alert("You're subscribed! Welcome to the future.")
          }} style={{ display:'flex', gap:8, maxWidth:400, margin:'0 auto' }}>
            <input name="email" type="email" required placeholder="you@example.com"
              style={{ flex:1, padding:'11px 14px', borderRadius:10, background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.1)', color:'#fff', fontSize:14, outline:'none', fontFamily:'inherit' }} />
            <button type="submit" style={{ padding:'11px 20px', borderRadius:10, background:'#6c5ff4', color:'#fff', fontSize:14, fontWeight:500, border:'none', cursor:'pointer', fontFamily:'inherit', whiteSpace:'nowrap' }}>Subscribe →</button>
          </form>
        </motion.div>
      </div>

      <Footer maxWidth={920} />
    </main>
  )
}

