```ts
import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth/supabase-server'
import { rl } from '@/lib/ratelimit'
import { makeId } from '@/lib/utils'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const user = await getCurrentUser()

  const ip =
    req.headers.get('x-forwarded-for') ??
    req.headers.get('x-real-ip') ??
    'anonymous'

  const identifier = user?.id || ip

  const result = await rl.identity.limit(
    makeId(req, identifier)
  )

  if (!result.success) {
    return NextResponse.json(
      {
        success: false,
        error: 'Rate limit exceeded. Upgrade to Pro.',
      },
      { status: 429 }
    )
  }

  try {
    return NextResponse.json({
      success: true,
    })
  } catch (err: unknown) {
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : 'Failed',
      },
      { status: 500 }
    )
  }
}
```
