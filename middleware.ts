// ============================================
// UNVEILS.ME — Middleware
// Subdomain routing · Auth guard · Security
// ============================================

import { NextRequest, NextResponse } from 'next/server'
import { createMiddlewareClient } from '@/lib/auth/supabase'

const DOMAIN  = process.env.NEXT_PUBLIC_APP_DOMAIN ?? 'unveils.me'

// ✅ FIX: Was '/auth/login' and '/auth/register' — those pages don't exist
const PROTECTED = ['/dashboard', '/settings', '/onboarding']
const AUTH_ONLY = ['/auth']           // only the real auth page at /auth
const API_AUTH  = ['/api/identity', '/api/agents', '/api/website', '/api/memory', '/api/user', '/api/billing/checkout', '/api/billing/portal']

export async function middleware(request: NextRequest) {
  const url  = request.nextUrl.clone()
  const host = request.headers.get('host') ?? ''

  // ─── 1. Subdomain routing ─────────────────
  const isLocal = host.includes('localhost')
  const root    = isLocal ? `localhost:${url.port || 3000}` : DOMAIN

  const subdomain = host !== root && host !== `www.${root}`
    ? host.replace(`.${root}`, '')
    : url.searchParams.get('sub') ?? null // dev: ?sub=arjun

  if (subdomain && subdomain !== 'www' && subdomain !== 'app' && !subdomain.includes('.')) {
    url.pathname = `/u/${subdomain}${url.pathname === '/' ? '' : url.pathname}`
    const res = NextResponse.rewrite(url)
    addSecurityHeaders(res)
    return res
  }

  // ─── 2. Auth middleware ───────────────────
  const { supabase, response } = createMiddlewareClient(request)
  const { data: { session } } = await supabase.auth.getSession()
  const path = url.pathname

  // Logged-in users visiting /auth get redirected to dashboard
  if (session && path === '/auth') {
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  // Protected pages — redirect to /auth (not /auth/login which doesn't exist)
  if (!session && PROTECTED.some(r => path.startsWith(r))) {
    url.pathname = '/auth'
    url.searchParams.set('redirect', path)
    return NextResponse.redirect(url)
  }

  // Protected API routes — return 401
  if (!session && API_AUTH.some(r => path.startsWith(r))) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  // ─── 3. Security headers ─────────────────
  addSecurityHeaders(response)
  return response
}

function addSecurityHeaders(res: NextResponse) {
  res.headers.set('X-Frame-Options',           'DENY')
  res.headers.set('X-Content-Type-Options',    'nosniff')
  res.headers.set('X-XSS-Protection',          '1; mode=block')
  res.headers.set('Referrer-Policy',           'strict-origin-when-cross-origin')
  res.headers.set('Permissions-Policy',        'camera=(), microphone=(), geolocation=()')
  res.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|svg|jpg|ico|webp)$).*)'],
}

