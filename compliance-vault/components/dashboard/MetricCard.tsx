import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  title: string
  value: number | string
  subtitle?: string
  icon: LucideIcon
  status?: 'good' | 'warning' | 'danger' | 'neutral'
  href?: string
}

const statusStyles = {
  good:    'bg-emerald-50 text-emerald-600 ring-emerald-100',
  warning: 'bg-amber-50 text-amber-600 ring-amber-100',
  danger:  'bg-red-50 text-red-600 ring-red-100',
  neutral: 'bg-slate-50 text-slate-600 ring-slate-100',
}

export function MetricCard({ title, value, subtitle, icon: Icon, status = 'neutral' }: MetricCardProps) {
  return (
    <div className="compliance-card hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">{value}</p>
          {subtitle && (
            <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={cn(
          'w-10 h-10 rounded-lg flex items-center justify-center ring-1',
          statusStyles[status]
        )}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  )
}
