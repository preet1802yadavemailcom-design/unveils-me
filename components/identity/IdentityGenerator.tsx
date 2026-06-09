'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles, RefreshCw, Copy, Download, Check,
  ChevronDown, Palette, Zap, Globe, Bot, User
} from 'lucide-react'
import toast from 'react-hot-toast'
import type { DigitalIdentity, IdentityType } from '@/types'

const IDENTITY_TYPES: { value: IdentityType; label: string; emoji: string }[] = [
  { value: 'FOUNDER',    label: 'Founder',    emoji: '🚀' },
  { value: 'CREATOR',    label: 'Creator',    emoji: '✨' },
  { value: 'STARTUP',    label: 'Startup',    emoji: '⚡' },
  { value: 'DEVELOPER',  label: 'Developer',  emoji: '💻' },
  { value: 'DESIGNER',   label: 'Designer',   emoji: '🎨' },
  { value: 'ARTIST',     label: 'Artist',     emoji: '🎭' },
  { value: 'RESEARCHER', label: 'Researcher', emoji: '🔬' },
  { value: 'EXECUTIVE',  label: 'Executive',  emoji: '💼' },
]

const EXAMPLES = [
  "I'm building an AI robotics startup focused on warehouse automation. I care about elegant engineering and making physical labor safer.",
  "Filmmaker and visual storyteller. I create documentary content about climate change and human resilience across 40+ countries.",
  "Full-stack developer obsessed with performance. I build open-source tools that developers actually want to use.",
  "Fashion designer merging traditional Indian textiles with contemporary minimalism. Based in Mumbai.",
]

