// ============================================
// UNVEILS.ME — Email System (Resend)
// Transactional emails for SaaS lifecycle
// ============================================

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)
const FROM   = process.env.EMAIL_FROM ?? 'Unveils.me <noreply@unveils.me>'
const APP    = process.env.NEXT_PUBLIC_APP_URL ?? 'https://unveils.me'

// ─── Welcome email ────────────────────────────
export async function sendWelcomeEmail(to: string, name: string) {
  return resend.emails.send({
    from: FROM, to,
    subject: `Welcome to Unveils.me, ${name.split(' ')[0]}! ⚡`,
    html: emailWrapper(`
      <h1>Welcome, ${name.split(' ')[0]}! 🚀</h1>
      <p>Your AI identity universe is ready. Start by generating your first digital identity in under 30 seconds.</p>
      <a href="${APP}/dashboard" className="btn">Open Dashboard →</a>
      <p style="margin-top:24px;font-size:13px;color:#666;">
        Powered by Groq · LLaMA 3.3 70B · Next.js
      </p>
    `),
  })
}

// ─── Upgrade confirmation ─────────────────────
export async function sendUpgradeEmail(to: string, name: string, plan: string) {
  return resend.emails.send({
    from: FROM, to,
    subject: `You're now on Unveils.me ${plan}! 🎉`,
    html: emailWrapper(`
      <h1>You're on ${plan}! 🎉</h1>
      <p>Your account has been upgraded. Here's what's unlocked:</p>
      <ul>
        ${plan === 'Pro'
          ? `<li>5 digital identities</li><li>Unlimited AI agents</li><li>5,000 AI messages/month</li><li>Custom subdomain</li><li>AI memory system</li>`
          : `<li>Unlimited everything</li><li>Custom domain</li><li>Dedicated support</li>`
        }
      </ul>
      <a href="${APP}/dashboard" className="btn">Go to Dashboard →</a>
    `),
  })
}

// ─── Identity generated email ─────────────────
export async function sendIdentityCreatedEmail(to: string, name: string, subdomain: string) {
  return resend.emails.send({
    from: FROM, to,
    subject: `Your identity ${subdomain}.unveils.me is live! ✨`,
    html: emailWrapper(`
      <h1>Your identity is live! ✨</h1>
      <p>Visit your AI-powered digital universe:</p>
      <a href="https://${subdomain}.unveils.me" className="btn">${subdomain}.unveils.me →</a>
      <p style="margin-top:16px;font-size:14px;color:#888;">Share this link with the world. Your AI agents are ready to assist.</p>
    `),
  })
}

// ─── Password reset ───────────────────────────
export async function sendPasswordResetEmail(to: string, resetLink: string) {
  return resend.emails.send({
    from: FROM, to,
    subject: 'Reset your Unveils.me password',
    html: emailWrapper(`
      <h1>Reset your password</h1>
      <p>Click the button below to set a new password. This link expires in 1 hour.</p>
      <a href="${resetLink}" className="btn">Reset Password →</a>
      <p style="margin-top:16px;font-size:13px;color:#888;">If you didn't request this, you can safely ignore this email.</p>
    `),
  })
}

// ─── Usage warning ────────────────────────────
export async function sendUsageWarningEmail(to: string, name: string, feature: string, usage: number, limit: number) {
  const pct = Math.round((usage / limit) * 100)
  return resend.emails.send({
    from: FROM, to,
    subject: `You've used ${pct}% of your ${feature} quota`,
    html: emailWrapper(`
      <h1>Usage alert</h1>
      <p>You've used ${usage} of ${limit} ${feature} this month (${pct}%).</p>
      <p>Upgrade to Pro for more capacity and keep your momentum going.</p>
      <a href="${APP}/pricing" className="btn">Upgrade to Pro →</a>
    `),
  })
}

// ─── HTML wrapper ─────────────────────────────
function emailWrapper(body: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width">
<style>
  body { background:#0a0a0f; color:#e8e8f0; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; margin:0; padding:0; }
  .container { max-width:560px; margin:40px auto; background:#111118; border-radius:16px; padding:40px; border:1px solid rgba(255,255,255,0.08); }
  h1 { font-size:24px; font-weight:700; color:#fff; margin:0 0 12px; }
  p { font-size:15px; line-height:1.7; color:#aaa; margin:0 0 16px; }
  ul { color:#aaa; font-size:15px; line-height:2; padding-left:20px; margin:0 0 20px; }
  .btn { display:inline-block; padding:14px 28px; background:#6c5ff4; color:#fff; text-decoration:none; border-radius:9999px; font-size:14px; font-weight:600; margin-top:8px; }
  .footer { margin-top:32px; padding-top:20px; border-top:1px solid rgba(255,255,255,0.06); font-size:12px; color:#555; }
  .logo { display:flex; align-items:center; gap:8px; margin-bottom:32px; }
  .logo-dot { width:24px; height:24px; background:#6c5ff4; border-radius:6px; display:inline-block; }
  .logo-name { font-weight:700; color:#fff; font-size:16px; }
</style>
</head>
<body>
<div className="container">
  <div className="logo"><span className="logo-dot"></span><span className="logo-name">unveils.me</span></div>
  ${body}
  <div className="footer">
    <p>© ${new Date().getFullYear()} Unveils.me · The AI Identity Operating System<br>
    <a href="${APP}/unsubscribe" style="color:#555">Unsubscribe</a></p>
  </div>
</div>
</body>
</html>`
}

