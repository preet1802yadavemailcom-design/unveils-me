'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles, ArrowRight, ArrowLeft, Check, User, Globe, Bot,
  Rocket, Palette, Code2, PenLine, FlaskConical, Briefcase,
  Music, Camera, Zap, Target, Users, TrendingUp, Building,
  Heart, Star, BookOpen, Megaphone, Link2, ChevronRight
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

// ─── Types ─────────────────────────────────
const TYPES = [
  { value: 'founder',    label: 'Founder',    emoji: '🚀', desc: 'Building a startup or company',   icon: Rocket },
  { value: 'creator',    label: 'Creator',    emoji: '✨', desc: 'Content, media & community',       icon: PenLine },
  { value: 'developer',  label: 'Developer',  emoji: '💻', desc: 'Code, engineering, open-source',   icon: Code2 },
  { value: 'designer',   label: 'Designer',   emoji: '🎨', desc: 'Visual design & brand identity',   icon: Palette },
  { value: 'startup',    label: 'Startup',    emoji: '⚡', desc: 'Early-stage company building fast', icon: Zap },
  { value: 'researcher', label: 'Researcher', emoji: '🔬', desc: 'Academia, science & R&D',           icon: FlaskConical },
  { value: 'artist',     label: 'Artist',     emoji: '🎭', desc: 'Art, music & performance',          icon: Music },
  { value: 'executive',  label: 'Executive',  emoji: '💼', desc: 'C-suite & leadership roles',        icon: Briefcase },
]

const GOALS = [
  { label: 'Build my online presence',  icon: Globe },
  { label: 'Showcase my portfolio',     icon: Star },
  { label: 'Generate leads & clients',  icon: Target },
  { label: 'Network with my industry',  icon: Users },
  { label: 'Launch my startup',         icon: Rocket },
  { label: 'Grow my personal brand',    icon: TrendingUp },
  { label: 'Find collaborators',        icon: Heart },
  { label: 'Share ideas & research',    icon: BookOpen },
  { label: 'Find a job or internship',  icon: Briefcase },
  { label: 'Build thought leadership',  icon: Megaphone },
]

// ─── Floating particle ─────────────────────
function Particle({ x, y, size, color, delay }: { x: number; y: number; size: number; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.6, 0],
        scale: [0, 1, 0.8],
        y: [0, -60],
      }}
      transition={{ delay, duration: 4, repeat: Infinity, repeatDelay: Math.random() * 4 }}
      style={{ position: 'absolute', left: x, top: y, width: size, height: size, borderRadius: '50%', background: color, pointerEvents: 'none' }}
    />
  )
}

// ─── Step indicator ────────────────────────
function StepIndicator({ total, current }: { total: number; current: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      {Array.from({ length: total }).map((_, i) => (
        <motion.div key={i}
          animate={{
            width: i === current ? 32 : i < current ? 16 : 8,
            background: i <= current ? '#6c5ff4' : 'rgba(255,255,255,0.12)',
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ height: 6, borderRadius: 4 }}
        />
      ))}
      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginLeft: 4 }}>
        {current + 1}/{total}
      </span>
    </div>
  )
}

// ─── Typing animation ──────────────────────
function TypedText({ texts }: { texts: string[] }) {
  const [idx, setIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)
  const charRef = useRef(0)

  useEffect(() => {
    const current = texts[idx % texts.length]
    if (typing) {
      if (charRef.current < current.length) {
        const t = setTimeout(() => {
          setDisplayed(current.slice(0, charRef.current + 1))
          charRef.current++
        }, 60)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setTyping(false), 2000)
        return () => clearTimeout(t)
      }
    } else {
      if (charRef.current > 0) {
        const t = setTimeout(() => {
          setDisplayed(current.slice(0, charRef.current - 1))
          charRef.current--
        }, 30)
        return () => clearTimeout(t)
      } else {
        setIdx(i => i + 1)
        setTyping(true)
      }
    }
  }, [displayed, typing, idx, texts])

  return (
    <span style={{ color: '#a29afb' }}>
      {displayed}
      <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>|</motion.span>
    </span>
  )
}

