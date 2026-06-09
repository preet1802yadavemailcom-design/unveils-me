'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import {
  Sparkles, User, Globe, Bot, Brain, BarChart3,
  Bell, Search, Settings, LogOut, ChevronRight,
  ArrowUpRight, Zap, TrendingUp, Eye, MessageSquare,
  Plus, ExternalLink, Menu, X, Check, Camera, Upload,
  Linkedin, Twitter, Github, Instagram, Link2, Briefcase,
  MapPin, Mail, Phone, Star, Award, Code, Palette,
  Music, BookOpen, Coffee, Heart, Layers, Shield,
  RefreshCw, Copy, Download, Share2, Edit3, Trash2,
  ChevronDown, ToggleLeft, ToggleRight, Sun, Moon,
  Wand2, Cpu, Target, Users, Activity
} from 'lucide-react'
import Link from 'next/link'

// ─── Types ────────────────────────────────────
type Tab = 'overview' | 'profile' | 'identity' | 'agents' | 'website' | 'analytics'

interface UserProfile {
  name: string
  headline: string
  bio: string
  location: string
  email: string
  phone: string
  website: string
  subdomain: string
  avatar: string
  coverColor: string
  type: string
  skills: string[]
  socials: { linkedin: string; twitter: string; github: string; instagram: string }
  achievements: { title: string; org: string; year: string }[]
  projects: { name: string; desc: string; url: string; tech: string[] }[]
  experiences: { role: string; company: string; period: string; desc: string }[]
  theme: 'dark' | 'light'
  accentColor: string
  font: string
}

// ─── Initial profile state ─────────────────────
const defaultProfile: UserProfile = {
  name: '',
  headline: '',
  bio: '',
  location: '',
  email: '',
  phone: '',
  website: '',
  subdomain: '',
  avatar: '',
  coverColor: '#6c5ff4',
  type: '',
  skills: [],
  socials: { linkedin: '', twitter: '', github: '', instagram: '' },
  achievements: [],
  projects: [],
  experiences: [],
  theme: 'dark',
  accentColor: '#6c5ff4',
  font: 'Syne',
}

const NAV: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'overview',  label: 'Overview',   icon: <Sparkles  className="w-[15px] h-[15px]" /> },
  { id: 'profile',   label: 'Profile',    icon: <User      className="w-[15px] h-[15px]" /> },
  { id: 'identity',  label: 'Identity',   icon: <Wand2     className="w-[15px] h-[15px]" /> },
  { id: 'agents',    label: 'Agents',     icon: <Bot       className="w-[15px] h-[15px]" /> },
  { id: 'website',   label: 'Website',    icon: <Globe     className="w-[15px] h-[15px]" /> },
  { id: 'analytics', label: 'Analytics',  icon: <BarChart3 className="w-[15px] h-[15px]" /> },
]

const SKILL_OPTIONS = [
  'React', 'TypeScript', 'Node.js', 'Python', 'UI/UX Design', 'Figma',
  'Next.js', 'GraphQL', 'AWS', 'Docker', 'Machine Learning', 'Product Management',
  'Marketing', 'Sales', 'Writing', 'Photography', 'Video Editing', 'Music',
  'Brand Strategy', 'SEO', 'Data Analysis', 'Blockchain', 'Mobile Dev', 'Leadership'
]

const ACCENT_COLORS = [
  { value: '#6c5ff4', label: 'Violet' },
  { value: '#34d399', label: 'Emerald' },
  { value: '#f472b6', label: 'Pink' },
  { value: '#38bdf8', label: 'Sky' },
  { value: '#fb923c', label: 'Orange' },
  { value: '#facc15', label: 'Yellow' },
  { value: '#a78bfa', label: 'Purple' },
  { value: '#2dd4bf', label: 'Teal' },
]

const FONTS = ['Syne', 'Inter', 'Outfit', 'DM Sans', 'Space Grotesk', 'Playfair Display']

const PROFILE_TYPES = [
  { value: 'founder',    label: 'Founder',    emoji: '🚀' },
  { value: 'creator',    label: 'Creator',    emoji: '✨' },
  { value: 'developer',  label: 'Developer',  emoji: '💻' },
  { value: 'designer',   label: 'Designer',   emoji: '🎨' },
  { value: 'researcher', label: 'Researcher', emoji: '🔬' },
  { value: 'executive',  label: 'Executive',  emoji: '💼' },
]

