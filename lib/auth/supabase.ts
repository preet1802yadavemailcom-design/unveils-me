import { createBrowserClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'

const SUPA_URL  = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPA_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export function createBrowser() {
  return createBrowserClient(SUPA_URL, SUPA_ANON)
}

export function createMiddlewareClient(request: NextRequest) {
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
  const sb = createBrowser()
  const { data: { user }, error } = await sb.auth.getUser()
  if (error || !user) return null
  return user
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
  const sb = createBrowser()
  await sb.auth.signOut()
}

