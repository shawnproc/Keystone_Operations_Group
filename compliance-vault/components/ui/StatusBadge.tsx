import { cn, statusLabel, statusColor } from '@/lib/utils'
import type { ComplianceStatus } from '@/lib/supabase/types'

interface StatusBadgeProps {
  status: ComplianceStatus
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span className={cn('status-badge', statusColor(status), className)}>
      <span className={cn(
        'w-1.5 h-1.5 rounded-full',
        status === 'compliant' ? 'bg-emerald-500' :
        status === 'due_soon'  ? 'bg-amber-500' :
        'bg-red-500'
      )} />
      {statusLabel(status)}
    </span>
  )
}
