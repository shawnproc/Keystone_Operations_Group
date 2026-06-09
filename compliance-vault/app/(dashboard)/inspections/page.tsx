'use client'

import { useState } from 'react'
import { Plus, Search, ChevronDown, ChevronRight, AlertTriangle, CheckCircle } from 'lucide-react'
import { formatDate } from '@/lib/utils'

const DEMO_INSPECTIONS = [
  {
    id: '1',
    location: 'Main Street Location',
    date: '2026-04-22',
    inspector: 'Ronald Vickers',
    type: 'Routine',
    score: 96,
    result: 'pass',
    violations: [],
  },
  {
    id: '2',
    location: 'Downtown Catering Hub',
    date: '2026-03-11',
    inspector: 'Deborah Simms',
    type: 'Routine',
    score: 88,
    result: 'pass_with_violations',
    violations: [
      { code: '3-501.16', description: 'Potentially hazardous food held at improper temperature — raw chicken at 48°F in walk-in', severity: 'major', corrected: true },
      { code: '4-602.11', description: 'Food-contact surfaces not sanitized at required frequency — cutting boards', severity: 'minor', corrected: true },
    ],
  },
  {
    id: '3',
    location: 'Northside Commissary',
    date: '2026-02-05',
    inspector: 'Michael Okonkwo',
    type: 'Routine',
    score: 74,
    result: 'pass_with_violations',
    violations: [
      { code: '2-103.11', description: 'Person in charge not ensuring employees are properly trained in food safety', severity: 'critical', corrected: false },
      { code: '6-301.11', description: 'Handwashing sink not supplied with soap — prep area', severity: 'major', corrected: true },
      { code: '3-302.11', description: 'Raw animal foods not protected from cross-contamination', severity: 'major', corrected: true },
      { code: '4-501.111', description: 'Mechanical warewashing equipment not sanitizing at proper temperature', severity: 'minor', corrected: false },
    ],
  },
  {
    id: '4',
    location: 'Main Street Location',
    date: '2025-10-14',
    inspector: 'Ronald Vickers',
    type: 'Routine',
    score: 91,
    result: 'pass',
    violations: [
      { code: '6-501.12', description: 'Floors and walls not clean — under cooking equipment', severity: 'minor', corrected: true },
    ],
  },
]

const resultStyles: Record<string, string> = {
  pass:                 'text-emerald-700 bg-emerald-50 ring-emerald-200',
  pass_with_violations: 'text-amber-700 bg-amber-50 ring-amber-200',
  fail:                 'text-red-700 bg-red-50 ring-red-200',
  critical_fail:        'text-red-800 bg-red-100 ring-red-300',
}

const resultLabels: Record<string, string> = {
  pass:                 'Pass',
  pass_with_violations: 'Pass w/ Violations',
  fail:                 'Fail',
  critical_fail:        'Critical Fail',
}

const severityStyles: Record<string, string> = {
  critical: 'text-red-700 bg-red-50',
  major:    'text-amber-700 bg-amber-50',
  minor:    'text-slate-600 bg-slate-100',
}

export default function InspectionsPage() {
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = DEMO_INSPECTIONS.filter((i) =>
    i.location.toLowerCase().includes(search.toLowerCase()) ||
    i.inspector.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Inspection History</h1>
          <p className="text-slate-500 text-sm mt-0.5">All health department inspections, scores, and violation records</p>
        </div>
        <button className="btn-primary text-xs py-2">
          <Plus className="w-3.5 h-3.5" />
          Log Inspection
        </button>
      </div>

      {/* Avg score banner */}
      <div className="grid grid-cols-3 gap-4">
        <div className="compliance-card text-center">
          <p className="text-3xl font-bold text-slate-900">
            {Math.round(DEMO_INSPECTIONS.reduce((a, i) => a + (i.score ?? 0), 0) / DEMO_INSPECTIONS.length)}
          </p>
          <p className="text-sm text-slate-500 mt-1">Average Score</p>
        </div>
        <div className="compliance-card text-center">
          <p className="text-3xl font-bold text-emerald-600">
            {DEMO_INSPECTIONS.filter(i => i.result === 'pass').length}
          </p>
          <p className="text-sm text-slate-500 mt-1">Clean Passes</p>
        </div>
        <div className="compliance-card text-center">
          <p className="text-3xl font-bold text-amber-500">
            {DEMO_INSPECTIONS.reduce((a, i) => a + i.violations.length, 0)}
          </p>
          <p className="text-sm text-slate-500 mt-1">Total Violations (all time)</p>
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
            placeholder="Search by location or inspector..."
          />
        </div>
      </div>

      {/* Inspection list */}
      <div className="space-y-3">
        {filtered.map((inspection) => (
          <div key={inspection.id} className="compliance-card p-0 overflow-hidden">
            {/* Row header */}
            <button
              onClick={() => setExpanded(expanded === inspection.id ? null : inspection.id)}
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                {/* Score circle */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm border-2 ${
                  (inspection.score ?? 0) >= 90 ? 'border-emerald-400 text-emerald-700 bg-emerald-50' :
                  (inspection.score ?? 0) >= 75 ? 'border-amber-400 text-amber-700 bg-amber-50' :
                  'border-red-400 text-red-700 bg-red-50'
                }`}>
                  {inspection.score}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-slate-900">{inspection.location}</p>
                  <p className="text-xs text-slate-500">
                    {formatDate(inspection.date)} · {inspection.type} · Inspector: {inspection.inspector}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`status-badge ring-1 ${resultStyles[inspection.result]}`}>
                  {resultLabels[inspection.result]}
                </span>
                {inspection.violations.length > 0 && (
                  <span className="text-xs text-slate-500">
                    {inspection.violations.length} violation{inspection.violations.length !== 1 ? 's' : ''}
                  </span>
                )}
                {expanded === inspection.id
                  ? <ChevronDown className="w-4 h-4 text-slate-400" />
                  : <ChevronRight className="w-4 h-4 text-slate-400" />
                }
              </div>
            </button>

            {/* Violations detail */}
            {expanded === inspection.id && (
              <div className="border-t border-slate-100 px-6 py-4 bg-slate-50">
                {inspection.violations.length === 0 ? (
                  <div className="flex items-center gap-2 text-emerald-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">No violations — clean inspection</span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Violations</p>
                    {inspection.violations.map((v, i) => (
                      <div key={i} className="flex items-start gap-3 bg-white rounded-lg p-3 border border-slate-200">
                        <AlertTriangle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                          v.severity === 'critical' ? 'text-red-500' :
                          v.severity === 'major'    ? 'text-amber-500' :
                          'text-slate-400'
                        }`} />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-xs text-slate-400">{v.code}</span>
                            <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${severityStyles[v.severity]}`}>
                              {v.severity.charAt(0).toUpperCase() + v.severity.slice(1)}
                            </span>
                            {v.corrected && (
                              <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" />
                                Corrected
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-slate-700">{v.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
