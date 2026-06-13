import { createBrowserClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'

// ✅ FIXED: Validate environment variables on initialization
const SUPA_URL  = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPA_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!SUPA_URL || !SUPA_ANON) {
  console.error('❌ Missing Supabase environment variables:')
  console.error('   NEXT_PUBLIC_SUPABASE_URL:', SUPA_URL ? '✓' : '✗')
  console.error('   NEXT_PUBLIC_SUPABASE_ANON_KEY:', SUPA_ANON ? '✓' : '✗')
}

export function createBrowser() {
  if (!SUPA_URL || !SUPA_ANON) {
    throw new Error('Supabase environment variables not configured')
  }
  return createBrowserClient(SUPA_URL, SUPA_ANON)
}

export function createMiddlewareClient(request: NextRequest) {
  if (!SUPA_URL || !SUPA_ANON) {
    throw new Error('Supabase environment variables not configured')
  }
  
  const { createServerClient } = require('@supabase/ssr')
  let response = NextResponse.next({ request })
  const supabase = createServerClient(SUPA_URL, SUPA_ANON, {
    cookies: {
      getAll() { return request.cookies.getAll() },
      setAll(cookiesToSet: any[]) {
        cookiesToSet.forEach(({ name, value }: any) => request.cookies.set(name, value))
        response = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }: any) => response.cookies.set(name, value, options))
      },
    },
  })
  return { supabase, response }
}

export async function getCurrentUser() {
  try {
    const sb = createBrowser()
    const { data: { user }, error } = await sb.auth.getUser()
    if (error || !user) return null
    return user
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

export async function signInWithGoogle(redirectTo?: string) {
  const sb = createBrowser()
  return sb.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectTo ?? `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  })
}

export async function signOut() {
  try {
    const sb = createBrowser()
    await sb.auth.signOut()
  } catch (error) {
    console.error('Error signing out:', error)
  }
}
