'use client'

import { useState } from 'react'
import { CreditCard, Bell, Building2, Shield, ExternalLink, CheckCircle } from 'lucide-react'
import { TIER_DETAILS } from '@/lib/stripe'

const CURRENT_PLAN = 'growth'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'billing' | 'alerts' | 'organization' | 'security'>('billing')
  const [alertSettings, setAlertSettings] = useState({
    emailAlerts: true,
    smsAlerts: true,
    days30: true,
    days14: true,
    days7: true,
    emailAddress: 'rashawn@keystoneopsgroup.com',
    phoneNumber: '+1 (540) 555-0100',
  })

  const tabs = [
    { key: 'billing'      as const, label: 'Billing & Plan',    icon: CreditCard },
    { key: 'alerts'       as const, label: 'Alert Settings',    icon: Bell },
    { key: 'organization' as const, label: 'Organization',      icon: Building2 },
    { key: 'security'     as const, label: 'Security',          icon: Shield },
  ]

  const tier = TIER_DETAILS[CURRENT_PLAN]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 text-sm mt-0.5">Manage your account, billing, and notification preferences</p>
      </div>

      <div className="flex gap-1 bg-white rounded-xl border border-slate-200 p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.key
                ? 'bg-navy-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Billing tab */}
      {activeTab === 'billing' && (
        <div className="space-y-4">
          {/* Current plan */}
          <div className="compliance-card">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">Current Plan</h2>
                <p className="text-sm text-slate-500 mt-0.5">Your subscription details</p>
              </div>
              <span className="bg-navy-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {tier.name}
              </span>
            </div>
            <div className="mt-4 p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-bold text-slate-900">${tier.price}<span className="text-base font-normal text-slate-500">/month</span></span>
                <span className="text-sm text-emerald-600 font-medium">Active · Renews Jul 9, 2026</span>
              </div>
              <ul className="grid grid-cols-2 gap-1.5">
                {tier.features.slice(0, 4).map((f) => (
                  <li key={f} className="flex items-center gap-1.5 text-xs text-slate-600">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex gap-3 mt-4">
              <button className="btn-primary text-xs py-2">
                <ExternalLink className="w-3.5 h-3.5" />
                Manage Billing Portal
              </button>
              <button className="btn-secondary text-xs py-2">
                Upgrade Plan
              </button>
            </div>
          </div>

          {/* Plan comparison */}
          <div className="compliance-card">
            <h2 className="font-semibold text-slate-900 mb-4">Available Plans</h2>
            <div className="grid grid-cols-3 gap-4">
              {(Object.entries(TIER_DETAILS) as [string, typeof TIER_DETAILS[keyof typeof TIER_DETAILS]][]).map(([key, plan]) => (
                <div
                  key={key}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    key === CURRENT_PLAN
                      ? 'border-navy-700 bg-navy-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <p className="font-bold text-slate-900">{plan.name}</p>
                  <p className="text-2xl font-extrabold text-slate-900 mt-1">${plan.price}<span className="text-xs font-normal text-slate-400">/mo</span></p>
                  <p className="text-xs text-slate-500 mt-1">{plan.description}</p>
                  {key === CURRENT_PLAN ? (
                    <span className="mt-3 block text-center text-xs font-semibold text-navy-700 bg-navy-100 rounded-lg py-1.5">Current Plan</span>
                  ) : (
                    <button className="mt-3 w-full text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg py-1.5 hover:bg-slate-200 transition-colors">
                      {key === 'enterprise' ? 'Contact Sales' : 'Upgrade'}
                    </button>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-3">10% discount on annual plans. Contact us for custom enterprise pricing.</p>
          </div>
        </div>
      )}

      {/* Alerts tab */}
      {activeTab === 'alerts' && (
        <div className="space-y-4">
          <div className="compliance-card">
            <h2 className="font-semibold text-slate-900 mb-4">Notification Channels</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div>
                  <p className="text-sm font-medium text-slate-900">Email Alerts</p>
                  <p className="text-xs text-slate-500">{alertSettings.emailAddress}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={alertSettings.emailAlerts}
                    onChange={(e) => setAlertSettings(p => ({ ...p, emailAlerts: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-navy-700 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div>
                  <p className="text-sm font-medium text-slate-900">SMS Alerts</p>
                  <p className="text-xs text-slate-500">{alertSettings.phoneNumber}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={alertSettings.smsAlerts}
                    onChange={(e) => setAlertSettings(p => ({ ...p, smsAlerts: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:bg-navy-700 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
                </label>
              </div>
            </div>
          </div>

          <div className="compliance-card">
            <h2 className="font-semibold text-slate-900 mb-4">Alert Timing</h2>
            <p className="text-sm text-slate-500 mb-4">Send alerts when certifications or permits are due within:</p>
            <div className="space-y-3">
              {[
                { key: 'days30' as const, label: '30 days before expiration', sublabel: 'Recommended' },
                { key: 'days14' as const, label: '14 days before expiration', sublabel: 'Standard' },
                { key: 'days7'  as const, label: '7 days before expiration',  sublabel: 'Urgent' },
              ].map((option) => (
                <label key={option.key} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{option.label}</p>
                    <p className="text-xs text-slate-500">{option.sublabel}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={alertSettings[option.key]}
                    onChange={(e) => setAlertSettings(p => ({ ...p, [option.key]: e.target.checked }))}
                    className="w-4 h-4 rounded accent-navy-700"
                  />
                </label>
              ))}
            </div>
            <button className="btn-primary text-xs py-2 mt-4">Save Alert Settings</button>
          </div>
        </div>
      )}

      {/* Organization tab */}
      {activeTab === 'organization' && (
        <div className="compliance-card">
          <h2 className="font-semibold text-slate-900 mb-6">Organization Details</h2>
          <div className="space-y-4 max-w-lg">
            {[
              { id: 'orgName',   label: 'Organization Name',    value: 'Keystone Ops Restaurant Group',  type: 'text' },
              { id: 'orgEmail',  label: 'Billing Email',         value: 'rashawn@keystoneopsgroup.com',  type: 'email' },
              { id: 'orgPhone',  label: 'Primary Phone',         value: '+1 (540) 555-0100',             type: 'tel' },
              { id: 'orgState',  label: 'Primary State',         value: 'Virginia',                      type: 'text' },
            ].map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id} className="form-label">{field.label}</label>
                <input
                  id={field.id}
                  type={field.type}
                  defaultValue={field.value}
                  className="form-input"
                />
              </div>
            ))}
            <button className="btn-primary text-xs py-2">Save Changes</button>
          </div>
        </div>
      )}

      {/* Security tab */}
      {activeTab === 'security' && (
        <div className="space-y-4">
          <div className="compliance-card">
            <h2 className="font-semibold text-slate-900 mb-4">Change Password</h2>
            <div className="space-y-4 max-w-sm">
              <div>
                <label className="form-label">Current Password</label>
                <input type="password" className="form-input" placeholder="••••••••" />
              </div>
              <div>
                <label className="form-label">New Password</label>
                <input type="password" className="form-input" placeholder="Min. 8 characters" />
              </div>
              <div>
                <label className="form-label">Confirm New Password</label>
                <input type="password" className="form-input" placeholder="••••••••" />
              </div>
              <button className="btn-primary text-xs py-2">Update Password</button>
            </div>
          </div>

          <div className="compliance-card bg-red-50 border-red-200">
            <h2 className="font-semibold text-red-900 mb-2">Danger Zone</h2>
            <p className="text-sm text-red-700 mb-4">
              Deleting your account permanently removes all compliance data, certifications, and inspection records. This cannot be undone.
            </p>
            <button className="btn-danger text-xs py-2">
              Delete Account
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
