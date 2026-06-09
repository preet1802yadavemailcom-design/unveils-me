'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User, CreditCard, Key, Bell, Shield, LogOut,
  ExternalLink, Copy, Check, Plus, Trash2, Sparkles, ChevronRight,
  Globe, Camera, Edit3, Save, Eye, EyeOff, RefreshCw,
  Smartphone, Monitor, Chrome, Zap, AlertTriangle,
  ToggleLeft, ToggleRight, Download, Upload, Link2,
  Mail, Phone, MapPin, Briefcase, Lock, Unlock,
  Activity, TrendingUp, Clock, X
} from 'lucide-react'
import Link from 'next/link'
import { createBrowser } from '@/lib/auth/supabase'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

type Tab = 'account' | 'billing' | 'api' | 'notifications' | 'security'

const TABS: { id: Tab; label: string; icon: React.ReactNode; badge?: string }[] = [
  { id: 'account',       label: 'Account',        icon: <User      className="w-4 h-4" /> },
  { id: 'billing',       label: 'Billing',         icon: <CreditCard className="w-4 h-4" />, badge: 'PRO' },
  { id: 'api',           label: 'API Keys',        icon: <Key        className="w-4 h-4" /> },
  { id: 'notifications', label: 'Notifications',   icon: <Bell       className="w-4 h-4" /> },
  { id: 'security',      label: 'Security',        icon: <Shield     className="w-4 h-4" /> },
]

interface ApiKey {
  id: string
  name: string
  prefix: string
  created: string
  lastUsed: string
  permissions: string[]
}

interface NotifPref {
  label: string
  desc: string
  enabled: boolean
  key: string
}

const MOCK_KEYS: ApiKey[] = [
  { id: '1', name: 'Production', prefix: 'unv_live_ab12', created: '2025-01-15', lastUsed: '2 hours ago', permissions: ['read', 'write'] },
  { id: '2', name: 'Development', prefix: 'unv_test_cd34', created: '2025-02-20', lastUsed: '1 day ago', permissions: ['read'] },
]

const DEFAULT_NOTIFS: NotifPref[] = [
  { label: 'Product updates', desc: 'New features and improvements', enabled: true, key: 'product' },
  { label: 'Usage alerts', desc: 'When you approach plan limits', enabled: true, key: 'usage' },
  { label: 'Identity activity', desc: 'Profile views and engagement', enabled: false, key: 'identity' },
  { label: 'Agent summaries', desc: 'Weekly digest from your AI agents', enabled: false, key: 'agents' },
  { label: 'Marketing emails', desc: 'Tips, guides and inspiration', enabled: false, key: 'marketing' },
  { label: 'Security alerts', desc: 'Login attempts and key usage', enabled: true, key: 'security' },
]

