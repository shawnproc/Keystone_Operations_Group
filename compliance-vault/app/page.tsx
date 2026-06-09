import Link from 'next/link'
import {
  ShieldCheck, Bell, ClipboardList, Users, TrendingUp,
  ChevronRight, CheckCircle, Star, ArrowRight
} from 'lucide-react'
import { TIER_DETAILS } from '@/lib/stripe'

const features = [
  {
    icon: Bell,
    title: 'Automated Deadline Alerts',
    description: 'Never miss a certification expiration or permit renewal. Get SMS and email alerts 30, 14, and 7 days before any deadline.',
  },
  {
    icon: ClipboardList,
    title: 'Inspection History & Trends',
    description: 'See every inspection on record. Track violation patterns, corrective actions, and your score over time.',
  },
  {
    icon: Users,
    title: 'Employee Certification Tracking',
    description: 'Track every food handler certification, ServSafe credential, and state-required training for your entire staff.',
  },
  {
    icon: ShieldCheck,
    title: 'Jurisdiction-Specific Compliance',
    description: 'Virginia requires certification within 30 days of hire. Maryland requires 14 days. We track every state and county rule.',
  },
  {
    icon: TrendingUp,
    title: 'Audit-Ready Reports',
    description: 'One click generates a complete compliance report — formatted for health department review, legal counsel, or insurance.',
  },
  {
    icon: ClipboardList,
    title: 'Equipment Maintenance Logs',
    description: 'Schedule and track maintenance for refrigerators, fryers, dishwashers, and every piece of kitchen equipment.',
  },
]

const testimonials = [
  {
    quote: 'We failed two inspections in 18 months. Since using Compliance Vault, we\'ve had two perfect scores. The certification tracking alone paid for itself.',
    name: 'Marcus T.',
    role: 'Owner, Fredericksburg Restaurant Group',
    stars: 5,
  },
  {
    quote: 'Managing 4 hospital cafeterias across Northern Virginia was a spreadsheet nightmare. Now everything is in one place and my compliance officer actually sleeps at night.',
    name: 'Jennifer K.',
    role: 'Food Services Director, Health System',
    stars: 5,
  },
  {
    quote: 'The inspector showed up unannounced on a Tuesday morning. I pulled up Compliance Vault, showed him our records, and he was done in 20 minutes. No violations.',
    name: 'David R.',
    role: 'Owner, 3-Location Catering Company',
    stars: 5,
  },
]

export default function LandingPage() {
  const tiers = Object.entries(TIER_DETAILS)

  return (
    <div className="bg-white">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-navy-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900">Compliance Vault</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</a>
            <a href="#testimonials" className="hover:text-slate-900 transition-colors">Reviews</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Sign in
            </Link>
            <Link href="/signup" className="btn-primary text-sm">
              Start Free Trial
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium mb-6 ring-1 ring-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Trusted by food service operators across Virginia & DMV
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
            Never fail a health{' '}
            <span className="text-navy-700">inspection</span>{' '}
            again.
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Compliance Vault automates certification tracking, permit renewals, and
            inspection readiness for food service establishments — so the unannounced
            inspector never catches you off guard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="btn-primary text-base px-8 py-3.5">
              Start 14-Day Free Trial
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="#pricing" className="btn-secondary text-base px-8 py-3.5">
              View Pricing
            </a>
          </div>
          <p className="text-sm text-slate-500 mt-4">No credit card required. Cancel anytime.</p>
        </div>

        {/* Stats bar */}
        <div className="max-w-4xl mx-auto mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '31,000+', label: 'Establishments in Virginia alone' },
            { value: '9.5%', label: 'Industry CAGR through 2033' },
            { value: '100%', label: 'Jurisdiction-specific rules' },
            { value: '85%', label: 'Reduction in compliance admin time' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-navy-700">{stat.value}</div>
              <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Problem statement */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-navy-950 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Sound familiar?</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {[
              'Your food handler certifications are tracked in a spreadsheet nobody maintains.',
              'You found out a health permit expired the day the inspector showed up.',
              'You manage 3 locations and have no unified view of compliance status.',
              'Virginia requires 30 days to certify staff. Maryland requires 14. You can\'t keep track.',
              'Your last inspection had violations you could have fixed if you\'d known in advance.',
              'Equipment maintenance logs are on paper in a binder that nobody can find.',
            ].map((pain) => (
              <div key={pain} className="flex items-start gap-3 bg-white/5 rounded-lg p-4">
                <span className="text-red-400 mt-0.5 text-lg flex-shrink-0">✗</span>
                <span className="text-slate-300 text-sm">{pain}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <p className="text-2xl font-semibold text-white">Compliance Vault fixes all of this.</p>
            <Link href="/signup" className="mt-6 inline-flex btn-primary bg-emerald-500 hover:bg-emerald-600 text-white text-base px-8 py-3.5">
              See It In Action
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900">Everything you need to stay compliant</h2>
            <p className="text-lg text-slate-600 mt-4 max-w-2xl mx-auto">
              Built specifically for food service operators — not generic compliance software adapted from another industry.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="compliance-card hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-navy-50 flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-navy-700" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900">Operators who sleep better</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="compliance-card">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-4 italic">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                  <p className="text-slate-500 text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900">Simple, transparent pricing</h2>
            <p className="text-lg text-slate-600 mt-4">14-day free trial. No credit card required. Cancel anytime.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map(([key, tier], idx) => (
              <div
                key={key}
                className={`compliance-card relative flex flex-col ${
                  idx === 1 ? 'ring-2 ring-navy-700 shadow-lg scale-105' : ''
                }`}
              >
                {idx === 1 && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-navy-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900">{tier.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">{tier.description}</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-slate-900">${tier.price}</span>
                  <span className="text-slate-500 text-sm">/month</span>
                  {key === 'enterprise' && (
                    <span className="text-slate-500 text-sm block mt-1">starting at</span>
                  )}
                </div>
                <ul className="space-y-2.5 flex-1 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/signup?plan=${key}`}
                  className={`w-full text-center py-3 rounded-lg text-sm font-semibold transition-colors ${
                    idx === 1
                      ? 'bg-navy-700 text-white hover:bg-navy-800'
                      : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  Start Free Trial
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-500 mt-8">
            Annual plans available at 10% discount. Enterprise pricing includes custom setup.{' '}
            <Link href="/signup" className="text-navy-700 font-medium hover:underline">
              Contact us
            </Link>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-navy-950 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">The inspector is coming. Are you ready?</h2>
          <p className="text-slate-300 text-lg mb-8">
            Join food service operators across Virginia who use Compliance Vault to walk into every inspection with confidence.
          </p>
          <Link href="/signup" className="btn-primary bg-emerald-500 hover:bg-emerald-600 text-base px-10 py-4">
            Start Your Free Trial Today
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-slate-500 text-sm mt-4">14-day trial. No credit card. Full access.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-navy-700 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-900">Compliance Vault</span>
            <span className="text-slate-400 text-sm ml-2">A Keystone Operations Group Company</span>
          </div>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link href="/privacy" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
            <a href="mailto:hello@compliancevault.io" className="hover:text-slate-900 transition-colors">Contact</a>
          </div>
          <p className="text-slate-400 text-sm">&copy; {new Date().getFullYear()} Compliance Vault LLC</p>
        </div>
      </footer>
    </div>
  )
}
