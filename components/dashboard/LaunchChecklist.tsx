'use client'
// components/dashboard/LaunchChecklist.tsx
// Shown to new users until they complete key setup steps

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronDown, X, Sparkles } from 'lucide-react'
import Link from 'next/link'

interface CheckItem {
  id:       string
  title:    string
  desc:     string
  action:   string
  href?:    string
  onClick?: () => void
  points:   number
}

const CHECKLIST: CheckItem[] = [
  { id:'identity',  title:'Generate your first identity',       desc:'Describe yourself and let AI create your complete digital presence.',         action:'Generate now →', href:'/dashboard?tab=identity', points:30 },
  { id:'profile',   title:'Complete your profile',              desc:'Add your avatar, bio, and social links to your settings.',                    action:'Go to settings →', href:'/settings',             points:15 },
  { id:'website',   title:'Generate your website',              desc:'Turn your identity into a full AI-generated website in one click.',            action:'Build website →', href:'/dashboard?tab=website', points:20 },
  { id:'agents',    title:'Chat with your AI agents',           desc:'Have your first conversation with Nova, Lens, or Forge.',                     action:'Meet agents →', href:'/dashboard?tab=agents',    points:10 },
  { id:'verify',    title:'Verify your email',                  desc:'Check your inbox for a confirmation email from Unveils.me.',                  action:'Resend email →',                                   points:10 },
  { id:'share',     title:'Share your profile',                 desc:'Post your yourname.unveils.me link on LinkedIn, Twitter, or anywhere.',       action:'Copy link →',                                      points:15 },
]

export default function LaunchChecklist({ onDismiss }: { onDismiss: () => void }) {
  const [completed, setCompleted] = useState<Set<string>>(new Set())
  const [expanded, setExpanded] = useState(true)

  const totalPoints = CHECKLIST.reduce((a, i) => a + i.points, 0)
  const earnedPoints = CHECKLIST.filter(i => completed.has(i.id)).reduce((a, i) => a + i.points, 0)
  const pct = Math.round((earnedPoints / totalPoints) * 100)
  const done = completed.size === CHECKLIST.length

  function toggle(id: string) {
    setCompleted(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  if (done) {
    return (
      <motion.div initial={{ opacity:0, scale:.95 }} animate={{ opacity:1, scale:1 }}
        style={{ padding:'24px', borderRadius:20, background:'rgba(52,211,153,.08)', border:'1px solid rgba(52,211,153,.25)', textAlign:'center', marginBottom:20 }}>
        <div style={{ fontSize:28, marginBottom:10 }}>🎉</div>
        <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:700, color:'#fff', marginBottom:6 }}>Setup complete! 100 points earned</h3>
        <p style={{ fontSize:13, color:'rgba(255,255,255,.45)', marginBottom:16 }}>Your identity is fully set up and live on Unveils.me.</p>
        <button onClick={onDismiss} style={{ padding:'8px 18px', borderRadius:9999, background:'#34d399', color:'#000', fontSize:13, fontWeight:600, border:'none', cursor:'pointer', fontFamily:'inherit' }}>Dismiss →</button>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
      style={{ borderRadius:20, background:'rgba(255,255,255,.025)', border:'1px solid rgba(255,255,255,.065)', marginBottom:20, overflow:'hidden' }}>

      {/* Header */}
      <button onClick={() => setExpanded(!expanded)}
        style={{ width:'100%', padding:'18px 20px', display:'flex', alignItems:'center', gap:12, background:'none', border:'none', cursor:'pointer', fontFamily:'inherit', textAlign:'left' }}>
        <Sparkles className="w-4 h-4" style={{ color:'#6c5ff4', flexShrink:0 }} />
        <div style={{ flex:1 }}>
          <div style={{ fontSize:14, fontWeight:500, color:'#fff', marginBottom:2 }}>Complete your setup · {pct}% done</div>
          <div style={{ height:4, borderRadius:2, background:'rgba(255,255,255,.08)', overflow:'hidden', width:'100%' }}>
            <motion.div initial={{ width:0 }} animate={{ width:`${pct}%` }} transition={{ duration:.6 }}
              style={{ height:'100%', borderRadius:2, background:'#6c5ff4' }} />
          </div>
        </div>
        <span style={{ fontSize:12, color:'rgba(255,255,255,.4)', flexShrink:0 }}>{earnedPoints}/{totalPoints} pts</span>
        <ChevronDown className="w-4 h-4 flex-shrink-0" style={{ color:'rgba(255,255,255,.3)', transition:'transform .2s', transform:expanded ? 'rotate(180deg)' : '' }} />
        <button onClick={(e) => { e.stopPropagation(); onDismiss() }}
          style={{ background:'none', border:'none', cursor:'pointer', padding:4, color:'rgba(255,255,255,.3)' }}>
          <X className="w-3.5 h-3.5" />
        </button>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height:0 }} animate={{ height:'auto' }} exit={{ height:0 }} style={{ overflow:'hidden' }}>
            <div style={{ borderTop:'1px solid rgba(255,255,255,.055)' }}>
              {CHECKLIST.map(({ id, title, desc, action, href, points }, i) => {
                const isDone = completed.has(id)
                return (
                  <div key={id} style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 20px', borderBottom: i < CHECKLIST.length-1 ? '1px solid rgba(255,255,255,.04)' : 'none' }}>
                    <button onClick={() => toggle(id)}
                      style={{ width:22, height:22, borderRadius:'50%', background: isDone ? '#6c5ff4' : 'transparent', border:`1.5px solid ${isDone ? '#6c5ff4' : 'rgba(255,255,255,.2)'}`, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', flexShrink:0, transition:'all .15s' }}>
                      {isDone && <Check className="w-3 h-3 text-white" />}
                    </button>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:13, fontWeight:500, color: isDone ? 'rgba(255,255,255,.4)' : '#fff', textDecoration: isDone ? 'line-through' : 'none', marginBottom:2 }}>{title}</div>
                      {!isDone && <div style={{ fontSize:12, color:'rgba(255,255,255,.35)', lineHeight:1.5 }}>{desc}</div>}
                    </div>
                    <span style={{ fontSize:11, color:'rgba(255,255,255,.3)', flexShrink:0 }}>+{points}pts</span>
                    {!isDone && href && (
                      <Link href={href} style={{ fontSize:12, color:'#a29afb', flexShrink:0, whiteSpace:'nowrap' }}>{action}</Link>
                    )}
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

