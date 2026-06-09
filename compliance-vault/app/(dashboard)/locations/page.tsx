'use client'

import { Plus, MapPin, Users, FileText, ClipboardList, TrendingUp } from 'lucide-react'
import Link from 'next/link'

const DEMO_LOCATIONS = [
  {
    id: '1',
    name: 'Main Street Location',
    address: '421 William St, Fredericksburg, VA 22401',
    phone: '(540) 555-0142',
    type: 'Restaurant',
    employees: 18,
    complianceScore: 94,
    lastInspectionScore: 96,
    lastInspectionDate: '2026-04-22',
    certExpiringSoon: 2,
    openViolations: 0,
    permitExpiry: '2026-07-01',
  },
  {
    id: '2',
    name: 'Downtown Catering Hub',
    address: '1804 Columbia Pike, Arlington, VA 22204',
    phone: '(571) 555-0278',
    type: 'Catering',
    employees: 22,
    complianceScore: 81,
    lastInspectionScore: 88,
    lastInspectionDate: '2026-03-11',
    certExpiringSoon: 1,
    openViolations: 0,
    permitExpiry: '2026-09-15',
  },
  {
    id: '3',
    name: 'Northside Commissary',
    address: '9210 Courthouse Rd, Spotsylvania, VA 22553',
    phone: '(540) 555-0391',
    type: 'Commissary',
    employees: 12,
    complianceScore: 71,
    lastInspectionScore: 74,
    lastInspectionDate: '2026-02-05',
    certExpiringSoon: 0,
    openViolations: 2,
    permitExpiry: '2027-02-10',
  },
]

function ScoreBar({ score }: { score: number }) {
  const color = score >= 90 ? 'bg-emerald-500' : score >= 75 ? 'bg-amber-400' : 'bg-red-500'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-sm font-bold text-slate-900 w-8 text-right">{score}</span>
    </div>
  )
}

export default function LocationsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Locations</h1>
          <p className="text-slate-500 text-sm mt-0.5">Compliance overview for all your establishments</p>
        </div>
        <button className="btn-primary text-xs py-2">
          <Plus className="w-3.5 h-3.5" />
          Add Location
        </button>
      </div>

      {/* Location cards */}
      <div className="space-y-4">
        {DEMO_LOCATIONS.map((loc) => (
          <div key={loc.id} className="compliance-card hover:shadow-md transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
              {/* Location info */}
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-navy-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg leading-tight">{loc.name}</h3>
                    <p className="text-sm text-slate-500">{loc.address}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{loc.phone} · {loc.type}</p>
                  </div>
                </div>

                {/* Compliance score */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-slate-500">Compliance Score</span>
                    <span className={`text-xs font-semibold ${
                      loc.complianceScore >= 90 ? 'text-emerald-600' :
                      loc.complianceScore >= 75 ? 'text-amber-600' :
                      'text-red-600'
                    }`}>
                      {loc.complianceScore >= 90 ? 'Strong' : loc.complianceScore >= 75 ? 'Fair' : 'Needs Attention'}
                    </span>
                  </div>
                  <ScoreBar score={loc.complianceScore} />
                </div>
              </div>

              {/* Stats */}
              <div className="lg:w-72 grid grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-xs text-slate-500">Employees</span>
                  </div>
                  <p className="text-xl font-bold text-slate-900">{loc.employees}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-xs text-slate-500">Last Score</span>
                  </div>
                  <p className={`text-xl font-bold ${
                    loc.lastInspectionScore >= 90 ? 'text-emerald-600' :
                    loc.lastInspectionScore >= 75 ? 'text-amber-600' :
                    'text-red-600'
                  }`}>{loc.lastInspectionScore}</p>
                </div>
                <div className={`rounded-lg p-3 ${loc.certExpiringSoon > 0 ? 'bg-amber-50' : 'bg-slate-50'}`}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-xs text-slate-500">Certs Expiring</span>
                  </div>
                  <p className={`text-xl font-bold ${loc.certExpiringSoon > 0 ? 'text-amber-600' : 'text-slate-900'}`}>
                    {loc.certExpiringSoon}
                  </p>
                </div>
                <div className={`rounded-lg p-3 ${loc.openViolations > 0 ? 'bg-red-50' : 'bg-slate-50'}`}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <ClipboardList className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-xs text-slate-500">Open Violations</span>
                  </div>
                  <p className={`text-xl font-bold ${loc.openViolations > 0 ? 'text-red-600' : 'text-slate-900'}`}>
                    {loc.openViolations}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer row */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-500">
                Permit expires: <span className="font-medium text-slate-700">{loc.permitExpiry}</span>
              </p>
              <div className="flex gap-2">
                <Link href={`/inspections?location=${loc.id}`} className="btn-secondary text-xs py-1.5 px-3">
                  View Inspections
                </Link>
                <Link href={`/certifications?location=${loc.id}`} className="btn-secondary text-xs py-1.5 px-3">
                  View Certifications
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
