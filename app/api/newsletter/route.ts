// POST /api/newsletter/subscribe
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { rl, makeId } from '@/lib/ratelimit'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)
const FROM   = process.env.EMAIL_FROM ?? 'Unveils.me <official.unveilsme@gmail.com>'
const APP    = process.env.NEXT_PUBLIC_APP_URL ?? 'https://unveils.me'

const S = z.object({
  email:  z.string().email('Invalid email address'),
  source: z.string().default('website'),
})

export async function POST(req: NextRequest) {
  const { ok } = await rl.auth.limit(makeId(req))
  if (!ok) return NextResponse.json({ success: false, error: 'Too many requests' }, { status: 429 })

  try {
    const { email, source } = S.parse(await req.json())

    // ✅ FIX: Actually add to Resend Audience (was commented out before)
    if (process.env.RESEND_AUDIENCE_ID) {
      await resend.contacts.create({
        email,
        audienceId: process.env.RESEND_AUDIENCE_ID,
        unsubscribed: false,
      }).catch((err) => console.error('[Newsletter] Resend audience error:', err))
    }

    // ✅ FIX: Send welcome email (was commented out before)
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: '🚀 You\'re on the Unveils.me insider list!',
      html: `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
        body{background:#0a0a0f;color:#e8e8f0;font-family:-apple-system,sans-serif;margin:0;padding:0}
        .c{max-width:520px;margin:40px auto;background:#111118;border-radius:16px;padding:40px;border:1px solid rgba(255,255,255,0.08)}
        h1{font-size:22px;font-weight:700;color:#fff;margin:0 0 12px}
        p{font-size:15px;line-height:1.7;color:#aaa;margin:0 0 16px}
        .btn{display:inline-block;padding:13px 26px;background:#6c5ff4;color:#fff;text-decoration:none;border-radius:9999px;font-size:14px;font-weight:600;margin-top:8px}
        .footer{margin-top:28px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.06);font-size:12px;color:#555}
      </style></head><body>
      <div class="c">
        <div style="width:32px;height:32px;background:#6c5ff4;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px;margin-bottom:24px">✦</div>
        <h1>Welcome to the future of identity 🚀</h1>
        <p>You're now on the Unveils.me insider list. We'll send you early access, product updates, and insights on building your AI identity in the new internet.</p>
        <p>In the meantime, explore what we're building:</p>
        <a href="${APP}" class="btn">Visit Unveils.me →</a>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Unveils.me · <a href="${APP}" style="color:#555">unveils.me</a></p>
        </div>
      </div>
      </body></html>`,
    }).catch((err) => console.error('[Newsletter] Welcome email error:', err))

    console.log(`[Newsletter] Subscribed: ${email} from ${source}`)
    return NextResponse.json({ success: true, message: "You're subscribed! Welcome to the future." })
  } catch (err: unknown) {
    if (err instanceof z.ZodError)
      return NextResponse.json({ success: false, error: err.errors[0].message }, { status: 400 })
    return NextResponse.json({ success: false, error: 'Subscription failed' }, { status: 500 })
  }
}


