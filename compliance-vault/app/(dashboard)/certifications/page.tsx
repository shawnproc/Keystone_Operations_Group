'use client'

import { useState } from 'react'
import { Plus, Search, Filter, Upload, Download } from 'lucide-react'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { formatDate, getComplianceStatus, getDaysUntilExpiry, certTypeLabel } from '@/lib/utils'

const DEMO_CERTIFICATIONS = [
  { id: '1', employee: 'Maria Santos',   role: 'Line Cook',    location: 'Main Street',    certType: 'food_handler',            certNumber: 'VA-FH-29341', expiryDate: '2026-06-19', issuedBy: 'Virginia Dept. of Health' },
  { id: '2', employee: 'James Lee',      role: 'Shift Manager', location: 'Main Street',   certType: 'food_protection_manager', certNumber: 'SS-MGR-88291', expiryDate: '2026-07-08', issuedBy: 'ServSafe' },
  { id: '3', employee: 'Diane Okafor',   role: 'Head Chef',    location: 'Downtown Hub',   certType: 'serve_safe',              certNumber: 'SS-88172',     expiryDate: '2026-09-14', issuedBy: 'National Restaurant Assoc.' },
  { id: '4', employee: 'Kevin Morales',  role: 'Line Cook',    location: 'Downtown Hub',   certType: 'food_handler',            certNumber: 'VA-FH-30102', expiryDate: '2026-11-20', issuedBy: 'Virginia Dept. of Health' },
  { id: '5', employee: 'Sarah Chen',     role: 'Sous Chef',    location: 'Northside',      certType: 'haccp',                   certNumber: 'HACCP-4421',   expiryDate: '2027-01-15', issuedBy: 'NSF International' },
  { id: '6', employee: 'Tony Ruiz',      role: 'Prep Cook',    location: 'Northside',      certType: 'food_handler',            certNumber: 'VA-FH-31901', expiryDate: '2025-12-31', issuedBy: 'Virginia Dept. of Health' },
  { id: '7', employee: 'Amara Wilson',   role: 'Food Runner',  location: 'Main Street',    certType: 'allergen_awareness',      certNumber: 'ALE-2291',    expiryDate: '2027-03-10', issuedBy: 'AllerTrain' },
  { id: '8', employee: 'Chris Park',     role: 'Manager',      location: 'Downtown Hub',   certType: 'food_protection_manager', certNumber: 'SS-MGR-77102', expiryDate: '2026-12-05', issuedBy: 'ServSafe' },
]

type FilterStatus = 'all' | 'compliant' | 'due_soon' | 'overdue' | 'critical'

export default function CertificationsPage() {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all')

  const filtered = DEMO_CERTIFICATIONS.filter((cert) => {
    const status = getComplianceStatus(cert.expiryDate)
    const matchesSearch =
      cert.employee.toLowerCase().includes(search.toLowerCase()) ||
      cert.location.toLowerCase().includes(search.toLowerCase()) ||
      certTypeLabel(cert.certType).toLowerCase().includes(search.toLowerCase())
    const matchesStatus = filterStatus === 'all' || status === filterStatus
    return matchesSearch && matchesStatus
  })

  const counts = {
    all:       DEMO_CERTIFICATIONS.length,
    critical:  DEMO_CERTIFICATIONS.filter(c => getComplianceStatus(c.expiryDate) === 'critical').length,
    due_soon:  DEMO_CERTIFICATIONS.filter(c => getComplianceStatus(c.expiryDate) === 'due_soon').length,
    overdue:   DEMO_CERTIFICATIONS.filter(c => getComplianceStatus(c.expiryDate) === 'overdue').length,
    compliant: DEMO_CERTIFICATIONS.filter(c => getComplianceStatus(c.expiryDate) === 'compliant').length,
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Employee Certifications</h1>
          <p className="text-slate-500 text-sm mt-0.5">Track every food handler cert, ServSafe credential, and training requirement</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary text-xs py-2">
            <Upload className="w-3.5 h-3.5" />
            Import CSV
          </button>
          <button className="btn-secondary text-xs py-2">
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
          <button className="btn-primary text-xs py-2">
            <Plus className="w-3.5 h-3.5" />
            Add Certification
          </button>
        </div>
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {([
          { key: 'all',      label: 'All',          count: counts.all },
          { key: 'critical', label: 'Critical',      count: counts.critical },
          { key: 'due_soon', label: 'Due Soon',      count: counts.due_soon },
          { key: 'overdue',  label: 'Overdue',       count: counts.overdue },
          { key: 'compliant', label: 'Compliant',   count: counts.compliant },
        ] as const).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilterStatus(tab.key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              filterStatus === tab.key
                ? 'bg-navy-700 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            {tab.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
              filterStatus === tab.key ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="compliance-card p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input pl-9"
            placeholder="Search by employee name, location, or certification type..."
          />
        </div>
      </div>

      {/* Table */}
      <div className="compliance-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="table-header rounded-tl-xl">Employee</th>
                <th className="table-header">Certification</th>
                <th className="table-header">Location</th>
                <th className="table-header">Cert #</th>
                <th className="table-header">Expires</th>
                <th className="table-header">Days Left</th>
                <th className="table-header rounded-tr-xl">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-slate-500 text-sm">
                    No certifications found matching your search.
                  </td>
                </tr>
              ) : (
                filtered.map((cert) => {
                  const status = getComplianceStatus(cert.expiryDate)
                  const daysLeft = getDaysUntilExpiry(cert.expiryDate)
                  return (
                    <tr key={cert.id} className="hover:bg-slate-50 transition-colors cursor-pointer">
                      <td className="table-cell">
                        <div>
                          <p className="font-medium text-slate-900">{cert.employee}</p>
                          <p className="text-xs text-slate-500">{cert.role}</p>
                        </div>
                      </td>
                      <td className="table-cell">
                        <div>
                          <p className="font-medium text-slate-700">{certTypeLabel(cert.certType)}</p>
                          <p className="text-xs text-slate-400">{cert.issuedBy}</p>
                        </div>
                      </td>
                      <td className="table-cell">
                        <span className="text-slate-700">{cert.location}</span>
                      </td>
                      <td className="table-cell">
                        <span className="font-mono text-xs text-slate-500">{cert.certNumber}</span>
                      </td>
                      <td className="table-cell">
                        <span className="text-slate-700">{formatDate(cert.expiryDate)}</span>
                      </td>
                      <td className="table-cell">
                        <span className={`font-semibold text-sm ${
                          daysLeft < 0    ? 'text-red-600' :
                          daysLeft <= 14  ? 'text-red-500' :
                          daysLeft <= 30  ? 'text-amber-500' :
                          'text-slate-700'
                        }`}>
                          {daysLeft < 0 ? `${Math.abs(daysLeft)}d overdue` : `${daysLeft}d`}
                        </span>
                      </td>
                      <td className="table-cell">
                        <StatusBadge status={status} />
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
