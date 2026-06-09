import { Users, FileText, ClipboardList, Wrench, AlertTriangle, CheckCircle } from 'lucide-react'
import { MetricCard } from '@/components/dashboard/MetricCard'
import { ComplianceScoreGauge } from '@/components/dashboard/ComplianceScoreGauge'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { formatDate, getComplianceStatus } from '@/lib/utils'
import Link from 'next/link'

// Sample data — replace with Supabase queries once connected
const DEMO_ALERTS = [
  { id: '1', type: 'certification', name: 'Maria Santos — Food Handler Cert', expiry: '2026-06-19', severity: 'critical' as const },
  { id: '2', type: 'permit',        name: 'Main Street Location — Health Permit', expiry: '2026-07-01', severity: 'warning' as const },
  { id: '3', type: 'certification', name: 'James Lee — ServSafe Manager', expiry: '2026-07-08', severity: 'warning' as const },
  { id: '4', type: 'equipment',     name: 'Walk-In Refrigerator — Service Due', expiry: '2026-06-15', severity: 'critical' as const },
]

const DEMO_RECENT_INSPECTIONS = [
  { id: '1', location: 'Main Street Location',    date: '2026-04-22', score: 96, result: 'pass',                violations: 0 },
  { id: '2', location: 'Downtown Catering Hub',   date: '2026-03-11', score: 88, result: 'pass_with_violations', violations: 2 },
  { id: '3', location: 'Northside Commissary',    date: '2026-02-05', score: 74, result: 'pass_with_violations', violations: 4 },
]

const inspectionResultStyles: Record<string, string> = {
  pass:                 'text-emerald-600 bg-emerald-50 ring-emerald-200',
  pass_with_violations: 'text-amber-600 bg-amber-50 ring-amber-200',
  fail:                 'text-red-600 bg-red-50 ring-red-200',
  critical_fail:        'text-red-700 bg-red-100 ring-red-300',
}

const inspectionResultLabels: Record<string, string> = {
  pass:                 'Pass',
  pass_with_violations: 'Pass w/ Violations',
  fail:                 'Fail',
  critical_fail:        'Critical Fail',
}

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Compliance Dashboard</h1>
          <p className="text-slate-500 text-sm mt-0.5">Your compliance overview — all locations</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/inspections" className="btn-secondary text-xs py-2">
            View Inspection History
          </Link>
          <button className="btn-primary text-xs py-2">
            Generate Audit Report
          </button>
        </div>
      </div>

      {/* Score + Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Compliance Score */}
        <div className="compliance-card lg:col-span-1 flex flex-col items-center justify-center">
          <ComplianceScoreGauge score={82} />
        </div>

        {/* Metric cards */}
        <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-4">
          <MetricCard
            title="Active Employees"
            value={47}
            subtitle="3 locations"
            icon={Users}
            status="neutral"
          />
          <MetricCard
            title="Certs Expiring (30d)"
            value={3}
            subtitle="2 critical"
            icon={FileText}
            status="warning"
          />
          <MetricCard
            title="Permits Expiring (30d)"
            value={1}
            subtitle="All locations"
            icon={FileText}
            status="warning"
          />
          <MetricCard
            title="Last Inspection Score"
            value="96/100"
            subtitle="Main St — Apr 22"
            icon={ClipboardList}
            status="good"
          />
          <MetricCard
            title="Open Violations"
            value={2}
            subtitle="Corrective action needed"
            icon={AlertTriangle}
            status="warning"
          />
          <MetricCard
            title="Equipment Due Service"
            value={1}
            subtitle="Walk-in refrigerator"
            icon={Wrench}
            status="danger"
          />
        </div>
      </div>

      {/* Alerts + Recent Inspections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Deadlines */}
        <div className="compliance-card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-slate-900">Upcoming Deadlines</h2>
            <span className="text-xs text-slate-500">Next 30 days</span>
          </div>
          <div className="space-y-3">
            {DEMO_ALERTS.map((alert) => {
              const status = getComplianceStatus(alert.expiry)
              return (
                <div key={alert.id} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      alert.severity === 'critical' ? 'bg-red-50' : 'bg-amber-50'
                    }`}>
                      {alert.severity === 'critical'
                        ? <AlertTriangle className="w-4 h-4 text-red-500" />
                        : <AlertTriangle className="w-4 h-4 text-amber-500" />
                      }
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 leading-tight">{alert.name}</p>
                      <p className="text-xs text-slate-500">Expires {formatDate(alert.expiry)}</p>
                    </div>
                  </div>
                  <StatusBadge status={status} />
                </div>
              )
            })}
          </div>
          <Link href="/certifications" className="mt-4 flex items-center text-xs font-medium text-navy-700 hover:text-navy-800">
            View all certifications →
          </Link>
        </div>

        {/* Recent Inspections */}
        <div className="compliance-card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-slate-900">Recent Inspections</h2>
            <Link href="/inspections" className="text-xs text-navy-700 hover:text-navy-800 font-medium">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {DEMO_RECENT_INSPECTIONS.map((inspection) => (
              <div key={inspection.id} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-slate-900">{inspection.location}</p>
                  <p className="text-xs text-slate-500">{formatDate(inspection.date)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-slate-900">{inspection.score}</span>
                  <span className={`status-badge ring-1 ${inspectionResultStyles[inspection.result]}`}>
                    {inspectionResultLabels[inspection.result]}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Link href="/inspections" className="mt-4 flex items-center text-xs font-medium text-navy-700 hover:text-navy-800">
            View full inspection history →
          </Link>
        </div>
      </div>

      {/* Quick actions */}
      <div className="compliance-card">
        <h2 className="font-semibold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { href: '/certifications',  label: 'Add Certification',  icon: FileText,     color: 'bg-blue-50 text-blue-600' },
            { href: '/employees',       label: 'Add Employee',        icon: Users,        color: 'bg-purple-50 text-purple-600' },
            { href: '/inspections',     label: 'Log Inspection',      icon: ClipboardList, color: 'bg-emerald-50 text-emerald-600' },
            { href: '/equipment',       label: 'Add Equipment',       icon: Wrench,       color: 'bg-amber-50 text-amber-600' },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="flex items-center gap-3 p-3.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${action.color}`}>
                <action.icon className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-slate-700">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
