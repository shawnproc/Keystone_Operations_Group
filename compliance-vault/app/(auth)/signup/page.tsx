'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ShieldCheck, Eye, EyeOff, Loader2, CheckCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { TIER_DETAILS } from '@/lib/stripe'

export default function SignupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialPlan = (searchParams.get('plan') ?? 'growth') as keyof typeof TIER_DETAILS

  const [form, setForm] = useState({
    orgName: '',
    email: '',
    password: '',
    plan: initialPlan,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.')
      setLoading(false)
      return
    }

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          org_name: form.orgName,
          plan: form.plan,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  const selectedTier = TIER_DETAILS[form.plan]

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left panel */}
      <div className="hidden lg:flex w-1/2 bg-navy-950 text-white flex-col p-12">
        <div className="flex items-center gap-2 mb-12">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold">Compliance Vault</span>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{selectedTier.name} Plan</h2>
          <p className="text-slate-400 text-sm mb-6">{selectedTier.description}</p>
          <p className="text-4xl font-extrabold mb-1">${selectedTier.price}<span className="text-xl text-slate-400 font-normal">/mo</span></p>
          <p className="text-emerald-400 text-sm mb-8">14-day free trial included</p>
          <ul className="space-y-3">
            {selectedTier.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-slate-500 text-sm mt-auto">
          A Keystone Operations Group Company &copy; {new Date().getFullYear()}
        </p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-navy-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900">Compliance Vault</span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 mb-1">Start your free trial</h1>
          <p className="text-slate-500 text-sm mb-8">14 days free. No credit card required.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="orgName" className="form-label">Business / Organization name</label>
              <input
                id="orgName"
                type="text"
                value={form.orgName}
                onChange={(e) => update('orgName', e.target.value)}
                className="form-input"
                placeholder="Riverside Restaurant Group"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="form-label">Work email</label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                className="form-input"
                placeholder="you@yourrestaurant.com"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="password" className="form-label">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => update('password', e.target.value)}
                  className="form-input pr-10"
                  placeholder="Min. 8 characters"
                  required
                  minLength={8}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="form-label">Select plan</label>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(TIER_DETAILS) as Array<keyof typeof TIER_DETAILS>).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => update('plan', key)}
                    className={`py-2.5 px-3 rounded-lg border text-sm font-medium transition-all ${
                      form.plan === key
                        ? 'border-navy-700 bg-navy-700 text-white'
                        : 'border-slate-300 text-slate-700 hover:border-slate-400'
                    }`}
                  >
                    <div>{TIER_DETAILS[key].name}</div>
                    <div className="text-xs font-normal opacity-80">${TIER_DETAILS[key].price}/mo</div>
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3 mt-2">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create free account'
              )}
            </button>

            <p className="text-xs text-slate-500 text-center">
              By signing up you agree to our{' '}
              <Link href="/terms" className="text-navy-700 hover:underline">Terms of Service</Link>
              {' '}and{' '}
              <Link href="/privacy" className="text-navy-700 hover:underline">Privacy Policy</Link>
            </p>
          </form>

          <p className="text-center text-sm text-slate-600 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-navy-700 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
