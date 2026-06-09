// POST /api/billing/webhook
import { NextRequest, NextResponse } from 'next/server'
import { constructWebhookEvent } from '@/lib/billing/stripe'
import { sendUpgradeEmail } from '@/lib/email/resend'
import prisma from '@/lib/db/prisma'
import Stripe from 'stripe'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig  = req.headers.get('stripe-signature')
  if (!sig) return NextResponse.json({ error:'No signature' }, { status:400 })

  let event: Stripe.Event
  try { event = constructWebhookEvent(body, sig) }
  catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Invalid' }, { status:400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const s       = event.data.object as Stripe.Checkout.Session
        const userId  = s.metadata?.userId
        const planId  = s.metadata?.plan as 'PRO' | 'ENTERPRISE' | undefined
        if (userId && planId && s.subscription) {
          await prisma.user.update({ where: { id: userId }, data: { plan: planId, stripeSubscriptionId: String(s.subscription) } })
          const user = await prisma.user.findUnique({ where: { id: userId } })
          if (user) await sendUpgradeEmail(user.email, user.name, planId === 'PRO' ? 'Pro' : 'Enterprise').catch(()=>{})
        }
        break
      }
      case 'customer.subscription.deleted': {
        const sub    = event.data.object as Stripe.Subscription
        const userId = sub.metadata?.userId
        if (userId) await prisma.user.update({ where: { id: userId }, data: { plan: 'FREE', stripeSubscriptionId: null } }).catch(()=>{})
        break
      }
      case 'customer.subscription.updated': {
        const sub    = event.data.object as Stripe.Subscription
        const userId = sub.metadata?.userId
        if (userId) {
          await prisma.subscription.upsert({
            where:  { userId },
            create: { userId, stripeSubscriptionId: sub.id, stripePriceId: sub.items.data[0].price.id,
                      stripeCurrentPeriodEnd: new Date(sub.current_period_end * 1000),
                      plan: 'PRO', status: sub.status.toUpperCase() as 'ACTIVE', cancelAtPeriodEnd: sub.cancel_at_period_end },
            update: { status: sub.status.toUpperCase() as 'ACTIVE', cancelAtPeriodEnd: sub.cancel_at_period_end,
                      stripeCurrentPeriodEnd: new Date(sub.current_period_end * 1000) },
          }).catch(()=>{})
        }
        break
      }
    }
  } catch (err) { console.error('[Webhook]', err) }

  return NextResponse.json({ received: true })
}


