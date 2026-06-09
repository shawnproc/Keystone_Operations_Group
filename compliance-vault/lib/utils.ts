import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { differenceInDays, format, parseISO } from 'date-fns'
import type { ComplianceStatus } from './supabase/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getComplianceStatus(expiryDateStr: string): ComplianceStatus {
  const expiry = parseISO(expiryDateStr)
  const daysUntil = differenceInDays(expiry, new Date())
  if (daysUntil < 0)  return 'overdue'
  if (daysUntil <= 14) return 'critical'
  if (daysUntil <= 30) return 'due_soon'
  return 'compliant'
}

export function getDaysUntilExpiry(expiryDateStr: string): number {
  return differenceInDays(parseISO(expiryDateStr), new Date())
}

export function formatDate(dateStr: string): string {
  return format(parseISO(dateStr), 'MMM d, yyyy')
}

export function formatDateShort(dateStr: string): string {
  return format(parseISO(dateStr), 'MM/dd/yyyy')
}

export function statusLabel(status: ComplianceStatus): string {
  switch (status) {
    case 'compliant':  return 'Compliant'
    case 'due_soon':   return 'Due Soon'
    case 'overdue':    return 'Overdue'
    case 'critical':   return 'Critical'
  }
}

export function statusColor(status: ComplianceStatus): string {
  switch (status) {
    case 'compliant':  return 'text-emerald-600 bg-emerald-50 ring-emerald-200'
    case 'due_soon':   return 'text-amber-600 bg-amber-50 ring-amber-200'
    case 'overdue':    return 'text-red-600 bg-red-50 ring-red-200'
    case 'critical':   return 'text-red-700 bg-red-100 ring-red-300'
  }
}

export function calcComplianceScore(metrics: {
  certsExpired: number
  certsExpiringSoon: number
  permitsExpired: number
  permitsExpiringSoon: number
  equipmentNeedsService: number
  openViolations: number
  totalItems: number
}): number {
  if (metrics.totalItems === 0) return 100
  const deductions =
    metrics.certsExpired * 10 +
    metrics.certsExpiringSoon * 3 +
    metrics.permitsExpired * 15 +
    metrics.permitsExpiringSoon * 5 +
    metrics.equipmentNeedsService * 2 +
    metrics.openViolations * 8
  return Math.max(0, Math.min(100, 100 - deductions))
}

export function certTypeLabel(certType: string): string {
  const labels: Record<string, string> = {
    food_handler:             'Food Handler',
    food_protection_manager:  'Food Protection Manager',
    allergen_awareness:       'Allergen Awareness',
    serve_safe:               'ServSafe',
    haccp:                    'HACCP',
    food_safety_manager:      'Food Safety Manager',
    mobile_food_facility:     'Mobile Food Facility',
    alcohol_servers:          'Alcohol Server',
  }
  return labels[certType] ?? certType.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}
