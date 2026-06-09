'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem('cookie-consent')
    if (!accepted) setShow(true)
  }, [])

  function accept() {
    localStorage.setItem('cookie-consent', 'true')
    setShow(false)
  }

  if (!show) return null

  return (
    <div style={{
      position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)',
      zIndex: 9999, width: 'min(520px, calc(100vw - 32px))',
      background: '#0d0d14', border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 16, padding: '16px 20px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 16, flexWrap: 'wrap',
      boxShadow: '0 8px 40px rgba(0,0,0,0.4)'
    }}>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', margin: 0, flex: 1, lineHeight: 1.6 }}>
        We use cookies to improve your experience.{' '}
        <Link href="/legal/cookie-policy" style={{ color: '#a29afb', textDecoration: 'underline' }}>
          Learn more
        </Link>
      </p>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => setShow(false)} style={{
          padding: '8px 16px', borderRadius: 9999, fontSize: 13,
          background: 'transparent', border: '1px solid rgba(255,255,255,0.12)',
          color: 'rgba(255,255,255,0.45)', cursor: 'pointer', fontFamily: 'inherit'
        }}>Decline</button>
        <button onClick={accept} style={{
          padding: '8px 16px', borderRadius: 9999, fontSize: 13,
          background: '#6c5ff4', border: 'none',
          color: '#fff', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500
        }}>Accept</button>
      </div>
    </div>
  )
}

