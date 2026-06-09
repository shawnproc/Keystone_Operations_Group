'use client'

import { useState } from 'react'
import { Plus, Search, Download, FileText } from 'lucide-react'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { formatDate, getComplianceStatus, getDaysUntilExpiry } from '@/lib/utils'

const DEMO_PERMITS = [
  { id: '1', location: 'Main Street Location',   permitType: 'Health Operating Permit',      permitNumber: 'VDH-2024-FR-00421', issuingAuthority: 'Fredericksburg Health Dept.', issueDate: '2024-07-01', expiryDate: '2026-07-01', renewalCost: 350 },
  { id: '2', location: 'Main Street Location',   permitType: 'Food Handler Establishment',   permitNumber: 'VA-EST-88201',       issuingAuthority: 'Virginia Board of Health',   issueDate: '2024-07-01', expiryDate: '2026-07-01', renewalCost: 150 },
  { id: '3', location: 'Downtown Catering Hub',  permitType: 'Health Operating Permit',      permitNumber: 'VDH-2024-AR-00892', issuingAuthority: 'Arlington County Health',    issueDate: '2024-09-15', expiryDate: '2026-09-15', renewalCost: 400 },
  { id: '4', location: 'Downtown Catering Hub',  permitType: 'Mobile Catering Permit',       permitNumber: 'ARL-MOB-1102',       issuingAuthority: 'Arlington County',           issueDate: '2025-01-20', expiryDate: '2026-12-20', renewalCost: 200 },
  { id: '5', location: 'Northside Commissary',   permitType: 'Health Operating Permit',      permitNumber: 'VDH-2025-SP-00310', issuingAuthority: 'Spotsylvania Health Dept.',  issueDate: '2025-02-10', expiryDate: '2027-02-10', renewalCost: 325 },
  { id: '6', location: 'Northside Commissary',   permitType: 'Commissary Kitchen License',   permitNumber: 'SP-CK-0042',         issuingAuthority: 'Spotsylvania County',        issueDate: '2025-02-10', expiryDate: '2027-02-10', renewalCost: 175 },
]

export default function PermitsPage() {
  const [search, setSearch] = useState('')

  const filtered = DEMO_PERMITS.filter((permit) =>
    permit.location.toLowerCase().includes(search.toLowerCase()) ||
    permit.permitType.toLowerCase().includes(search.toLowerCase()) ||
    permit.permitNumber.toLowerCase().includes(search.toLowerCase())
  )

  const totals = {
    active:   DEMO_PERMITS.filter(p => getComplianceStatus(p.expiryDate) === 'compliant').length,
    expiring: DEMO_PERMITS.filter(p => ['due_soon', 'critical'].includes(getComplianceStatus(p.expiryDate))).length,
    expired:  DEMO_PERMITS.filter(p => getComplianceStatus(p.expiryDate) === 'overdue').length,
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Health Permits</h1>
          <p className="text-slate-500 text-sm mt-0.5">Track permit renewals across all locations and jurisdictions</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary text-xs py-2">
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
          <button className="btn-primary text-xs py-2">
            <Plus className="w-3.5 h-3.5" />
            Add Permit
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="compliance-card text-center">
          <p className="text-3xl font-bold text-emerald-600">{totals.active}</p>
          <p className="text-sm text-slate-500 mt-1">Active Permits</p>
        </div>
        <div className="compliance-card text-center">
          <p className="text-3xl font-bold text-amber-500">{totals.expiring}</p>
          <p className="text-sm text-slate-500 mt-1">Expiring (90 days)</p>
        </div>
        <div className="compliance-card text-center">
          <p className="text-3xl font-bold text-red-600">{totals.expired}</p>
          <p className="text-sm text-slate-500 mt-1">Expired</p>
        </div>
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
            placeholder="Search by location, permit type, or permit number..."
          />
        </div>
      </div>

      {/* Table */}
      <div className="compliance-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="table-header">Location</th>
                <th className="table-header">Permit Type</th>
                <th className="table-header">Permit #</th>
                <th className="table-header">Issuing Authority</th>
                <th className="table-header">Expires</th>
                <th className="table-header">Days Left</th>
                <th className="table-header">Renewal Cost</th>
                <th className="table-header">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((permit) => {
                const status = getComplianceStatus(permit.expiryDate)
                const daysLeft = getDaysUntilExpiry(permit.expiryDate)
                return (
                  <tr key={permit.id} className="hover:bg-slate-50 transition-colors cursor-pointer">
                    <td className="table-cell">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-4 h-4 text-blue-500" />
                        </div>
                        <span className="font-medium text-slate-900 text-sm">{permit.location}</span>
                      </div>
                    </td>
                    <td className="table-cell text-slate-700">{permit.permitType}</td>
                    <td className="table-cell">
                      <span className="font-mono text-xs text-slate-500">{permit.permitNumber}</span>
                    </td>
                    <td className="table-cell text-slate-600 text-xs">{permit.issuingAuthority}</td>
                    <td className="table-cell text-slate-700">{formatDate(permit.expiryDate)}</td>
                    <td className="table-cell">
                      <span className={`font-semibold text-sm ${
                        daysLeft < 0   ? 'text-red-600' :
                        daysLeft <= 30 ? 'text-amber-500' :
                        'text-slate-700'
                      }`}>
                        {daysLeft < 0 ? `${Math.abs(daysLeft)}d overdue` : `${daysLeft}d`}
                      </span>
                    </td>
                    <td className="table-cell">
                      <span className="text-slate-700 font-medium">${permit.renewalCost}</span>
                    </td>
                    <td className="table-cell">
                      <StatusBadge status={status} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Virginia jurisdiction info */}
      <div className="compliance-card bg-blue-50 border-blue-200">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
            <FileText className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-blue-900">Virginia Jurisdiction Note</p>
            <p className="text-sm text-blue-700 mt-1">
              Virginia health permits are issued at the county/city level and must be renewed annually.
              Permits issued by the Virginia Department of Health require renewal by the last day of the month they were originally issued.
              Late renewal fees apply after the expiration date.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
