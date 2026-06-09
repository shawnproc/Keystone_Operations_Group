'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ShieldCheck, LayoutDashboard, Users, FileText,
  ClipboardList, Wrench, MapPin, Settings, LogOut, Bell
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard',       label: 'Dashboard',     icon: LayoutDashboard },
  { href: '/certifications',  label: 'Certifications', icon: Users },
  { href: '/permits',         label: 'Permits',        icon: FileText },
  { href: '/inspections',     label: 'Inspections',    icon: ClipboardList },
  { href: '/equipment',       label: 'Equipment',      icon: Wrench },
  { href: '/locations',       label: 'Locations',      icon: MapPin },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <div className="flex flex-col h-full bg-navy-950 text-white w-64 flex-shrink-0">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-sm leading-none">Compliance Vault</p>
            <p className="text-xs text-slate-400 mt-0.5">by Keystone Ops</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                isActive
                  ? 'bg-white/15 text-white'
                  : 'text-slate-400 hover:bg-white/8 hover:text-white'
              )}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-3 border-t border-white/10 space-y-0.5">
        <Link
          href="/settings"
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
            pathname.startsWith('/settings')
              ? 'bg-white/15 text-white'
              : 'text-slate-400 hover:bg-white/8 hover:text-white'
          )}
        >
          <Settings className="w-4 h-4" />
          Settings & Billing
        </Link>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-white/8 hover:text-white transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </div>
  )
}