// ─── Main onboarding ────────────────────────
export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep]           = useState(0)
  const [name, setName]           = useState('')
  const [subdomain, setSubdomain] = useState('')
  const [type, setType]           = useState('')
  const [goals, setGoals]         = useState<string[]>([])
  const [description, setDesc]    = useState('')
  const [loading, setLoading]     = useState(false)
  const [subdomainStatus, setSubStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle')

  const particles = [
    { x: '8%', y: '20%', size: 4, color: '#6c5ff4', delay: 0 },
    { x: '92%', y: '15%', size: 3, color: '#a78bfa', delay: 0.8 },
    { x: '5%', y: '70%', size: 5, color: '#34d399', delay: 1.6 },
    { x: '88%', y: '65%', size: 3, color: '#38bdf8', delay: 0.4 },
    { x: '50%', y: '8%', size: 4, color: '#f472b6', delay: 1.2 },
    { x: '15%', y: '88%', size: 3, color: '#6c5ff4', delay: 2 },
    { x: '78%', y: '85%', size: 4, color: '#a78bfa', delay: 0.6 },
  ]

  const typingTexts = [
    'founder building in stealth',
    'developer crafting open-source',
    'designer shaping visual futures',
    'creator building community',
    'researcher pushing boundaries',
  ]

  const STEPS = [
    { title: "What's your name?",         sub: 'How the world will know you', icon: User },
    { title: 'What best describes you?',  sub: 'We tailor everything to your identity', icon: Globe },
    { title: 'What are your goals?',      sub: 'Helps AI personalize your experience', icon: Target },
  ]

  function toggleGoal(g: string) {
    setGoals(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g])
  }

  function canProceed(): boolean {
    if (step === 0) return name.trim().length > 1 && subdomain.trim().length > 1
    if (step === 1) return !!type
    if (step === 2) return goals.length > 0 && description.trim().length > 10
    return false
  }

  async function checkSubdomain(val: string) {
    if (!val) return
    setSubStatus('checking')
    await new Promise(r => setTimeout(r, 800))
    // Simulate availability check
    setSubStatus(val.length > 3 && val !== 'admin' && val !== 'test' ? 'available' : 'taken')
  }

  async function finish() {
    setLoading(true)
    try {
      await fetch('/api/user/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, subdomain, type, goals, description }),
      })
      toast.success('Setting up your identity…')
      router.push('/dashboard?onboarded=1')
    } catch {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '13px 16px',
    borderRadius: 14,
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#fff',
    fontSize: 15,
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#08080d',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background effects */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(108,95,244,0.22) 0%, transparent 60%)',
      }} />
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      {/* Particles */}
      {particles.map((p, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 0.5, 0], scale: [0, 1, 0.8], y: [0, -50] }}
          transition={{ delay: p.delay, duration: 4, repeat: Infinity, repeatDelay: 2 + Math.random() * 3 }}
          style={{ position: 'fixed', left: p.x, top: p.y, width: p.size, height: p.size, borderRadius: '50%', background: p.color, pointerEvents: 'none' }}
        />
      ))}

      <div style={{ width: '100%', maxWidth: 520, position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 44 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <div style={{ width: 30, height: 30, borderRadius: 9, background: 'linear-gradient(135deg,#6c5ff4,#a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>✦</div>
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 15, color: '#fff', letterSpacing: '-.02em' }}>unveils.me</span>
          </div>
          <StepIndicator total={STEPS.length} current={step} />
        </motion.div>

        {/* Hero typing (step 0 only) */}
        <AnimatePresence>
          {step === 0 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{ textAlign: 'center', marginBottom: 32 }}>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>The AI identity for every</p>
              <p style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', minHeight: 28 }}>
                <TypedText texts={typingTexts} />
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step card */}
        <AnimatePresence mode="wait">
          <motion.div key={step}
            initial={{ opacity: 0, x: 40, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -40, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              borderRadius: 24,
              padding: '32px 32px 28px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.09)',
              backdropFilter: 'blur(24px)',
            }}>

            {/* Step header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
              <motion.div
                initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
                style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(108,95,244,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a29afb', border: '1px solid rgba(108,95,244,0.25)' }}>
                {(() => {
                  const Icon = STEPS[step].icon
                  return <Icon className="w-5 h-5" />
                })()}
              </motion.div>
              <div>
                <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: '#fff', marginBottom: 3 }}>
                  {STEPS[step].title}
                </h2>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)' }}>{STEPS[step].sub}</p>
              </div>
            </div>

            {/* Step 0 — Name + subdomain */}
            {step === 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.35)', marginBottom: 8, textTransform: 'uppercase' }}>YOUR NAME</label>
                  <input
                    style={inputStyle}
                    placeholder="Arjun Mehta"
                    value={name}
                    autoFocus
                    onChange={e => {
                      setName(e.target.value)
                      const sub = e.target.value.split(' ')[0].toLowerCase().replace(/[^a-z0-9]/g, '')
                      setSubdomain(sub)
                      if (sub.length > 2) checkSubdomain(sub)
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.35)', marginBottom: 8, textTransform: 'uppercase' }}>YOUR SUBDOMAIN</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      style={{ ...inputStyle, paddingRight: 110 }}
                      placeholder="yourname"
                      value={subdomain}
                      onChange={e => {
                        const val = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')
                        setSubdomain(val)
                        if (val.length > 2) checkSubdomain(val)
                        else setSubStatus('idle')
                      }}
                    />
                    <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 13, color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>
                      .unveils.me
                    </span>
                  </div>
                  <AnimatePresence>
                    {subdomain && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                        {subdomainStatus === 'checking' && (
                          <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} style={{ width: 12, height: 12, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.15)', borderTopColor: '#6c5ff4' }} /><span style={{ color: 'rgba(255,255,255,0.4)' }}>Checking…</span></>
                        )}
                        {subdomainStatus === 'available' && (
                          <><span style={{ color: '#34d399' }}>✓ {subdomain}.unveils.me is available</span></>
                        )}
                        {subdomainStatus === 'taken' && (
                          <><span style={{ color: '#f87171' }}>✗ This subdomain is taken. Try another.</span></>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* Step 1 — Profile type */}
            {step === 1 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {TYPES.map((t, i) => {
                  const Icon = t.icon
                  const active = type === t.value
                  return (
                    <motion.button key={t.value}
                      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                      onClick={() => setType(t.value)}
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 12, padding: '14px 14px',
                        borderRadius: 14, textAlign: 'left', cursor: 'pointer', border: 'none',
                        fontFamily: 'inherit', transition: 'all 0.2s',
                        background: active ? 'rgba(108,95,244,0.18)' : 'rgba(255,255,255,0.04)',
                        outline: active ? '1.5px solid rgba(108,95,244,0.5)' : '1px solid rgba(255,255,255,0.07)',
                      }}>
                      <div style={{ width: 36, height: 36, borderRadius: 11, background: active ? 'rgba(108,95,244,0.25)' : 'rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0, transition: 'all 0.2s' }}>
                        {t.emoji}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: active ? '#e0ddff' : '#d0d0e0', marginBottom: 2 }}>{t.label}</div>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', lineHeight: 1.4 }}>{t.desc}</div>
                      </div>
                      {active && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ marginLeft: 'auto', width: 18, height: 18, borderRadius: '50%', background: '#6c5ff4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Check className="w-3 h-3" style={{ color: '#fff' }} />
                        </motion.div>
                      )}
                    </motion.button>
                  )
                })}
              </div>
            )}

            {/* Step 2 — Goals + bio */}
            {step === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.35)', marginBottom: 10, textTransform: 'uppercase' }}>
                    SELECT GOALS (pick all that apply)
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                    {GOALS.map((g, i) => {
                      const Icon = g.icon
                      const active = goals.includes(g.label)
                      return (
                        <motion.button key={g.label}
                          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }}
                          onClick={() => toggleGoal(g.label)}
                          whileTap={{ scale: 0.93 }}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 6,
                            padding: '8px 14px', borderRadius: 24, fontSize: 12, fontWeight: 500,
                            cursor: 'pointer', border: 'none', fontFamily: 'inherit', transition: 'all 0.15s',
                            background: active ? 'rgba(108,95,244,0.2)' : 'rgba(255,255,255,0.05)',
                            color: active ? '#c4b9ff' : 'rgba(255,255,255,0.55)',
                            outline: active ? '1px solid rgba(108,95,244,0.45)' : '1px solid rgba(255,255,255,0.08)',
                          }}>
                          <Icon className="w-3.5 h-3.5" style={{ flexShrink: 0 }} />
                          {g.label}
                          {active && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>✓</motion.span>}
                        </motion.button>
                      )
                    })}
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.35)', marginBottom: 8, textTransform: 'uppercase' }}>
                    TELL YOUR AI MORE
                  </label>
                  <textarea
                    style={{ ...inputStyle, resize: 'none', height: 108, lineHeight: 1.65 }}
                    placeholder="What are you building? What makes you unique? What do you care about most?"
                    value={description}
                    onChange={e => setDesc(e.target.value)}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>
                    <span>More context = better identity</span>
                    <span style={{ color: description.length > 200 ? '#34d399' : 'inherit' }}>{description.length}/400</span>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 28 }}>
              {step > 0 && (
                <motion.button
                  onClick={() => setStep(s => s - 1)}
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  style={{ width: 46, height: 46, borderRadius: 14, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.6)', flexShrink: 0 }}>
                  <ArrowLeft className="w-4 h-4" />
                </motion.button>
              )}
              <motion.button
                onClick={() => step < STEPS.length - 1 ? setStep(s => s + 1) : finish()}
                disabled={!canProceed() || loading}
                whileHover={canProceed() && !loading ? { scale: 1.02 } : {}}
                whileTap={canProceed() && !loading ? { scale: 0.98 } : {}}
                style={{
                  flex: 1, padding: '14px 20px', borderRadius: 14, border: 'none', cursor: canProceed() && !loading ? 'pointer' : 'not-allowed',
                  fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700, letterSpacing: '-0.01em',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  background: canProceed() && !loading ? 'linear-gradient(135deg,#6c5ff4,#a78bfa)' : 'rgba(255,255,255,0.07)',
                  color: canProceed() && !loading ? '#fff' : 'rgba(255,255,255,0.3)',
                  transition: 'all 0.2s',
                }}>
                {loading
                  ? <>
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)', borderTopColor: '#fff' }} />
                      Setting up your universe…
                    </>
                  : step < STEPS.length - 1
                    ? <>Continue <ArrowRight className="w-4 h-4" /></>
                    : <>Launch my universe <Sparkles className="w-4 h-4" /></>
                }
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: 'rgba(255,255,255,0.22)' }}>
          By continuing you agree to our{' '}
          <a href="/legal/terms" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'underline' }}>Terms</a>
          {' '}and{' '}
          <a href="/legal/privacy" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'underline' }}>Privacy Policy</a>
        </motion.p>
      </div>
    </div>
  )
}
