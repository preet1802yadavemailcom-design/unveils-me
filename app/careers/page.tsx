'use client'
import Footer from '@/components/ui/Footer'
import { motion } from 'framer-motion'
import Link from 'next/link'

const ROLES = [
  { title:'Senior Full-Stack Engineer', team:'Engineering', location:'Remote / Bangalore', type:'Full-time', tags:['Next.js','TypeScript','Postgres'], urgent:true },
  { title:'AI/ML Engineer', team:'AI', location:'Remote', type:'Full-time', tags:['LLMs','Python','RAG'], urgent:true },
  { title:'Product Designer', team:'Design', location:'Remote / Bangalore', type:'Full-time', tags:['Figma','UI/UX','Motion'], urgent:false },
  { title:'Growth Marketer', team:'Marketing', location:'Remote', type:'Full-time', tags:['SEO','Content','Analytics'], urgent:false },
  { title:'Developer Advocate', team:'DevRel', location:'Remote', type:'Full-time', tags:['Community','APIs','Writing'], urgent:false },
]

export default function CareersPage() {
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

      <div style={{ maxWidth:860, margin:'0 auto', padding:'80px 28px' }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} style={{ marginBottom:72 }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'5px 14px', borderRadius:9999, fontSize:12, fontWeight:500, background:'rgba(52,211,153,.1)', border:'1px solid rgba(52,211,153,.25)', color:'#34d399', marginBottom:22 }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'#34d399', animation:'ping 1.5s ease-in-out infinite', display:'inline-block' }} />
            We&apos;re hiring
          </span>
          <style>{`@keyframes ping{0%,100%{opacity:1}50%{opacity:.35}}`}</style>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:'clamp(32px,4.5vw,56px)', fontWeight:800, letterSpacing:'-.04em', lineHeight:1.1, marginBottom:20, background:'linear-gradient(160deg,#fff 35%,rgba(255,255,255,.42))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
            Help us build the<br />future of identity
          </h1>
          <p style={{ fontSize:17, color:'rgba(255,255,255,.45)', lineHeight:1.8, maxWidth:520, marginBottom:32 }}>
            Small team. Huge ambition. We move fast, build in public, and genuinely care about the problem we&apos;re solving.
          </p>
          <div style={{ display:'flex', gap:24 }}>
            {[['🌍','Remote-first'],['⚡','Move fast'],['🧠','AI-native'],['🇮🇳','India roots']].map(([e,l])=>(
              <div key={l} style={{ display:'flex', alignItems:'center', gap:7, fontSize:14, color:'rgba(255,255,255,.55)' }}>
                <span>{e}</span>{l}
              </div>
            ))}
          </div>
        </motion.div>

        <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:700, letterSpacing:'-.03em', marginBottom:20, color:'#fff' }}>Open roles</h2>
        <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:64 }}>
          {ROLES.map(({ title, team, location, type, tags, urgent }, i) => (
            <motion.div key={title} initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*.07 }}
              style={{ padding:'22px 24px', borderRadius:16, background:'rgba(255,255,255,.025)', border:'1px solid rgba(255,255,255,.055)', display:'flex', alignItems:'center', gap:16, flexWrap:'wrap' }}>
              <div style={{ flex:1, minWidth:200 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                  <span style={{ fontSize:15, fontWeight:500, color:'#fff' }}>{title}</span>
                  {urgent && <span style={{ padding:'2px 8px', borderRadius:9999, fontSize:11, background:'rgba(251,191,36,.12)', color:'#fbbf24', border:'1px solid rgba(251,191,36,.22)' }}>Urgent</span>}
                </div>
                <div style={{ display:'flex', gap:12, fontSize:12, color:'rgba(255,255,255,.4)' }}>
                  <span>{team}</span><span>·</span><span>{location}</span><span>·</span><span>{type}</span>
                </div>
              </div>
              <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                {tags.map(t=><span key={t} style={{ padding:'3px 10px', borderRadius:9999, fontSize:11, background:'rgba(108,95,244,.12)', color:'#a29afb', border:'1px solid rgba(108,95,244,.22)' }}>{t}</span>)}
              </div>
              <a href={`mailto:official.unveilsme@gmail.com?subject=Application: ${title}`}
                style={{ padding:'9px 18px', borderRadius:9999, background:'rgba(255,255,255,.07)', border:'1px solid rgba(255,255,255,.12)', fontSize:13, fontWeight:500, color:'#fff', whiteSpace:'nowrap', flexShrink:0 }}>
                Apply →
              </a>
            </motion.div>
          ))}
        </div>

        <div style={{ padding:'40px 32px', borderRadius:20, background:'rgba(255,255,255,.025)', border:'1px solid rgba(255,255,255,.055)', textAlign:'center' }}>
          <div style={{ fontSize:28, marginBottom:14 }}>💌</div>
          <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:18, fontWeight:700, marginBottom:8 }}>Don&apos;t see your role?</h3>
          <p style={{ fontSize:14, color:'rgba(255,255,255,.42)', marginBottom:20 }}>We love hearing from talented people. Send us a note about what you&apos;d build here.</p>
          <a href="mailto:official.unveilsme@gmail.com" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'12px 24px', background:'#6c5ff4', borderRadius:9999, fontSize:14, fontWeight:500, color:'#fff' }}>Send us a note →</a>
        </div>
      </div>
      <Footer />
    </main>
  )
}

