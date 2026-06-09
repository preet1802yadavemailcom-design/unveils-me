import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import prisma from '@/lib/db/prisma'

const SUPA_URL  = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPA_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function createServer() {
  const cookieStore = await cookies()
  return createServerClient(SUPA_URL, SUPA_ANON, {
    cookies: {
      getAll() { return cookieStore.getAll() },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options)
        })
      },
    },
  })
}

export async function getCurrentUserServer() {
  const supabase = await createServer()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) return null
  return user
}

export async function getDbUser(supabaseId: string) {
  return prisma.user.findUnique({ where: { id: supabaseId } })
}

export async function requireAuth() {
  const user = await getCurrentUserServer()
  if (!user) throw new Error('UNAUTHORIZED')
  return user
}

