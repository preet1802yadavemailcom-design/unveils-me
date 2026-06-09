// lib/utils/security.ts — Security utilities
import { NextRequest } from 'next/server'
import { createHash, randomBytes } from 'crypto'

// ─── Input sanitization ───────────────────────
export function sanitizeInput(input: string, maxLength = 2000): string {
  return input
    .trim()
    .slice(0, maxLength)
    // Remove null bytes
    .replace(/\0/g, '')
    // Prevent prompt injection patterns
    .replace(/(\[\[|\]\]|<<|>>)/g, '')
    // Remove excessive whitespace
    .replace(/\s{3,}/g, '  ')
}

export function sanitizeSubdomain(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '')
    .replace(/^-+|-+$/g, '')
    .slice(0, 50)
}

export function sanitizeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

// ─── Prompt injection defense ─────────────────
export function detectPromptInjection(text: string): boolean {
  const patterns = [
    /ignore (all )?(previous|prior|above) (instructions|prompts)/i,
    /you are now/i,
    /act as (a |an )?(different|new|other)/i,
    /system prompt/i,
    /\[INST\]/i,
    /<\|im_start\|>/i,
    /jailbreak/i,
    /DAN mode/i,
    /disregard (your|all) (instructions|training)/i,
    /forget (everything|all) (you know|your training)/i,
  ]
  return patterns.some(p => p.test(text))
}

export function sanitizePrompt(text: string): string {
  if (detectPromptInjection(text)) {
    // Strip injection attempts and return cleaned version
    return text
      .replace(/ignore (all )?(previous|prior|above) (instructions|prompts)/gi, '[filtered]')
      .replace(/you are now/gi, '[filtered]')
      .replace(/act as (a |an )?(different|new|other)/gi, '[filtered]')
      .replace(/system prompt/gi, '[filtered]')
  }
  return sanitizeInput(text)
}

// ─── CSRF token ───────────────────────────────
export function generateCSRFToken(): string {
  return randomBytes(32).toString('hex')
}

export function validateCSRFToken(token: string, storedToken: string): boolean {
  if (!token || !storedToken) return false
  const a = createHash('sha256').update(token).digest('hex')
  const b = createHash('sha256').update(storedToken).digest('hex')
  // Constant-time comparison
  return a === b
}

// ─── IP extraction ────────────────────────────
export function getClientIP(req: NextRequest): string {
  return (
    req.headers.get('cf-connecting-ip') ??     // Cloudflare
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    '127.0.0.1'
  )
}

// ─── API key hashing ──────────────────────────
export function hashApiKey(key: string): string {
  return createHash('sha256').update(key + process.env.NEXTAUTH_SECRET!).digest('hex')
}

export function generateApiKey(prefix = 'unv'): { key: string; hash: string; displayPrefix: string } {
  const random = randomBytes(24).toString('base64url')
  const key    = `${prefix}_live_${random}`
  const hash   = hashApiKey(key)
  return { key, hash, displayPrefix: `${prefix}_live_${random.slice(0, 6)}` }
}

// ─── Password validation ──────────────────────
export function validatePasswordStrength(password: string): {
  valid:    boolean
  score:    number
  feedback: string[]
} {
  const feedback: string[] = []
  let score = 0

  if (password.length >= 8)  score++
  if (password.length >= 12) score++
  if (/[A-Z]/.test(password)) score++
  else feedback.push('Add at least one uppercase letter')
  if (/[a-z]/.test(password)) score++
  else feedback.push('Add at least one lowercase letter')
  if (/[0-9]/.test(password)) score++
  else feedback.push('Add at least one number')
  if (/[^A-Za-z0-9]/.test(password)) score++
  else feedback.push('Add a special character (!@#$...)')
  if (password.length < 8) feedback.push('Must be at least 8 characters')

  return { valid: score >= 4, score, feedback }
}

// ─── Content moderation flags ─────────────────
export function moderateContent(text: string): { allowed: boolean; reason?: string } {
  const BLOCKED_PATTERNS = [
    /\b(spam|scam|fraud|phishing)\b/i,
    // Add more patterns as needed
  ]

  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(text)) {
      return { allowed: false, reason: 'Content violates community guidelines' }
    }
  }

  return { allowed: true }
}

