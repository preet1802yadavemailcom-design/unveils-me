'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import Link from 'next/link'

const WORDS = ['founders', 'creators', 'developers', 'designers', 'startups', 'artists', 'humans']

function Counter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      const steps = 60
      let cur = 0
      const t = setInterval(() => {
        cur += end / steps
        if (cur >= end) { setVal(end); clearInterval(t) } else setVal(Math.floor(cur))
      }, 1800 / steps)
      io.disconnect()
    })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [end])
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>
}

function Orb({ style }: { style: React.CSSProperties }) {
  return <div style={{ position: 'absolute', borderRadius: '50%', filter: 'blur(90px)', opacity: 0.3, pointerEvents: 'none', ...style }} />
}

export default function Home() {
  const { scrollY, scrollYProgress } = useScroll()
  const [wordIdx, setWordIdx] = useState(0)
  const [typed, setTyped] = useState('')
  const [del, setDel] = useState(false)
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -60])
  const heroO = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const navBg = useTransform(scrollY, [0, 80], ['rgba(5,5,8,0)', 'rgba(5,5,8,0.9)'])

  useEffect(() => {
    const w = WORDS[wordIdx]
    const t = setTimeout(() => {
      if (!del) {
        setTyped(w.slice(0, typed.length + 1))
        if (typed.length === w.length - 1) setTimeout(() => setDel(true), 2200)
      } else {
        setTyped(w.slice(0, typed.length - 1))
        if (typed.length === 1) { setDel(false); setWordIdx(i => (i + 1) % WORDS.length) }
      }
    }, del ? 32 : 85)
    return () => clearTimeout(t)
  }, [typed, del, wordIdx])

  const S = {
    root: { background: '#050508', color: '#fff', fontFamily: "'DM Sans', sans-serif", overflowX: 'hidden' as const },
    fonts: `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,400&display=swap');
    *{box-sizing:border-box;margin:0;padding:0} html{scroll-behavior:smooth} body{-webkit-font-smoothing:antialiased}
    ::selection{background:rgba(108,95,244,0.3);color:#fff}
    ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:#050508} ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.12);border-radius:2px}
    .nl{color:rgba(255,255,255,0.5);font-size:14px;text-decoration:none;letter-spacing:-.01em;transition:color .2s} .nl:hover{color:#fff}
    .cp{display:inline-flex;align-items:center;gap:8px;padding:15px 30px;background:#6c5ff4;color:#fff;border-radius:9999px;font-size:15px;font-weight:500;text-decoration:none;transition:all .2s;letter-spacing:-.01em;font-family:'DM Sans',sans-serif;border:none;cursor:pointer}
    .cp:hover{background:#7b6ff5;transform:translateY(-2px);box-shadow:0 16px 48px rgba(108,95,244,0.45)}
    .cg{display:inline-flex;align-items:center;gap:8px;padding:15px 26px;background:rgba(255,255,255,0.05);color:rgba(255,255,255,0.7);border-radius:9999px;font-size:15px;font-weight:500;text-decoration:none;transition:all .2s;border:1px solid rgba(255,255,255,0.1);cursor:pointer;font-family:'DM Sans',sans-serif}
    .cg:hover{background:rgba(255,255,255,0.09);color:#fff}
    .gd{background-image:radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px);background-size:30px 30px}
    .pill{display:inline-flex;align-items:center;gap:6px;padding:5px 14px;border-radius:9999px;font-size:12px;font-weight:500;letter-spacing:.03em;background:rgba(108,95,244,0.1);border:1px solid rgba(108,95,244,0.28);color:#a29afb}
    .bcard{border-radius:20px;overflow:hidden;background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.065);transition:all .25s;position:relative}
    .bcard:hover{background:rgba(255,255,255,0.04);border-color:rgba(255,255,255,0.1);transform:translateY(-3px)}
    .mq{display:flex;gap:14px;animation:mq 22s linear infinite;width:max-content}
    .mq2{display:flex;gap:14px;animation:mq 28s linear infinite reverse;width:max-content}
    @keyframes mq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
    @keyframes fp{100%,100%{opacity:1}50%{opacity:.35}}
    .dp{width:8px;height:8px;border-radius:50%;background:#34d399;animation:fp 1.8s ease-in-out infinite}`,
  }

  return (
    <div style={S.root}>
      <style dangerouslySetInnerHTML={{ __html: S.fonts }} />

      {/* ── Nav ── */}
      <motion.header style={{ background: navBg, backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', position: 'fixed', top: 0, inset: '0 0 auto', zIndex: 50, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 28px', height: 62, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#6c5ff4,#a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#fff' }}>✦</div>
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 16, color: '#fff', letterSpacing: '-.025em' }}>unveils.me</span>
          </Link>
          <nav style={{ display: 'flex', gap: 28 }}>
            {[['Features','/features'],['Pricing','/pricing'],['Blog','/blog'],['About','/about']].map(([l,h]) =>
              <Link key={l} href={h} className="nl">{l}</Link>
            )}
          </nav>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Link href="/auth" className="nl">Sign in</Link>
            <Link href="/auth?mode=register" className="cp" style={{ padding: '10px 22px', fontSize: 14 }}>Get started →</Link>
          </div>
        </div>
      </motion.header>

      {/* ── Hero ── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 28px 80px', overflow: 'hidden' }}>
        <div className="gd" style={{ position: 'absolute', inset: 0, opacity: 0.7 }} />
        <Orb style={{ width: 700, height: 700, background: '#6c5ff4', left: '-15%', top: '-10%' }} />
        <Orb style={{ width: 550, height: 550, background: '#38bdf8', right: '-8%', top: '5%' }} />
        <Orb style={{ width: 450, height: 450, background: '#a78bfa', left: '35%', bottom: '-5%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 75% 65% at 50% 50%, transparent 35%, #050508 92%)', pointerEvents: 'none' }} />

        <motion.div style={{ y: heroY, opacity: heroO, position: 'relative', zIndex: 5, textAlign: 'center', maxWidth: 880, width: '100%' }}>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}>
            <span className="pill">
              <span className="dp" />&nbsp;AI-powered platform
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .1 }}
            style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(42px,7.5vw,90px)', fontWeight: 800, lineHeight: 1.04, letterSpacing: '-.04em', margin: '28px 0 22px' }}>
            <span style={{ background: 'linear-gradient(160deg,#fff 35%,rgba(255,255,255,.48))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              The digital identity<br />OS for&nbsp;
            </span>
            <span style={{ background: 'linear-gradient(135deg,#c4bffd 100%,#8b83f7 40%,#5eaaff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {typed}<span style={{ borderRight: '3px solid #8b83f7', marginLeft: 2, animation: 'fp 1s steps(1) infinite' }}></span>
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .2 }}
            style={{ fontSize: 19, lineHeight: 1.72, color: 'rgba(255,255,255,.5)', maxWidth: 540, margin: '0 auto 44px', letterSpacing: '-.01em' }}>
            Every human on Earth gets an intelligent digital universe under{' '}
            <code style={{ fontFamily: 'monospace', color: '#a29afb', fontSize: 17, background: 'rgba(108,95,244,.1)', padding: '2px 8px', borderRadius: 6 }}>yourname.unveils.me</code>.
            AI identity, website &amp; agents — live in 30 seconds.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55, delay: .3 }}
            style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 56 }}>
            <Link href="/auth?mode=register" className="cp">✦ Create your identity — free</Link>
            <Link href="/u/demo" className="cg">See live example →</Link>
          </motion.div>

          {/* Live subdomains */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .5 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 9, justifyContent: 'center' }}>
            {[{s:'arjun',t:'founder',c:'#6c5ff4'},{s:'nova',t:'startup',c:'#38bdf8'},{s:'priya',t:'designer',c:'#f472b6'},{s:'vikram',t:'developer',c:'#fb923c'},{s:'kai',t:'creator',c:'#34d399'}].map(({s,t,c},i)=>(
              <motion.div key={s} initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:.6+i*.07 }}
                style={{ display:'flex',alignItems:'center',gap:7,padding:'7px 14px',borderRadius:9999,background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.08)',fontSize:13 }}>
                <span style={{ width:7,height:7,borderRadius:'50%',background:c,flexShrink:0 }} />
                <span style={{ color:c,fontWeight:500 }}>{s}</span>
                <span style={{ color:'rgba(255,255,255,.3)' }}>.unveils.me</span>
                <span style={{ padding:'2px 8px',borderRadius:9999,fontSize:11,background:`${c}18`,color:c,border:`1px solid ${c}28` }}>{t}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <div style={{ position:'absolute',bottom:0,left:0,right:0,height:220,background:'linear-gradient(to bottom,transparent,#050508)',pointerEvents:'none' }} />
      </section>

      {/* ── Marquee ── */}
      <div style={{ padding:'18px 0',borderTop:'1px solid rgba(255,255,255,.05)',borderBottom:'1px solid rgba(255,255,255,.05)',overflow:'hidden',background:'rgba(255,255,255,.012)' }}>
        <div className="mq">
          {[...Array(2)].flatMap((_,r)=>['AI Identity Engine','Website Generator','Multi-Agent OS','Digital Twin','AI Memory','AI Inference','Analytics Engine','Social Infrastructure','Commerce Layer','Realtime Collaboration','Zero-Trust Security','Vector Database'].map((t,i)=>(
            <span key={`${r}${i}`} style={{ flexShrink:0,display:'inline-flex',alignItems:'center',gap:8,padding:'7px 18px',borderRadius:9999,background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.06)',fontSize:13,color:'rgba(255,255,255,.42)',whiteSpace:'nowrap' }}>
              <span style={{ color:'#6c5ff4',fontSize:14 }}>✦</span> {t}
            </span>
          )))}
        </div>
      </div>

      {/* ── Stats ── */}
      <section style={{ maxWidth:1120,margin:'0 auto',padding:'96px 28px' }}>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))' }}>
          {[{n:10,s:'x',l:'Faster than any website builder',c:'#6c5ff4'},{n:3,s:'s',l:'Average identity generation time',c:'#38bdf8'},{n:50,s:'+',l:'AI capabilities built-in from day one',c:'#34d399'},{n:100,s:'%',l:'AI-native — zero templates ever used',c:'#f472b6'}].map(({n,s,l,c},i)=>(
            <motion.div key={l} initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ delay:i*.08 }}
              style={{ padding:'36px 28px',borderRight:i<3?'1px solid rgba(255,255,255,.06)':'none' }}>
              <div style={{ fontFamily:"'Syne',sans-serif",fontSize:52,fontWeight:800,letterSpacing:'-.04em',lineHeight:1,color:c,marginBottom:10 }}>
                <Counter end={n} suffix={s} />
              </div>
              <div style={{ fontSize:13.5,color:'rgba(255,255,255,.38)',lineHeight:1.55,letterSpacing:'-.01em' }}>{l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Bento features ── */}
      <section id="features" style={{ padding:'20px 28px 100px',maxWidth:1120,margin:'0 auto' }}>
        <motion.div initial={{ opacity:0,y:18 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} style={{ textAlign:'center',marginBottom:64 }}>
          <span className="pill" style={{ marginBottom:18,display:'inline-flex' }}>Core Systems</span>
          <h2 style={{ fontFamily:"'Syne',sans-serif",fontSize:'clamp(30px,4vw,52px)',fontWeight:800,letterSpacing:'-.04em',lineHeight:1.1,marginTop:16 }}>
            <span style={{ background:'linear-gradient(160deg,#fff 35%,rgba(255,255,255,.42))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>
              Every layer of your<br />digital existence
            </span>
          </h2>
          <p style={{ marginTop:18,fontSize:17,color:'rgba(255,255,255,.4)',maxWidth:460,margin:'16px auto 0',lineHeight:1.7 }}>Not a website builder. An AI-native platform that evolves with your identity and goals.</p>
        </motion.div>

        <div style={{ display:'grid',gridTemplateColumns:'repeat(12,1fr)',gap:11 }}>
          {/* Big left */}
          <motion.div initial={{ opacity:0,y:28 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:.6,ease:[.16,1,.3,1] }}
            className="bcard" style={{ gridColumn:'span 7',padding:40,minHeight:280 }}>
            <div style={{ position:'absolute',inset:0,background:'radial-gradient(ellipse 70% 70% at 15% 50%,rgba(108,95,244,.1) 100%,transparent 70%)',pointerEvents:'none' }} />
            <div style={{ width:46,height:46,borderRadius:14,background:'rgba(108,95,244,.15)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,marginBottom:18 }}>🧠</div>
            <h3 style={{ fontFamily:"'Syne',sans-serif",fontSize:23,fontWeight:700,marginBottom:12,letterSpacing:'-.025em' }}>AI Identity Engine</h3>
            <p style={{ fontSize:15,color:'rgba(255,255,255,.42)',lineHeight:1.75,maxWidth:380,marginBottom:24 }}>Full digital identity from one prompt. Branding, voice, color psychology, bio, SEO — all generated by Advanced AI in under 3 seconds.</p>
            <div style={{ display:'flex',gap:7,flexWrap:'wrap' }}>
              {['Tagline','Bio','Brand Voice','Color System','SEO Meta','AI Agents','Digital Twin'].map(t=>(
                <span key={t} style={{ padding:'4px 12px',borderRadius:9999,fontSize:12,background:'rgba(108,95,244,.12)',color:'#a29afb',border:'1px solid rgba(108,95,244,.22)' }}>{t}</span>
              ))}
            </div>
          </motion.div>

          {/* Right top */}
          <motion.div initial={{ opacity:0,y:28 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:.6,delay:.08,ease:[.16,1,.3,1] }}
            className="bcard" style={{ gridColumn:'span 5',padding:36,minHeight:280 }}>
            <div style={{ position:'absolute',inset:0,background:'radial-gradient(ellipse 80% 80% at 85% 15%,rgba(56,189,248,.08) 100%,transparent 65%)',pointerEvents:'none' }} />
            <div style={{ width:46,height:46,borderRadius:14,background:'rgba(56,189,248,.1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,marginBottom:18 }}>⚡</div>
            <h3 style={{ fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:700,marginBottom:10,letterSpacing:'-.025em' }}>Ultra-fast AI</h3>
            <p style={{ fontSize:14,color:'rgba(255,255,255,.42)',lineHeight:1.7,marginBottom:22 }}>200+ tokens/sec. Responses that feel instant. Auto-routed to the best model for every task.</p>
            <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:8 }}>
              {[['Advanced AI','~80 tok/s','Identity'],['Realtime AI','~200 tok/s','Chat'],['Creative AI','~120 tok/s','Creative'],['Balanced AI','~150 tok/s','Balanced']].map(([m,sp,u])=>(
                <div key={m} style={{ padding:'10px 12px',borderRadius:10,background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.06)' }}>
                  <div style={{ fontSize:13,fontWeight:500,color:'#38bdf8',marginBottom:2 }}>{sp}</div>
                  <div style={{ fontSize:11,color:'rgba(255,255,255,.35)' }}>{u} — {m}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bottom row */}
          {[
            { icon:'🌐', title:'Website Generator',   desc:'Agency-quality sites in 5 seconds. HTML, CSS, animations, fully responsive. Zero templates.',      c:'rgba(52,211,153,.1)',  delay:.12 },
            { icon:'🤖', title:'Multi-Agent OS',       desc:'Your own AI team — designer, marketer, strategist, developer — collaborating in real time.',       c:'rgba(244,114,182,.1)', delay:.16 },
            { icon:'💾', title:'AI Memory System',     desc:'Vector memory that learns your style and goals. Gets smarter with every single conversation.',      c:'rgba(251,191,36,.1)',  delay:.2  },
            { icon:'📊', title:'Analytics Engine',     desc:'Real-time audience insights, growth metrics, and AI-powered recommendations to grow your reach.',   c:'rgba(167,139,250,.1)', delay:.24 },
          ].map(({ icon, title, desc, c, delay }) => (
            <motion.div key={title} initial={{ opacity:0,y:28 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:.6,delay,ease:[.16,1,.3,1] }}
              className="bcard" style={{ gridColumn:'span 3',padding:28,minHeight:220 }}>
              <div style={{ width:42,height:42,borderRadius:13,background:c,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,marginBottom:14 }}>{icon}</div>
              <h3 style={{ fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:700,marginBottom:8,letterSpacing:'-.02em' }}>{title}</h3>
              <p style={{ fontSize:13,color:'rgba(255,255,255,.4)',lineHeight:1.7 }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Agent showcase ── */}
      <section style={{ padding:'80px 28px',borderTop:'1px solid rgba(255,255,255,.05)',background:'rgba(255,255,255,.01)' }}>
        <div style={{ maxWidth:1100,margin:'0 auto' }}>
          <motion.div initial={{ opacity:0,y:18 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} style={{ textAlign:'center',marginBottom:52 }}>
            <span className="pill" style={{ marginBottom:18,display:'inline-flex' }}>Your AI Team</span>
            <h2 style={{ fontFamily:"'Syne',sans-serif",fontSize:'clamp(28px,3.5vw,44px)',fontWeight:800,letterSpacing:'-.04em',marginTop:16 }}>
              <span style={{ background:'linear-gradient(160deg,#fff 35%,rgba(255,255,255,.42))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>Meet your AI agents</span>
            </h2>
            <p style={{ marginTop:14,fontSize:16,color:'rgba(255,255,255,.38)',maxWidth:400,margin:'14px auto 0' }}>Each user gets a curated team of AI specialists built for their unique identity type and goals.</p>
          </motion.div>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(195px,1fr))',gap:11 }}>
            {[{e:'🧠',n:'Nova',r:'Business strategy & growth',c:'#6c5ff4',d:0},{e:'🎨',n:'Lens',r:'Visual design & brand identity',c:'#f472b6',d:.07},{e:'⚡',n:'Forge',r:'Code, architecture & DevOps',c:'#38bdf8',d:.14},{e:'📡',n:'Pulse',r:'Marketing & content growth',c:'#34d399',d:.21},{e:'🔬',n:'Scout',r:'Market research & intelligence',c:'#fb923c',d:.28},{e:'✍️',n:'Quill',r:'Copywriting & brand storytelling',c:'#a78bfa',d:.35}].map(({e,n,r,c,d})=>(
              <motion.div key={n} initial={{ opacity:0,scale:.92 }} whileInView={{ opacity:1,scale:1 }} viewport={{ once:true }} transition={{ duration:.45,delay:d }}
                className="bcard" style={{ padding:22,textAlign:'center',cursor:'pointer' }}>
                <div style={{ fontSize:28,marginBottom:12 }}>{e}</div>
                <div style={{ fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:15,marginBottom:6,color:'#fff' }}>{n}</div>
                <div style={{ fontSize:12,color:'rgba(255,255,255,.38)',lineHeight:1.55 }}>{r}</div>
                <div style={{ width:8,height:8,borderRadius:'50%',background:c,margin:'14px auto 0' }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section style={{ padding:'100px 28px',maxWidth:1100,margin:'0 auto' }}>
        <motion.div initial={{ opacity:0,y:18 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} style={{ textAlign:'center',marginBottom:68 }}>
          <span className="pill" style={{ marginBottom:18,display:'inline-flex' }}>How it works</span>
          <h2 style={{ fontFamily:"'Syne',sans-serif",fontSize:'clamp(28px,3.5vw,44px)',fontWeight:800,letterSpacing:'-.04em',marginTop:16 }}>
            <span style={{ background:'linear-gradient(160deg,#fff 35%,rgba(255,255,255,.42))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>Live in under 60 seconds</span>
          </h2>
        </motion.div>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))' }}>
          {[{num:'01',t:'Describe yourself',d:'Type a few sentences about who you are, what you build, and what drives you.',c:'#6c5ff4'},{num:'02',t:'AI generates everything',d:'Advanced AI generates your complete digital identity, brand, agents, and website.',c:'#38bdf8'},{num:'03',t:'Go live instantly',d:"Your profile publishes at yourname.unveils.me. Share it with the world right away.",c:'#34d399'},{num:'04',t:'Agents keep working',d:'Your AI team continues learning, creating content, and growing your presence 24/7.',c:'#f472b6'}].map(({num,t,d,c},i)=>(
            <motion.div key={num} initial={{ opacity:0,y:22 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ delay:i*.08 }}
              style={{ padding:'36px 28px',borderRight:i<3?'1px solid rgba(255,255,255,.055)':'none' }}>
              <div style={{ fontFamily:"'Syne',sans-serif",fontSize:52,fontWeight:800,color:`${c}20`,lineHeight:1,marginBottom:18 }}>{num}</div>
              <h3 style={{ fontFamily:"'Syne',sans-serif",fontSize:17,fontWeight:700,marginBottom:10,letterSpacing:'-.02em' }}>{t}</h3>
              <p style={{ fontSize:14,color:'rgba(255,255,255,.38)',lineHeight:1.7 }}>{d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Pricing ── */}
      <section style={{ padding:'80px 28px',borderTop:'1px solid rgba(255,255,255,.05)' }}>
        <div style={{ maxWidth:960,margin:'0 auto' }}>
          <motion.div initial={{ opacity:0,y:18 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} style={{ textAlign:'center',marginBottom:52 }}>
            <span className="pill" style={{ marginBottom:18,display:'inline-flex' }}>Pricing</span>
            <h2 style={{ fontFamily:"'Syne',sans-serif",fontSize:'clamp(28px,3.5vw,42px)',fontWeight:800,letterSpacing:'-.04em',marginTop:16 }}>
              <span style={{ background:'linear-gradient(160deg,#fff 35%,rgba(255,255,255,.42))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>Start free, scale when ready</span>
            </h2>
          </motion.div>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:14 }}>
            {[{p:'Free',pr:'$0',tag:null,f:['1 digital identity','3 AI agents','100 AI msgs/month','Basic website','unveils.me subdomain'],cta:'Join Free Beta',href:'/auth?mode=register',h:false},{p:'Pro',pr:'Coming Soon',tag:'Most popular',f:['5 digital identities','Unlimited AI agents','5,000 msgs/month','Custom subdomain','AI memory system','Analytics dashboard','API access (1 key)'],cta:'Join Waitlist',href:'/pricing',h:true},{p:'Enterprise',pr:'Coming Soon',tag:'Best value',f:['Unlimited identities','Unlimited agents','Unlimited messages','Custom domain','Unlimited memory','API keys (unlimited)','White-label option','SLA guarantee'],cta:'Request Early Access',href:'/pricing',h:false}].map(({p,pr,tag,f,cta,href,h},i)=>(
              <motion.div key={p} initial={{ opacity:0,y:24 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ delay:i*.08 }}
                style={{ padding:32,borderRadius:22,background:h?'rgba(108,95,244,.1)':'rgba(255,255,255,.025)',border:`1px solid ${h?'rgba(108,95,244,.38)':'rgba(255,255,255,.065)'}`,position:'relative',boxShadow:h?'0 0 60px rgba(108,95,244,.12)':'none' }}>
                {tag&&<div style={{ position:'absolute',top:16,right:16,padding:'3px 10px',borderRadius:9999,fontSize:11,background:'rgba(108,95,244,.18)',color:'#a29afb',border:'1px solid rgba(108,95,244,.28)' }}>{tag}</div>}
                <div style={{ fontSize:14,color:'rgba(255,255,255,.45)',marginBottom:6 }}>{p}</div>
                <div style={{ fontFamily:"'Syne',sans-serif",fontSize:40,fontWeight:800,letterSpacing:'-.04em',marginBottom:4 }}>{pr}<span style={{ fontSize:14,fontWeight:400,color:'rgba(255,255,255,.35)' }}>/mo</span></div>
                <div style={{ height:1,background:'rgba(255,255,255,.065)',margin:'20px 0' }} />
                {f.map(x=><div key={x} style={{ fontSize:13.5,color:'rgba(255,255,255,.52)',padding:'5px 0',display:'flex',alignItems:'center',gap:9 }}><span style={{ color:'#34d399',fontSize:15 }}>✓</span>{x}</div>)}
                <Link href={href} style={{ display:'block',marginTop:22,padding:'12px',borderRadius:12,textAlign:'center',fontSize:14,fontWeight:500,textDecoration:'none',background:h?'#6c5ff4':'rgba(255,255,255,.06)',color:'#fff',transition:'opacity .2s' }}>{cta} →</Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social proof / testimonials ── */}
      <section style={{ padding:'80px 28px',maxWidth:1100,margin:'0 auto' }}>
        <motion.div initial={{ opacity:0,y:18 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} style={{ textAlign:'center',marginBottom:52 }}>
          <h2 style={{ fontFamily:"'Syne',sans-serif",fontSize:'clamp(24px,3vw,38px)',fontWeight:800,letterSpacing:'-.04em' }}>
            <span style={{ background:'linear-gradient(160deg,#fff 35%,rgba(255,255,255,.42))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>"This shouldn't even be possible yet."</span>
          </h2>
          <p style={{ marginTop:14,fontSize:15,color:'rgba(255,255,255,.35)' }}>— The reaction Unveils.me is built to provoke</p>
        </motion.div>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:12 }}>
          {[{q:"Generated my entire brand identity, website, and AI agents in under 30 seconds. I showed 6 investors and they all asked how it was built.",a:"Rohan M.",r:"Founder, Series A"},{q:"The AI agents are insane. My design agent Nova redesigned my entire portfolio while I was asleep. Woke up to 3 new client inquiries.",a:"Priya S.",r:"UX Designer"},{q:"Replaced my $4,000/month agency retainer with Unveils.me. The quality is genuinely indistinguishable. This changes everything.",a:"Vikram K.",r:"Startup CEO"}].map(({q,a,r},i)=>(
            <motion.div key={a} initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ delay:i*.1 }}
              className="bcard" style={{ padding:28 }}>
              <div style={{ fontSize:28,color:'#6c5ff4',marginBottom:14,lineHeight:1 }}>"</div>
              <p style={{ fontSize:14.5,color:'rgba(255,255,255,.55)',lineHeight:1.75,marginBottom:20 }}>{q}</p>
              <div style={{ display:'flex',alignItems:'center',gap:10 }}>
                <div style={{ width:36,height:36,borderRadius:'50%',background:`hsl(${i*850+200},50%,55%)`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,fontWeight:600,color:'#fff' }}>{a[0]}</div>
                <div>
                  <div style={{ fontSize:14,fontWeight:500,color:'#fff' }}>{a}</div>
                  <div style={{ fontSize:12,color:'rgba(255,255,255,.35)' }}>{r}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section style={{ padding:'120px 28px',textAlign:'center',position:'relative',overflow:'hidden' }}>
        <Orb style={{ width:600,height:600,background:'#6c5ff4',left:'15%',top:'-20%' }} />
        <Orb style={{ width:500,height:500,background:'#38bdf8',right:'10%',bottom:'-10%' }} />
        <div style={{ position:'absolute',inset:0,background:'radial-gradient(ellipse 80% 70% at 50% 50%,transparent 3100%,#050508 85%)',pointerEvents:'none' }} />
        <motion.div initial={{ opacity:0,y:28 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} style={{ position:'relative',zIndex:2 }}>
          <div style={{ fontFamily:"'Syne',sans-serif",fontSize:'clamp(36px,5.5vw,76px)',fontWeight:800,letterSpacing:'-.045em',lineHeight:1.08,marginBottom:24 }}>
            <span style={{ background:'linear-gradient(160deg,#fff 35%,rgba(255,255,255,.45))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>Claim your digital<br />universe today.</span>
          </div>
          <p style={{ fontSize:18,color:'rgba(255,255,255,.42)',marginBottom:46,maxWidth:400,margin:'0 auto 46px' }}>Free forever. No credit card. Go live in 30 seconds.</p>
          <div style={{ display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap' }}>
            <Link href="/auth?mode=register" className="cp" style={{ fontSize:16,padding:'17px 38px',boxShadow:'0 0 80px rgba(108,95,244,.45)' }}>✦ Join the beta</Link>
            <Link href="/pricing" className="cg" style={{ fontSize:16,padding:'17px 30px' }}>View pricing</Link>
          </div>
          <p style={{ marginTop:28,fontSize:12.5,color:'rgba(255,255,255,.2)',letterSpacing:'.02em' }}>BUILT FOR THE FUTURE OF IDENTITY</p>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop:'1px solid rgba(255,255,255,.055)',padding:'52px 28px 40px',maxWidth:1160,margin:'0 auto' }}>
        <div style={{ display:'grid',gridTemplateColumns:'1fr repeat(4,auto)',gap:'40px 60px',flexWrap:'wrap',marginBottom:40 }}>
          {/* Brand */}
          <div>
            <div style={{ display:'flex',alignItems:'center',gap:9,marginBottom:12 }}>
              <div style={{ width:26,height:26,borderRadius:7,background:'linear-gradient(135deg,#6c5ff4,#a78bfa)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13 }}>✦</div>
              <span style={{ fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:15,color:'rgba(255,255,255,.85)',letterSpacing:'-.02em' }}>unveils.me</span>
            </div>
            <p style={{ fontSize:13,color:'rgba(255,255,255,.28)',lineHeight:1.7,maxWidth:200 }}>The AI identity infrastructure of the future internet.</p>
          </div>
          {/* Product */}
          <div>
            <div style={{ fontSize:11,fontWeight:600,letterSpacing:'.08em',color:'rgba(255,255,255,.3)',textTransform:'uppercase',marginBottom:14 }}>Product</div>
            {([['Features','/features'],['Pricing','/pricing'],['Blog','/blog'],['FAQ','/faq']] as [string,string][]).map(([l,h])=>(
              <div key={l} style={{ marginBottom:10 }}><Link href={h} style={{ fontSize:13,color:'rgba(255,255,255,.38)',textDecoration:'none' }}>{l}</Link></div>
            ))}
          </div>
          {/* Company */}
          <div>
            <div style={{ fontSize:11,fontWeight:600,letterSpacing:'.08em',color:'rgba(255,255,255,.3)',textTransform:'uppercase',marginBottom:14 }}>Company</div>
            {([['About','/about'],['Careers','/careers'],['Press','/press'],['Contact','/contact']] as [string,string][]).map(([l,h])=>(
              <div key={l} style={{ marginBottom:10 }}><Link href={h} style={{ fontSize:13,color:'rgba(255,255,255,.38)',textDecoration:'none' }}>{l}</Link></div>
            ))}
          </div>
          {/* Developers */}
          <div>
            <div style={{ fontSize:11,fontWeight:600,letterSpacing:'.08em',color:'rgba(255,255,255,.3)',textTransform:'uppercase',marginBottom:14 }}>Developers</div>
            {([['Dashboard','/dashboard'],['Demo Profile','/u/demo'],['Sitemap','/sitemap-page']] as [string,string][]).map(([l,h])=>(
              <div key={l} style={{ marginBottom:10 }}><Link href={h} style={{ fontSize:13,color:'rgba(255,255,255,.38)',textDecoration:'none' }}>{l}</Link></div>
            ))}
          </div>
          {/* Legal */}
          <div>
            <div style={{ fontSize:11,fontWeight:600,letterSpacing:'.08em',color:'rgba(255,255,255,.3)',textTransform:'uppercase',marginBottom:14 }}>Legal</div>
            {([['Privacy Policy','/legal/privacy'],['Terms of Service','/legal/terms'],['Cookie Policy','/legal/cookie-policy'],['Refund Policy','/legal/refund'],['GDPR','/legal/gdpr'],['Disclaimer','/legal/disclaimer']] as [string,string][]).map(([l,h])=>(
              <div key={l} style={{ marginBottom:10 }}><Link href={h} style={{ fontSize:13,color:'rgba(255,255,255,.38)',textDecoration:'none' }}>{l}</Link></div>
            ))}
          </div>
        </div>
        <div style={{ paddingTop:20,borderTop:'1px solid rgba(255,255,255,.045)',display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:6 }}>
          <span style={{ fontSize:12,color:'rgba(255,255,255,.18)' }}>© {new Date().getFullYear()} Unveils.me · All rights reserved · Built in India 🇮🇳 by Preet Yadav</span>
          <span style={{ fontSize:12,color:'rgba(255,255,255,.18)' }}>Built with ❤️ for humanity</span>
        </div>
      </footer>
    </div>
  )
}

