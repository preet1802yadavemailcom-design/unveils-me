// app/api/og/route.tsx — Dynamic OG image generation
import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const title    = searchParams.get('title')    ?? 'Unveils.me'
  const subtitle = searchParams.get('subtitle') ?? 'AI Identity Operating System'
  const type     = searchParams.get('type')     ?? 'platform'
  const color    = searchParams.get('color')    ?? '#6c5ff4'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column',
          alignItems: 'flex-start', justifyContent: 'flex-end',
          padding: '64px',
          background: '#050508',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Background gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse 80% 80% at 20% 30%, ${color}28 0%, transparent 60%)`,
        }} />

        {/* Grid dots */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.4,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />

        {/* Logo */}
        <div style={{ position: 'absolute', top: 56, left: 64, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#fff' }}>✦</div>
          <span style={{ fontSize: 22, fontWeight: 700, color: '#fff', letterSpacing: '-0.025em' }}>unveils.me</span>
        </div>

        {/* Type badge */}
        {type !== 'platform' && (
          <div style={{ marginBottom: 18, display: 'flex' }}>
            <span style={{ padding: '6px 14px', borderRadius: 9999, fontSize: 14, fontWeight: 500, background: `${color}22`, border: `1px solid ${color}44`, color }}>
              {type}
            </span>
          </div>
        )}

        {/* Title */}
        <div style={{ fontSize: 56, fontWeight: 800, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.04em', marginBottom: 16, maxWidth: 900 }}>
          {title}
        </div>

        {/* Subtitle */}
        <div style={{ fontSize: 24, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, maxWidth: 700 }}>
          {subtitle}
        </div>

        {/* Bottom domain */}
        <div style={{ position: 'absolute', bottom: 56, right: 64, fontSize: 16, color: 'rgba(255,255,255,0.35)', letterSpacing: '-0.01em' }}>
          unveils.me
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}

