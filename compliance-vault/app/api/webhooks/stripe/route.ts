import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import type Stripe from 'stripe'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const tierFromPriceId = (priceId: string): string => {
  if (priceId === process.env.STRIPE_PRICE_STARTER)    return 'starter'
  if (priceId === process.env.STRIPE_PRICE_GROWTH)     return 'growth'
  if (priceId === process.env.STRIPE_PRICE_ENTERPRISE) return 'enterprise'
  return 'starter'
}

export async function POST(request: Request) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Webhook verification failed' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const priceId = subscription.items.data[0]?.price?.id
        const tier = priceId ? tierFromPriceId(priceId) : 'starter'
        const customerId = subscription.customer as string

        await supabaseAdmin
          .from('organizations')
          .update({
            subscription_tier: tier,
            stripe_subscription_id: subscription.id,
          })
          .eq('stripe_customer_id', customerId)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        await supabaseAdmin
          .from('organizations')
          .update({ subscription_tier: 'starter', stripe_subscription_id: null })
          .eq('stripe_customer_id', customerId)
        break
      }

      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.CheckoutSession
        if (session.mode === 'subscription' && session.customer) {
          const customerId = session.customer as string
          const subscriptionId = session.subscription as string

          const subscription = await stripe.subscriptions.retrieve(subscriptionId)
          const priceId = subscription.items.data[0]?.price?.id
          const tier = priceId ? tierFromPriceId(priceId) : 'starter'

          await supabaseAdmin
            .from('organizations')
            .update({ subscription_tier: tier, stripe_subscription_id: subscriptionId })
            .eq('stripe_customer_id', customerId)
        }
        break
      }
    }
  } catch (err) {
    console.error('Error handling webhook event:', event.type, err)
    return NextResponse.json({ error: 'Webhook handler error' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