export default function SettingsPage() {
  const router = useRouter()
  const [tab, setTab]       = useState<Tab>('account')
  const [copied, setCopied] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw]  = useState<Record<string, boolean>>({})
  const [editing, setEditing] = useState(false)
  const [notifs, setNotifs]  = useState<NotifPref[]>(DEFAULT_NOTIFS)
  const [keys, setKeys]      = useState<ApiKey[]>(MOCK_KEYS)
  const [showNewKey, setShowNewKey] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const [createdKey, setCreatedKey] = useState<string | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState('')

  // Profile form state
  const [formName, setFormName]   = useState('Arjun Mehta')
  const [formSub, setFormSub]     = useState('arjun')
  const [formBio, setFormBio]     = useState('Building the internet that should exist.')
  const [formLoc, setFormLoc]     = useState('Mumbai, India')

  const sb = createBrowser()

  async function handleSignOut() {
    await sb.auth.signOut()
    router.push('/')
  }

  async function handleSaveProfile() {
    setLoading(true)
    await new Promise(r => setTimeout(r, 700))
    setLoading(false)
    setEditing(false)
    toast.success('Profile updated!')
  }

  async function openBillingPortal() {
    setLoading(true)
    try {
      const res = await fetch('/api/billing/portal', { method: 'POST' })
      const data = await res.json()
      if (data.success) window.location.href = data.data.url
      else toast.error(data.error)
    } catch { toast.error('Failed to open billing portal') }
    finally { setLoading(false) }
  }

  function copyToClipboard(text: string, id: string) {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
    toast.success('Copied to clipboard!')
  }

  function toggleNotif(key: string) {
    setNotifs(prev => prev.map(n => n.key === key ? { ...n, enabled: !n.enabled } : n))
  }

  async function createNewKey() {
    if (!newKeyName.trim()) return
    const fake = `unv_live_${Math.random().toString(36).slice(2, 8)}`
    const newKey: ApiKey = {
      id: Date.now().toString(), name: newKeyName, prefix: fake,
      created: new Date().toISOString().split('T')[0], lastUsed: 'Never', permissions: ['read', 'write'],
    }
    setKeys(prev => [...prev, newKey])
    setCreatedKey(fake + '_' + Math.random().toString(36).slice(2, 20))
    setNewKeyName('')
    setShowNewKey(false)
    toast.success('API key created!')
  }

  function revokeKey(id: string) {
    setKeys(prev => prev.filter(k => k.id !== id))
    toast.success('Key revoked')
  }

  const inputClass = {
    width: '100%',
    padding: '11px 14px',
    borderRadius: 12,
    background: editing ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.025)',
    border: `1px solid ${editing ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)'}`,
    color: '#fff',
    fontSize: 14,
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'all 0.2s',
  }

  return (
    <div style={{ minHeight: '100vh', background: '#08080d', fontFamily: "'DM Sans', sans-serif", color: '#f0f0f6' }}>
      {/* BG grid */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      {/* Nav */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(8,8,13,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px', height: 54, display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <div style={{ width: 26, height: 26, borderRadius: 8, background: 'linear-gradient(135deg,#6c5ff4,#a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>✦</div>
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14, color: '#fff' }}>unveils.me</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.25)' }} />
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>Settings</span>
        </div>
      </nav>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 24px', position: 'relative', zIndex: 10 }}>
        <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontFamily: "'Syne',sans-serif", fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', marginBottom: 32 }}>
          Settings
        </motion.h1>

        <div style={{ display: 'flex', gap: 28 }}>
          {/* Sidebar */}
          <aside style={{ width: 192, flexShrink: 0 }}>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {TABS.map(({ id, label, icon, badge }) => (
                <motion.button key={id} onClick={() => setTab(id)}
                  whileHover={{ x: 2 }} transition={{ duration: 0.12 }}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 13px', borderRadius: 12, border: 'none', cursor: 'pointer',
                    textAlign: 'left', fontFamily: 'inherit', fontSize: 13, fontWeight: 500,
                    transition: 'all 0.15s',
                    background: tab === id ? 'rgba(108,95,244,0.15)' : 'transparent',
                    color: tab === id ? '#a29afb' : 'rgba(255,255,255,0.5)',
                    outline: tab === id ? '1px solid rgba(108,95,244,0.22)' : 'none',
                  }}>
                  {icon}
                  {label}
                  {badge && (
                    <span style={{ marginLeft: 'auto', padding: '1px 6px', borderRadius: 8, background: 'rgba(108,95,244,0.2)', color: '#a29afb', fontSize: 10, fontWeight: 700 }}>{badge}</span>
                  )}
                </motion.button>
              ))}
              <div style={{ margin: '10px 0 3px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 10 }} />
              <motion.button onClick={handleSignOut} whileHover={{ x: 2 }} transition={{ duration: 0.12 }}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 13px', borderRadius: 12, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, color: '#f87171', background: 'transparent', textAlign: 'left' }}>
                <LogOut className="w-4 h-4" /> Sign out
              </motion.button>
            </nav>
          </aside>

          {/* Content */}
          <main style={{ flex: 1, minWidth: 0 }}>
            <AnimatePresence mode="wait">
              <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }}>

                {/* ── ACCOUNT ── */}
                {tab === 'account' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {/* Profile card */}
                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 24 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                        <h3 style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>Profile</h3>
                        {!editing ? (
                          <motion.button onClick={() => setEditing(true)} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)', color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
                            <Edit3 className="w-3.5 h-3.5" /> Edit
                          </motion.button>
                        ) : (
                          <div style={{ display: 'flex', gap: 7 }}>
                            <motion.button onClick={() => setEditing(false)} whileTap={{ scale: 0.96 }}
                              style={{ padding: '7px 12px', borderRadius: 10, background: 'transparent', border: '1px solid rgba(255,255,255,0.09)', color: 'rgba(255,255,255,0.5)', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>
                              Cancel
                            </motion.button>
                            <motion.button onClick={handleSaveProfile} disabled={loading} whileTap={{ scale: 0.96 }}
                              style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 14px', borderRadius: 10, background: '#6c5ff4', border: 'none', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                              {loading ? '…' : <><Save className="w-3.5 h-3.5" /> Save</>}
                            </motion.button>
                          </div>
                        )}
                      </div>

                      {/* Avatar */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 24 }}>
                        <div style={{ position: 'relative' }}>
                          <div style={{ width: 72, height: 72, borderRadius: 20, background: 'linear-gradient(135deg,#6c5ff4,#a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 700, color: '#fff' }}>
                            {formName[0]?.toUpperCase()}
                          </div>
                          {editing && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                              style={{ position: 'absolute', bottom: -3, right: -3, width: 22, height: 22, borderRadius: '50%', background: '#6c5ff4', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                              <Camera className="w-3 h-3" style={{ color: '#fff' }} />
                            </motion.div>
                          )}
                        </div>
                        <div>
                          <div style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 3 }}>{formName}</div>
                          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>arjun@example.com</div>
                          <span style={{ padding: '3px 8px', borderRadius: 8, background: 'rgba(108,95,244,0.2)', color: '#a29afb', fontSize: 11, fontWeight: 700 }}>PRO</span>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                        <div>
                          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', color: 'rgba(255,255,255,0.35)', marginBottom: 7, textTransform: 'uppercase' }}>FULL NAME</label>
                          <input style={inputClass} value={formName} onChange={e => setFormName(e.target.value)} disabled={!editing} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', color: 'rgba(255,255,255,0.35)', marginBottom: 7, textTransform: 'uppercase' }}>EMAIL</label>
                          <input style={{ ...inputClass, opacity: 0.5 }} value="arjun@example.com" disabled />
                        </div>
                        <div style={{ position: 'relative' }}>
                          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', color: 'rgba(255,255,255,0.35)', marginBottom: 7, textTransform: 'uppercase' }}>SUBDOMAIN</label>
                          <input style={{ ...inputClass, paddingRight: 96 }} value={formSub} onChange={e => setFormSub(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))} disabled={!editing} />
                          <span style={{ position: 'absolute', right: 12, bottom: 12, fontSize: 11, color: 'rgba(255,255,255,0.28)' }}>.unveils.me</span>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', color: 'rgba(255,255,255,0.35)', marginBottom: 7, textTransform: 'uppercase' }}>LOCATION</label>
                          <input style={inputClass} value={formLoc} onChange={e => setFormLoc(e.target.value)} disabled={!editing} />
                        </div>
                      </div>
                      {editing && (
                        <div style={{ marginTop: 14 }}>
                          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', color: 'rgba(255,255,255,0.35)', marginBottom: 7, textTransform: 'uppercase' }}>BIO</label>
                          <textarea style={{ ...inputClass, resize: 'none', height: 80, lineHeight: 1.6 } as any} value={formBio} onChange={e => setFormBio(e.target.value)} disabled={!editing} />
                        </div>
                      )}
                    </div>

                    {/* Danger zone */}
                    <motion.div whileHover={{ borderColor: 'rgba(239,68,68,0.25)' }} transition={{ duration: 0.2 }}
                      style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.12)', borderRadius: 20, padding: 22 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 8 }}>
                        <AlertTriangle className="w-4 h-4" style={{ color: '#f87171' }} />
                        <h3 style={{ fontSize: 14, fontWeight: 600, color: '#f87171' }}>Danger Zone</h3>
                      </div>
                      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 14, lineHeight: 1.6 }}>
                        Permanently delete your account and all associated data. This cannot be undone.
                      </p>
                      <button onClick={() => setShowDeleteModal(true)}
                        style={{ padding: '8px 16px', borderRadius: 11, background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
                        Delete account
                      </button>
                    </motion.div>
                  </div>
                )}

                {/* ── BILLING ── */}
                {tab === 'billing' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 24 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                        <h3 style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>Current plan</h3>
                        <span style={{ padding: '4px 10px', borderRadius: 10, background: 'rgba(108,95,244,0.2)', color: '#a29afb', fontSize: 12, fontWeight: 700 }}>PRO</span>
                      </div>

                      {/* Usage stats */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 22 }}>
                        {[
                          { label: 'Messages', used: 3241, total: 5000, color: '#6c5ff4' },
                          { label: 'Agents', used: 3, total: 'Unlimited', color: '#34d399' },
                          { label: 'Websites', used: 1, total: 5, color: '#38bdf8' },
                        ].map(({ label, used, total, color }) => (
                          <div key={label} style={{ padding: 14, borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>{label}</div>
                            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 8 }}>
                              {typeof used === 'number' ? used.toLocaleString() : used}
                              {typeof total === 'number' && <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>/{total.toLocaleString()}</span>}
                            </div>
                            {typeof total === 'number' && (
                              <div style={{ height: 4, borderRadius: 4, background: 'rgba(255,255,255,0.07)' }}>
                                <motion.div initial={{ width: 0 }} animate={{ width: `${(Number(used) / total) * 100}%` }} transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                  style={{ height: '100%', borderRadius: 4, background: color }} />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 22 }}>
                        {['Unlimited AI agents', '5,000 messages / month', 'AI memory system', 'Custom subdomain', 'Priority support', 'Advanced analytics'].map(f => (
                          <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(52,211,153,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <Check className="w-3 h-3" style={{ color: '#34d399' }} />
                            </div>
                            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>{f}</span>
                          </div>
                        ))}
                      </div>

                      <div style={{ display: 'flex', gap: 10 }}>
                        <button onClick={openBillingPortal} disabled={loading}
                          style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 18px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', opacity: loading ? 0.5 : 1 }}>
                          <ExternalLink className="w-4 h-4" /> Manage billing
                        </button>
                        <Link href="/pricing" style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 18px', borderRadius: 12, background: 'rgba(108,95,244,0.18)', border: '1px solid rgba(108,95,244,0.3)', color: '#a29afb', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                          <Sparkles className="w-4 h-4" /> Upgrade plan
                        </Link>
                      </div>
                    </div>

                    {/* Billing history placeholder */}
                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 24 }}>
                      <h3 style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 16 }}>Recent invoices</h3>
                      {[
                        { date: 'Jun 1, 2025', amount: '₹999', status: 'Paid' },
                        { date: 'May 1, 2025', amount: '₹999', status: 'Paid' },
                        { date: 'Apr 1, 2025', amount: '₹999', status: 'Paid' },
                      ].map((inv, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                          <div>
                            <div style={{ fontSize: 13, color: '#fff', marginBottom: 2 }}>Pro Plan</div>
                            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{inv.date}</div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <span style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{inv.amount}</span>
                            <span style={{ padding: '3px 8px', borderRadius: 8, background: 'rgba(52,211,153,0.12)', color: '#34d399', fontSize: 11, fontWeight: 600 }}>{inv.status}</span>
                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.35)' }}>
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── API KEYS ── */}
                {tab === 'api' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 24 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                        <h3 style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>API Keys</h3>
                        <motion.button onClick={() => setShowNewKey(true)} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                          style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 10, background: '#6c5ff4', border: 'none', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                          <Plus className="w-3.5 h-3.5" /> New key
                        </motion.button>
                      </div>

                      {/* New key form */}
                      <AnimatePresence>
                        {showNewKey && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                            style={{ marginBottom: 16, padding: 16, borderRadius: 14, background: 'rgba(108,95,244,0.08)', border: '1px solid rgba(108,95,244,0.2)' }}>
                            <div style={{ fontSize: 13, fontWeight: 500, color: '#fff', marginBottom: 12 }}>Create new API key</div>
                            <div style={{ display: 'flex', gap: 9 }}>
                              <input
                                style={{ flex: 1, padding: '10px 13px', borderRadius: 11, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 13, fontFamily: 'inherit', outline: 'none' }}
                                placeholder="Key name (e.g. Production)"
                                value={newKeyName}
                                onChange={e => setNewKeyName(e.target.value)}
                                onKeyDown={e => { if (e.key === 'Enter') createNewKey() }}
                                autoFocus
                              />
                              <button onClick={createNewKey} style={{ padding: '10px 16px', borderRadius: 11, background: '#6c5ff4', border: 'none', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Create</button>
                              <button onClick={() => setShowNewKey(false)} style={{ padding: '10px 12px', borderRadius: 11, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontFamily: 'inherit' }}><X className="w-4 h-4" /></button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Created key reveal */}
                      <AnimatePresence>
                        {createdKey && (
                          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            style={{ marginBottom: 16, padding: 16, borderRadius: 14, background: 'rgba(52,211,153,0.07)', border: '1px solid rgba(52,211,153,0.2)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
                              <Check className="w-4 h-4" style={{ color: '#34d399' }} />
                              <span style={{ fontSize: 13, fontWeight: 500, color: '#34d399' }}>Key created! Copy it now — it won't be shown again.</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', borderRadius: 10, background: 'rgba(0,0,0,0.3)', fontFamily: 'monospace', fontSize: 12, color: '#a0fad5' }}>
                              <code style={{ flex: 1, wordBreak: 'break-all' }}>{createdKey}</code>
                              <button onClick={() => { copyToClipboard(createdKey, 'new'); setCreatedKey(null) }}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#34d399', flexShrink: 0 }}>
                                <Copy className="w-4 h-4" />
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Key list */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {keys.map((key, i) => (
                          <motion.div key={key.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                            style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                                <span style={{ fontSize: 13, fontWeight: 500, color: '#fff' }}>{key.name}</span>
                                {key.permissions.map(p => (
                                  <span key={p} style={{ padding: '2px 6px', borderRadius: 6, background: p === 'write' ? 'rgba(251,146,60,0.12)' : 'rgba(56,189,248,0.12)', color: p === 'write' ? '#fb923c' : '#38bdf8', fontSize: 10, fontWeight: 600 }}>{p}</span>
                                ))}
                              </div>
                              <div style={{ display: 'flex', gap: 14, fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
                                <span style={{ fontFamily: 'monospace' }}>{key.prefix}••••••</span>
                                <span>Last used: {key.lastUsed}</span>
                                <span>Created: {key.created}</span>
                              </div>
                            </div>
                            <div style={{ display: 'flex', gap: 7, flexShrink: 0 }}>
                              <motion.button whileTap={{ scale: 0.9 }} onClick={() => copyToClipboard(key.prefix, key.id)}
                                style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)' }}>
                                {copied === key.id ? <Check className="w-3.5 h-3.5" style={{ color: '#34d399' }} /> : <Copy className="w-3.5 h-3.5" />}
                              </motion.button>
                              <motion.button whileTap={{ scale: 0.9 }} onClick={() => revokeKey(key.id)}
                                style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f87171' }}>
                                <Trash2 className="w-3.5 h-3.5" />
                              </motion.button>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 14 }}>
                        API keys are shown once at creation. Store them securely.{' '}
                        <a href="/docs/api" style={{ color: '#6c5ff4', textDecoration: 'underline' }}>View API docs →</a>
                      </p>
                    </div>
                  </div>
                )}

                {/* ── NOTIFICATIONS ── */}
                {tab === 'notifications' && (
                  <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 24 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 6 }}>Email preferences</h3>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 22 }}>Choose what you hear about. You can always change this later.</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                      {notifs.map(({ label, desc, enabled, key }, i) => (
                        <motion.div key={key} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: i < notifs.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                          <div>
                            <div style={{ fontSize: 14, fontWeight: 500, color: '#fff', marginBottom: 3 }}>{label}</div>
                            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)' }}>{desc}</div>
                          </div>
                          <motion.button onClick={() => toggleNotif(key)}
                            animate={{ background: enabled ? '#6c5ff4' : 'rgba(255,255,255,0.1)' }}
                            style={{ position: 'relative', width: 44, height: 26, borderRadius: 14, border: 'none', cursor: 'pointer', flexShrink: 0 }}>
                            <motion.div animate={{ x: enabled ? 20 : 2 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                              style={{ position: 'absolute', top: 3, width: 20, height: 20, borderRadius: '50%', background: '#fff' }} />
                          </motion.button>
                        </motion.div>
                      ))}
                    </div>
                    <motion.button onClick={() => toast.success('Preferences saved!')}
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      style={{ marginTop: 22, display: 'flex', alignItems: 'center', gap: 7, padding: '11px 20px', borderRadius: 12, background: '#6c5ff4', border: 'none', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                      <Save className="w-4 h-4" /> Save preferences
                    </motion.button>
                  </div>
                )}

                {/* ── SECURITY ── */}
                {tab === 'security' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {/* Change password */}
                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 24 }}>
                      <h3 style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 20 }}>Change password</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {[
                          { label: 'CURRENT PASSWORD', key: 'current' },
                          { label: 'NEW PASSWORD', key: 'new' },
                          { label: 'CONFIRM PASSWORD', key: 'confirm' },
                        ].map(({ label, key }) => (
                          <div key={key}>
                            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', color: 'rgba(255,255,255,0.35)', marginBottom: 7, textTransform: 'uppercase' }}>{label}</label>
                            <div style={{ position: 'relative' }}>
                              <input
                                type={showPw[key] ? 'text' : 'password'}
                                style={{ ...inputClass, paddingRight: 44 } as any}
                                placeholder="••••••••"
                              />
                              <button onClick={() => setShowPw(p => ({ ...p, [key]: !p[key] }))}
                                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)' }}>
                                {showPw[key] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                            </div>
                          </div>
                        ))}
                        <motion.button onClick={() => toast.success('Password updated!')} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                          style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 7, padding: '11px 20px', borderRadius: 12, background: '#6c5ff4', border: 'none', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                          <Lock className="w-4 h-4" /> Update password
                        </motion.button>
                      </div>
                    </div>

                    {/* Active sessions */}
                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 24 }}>
                      <h3 style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 16 }}>Active sessions</h3>
                      {[
                        { device: 'MacBook Pro', browser: 'Chrome 128', ip: '122.xx.xx.xx', time: 'Now (this session)', icon: Monitor, current: true },
                        { device: 'iPhone 15', browser: 'Safari Mobile', ip: '122.xx.xx.xx', time: '2 hours ago', icon: Smartphone, current: false },
                      ].map(({ device, browser, ip, time, icon: Icon, current }, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 0', borderBottom: i === 0 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                          <div style={{ width: 38, height: 38, borderRadius: 11, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Icon className="w-5 h-5" style={{ color: 'rgba(255,255,255,0.5)' }} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                              <span style={{ fontSize: 13, fontWeight: 500, color: '#fff' }}>{device}</span>
                              {current && <span style={{ padding: '1px 6px', borderRadius: 6, background: 'rgba(52,211,153,0.15)', color: '#34d399', fontSize: 10, fontWeight: 700 }}>CURRENT</span>}
                            </div>
                            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{browser} · {ip} · {time}</div>
                          </div>
                          {!current && (
                            <button onClick={() => toast.success('Session revoked')} style={{ padding: '6px 12px', borderRadius: 9, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)', color: '#f87171', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>
                              Revoke
                            </button>
                          )}
                        </div>
                      ))}
                      <button onClick={() => toast.success('All other sessions revoked')} style={{ marginTop: 14, padding: '9px 16px', borderRadius: 11, background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.15)', color: '#f87171', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
                        Sign out all other sessions
                      </button>
                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Delete modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: 24 }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              style={{ background: '#0e0e16', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 22, padding: 32, maxWidth: 420, width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <AlertTriangle className="w-5 h-5" style={{ color: '#f87171' }} />
                <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, color: '#fff' }}>Delete account?</h2>
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 20, lineHeight: 1.6 }}>
                This will permanently delete your profile, agents, websites, and all data. This action cannot be undone.
              </p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 10 }}>
                Type <strong style={{ color: '#f87171' }}>delete my account</strong> to confirm:
              </p>
              <input
                style={{ width: '100%', padding: '11px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(239,68,68,0.25)', color: '#fff', fontSize: 13, fontFamily: 'inherit', outline: 'none', marginBottom: 16 }}
                placeholder="delete my account"
                value={deleteConfirm}
                onChange={e => setDeleteConfirm(e.target.value)}
              />
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => { setShowDeleteModal(false); setDeleteConfirm('') }}
                  style={{ flex: 1, padding: '11px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', color: 'rgba(255,255,255,0.6)', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
                  Cancel
                </button>
                <button
                  disabled={deleteConfirm !== 'delete my account'}
                  onClick={() => toast.error('Feature disabled in demo')}
                  style={{ flex: 1, padding: '11px', borderRadius: 12, background: deleteConfirm === 'delete my account' ? '#ef4444' : 'rgba(239,68,68,0.15)', border: 'none', color: deleteConfirm === 'delete my account' ? '#fff' : 'rgba(239,68,68,0.4)', fontSize: 13, fontWeight: 600, cursor: deleteConfirm === 'delete my account' ? 'pointer' : 'not-allowed', fontFamily: 'inherit', transition: 'all 0.2s' }}>
                  Delete permanently
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