// ─── Animated counter ─────────────────────────
function AnimatedNumber({ value, duration = 1.5 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    let start = 0
    const step = value / (duration * 60)
    const timer = setInterval(() => {
      start += step
      if (start >= value) { setDisplay(value); clearInterval(timer) }
      else setDisplay(Math.floor(start))
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [value, duration])
  return <>{display.toLocaleString()}</>
}

// ─── Mini bar chart ───────────────────────────
function MiniChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data)
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 44 }}>
      {data.map((v, i) => (
        <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${(v / max) * 100}%` }}
          transition={{ delay: i * 0.03, duration: 0.6, ease: [0.16,1,0.3,1] }}
          style={{ flex: 1, borderRadius: 3, background: i === data.length - 1 ? color : `${color}45`, minWidth: 4 }} />
      ))}
    </div>
  )
}

// ─── Stat card ────────────────────────────────
function StatCard({ label, value, change, trend, icon, color }: {
  label: string; value: number; change: string; trend: 'up' | 'down'; icon: string; color: string
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="glass-card p-5" style={{ cursor: 'default' }}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: `${color}18` }}>
          <span style={{ color }}>{icon}</span>
        </div>
        <span className="text-xs font-medium px-2 py-0.5 rounded-full"
          style={{ background: trend === 'up' ? 'rgba(52,211,153,0.12)' : 'rgba(248,113,113,0.12)', color: trend === 'up' ? '#34d399' : '#f87171' }}>
          {trend === 'up' ? '↑' : '↓'} {change}
        </span>
      </div>
      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 30, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--t1)', marginBottom: 4 }}>
        <AnimatedNumber value={value} />
      </div>
      <div style={{ fontSize: 13, color: 'var(--t3)' }}>{label}</div>
    </motion.div>
  )
}

// ─── Profile Builder Tab ──────────────────────
function ProfileBuilderTab({ profile, setProfile, accent }: {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  accent: string;
}) {
  const [section, setSection] = useState<'basic' | 'social' | 'skills' | 'experience' | 'projects' | 'appearance'>('basic')
  const [newSkill, setNewSkill] = useState('')
  const [saved, setSaved] = useState(false)

  function update(key: keyof UserProfile, val: any) {
    setProfile(prev => ({ ...prev, [key]: val }))
  }

  function updateSocial(key: keyof UserProfile['socials'], val: string) {
    setProfile(prev => ({ ...prev, socials: { ...prev.socials, [key]: val } }))
  }

  function toggleSkill(skill: string) {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }))
  }

  function addExp() {
    setProfile(prev => ({
      ...prev,
      experiences: [...prev.experiences, { role: '', company: '', period: '', desc: '' }]
    }))
  }

  function updateExp(i: number, key: string, val: string) {
    setProfile(prev => {
      const exps = [...prev.experiences]
      exps[i] = { ...exps[i], [key]: val }
      return { ...prev, experiences: exps }
    })
  }

  function removeExp(i: number) {
    setProfile(prev => ({ ...prev, experiences: prev.experiences.filter((_, idx) => idx !== i) }))
  }

  function addProject() {
    setProfile(prev => ({
      ...prev,
      projects: [...prev.projects, { name: '', desc: '', url: '', tech: [] }]
    }))
  }

  function updateProject(i: number, key: string, val: string | string[]) {
    setProfile(prev => {
      const projs = [...prev.projects]
      projs[i] = { ...projs[i], [key]: val }
      return { ...prev, projects: projs }
    })
  }

  function removeProject(i: number) {
    setProfile(prev => ({ ...prev, projects: prev.projects.filter((_, idx) => idx !== i) }))
  }

  async function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const sections = [
    { id: 'basic', label: 'Basic Info', icon: <User className="w-3.5 h-3.5" /> },
    { id: 'social', label: 'Social Links', icon: <Link2 className="w-3.5 h-3.5" /> },
    { id: 'skills', label: 'Skills', icon: <Code className="w-3.5 h-3.5" /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase className="w-3.5 h-3.5" /> },
    { id: 'projects', label: 'Projects', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette className="w-3.5 h-3.5" /> },
  ]

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: 12,
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: 'var(--t1)',
    fontSize: 14,
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  const labelStyle = {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.06em',
    color: 'var(--t4)',
    textTransform: 'uppercase' as const,
    marginBottom: 6,
    display: 'block',
  }

  return (
    <div style={{ maxWidth: 820 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--t1)', marginBottom: 6 }}>Profile Builder</h1>
        <p style={{ fontSize: 14, color: 'var(--t3)' }}>Build your complete professional identity. This powers your AI agents, website, and public profile.</p>
      </div>

      <div style={{ display: 'flex', gap: 20 }}>
        {/* Section nav */}
        <div style={{ width: 170, flexShrink: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {sections.map(s => (
              <motion.button key={s.id} onClick={() => setSection(s.id as any)}
                whileHover={{ x: 2 }} transition={{ duration: 0.15 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 9, padding: '9px 12px',
                  borderRadius: 10, border: 'none', cursor: 'pointer', textAlign: 'left',
                  fontFamily: 'inherit', fontSize: 13, fontWeight: 500,
                  background: section === s.id ? `${accent}18` : 'transparent',
                  color: section === s.id ? accent : 'var(--t3)',
                  outline: section === s.id ? `1px solid ${accent}30` : 'none',
                  transition: 'all 0.15s',
                }}>
                {s.icon}
                {s.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Section content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <AnimatePresence mode="wait">
            <motion.div key={section} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.22 }} className="glass-card p-6">

              {/* Basic Info */}
              {section === 'basic' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  {/* Avatar upload */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 6 }}>
                    <div style={{ position: 'relative' }}>
                      <div style={{ width: 72, height: 72, borderRadius: 20, background: profile.avatar ? 'transparent' : `${accent}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${accent}40`, overflow: 'hidden' }}>
                        {profile.avatar
                          ? <img src={profile.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          : <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 26, fontWeight: 700, color: accent }}>{profile.name ? profile.name[0].toUpperCase() : '?'}</span>
                        }
                      </div>
                      <button style={{ position: 'absolute', bottom: -4, right: -4, width: 22, height: 22, borderRadius: '50%', background: accent, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Camera className="w-3 h-3" style={{ color: '#fff' }} />
                      </button>
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--t1)', marginBottom: 4 }}>Profile Photo</div>
                      <div style={{ fontSize: 12, color: 'var(--t4)', marginBottom: 8 }}>JPG, PNG up to 5MB</div>
                      <input
                        placeholder="Or paste image URL…"
                        value={profile.avatar}
                        onChange={e => update('avatar', e.target.value)}
                        style={{ ...inputStyle, width: 220, padding: '7px 12px', fontSize: 12 }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <div>
                      <label style={labelStyle}>Full Name</label>
                      <input style={inputStyle} placeholder="Arjun Mehta" value={profile.name} onChange={e => update('name', e.target.value)} />
                    </div>
                    <div>
                      <label style={labelStyle}>Subdomain</label>
                      <div style={{ position: 'relative' }}>
                        <input style={{ ...inputStyle, paddingRight: 96 }} placeholder="yourname" value={profile.subdomain}
                          onChange={e => update('subdomain', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))} />
                        <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 12, color: 'var(--t4)' }}>.unveils.me</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Headline</label>
                    <input style={inputStyle} placeholder="Building the future of developer tools" value={profile.headline} onChange={e => update('headline', e.target.value)} />
                  </div>

                  <div>
                    <label style={labelStyle}>Bio</label>
                    <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 96, lineHeight: 1.6 }} rows={3}
                      placeholder="I'm a builder passionate about creating products that matter. Previously at Google, now building in stealth…"
                      value={profile.bio} onChange={e => update('bio', e.target.value)} />
                    <div style={{ fontSize: 11, color: 'var(--t4)', marginTop: 5, textAlign: 'right' }}>{profile.bio.length}/300</div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <div>
                      <label style={labelStyle}>Location</label>
                      <input style={inputStyle} placeholder="Mumbai, India" value={profile.location} onChange={e => update('location', e.target.value)} />
                    </div>
                    <div>
                      <label style={labelStyle}>Profile Type</label>
                      <select style={{ ...inputStyle, cursor: 'pointer' }} value={profile.type} onChange={e => update('type', e.target.value)}>
                        <option value="">Select type…</option>
                        {PROFILE_TYPES.map(t => <option key={t.value} value={t.value}>{t.emoji} {t.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Email</label>
                      <input style={inputStyle} type="email" placeholder="you@example.com" value={profile.email} onChange={e => update('email', e.target.value)} />
                    </div>
                    <div>
                      <label style={labelStyle}>Phone (optional)</label>
                      <input style={inputStyle} placeholder="+91 98765 43210" value={profile.phone} onChange={e => update('phone', e.target.value)} />
                    </div>
                  </div>
                </div>
              )}

              {/* Social Links */}
              {section === 'social' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <p style={{ fontSize: 13, color: 'var(--t3)', marginBottom: 4 }}>Link your social profiles to display on your public page.</p>
                  {[
                    { key: 'linkedin', icon: <Linkedin className="w-4 h-4" />, label: 'LinkedIn', placeholder: 'linkedin.com/in/yourname', color: '#0077B5' },
                    { key: 'twitter', icon: <Twitter className="w-4 h-4" />, label: 'X / Twitter', placeholder: 'twitter.com/yourhandle', color: '#1DA1F2' },
                    { key: 'github', icon: <Github className="w-4 h-4" />, label: 'GitHub', placeholder: 'github.com/yourusername', color: '#e0e0e0' },
                    { key: 'instagram', icon: <Instagram className="w-4 h-4" />, label: 'Instagram', placeholder: 'instagram.com/yourhandle', color: '#E1306C' },
                  ].map(({ key, icon, label, placeholder, color }) => (
                    <div key={key}>
                      <label style={labelStyle}>{label}</label>
                      <div style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color }}>{icon}</div>
                        <input style={{ ...inputStyle, paddingLeft: 40 }} placeholder={placeholder}
                          value={profile.socials[key as keyof UserProfile['socials']]}
                          onChange={e => updateSocial(key as any, e.target.value)} />
                      </div>
                    </div>
                  ))}
                  <div>
                    <label style={labelStyle}>Personal Website</label>
                    <div style={{ position: 'relative' }}>
                      <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--t4)' }}><Globe className="w-4 h-4" /></div>
                      <input style={{ ...inputStyle, paddingLeft: 40 }} placeholder="https://yourwebsite.com"
                        value={profile.website} onChange={e => update('website', e.target.value)} />
                    </div>
                  </div>
                </div>
              )}

              {/* Skills */}
              {section === 'skills' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <p style={{ fontSize: 13, color: 'var(--t3)' }}>Select your skills. These power your AI identity and public profile.</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {SKILL_OPTIONS.map(skill => {
                      const active = profile.skills.includes(skill)
                      return (
                        <motion.button key={skill} onClick={() => toggleSkill(skill)}
                          whileTap={{ scale: 0.95 }}
                          style={{
                            padding: '7px 14px', borderRadius: 24, fontSize: 13, fontWeight: 500,
                            cursor: 'pointer', border: 'none', fontFamily: 'inherit', transition: 'all 0.15s',
                            background: active ? `${accent}22` : 'rgba(255,255,255,0.05)',
                            color: active ? accent : 'var(--t3)',
                            outline: active ? `1px solid ${accent}50` : '1px solid rgba(255,255,255,0.07)',
                          }}>
                          {active && '✓ '}{skill}
                        </motion.button>
                      )
                    })}
                  </div>
                  <div>
                    <label style={labelStyle}>Add Custom Skill</label>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <input style={{ ...inputStyle, flex: 1 }} placeholder="e.g. 3D Animation" value={newSkill}
                        onChange={e => setNewSkill(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter' && newSkill.trim()) { toggleSkill(newSkill.trim()); setNewSkill('') }}} />
                      <button onClick={() => { if (newSkill.trim()) { toggleSkill(newSkill.trim()); setNewSkill('') }}}
                        style={{ padding: '10px 18px', borderRadius: 12, background: accent, border: 'none', cursor: 'pointer', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 500 }}>
                        Add
                      </button>
                    </div>
                  </div>
                  {profile.skills.length > 0 && (
                    <div>
                      <label style={labelStyle}>Selected ({profile.skills.length})</label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {profile.skills.map(s => (
                          <span key={s} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 12px 5px 10px', borderRadius: 20, background: `${accent}18`, color: accent, fontSize: 12, fontWeight: 500, border: `1px solid ${accent}30` }}>
                            {s}
                            <button onClick={() => toggleSkill(s)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: accent, padding: 0, display: 'flex' }}>
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Experience */}
              {section === 'experience' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <p style={{ fontSize: 13, color: 'var(--t3)' }}>Your work history and career journey.</p>
                    <button onClick={addExp} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 10, background: `${accent}18`, border: `1px solid ${accent}30`, color: accent, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
                      <Plus className="w-3.5 h-3.5" /> Add
                    </button>
                  </div>
                  {profile.experiences.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--t4)', fontSize: 13 }}>
                      <Briefcase className="w-8 h-8" style={{ margin: '0 auto 10px', opacity: 0.3 }} />
                      No experience added yet. Click "Add" to start.
                    </div>
                  )}
                  <AnimatePresence>
                    {profile.experiences.map((exp, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }}
                        style={{ padding: 16, borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--t4)', letterSpacing: '0.05em' }}>EXPERIENCE {i + 1}</span>
                          <button onClick={() => removeExp(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f87171', padding: 4 }}>
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
                          <input style={inputStyle} placeholder="Role / Title" value={exp.role} onChange={e => updateExp(i, 'role', e.target.value)} />
                          <input style={inputStyle} placeholder="Company" value={exp.company} onChange={e => updateExp(i, 'company', e.target.value)} />
                          <input style={inputStyle} placeholder="2022 – Present" value={exp.period} onChange={e => updateExp(i, 'period', e.target.value)} />
                        </div>
                        <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 64 }} placeholder="What did you do? What impact did you make?"
                          value={exp.desc} onChange={e => updateExp(i, 'desc', e.target.value)} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}

              {/* Projects */}
              {section === 'projects' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <p style={{ fontSize: 13, color: 'var(--t3)' }}>Showcase your best work and side projects.</p>
                    <button onClick={addProject} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 10, background: `${accent}18`, border: `1px solid ${accent}30`, color: accent, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
                      <Plus className="w-3.5 h-3.5" /> Add
                    </button>
                  </div>
                  {profile.projects.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--t4)', fontSize: 13 }}>
                      <Layers className="w-8 h-8" style={{ margin: '0 auto 10px', opacity: 0.3 }} />
                      No projects added yet. Click "Add" to showcase your work.
                    </div>
                  )}
                  <AnimatePresence>
                    {profile.projects.map((proj, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }}
                        style={{ padding: 16, borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--t4)', letterSpacing: '0.05em' }}>PROJECT {i + 1}</span>
                          <button onClick={() => removeProject(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f87171', padding: 4 }}>
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
                          <input style={inputStyle} placeholder="Project Name" value={proj.name} onChange={e => updateProject(i, 'name', e.target.value)} />
                          <input style={inputStyle} placeholder="https://project.url" value={proj.url} onChange={e => updateProject(i, 'url', e.target.value)} />
                        </div>
                        <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 64, marginBottom: 10 }} placeholder="What does this project do? Why does it matter?"
                          value={proj.desc} onChange={e => updateProject(i, 'desc', e.target.value)} />
                        <input style={inputStyle} placeholder="Tech stack (comma-separated): React, Node.js, Postgres"
                          value={proj.tech.join(', ')}
                          onChange={e => updateProject(i, 'tech', e.target.value.split(',').map(t => t.trim()).filter(Boolean))} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}

              {/* Appearance */}
              {section === 'appearance' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div>
                    <label style={labelStyle}>Accent Color</label>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      {ACCENT_COLORS.map(c => (
                        <motion.button key={c.value} onClick={() => update('accentColor', c.value)}
                          whileTap={{ scale: 0.9 }}
                          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer' }}>
                          <div style={{ width: 36, height: 36, borderRadius: 12, background: c.value, border: profile.accentColor === c.value ? '3px solid #fff' : '3px solid transparent', boxSizing: 'border-box', transition: 'all 0.15s' }} />
                          <span style={{ fontSize: 10, color: 'var(--t4)' }}>{c.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Font Style</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                      {FONTS.map(f => (
                        <button key={f} onClick={() => update('font', f)}
                          style={{ padding: '12px 8px', borderRadius: 12, background: profile.font === f ? `${accent}18` : 'rgba(255,255,255,0.03)', border: `1px solid ${profile.font === f ? `${accent}40` : 'rgba(255,255,255,0.07)'}`, cursor: 'pointer', fontFamily: `'${f}',sans-serif`, fontSize: 14, color: profile.font === f ? accent : 'var(--t3)', transition: 'all 0.15s' }}>
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Page Theme</label>
                    <div style={{ display: 'flex', gap: 10 }}>
                      {(['dark', 'light'] as const).map(t => (
                        <button key={t} onClick={() => update('theme', t)}
                          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 12, background: profile.theme === t ? `${accent}18` : 'rgba(255,255,255,0.03)', border: `1px solid ${profile.theme === t ? `${accent}40` : 'rgba(255,255,255,0.07)'}`, cursor: 'pointer', color: profile.theme === t ? accent : 'var(--t3)', fontFamily: 'inherit', fontSize: 13, fontWeight: 500, transition: 'all 0.15s' }}>
                          {t === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                          {t === 'dark' ? 'Dark' : 'Light'}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Cover Color</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 48, height: 32, borderRadius: 8, background: profile.coverColor, border: '1px solid rgba(255,255,255,0.1)' }} />
                      <input type="color" value={profile.coverColor} onChange={e => update('coverColor', e.target.value)}
                        style={{ width: 40, height: 32, borderRadius: 8, border: 'none', cursor: 'pointer', background: 'transparent' }} />
                      <span style={{ fontSize: 12, color: 'var(--t4)', fontFamily: 'monospace' }}>{profile.coverColor}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Save button */}
              <motion.button onClick={handleSave}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', marginTop: 24, padding: '13px', borderRadius: 14, border: 'none', cursor: 'pointer', fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em', transition: 'all 0.2s', background: saved ? '#34d399' : accent, color: '#fff' }}>
                {saved ? <><Check className="w-4 h-4" /> Saved!</> : <><Sparkles className="w-4 h-4" /> Save Changes</>}
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Live preview strip */}
      <AnimatePresence>
        {(profile.name || profile.headline) && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ marginTop: 20, padding: '20px 24px', borderRadius: 18, background: `linear-gradient(135deg, ${accent}14, ${accent}06)`, border: `1px solid ${accent}25` }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.07em', color: 'var(--t4)', marginBottom: 12 }}>LIVE PREVIEW</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: profile.avatar ? 'transparent' : `${accent}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${accent}40`, overflow: 'hidden', flexShrink: 0 }}>
                {profile.avatar
                  ? <img src={profile.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, color: accent }}>{profile.name?.[0]?.toUpperCase() || '?'}</span>
                }
              </div>
              <div>
                <div style={{ fontFamily: `'${profile.font}',sans-serif`, fontSize: 16, fontWeight: 700, color: 'var(--t1)', letterSpacing: '-0.02em' }}>{profile.name || 'Your Name'}</div>
                <div style={{ fontSize: 13, color: 'var(--t3)', marginTop: 2 }}>{profile.headline || 'Your headline will appear here'}</div>
                {profile.subdomain && <div style={{ fontSize: 11, color: accent, marginTop: 3 }}>{profile.subdomain}.unveils.me</div>}
              </div>
              {profile.skills.length > 0 && (
                <div style={{ display: 'flex', gap: 5, marginLeft: 'auto', flexWrap: 'wrap', maxWidth: 200 }}>
                  {profile.skills.slice(0, 3).map(s => (
                    <span key={s} style={{ padding: '3px 8px', borderRadius: 12, background: `${accent}18`, color: accent, fontSize: 11, fontWeight: 500 }}>{s}</span>
                  ))}
                  {profile.skills.length > 3 && <span style={{ padding: '3px 8px', borderRadius: 12, background: 'rgba(255,255,255,0.07)', color: 'var(--t4)', fontSize: 11 }}>+{profile.skills.length - 3}</span>}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Overview Tab ─────────────────────────────
function OverviewTab({ onNav, profile, accent }: { onNav: (t: Tab) => void; profile: UserProfile; accent: string }) {
  const stats = [
    { label: 'Profile views',   value: 2847, change: '18%', trend: 'up' as const,   icon: '👁',  color: accent },
    { label: 'Agent messages',  value: 142,  change: '32%', trend: 'up' as const,   icon: '💬', color: '#34d399' },
    { label: 'Website visits',  value: 1203, change: '24%', trend: 'up' as const,   icon: '🌐', color: '#38bdf8' },
    { label: 'Tokens used',     value: 84000, change: '12%', trend: 'up' as const,  icon: '⚡', color: '#f472b6' },
  ]
  const chartData = [22, 38, 31, 52, 44, 67, 58, 74, 82, 71, 90, 88, 96, 84]

  return (
    <div style={{ maxWidth: 820 }}>
      <div style={{ marginBottom: 28 }}>
        <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontFamily: "'Syne',sans-serif", fontSize: 26, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--t1)', marginBottom: 4 }}>
          {profile.name ? `Welcome back, ${profile.name.split(' ')[0]} ✨` : 'Welcome ✨'}
        </motion.h1>
        <p style={{ fontSize: 14, color: 'var(--t3)' }}>
          {profile.subdomain
            ? <>Your identity is live at <a href="#" style={{ color: accent, textDecoration: 'none' }}>{profile.subdomain}.unveils.me</a> · 2,847 views this month</>
            : 'Set up your profile to get started.'
          }
        </p>
      </div>

      {!profile.name && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: 20, padding: '18px 20px', borderRadius: 16, background: `${accent}10`, border: `1px solid ${accent}25`, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: `${accent}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>👋</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--t1)', marginBottom: 2 }}>Complete your profile to go live</div>
            <div style={{ fontSize: 13, color: 'var(--t3)' }}>Add your name, headline, and skills to build your AI-powered identity.</div>
          </div>
          <button onClick={() => onNav('profile')} style={{ padding: '9px 18px', borderRadius: 12, background: accent, border: 'none', cursor: 'pointer', color: '#fff', fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 600, flexShrink: 0 }}>
            Build Profile →
          </button>
        </motion.div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 20 }}>
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <StatCard {...s} />
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        <div className="glass-card p-5">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--t1)' }}>Profile views</div>
            <span style={{ padding: '3px 8px', borderRadius: 20, background: 'rgba(52,211,153,0.12)', color: '#34d399', fontSize: 11, fontWeight: 500 }}>+18% this week</span>
          </div>
          <MiniChart data={chartData} color={accent} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: 'var(--t4)' }}>
            <span>2 weeks ago</span><span>Today</span>
          </div>
        </div>

        <div className="glass-card p-5">
          <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--t1)', marginBottom: 14 }}>Quick actions</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {[
              { icon: '👤', label: 'Build my profile', tab: 'profile' as Tab, color: accent },
              { icon: '✦', label: 'Generate identity', tab: 'identity' as Tab, color: '#a78bfa' },
              { icon: '💬', label: 'Chat with agents', tab: 'agents' as Tab, color: '#34d399' },
              { icon: '🌐', label: 'Build website', tab: 'website' as Tab, color: '#38bdf8' },
            ].map(({ icon, label, tab, color }) => (
              <motion.button key={label} onClick={() => onNav(tab)} whileHover={{ x: 3 }} transition={{ duration: 0.15 }}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s', color: 'var(--t2)', fontSize: 13, fontFamily: 'inherit' }}>
                <span style={{ fontSize: 15 }}>{icon}</span>
                {label}
                <ChevronRight className="w-3.5 h-3.5 ml-auto" style={{ color: 'var(--t4)' }} />
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
        style={{ padding: '18px 20px', borderRadius: 16, background: `${accent}0a`, border: `1px solid ${accent}22`, display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: `${accent}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 16 }}>🧠</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--t1)', marginBottom: 4 }}>AI Insight from Nova</div>
          <p style={{ fontSize: 13, color: 'var(--t3)', lineHeight: 1.6 }}>
            Your profile gets 3× more views on Tuesday–Thursday. Publishing content between 9–11am IST would maximise reach. Want me to draft a LinkedIn post now?
          </p>
        </div>
        <button style={{ flexShrink: 0, padding: '8px 16px', borderRadius: 10, background: accent, border: 'none', cursor: 'pointer', color: '#fff', fontFamily: 'inherit', fontSize: 12, fontWeight: 600 }}>
          Draft it →
        </button>
      </motion.div>
    </div>
  )
}

// ─── Website Tab ──────────────────────────────
function WebsiteTab({ profile, accent }: { profile: UserProfile; accent: string }) {
  const [theme, setTheme] = useState('MIDNIGHT')
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [progress, setProgress] = useState(0)

  async function generate() {
    setGenerating(true); setProgress(0); setGenerated(false)
    for (let i = 0; i <= 100; i += 2) {
      await new Promise(r => setTimeout(r, 50))
      setProgress(i)
    }
    setGenerating(false); setGenerated(true)
  }

  const themes = [
    { key: 'MIDNIGHT', label: 'Midnight', emoji: '🌑', desc: 'Dark, sleek, modern' },
    { key: 'MINIMAL',  label: 'Minimal',  emoji: '⬜', desc: 'Clean & professional' },
    { key: 'BOLD',     label: 'Bold',     emoji: '🔥', desc: 'Statement-making' },
    { key: 'ELEGANT',  label: 'Elegant',  emoji: '✨', desc: 'Refined luxury' },
  ]

  return (
    <div style={{ maxWidth: 700 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--t1)', marginBottom: 6 }}>Website Generator</h1>
        <p style={{ fontSize: 14, color: 'var(--t3)' }}>Generate a full, deploy-ready website from your identity. Agency quality. Zero effort.</p>
      </div>

      <div className="glass-card p-6 mb-5">
        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--t2)', marginBottom: 14 }}>Choose a theme</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 22 }}>
          {themes.map(t => (
            <motion.button key={t.key} onClick={() => setTheme(t.key)} whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }}
              style={{ padding: '14px 8px', borderRadius: 14, textAlign: 'center', cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'inherit',
                background: theme === t.key ? `${accent}18` : 'rgba(255,255,255,0.03)',
                border: `1px solid ${theme === t.key ? `${accent}45` : 'rgba(255,255,255,0.07)'}`,
                color: theme === t.key ? accent : 'var(--t3)' }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{t.emoji}</div>
              <div style={{ fontSize: 12, fontWeight: 600 }}>{t.label}</div>
              <div style={{ fontSize: 11, color: 'var(--t4)', marginTop: 2 }}>{t.desc}</div>
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {generating && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 12 }}>
                <span style={{ color: 'var(--t3)' }}>Generating your website…</span>
                <span style={{ color: accent, fontWeight: 600 }}>{progress}%</span>
              </div>
              <div style={{ height: 4, borderRadius: 4, background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
                <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.1 }}
                  style={{ height: '100%', borderRadius: 4, background: `linear-gradient(90deg, ${accent}, ${accent}88)` }} />
              </div>
              <div style={{ marginTop: 8, fontSize: 11, color: 'var(--t4)' }}>
                {progress < 30 ? 'Analyzing your identity…' : progress < 60 ? 'Building page structure…' : progress < 85 ? 'Applying theme & styles…' : 'Finalizing…'}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button onClick={generate} disabled={generating} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px', borderRadius: 14, border: 'none', cursor: generating ? 'not-allowed' : 'pointer', fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em', background: generating ? 'rgba(255,255,255,0.06)' : accent, color: generating ? 'var(--t3)' : '#fff', transition: 'all 0.2s' }}>
          {generating ? '⏳ Generating…' : '✦ Generate website from my identity'}
        </motion.button>
      </div>

      <AnimatePresence>
        {generated && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="glass-card p-5">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--t1)', marginBottom: 3 }}>Website generated! 🎉</div>
                <div style={{ fontSize: 12, color: 'var(--t3)' }}>{profile.subdomain || 'yourname'}.unveils.me — {theme} theme</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-ghost btn-sm" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <ExternalLink className="w-3.5 h-3.5" /> Preview
                </button>
                <button style={{ padding: '7px 14px', borderRadius: 10, background: accent, border: 'none', cursor: 'pointer', color: '#fff', fontSize: 12, fontWeight: 600, fontFamily: 'inherit' }}>
                  Publish live
                </button>
              </div>
            </div>
            <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', background: '#0a0a0f', height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 30% 50%, ${accent}15, transparent 60%)` }} />
              <div style={{ textAlign: 'center', position: 'relative' }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 700, color: accent, marginBottom: 6 }}>
                  {profile.headline || 'Building the Internet That Should Exist'}
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{profile.subdomain || 'yourname'}.unveils.me · Live preview</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Analytics Tab ────────────────────────────
function AnalyticsTab({ accent }: { accent: string }) {
  const metrics = [
    { label: 'Profile Views',   value: 2847, color: accent,    chartData: [45,62,51,78,67,90,84,96,88,102,95,112] },
    { label: 'Agent Messages',  value: 142,  color: '#34d399', chartData: [8,12,9,16,14,22,19,25,21,28,24,30] },
    { label: 'Website Visits',  value: 1203, color: '#38bdf8', chartData: [32,48,41,62,55,74,68,82,75,90,84,98] },
    { label: 'Tokens Used (k)', value: 84,   color: '#f472b6', chartData: [12,18,15,24,20,30,26,34,29,38,33,42] },
  ]

  return (
    <div style={{ maxWidth: 820 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--t1)', marginBottom: 6 }}>Analytics</h1>
        <p style={{ fontSize: 14, color: 'var(--t3)' }}>AI-powered insights into your identity performance and audience.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 16 }}>
        {metrics.map(({ label, value, color, chartData }, i) => (
          <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="glass-card p-5">
            <div style={{ fontSize: 12, color: 'var(--t3)', marginBottom: 6 }}>{label}</div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 32, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--t1)', marginBottom: 12 }}>
              <AnimatedNumber value={value} />
            </div>
            <MiniChart data={chartData} color={color} />
          </motion.div>
        ))}
      </div>
      <div className="glass-card p-5">
        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--t1)', marginBottom: 16 }}>Traffic sources</div>
        {[{s:'Direct',v:512,p:42,c:accent},{s:'Social Media',v:361,p:30,c:'#38bdf8'},{s:'Search',v:241,p:20,c:'#34d399'},{s:'Referral',v:89,p:8,c:'#f472b6'}].map(({s,v,p,c}) => (
          <div key={s} style={{ marginBottom: 12 }}>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, marginBottom:6 }}>
              <span style={{ color:'var(--t2)' }}>{s}</span>
              <span style={{ color:'var(--t3)' }}>{v} · {p}%</span>
            </div>
            <div style={{ height:5, borderRadius:3, background:'rgba(255,255,255,0.05)' }}>
              <motion.div initial={{ width:0 }} animate={{ width:`${p}%` }} transition={{ delay:.3, duration:.8, ease:[.16,1,.3,1] }}
                style={{ height:'100%', borderRadius:3, background:c }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main dashboard ───────────────────────────
export default function DashboardPage() {
  const [tab, setTab] = useState<Tab>('overview')
  const [notifications, setNotifications] = useState(3)
  const [profile, setProfile] = useState<UserProfile>(defaultProfile)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const accent = profile.accentColor || '#6c5ff4'

  return (
    <div style={{ minHeight: '100vh', background: 'var(--s0)', display: 'flex' }}>
      {/* ── Sidebar ── */}
      <aside style={{ width: 224, flexShrink: 0, borderRight: '1px solid var(--b1)', background: 'var(--s1)', height: '100vh', position: 'sticky', top: 0, display: 'flex', flexDirection: 'column', zIndex: 20 }}>
        {/* Logo */}
        <div style={{ padding: '18px 18px 14px', borderBottom: '1px solid var(--b1)', display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg,${accent},${accent}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>✦</div>
          <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 15, color: 'var(--t1)', letterSpacing: '-.02em' }}>unveils.me</span>
          <span style={{ marginLeft: 'auto', padding: '2px 7px', borderRadius: 20, background: `${accent}20`, color: accent, fontSize: 10, fontWeight: 600 }}>Beta</span>
        </div>

        {/* User chip */}
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--b1)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 11, background: profile.avatar ? 'transparent' : `linear-gradient(135deg,${accent},${accent}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, color: '#fff', flexShrink: 0, overflow: 'hidden' }}>
            {profile.avatar ? <img src={profile.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : (profile.name ? profile.name[0].toUpperCase() : '?')}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--t1)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{profile.name || 'Your Name'}</div>
            <div style={{ fontSize: 11, color: accent, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{profile.subdomain ? `${profile.subdomain}.unveils.me` : 'Set up your profile →'}</div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '10px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {NAV.map(({ id, label, icon }) => (
            <motion.button key={id} onClick={() => setTab(id)} whileHover={{ x: 2 }} transition={{ duration: 0.12 }}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 10, border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', fontSize: 13, fontWeight: 500, transition: 'all 0.15s',
                background: tab === id ? `${accent}18` : 'transparent',
                color: tab === id ? accent : 'var(--t3)',
                outline: tab === id ? `1px solid ${accent}25` : 'none' }}>
              {icon}
              {label}
              {tab === id && <ChevronRight className="w-3.5 h-3.5 ml-auto" style={{ color: accent }} />}
              {id === 'profile' && !profile.name && (
                <span style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: '#f472b6', flexShrink: 0 }} />
              )}
            </motion.button>
          ))}
        </nav>

        {/* Bottom */}
        <div style={{ padding: '10px', borderTop: '1px solid var(--b1)', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <a href="/pricing" style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '8px 12px', borderRadius: 10, textDecoration: 'none', fontSize: 13, color: accent, background: `${accent}0e`, border: `1px solid ${accent}20` }}>
            <Zap className="w-3.5 h-3.5" /> Upgrade to Pro
          </a>
          <a href="/settings" style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '8px 12px', borderRadius: 10, textDecoration: 'none', fontSize: 13, color: 'var(--t3)', transition: 'color 0.15s' }}>
            <Settings className="w-3.5 h-3.5" /> Settings
          </a>
          <button style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '8px 12px', borderRadius: 10, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, color: '#f87171', textAlign: 'left' }}>
            <LogOut className="w-3.5 h-3.5" /> Sign out
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Topbar */}
        <header style={{ height: 56, padding: '0 24px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid var(--b1)', background: 'rgba(8,8,13,0.8)', backdropFilter: 'blur(16px)', position: 'sticky', top: 0, zIndex: 10 }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--b1)', cursor: 'pointer', maxWidth: 380 }}>
            <Search className="w-3.5 h-3.5" style={{ color: 'var(--t4)' }} />
            <span style={{ fontSize: 13, color: 'var(--t4)', letterSpacing: '-.01em' }}>Search anything…</span>
            <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--t4)', background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: 5 }}>⌘K</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
            <motion.button whileTap={{ scale: 0.9 }} style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
              onClick={() => setNotifications(0)}>
              <Bell className="w-3.5 h-3.5" style={{ color: 'var(--t3)' }} />
              {notifications > 0 && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                  style={{ position: 'absolute', top: -3, right: -3, width: 14, height: 14, borderRadius: '50%', background: accent, fontSize: 9, fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid var(--s1)' }}>{notifications}</motion.span>
              )}
            </motion.button>
            <a href="/u/demo" style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', textDecoration: 'none', fontSize: 12, color: 'var(--t2)', fontWeight: 500 }}>
              <ExternalLink className="w-3.5 h-3.5" /> View live
            </a>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: 28 }}>
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
              {tab === 'overview'  && <OverviewTab onNav={setTab} profile={profile} accent={accent} />}
              {tab === 'profile'   && <ProfileBuilderTab profile={profile} setProfile={setProfile} accent={accent} />}
              {tab === 'identity'  && (
                <div style={{ maxWidth: 600 }}>
                  <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--t1)', marginBottom: 6 }}>Identity Generator</h1>
                  <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24 }}>AI builds your professional identity from your profile data.</p>
                  <div className="glass-card p-6" style={{ textAlign: 'center', padding: '48px 24px' }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>🧠</div>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>Complete your profile first</div>
                    <div style={{ fontSize: 13, color: 'var(--t3)', marginBottom: 20 }}>Add your name, skills, and experience so AI can craft a compelling identity narrative.</div>
                    <button onClick={() => setTab('profile')} style={{ padding: '11px 22px', borderRadius: 12, background: accent, border: 'none', cursor: 'pointer', color: '#fff', fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 600 }}>
                      Build Profile →
                    </button>
                  </div>
                </div>
              )}
              {tab === 'agents'    && (
                <div style={{ maxWidth: 600 }}>
                  <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--t1)', marginBottom: 6 }}>AI Agents</h1>
                  <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24 }}>Intelligent agents trained on your identity, ready to represent you.</p>
                  {['Nova — Personal AI', 'Aria — Content Writer', 'Kai — Lead Qualifier'].map((name, i) => (
                    <motion.div key={name} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                      className="glass-card p-5 mb-3" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 12, background: [accent, '#34d399', '#38bdf8'][i] + '25', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                        {['🧠','✍️','🎯'][i]}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--t1)' }}>{name}</div>
                        <div style={{ fontSize: 12, color: 'var(--t4)' }}>Ready · 0 conversations</div>
                      </div>
                      <button style={{ padding: '7px 14px', borderRadius: 10, background: [accent, '#34d399', '#38bdf8'][i] + '18', border: `1px solid ${[accent, '#34d399', '#38bdf8'][i]}30`, color: [accent, '#34d399', '#38bdf8'][i], fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
                        Chat →
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
              {tab === 'website'   && <WebsiteTab profile={profile} accent={accent} />}
              {tab === 'analytics' && <AnalyticsTab accent={accent} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