export default function IdentityGenerator() {
  const [name, setName] = useState('')
  const [subdomain, setSubdomain] = useState('')
  const [type, setType] = useState<IdentityType>('FOUNDER')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [identity, setIdentity] = useState<DigitalIdentity | null>(null)
  const [copied, setCopied] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>('overview')

  async function generate() {
    if (!name.trim() || !description.trim()) {
      toast.error('Please fill in your name and description')
      return
    }

    setLoading(true)
    setIdentity(null)

    try {
      const res = await fetch('/api/identity/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          subdomain: subdomain.trim() || name.split(' ')[0].toLowerCase(),
          type,
          description: description.trim(),
          userId: 'demo-user',
        }),
      })

      const data = await res.json()
      if (!data.success) throw new Error(data.error)
      setIdentity(data.data)
      toast.success('Identity generated!')
      setActiveSection('overview')
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Generation failed')
    } finally {
      setLoading(false)
    }
  }

  function copySubdomain() {
    if (!identity) return
    navigator.clipboard.writeText(`${identity.subdomain}.unveils.me`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast.success('Copied to clipboard!')
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white mb-2">AI Identity Engine</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Describe yourself. Get a complete digital identity powered by AI Advanced AI.
        </p>
      </div>

      {/* Form */}
      <div className="glass-card p-6 mb-6">
        {/* Type selector */}
        <div className="mb-5">
          <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-tertiary)' }}>
            IDENTITY TYPE
          </label>
          <div className="flex flex-wrap gap-2">
            {IDENTITY_TYPES.map(({ value, label, emoji }) => (
              <button
                key={value}
                onClick={() => setType(value)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                style={{
                  background: type === value ? 'rgba(108,95,244,0.2)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${type === value ? 'rgba(108,95,244,0.4)' : 'rgba(255,255,255,0.06)'}`,
                  color: type === value ? '#a29afb' : 'var(--text-secondary)',
                }}
              >
                {emoji} {label}
              </button>
            ))}
          </div>
        </div>

        {/* Name + subdomain */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-tertiary)' }}>
              YOUR NAME
            </label>
            <input
              className="input-field"
              placeholder="e.g. Arjun Mehta"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (!subdomain) {
                  setSubdomain(e.target.value.split(' ')[0].toLowerCase().replace(/[^a-z0-9]/g, ''))
                }
              }}
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-tertiary)' }}>
              SUBDOMAIN
            </label>
            <div className="relative">
              <input
                className="input-field pr-28"
                placeholder="yourname"
                value={subdomain}
                onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium"
                style={{ color: 'var(--text-tertiary)' }}
              >
                .unveils.me
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-tertiary)' }}>
            DESCRIBE YOURSELF OR YOUR PROJECT
          </label>
          <textarea
            className="input-field"
            placeholder="Tell the AI who you are, what you build, what drives you..."
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Examples */}
        <div className="mb-5">
          <p className="text-xs mb-2" style={{ color: 'var(--text-tertiary)' }}>Try an example:</p>
          <div className="space-y-1.5">
            {EXAMPLES.map((ex, i) => (
              <button
                key={i}
                onClick={() => setDescription(ex)}
                className="w-full text-left text-xs px-3 py-2 rounded-lg transition-all truncate"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  color: 'var(--text-secondary)',
                }}
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={generate}
          disabled={loading}
          className="btn-primary w-full py-3.5 text-base justify-center disabled:opacity-50"
        >
          {loading ? (
            <>
              <div className="dot-loader"><span /><span /><span /></div>
              Generating via AI…
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Generate my digital identity
            </>
          )}
        </button>
      </div>

      {/* Result */}
      <AnimatePresence>
        {identity && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header card */}
            <div
              className="rounded-2xl p-6 mb-4 relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${identity.colorPalette.primary}20, ${identity.colorPalette.secondary}15)`,
                border: `1px solid ${identity.colorPalette.primary}30`,
              }}
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold text-white flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${identity.colorPalette.primary}, ${identity.colorPalette.secondary})` }}
                >
                  {identity.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)}
                </div>

                <div className="flex-1 min-w-0">
                  <h2 className="font-display text-xl font-bold text-white">{identity.name}</h2>
                  <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>{identity.tagline}</p>

                  <button
                    onClick={copySubdomain}
                    className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full text-xs font-medium transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: identity.colorPalette.primary,
                    }}
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
                    {identity.subdomain}.unveils.me
                  </button>
                </div>

                <button
                  onClick={generate}
                  className="btn-icon flex-shrink-0"
                  title="Regenerate"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Sections */}
            <div className="space-y-3">
              {/* Bio & Profile */}
              <Section
                id="overview"
                title="Identity Overview"
                icon={<User className="w-4 h-4" />}
                active={activeSection === 'overview'}
                onToggle={setActiveSection}
              >
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-tertiary)' }}>BIO</p>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{identity.bio}</p>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-tertiary)' }}>TONE</p>
                      <span className="badge badge-brand">{identity.tone}</span>
                    </div>
                    <div>
                      <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-tertiary)' }}>AUDIENCE</p>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{identity.audience}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-tertiary)' }}>SKILLS</p>
                  <div className="flex flex-wrap gap-2">
                    {identity.skills.map((skill) => (
                      <span key={skill} className="badge badge-brand">{skill}</span>
                    ))}
                  </div>
                </div>
              </Section>

              {/* Brand */}
              <Section
                id="brand"
                title="Brand System"
                icon={<Palette className="w-4 h-4" />}
                active={activeSection === 'brand'}
                onToggle={setActiveSection}
              >
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-tertiary)' }}>COLOR PALETTE</p>
                    <div className="flex gap-3">
                      {Object.entries(identity.colorPalette)
                        .filter(([k]) => k !== 'names')
                        .map(([key, value], i) => (
                          <div key={key} className="flex flex-col items-center gap-1.5">
                            <div
                              className="w-10 h-10 rounded-xl border"
                              style={{ background: value as string, borderColor: 'rgba(255,255,255,0.1)' }}
                            />
                            <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                              {identity.colorPalette.names?.[i] ?? key}
                            </span>
                            <span className="text-xs font-mono" style={{ color: 'var(--text-tertiary)' }}>
                              {(value as string).toUpperCase()}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-tertiary)' }}>BRAND VOICE</p>
                    <div className="flex flex-wrap gap-2">
                      {identity.brandVoice?.personality?.map((trait) => (
                        <span key={trait} className="badge badge-brand">{trait}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-tertiary)' }}>WRITING STYLE</p>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{identity.brandVoice?.writingStyle}</p>
                  </div>
                </div>
              </Section>

              {/* Website */}
              <Section
                id="website"
                title="Website Preview"
                icon={<Globe className="w-4 h-4" />}
                active={activeSection === 'website'}
                onToggle={setActiveSection}
              >
                <div
                  className="rounded-xl p-5 relative overflow-hidden"
                  style={{
                    background: identity.colorPalette.background,
                    minHeight: 120,
                  }}
                >
                  <h3
                    className="font-display text-2xl font-bold mb-2"
                    style={{ color: identity.colorPalette.text }}
                  >
                    {identity.websiteHero}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: `${identity.colorPalette.text}80` }}>
                    {identity.tagline}
                  </p>
                  <button
                    className="px-4 py-2 rounded-full text-sm font-medium"
                    style={{ background: identity.colorPalette.primary, color: '#fff' }}
                  >
                    {identity.ctaText} →
                  </button>
                </div>
              </Section>

              {/* Agents */}
              <Section
                id="agents"
                title="AI Agent Team"
                icon={<Bot className="w-4 h-4" />}
                active={activeSection === 'agents'}
                onToggle={setActiveSection}
              >
                <div className="grid grid-cols-3 gap-3">
                  {identity.agents.map((agent) => (
                    <div key={agent.id} className="glass-card p-4 text-center">
                      <div className="text-2xl mb-2">{agent.emoji}</div>
                      <div className="text-sm font-medium text-white mb-1">{agent.name}</div>
                      <div className="text-xs mb-2" style={{ color: 'var(--text-tertiary)' }}>{agent.role}</div>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {agent.capabilities?.slice(0, 2).map((cap) => (
                          <span key={cap} className="badge badge-brand text-xs">{cap}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Section>

              {/* SEO */}
              <Section
                id="seo"
                title="SEO & Meta"
                icon={<Zap className="w-4 h-4" />}
                active={activeSection === 'seo'}
                onToggle={setActiveSection}
              >
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-tertiary)' }}>PAGE TITLE</p>
                    <p className="text-sm text-white">{identity.seoMeta?.title}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-tertiary)' }}>META DESCRIPTION</p>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{identity.seoMeta?.description}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-tertiary)' }}>KEYWORDS</p>
                    <div className="flex flex-wrap gap-1.5">
                      {identity.seoMeta?.keywords?.map((kw) => (
                        <span key={kw} className="badge badge-green">{kw}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Collapsible Section ──────────────────────
function Section({
  id, title, icon, children, active, onToggle
}: {
  id: string
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  active: boolean
  onToggle: (id: string | null) => void
}) {
  return (
    <div className="glass-card overflow-hidden">
      <button
        onClick={() => onToggle(active ? null : id)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left"
      >
        <span style={{ color: 'var(--text-tertiary)' }}>{icon}</span>
        <span className="text-sm font-medium text-white">{title}</span>
        <ChevronDown
          className="w-4 h-4 ml-auto transition-transform"
          style={{
            color: 'var(--text-tertiary)',
            transform: active ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden' }}
          >
            <div
              className="px-5 pb-5"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="pt-4">{children}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

