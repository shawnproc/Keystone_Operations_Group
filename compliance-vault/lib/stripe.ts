import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
  typescript: true,
})

export const STRIPE_PRICES = {
  starter:    process.env.STRIPE_PRICE_STARTER!,
  growth:     process.env.STRIPE_PRICE_GROWTH!,
  enterprise: process.env.STRIPE_PRICE_ENTERPRISE!,
} as const

export const TIER_DETAILS = {
  starter: {
    name: 'Starter',
    price: 299,
    locations: 1,
    employees: 10,
    description: 'Single location, up to 10 employees',
    features: [
      'Single establishment dashboard',
      'Employee certification tracking (up to 10)',
      'Health permit renewal alerts',
      'Monthly inspection history',
      'Basic compliance checklist',
      'Email & SMS deadline alerts',
    ],
  },
  growth: {
    name: 'Growth',
    price: 699,
    locations: 3,
    employees: 50,
    description: 'Up to 3 locations, 10–50 employees',
    features: [
      'Multi-location dashboard (up to 3)',
      'Employee certification tracking (up to 50)',
      'Inspection analytics & violation trends',
      'Audit-ready quarterly compliance reports',
      'Equipment maintenance tracking',
      'Temperature log monitoring',
      'Priority support (24-hour SLA)',
    ],
  },
  enterprise: {
    name: 'Enterprise',
    price: 1499,
    locations: -1,
    employees: -1,
    description: 'Unlimited locations & employees',
    features: [
      'Unlimited locations & employee profiles',
      'Custom regulatory mapping by jurisdiction',
      'Real-time inspection data integration',
      'Predictive risk scoring (AI-driven)',
      'Compliance officer dashboard with RBAC',
      'Custom branded report templates',
      'Dedicated onboarding & quarterly reviews',
      '99.5% SLA guarantee',
    ],
  },
} as const

export async function createCheckoutSession(
  customerId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string
) {
  return stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl,
    subscription_data: {
      trial_period_days: 14,
    },
  })
}

export async function createBillingPortalSession(customerId: string, returnUrl: string) {
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })
}
