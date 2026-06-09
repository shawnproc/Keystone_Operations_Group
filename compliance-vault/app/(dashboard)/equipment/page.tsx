'use client'

import { useState } from 'react'
import { Plus, Search, Wrench, AlertTriangle, CheckCircle } from 'lucide-react'
import { formatDate, getComplianceStatus, getDaysUntilExpiry } from '@/lib/utils'
import { StatusBadge } from '@/components/ui/StatusBadge'

const DEMO_EQUIPMENT = [
  { id: '1', name: 'Walk-In Refrigerator',      type: 'refrigerator', location: 'Main Street',   model: 'Beverage-Air WTR49A',  serial: 'BA-291042', lastService: '2025-09-10', nextService: '2026-06-15', interval: 90,  status: 'needs_service' },
  { id: '2', name: 'Commercial Freezer',         type: 'freezer',      location: 'Main Street',   model: 'True T-35',            serial: 'TR-884721', lastService: '2026-01-20', nextService: '2026-07-20', interval: 180, status: 'operational' },
  { id: '3', name: 'Hobart Dishwasher',          type: 'dishwasher',   location: 'Main Street',   model: 'Hobart AM15',          serial: 'HB-99182',  lastService: '2026-02-14', nextService: '2026-08-14', interval: 180, status: 'operational' },
  { id: '4', name: 'Commercial Flat Top Grill',  type: 'cooking',      location: 'Downtown Hub',  model: 'Garland GF36',         serial: 'GR-44210',  lastService: '2025-11-05', nextService: '2026-05-05', interval: 180, status: 'out_of_service' },
  { id: '5', name: 'Walk-In Cooler',             type: 'refrigerator', location: 'Downtown Hub',  model: 'Master-Bilt IN-72SSS', serial: 'MB-10029',  lastService: '2026-03-01', nextService: '2026-09-01', interval: 180, status: 'operational' },
  { id: '6', name: 'Convection Oven',            type: 'oven',         location: 'Northside',     model: 'Vulcan VC4G',          serial: 'VU-33918',  lastService: '2026-04-10', nextService: '2026-10-10', interval: 180, status: 'operational' },
  { id: '7', name: 'Exhaust Hood System',        type: 'hood',         location: 'Northside',     model: 'CaptiveAire 6000',     serial: 'CA-82211',  lastService: '2025-10-22', nextService: '2026-04-22', interval: 180, status: 'needs_service' },
]

const equipmentTypeIcons: Record<string, string> = {
  refrigerator: '❄️',
  freezer:      '🧊',
  dishwasher:   '🫧',
  cooking:      '🔥',
  oven:         '♨️',
  hood:         '💨',
  other:        '⚙️',
}

const statusStyles: Record<string, string> = {
  operational:    'text-emerald-700 bg-emerald-50 ring-emerald-200',
  needs_service:  'text-amber-700 bg-amber-50 ring-amber-200',
  out_of_service: 'text-red-700 bg-red-50 ring-red-200',
}

const statusLabels: Record<string, string> = {
  operational:    'Operational',
  needs_service:  'Service Due',
  out_of_service: 'Out of Service',
}

export default function EquipmentPage() {
  const [search, setSearch] = useState('')

  const filtered = DEMO_EQUIPMENT.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.location.toLowerCase().includes(search.toLowerCase()) ||
    e.type.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Equipment & Maintenance</h1>
          <p className="text-slate-500 text-sm mt-0.5">Track service schedules, maintenance logs, and equipment status</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary text-xs py-2">
            <Wrench className="w-3.5 h-3.5" />
            Log Service
          </button>
          <button className="btn-primary text-xs py-2">
            <Plus className="w-3.5 h-3.5" />
            Add Equipment
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="compliance-card text-center">
          <p className="text-3xl font-bold text-emerald-600">
            {DEMO_EQUIPMENT.filter(e => e.status === 'operational').length}
          </p>
          <p className="text-sm text-slate-500 mt-1">Operational</p>
        </div>
        <div className="compliance-card text-center">
          <p className="text-3xl font-bold text-amber-500">
            {DEMO_EQUIPMENT.filter(e => e.status === 'needs_service').length}
          </p>
          <p className="text-sm text-slate-500 mt-1">Service Due</p>
        </div>
        <div className="compliance-card text-center">
          <p className="text-3xl font-bold text-red-600">
            {DEMO_EQUIPMENT.filter(e => e.status === 'out_of_service').length}
          </p>
          <p className="text-sm text-slate-500 mt-1">Out of Service</p>
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
            placeholder="Search equipment by name, type, or location..."
          />
        </div>
      </div>

      {/* Equipment grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((equip) => {
          const daysToService = getDaysUntilExpiry(equip.nextService)
          const serviceStatus = getComplianceStatus(equip.nextService)

          return (
            <div key={equip.id} className="compliance-card hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{equipmentTypeIcons[equip.type] ?? '⚙️'}</span>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm leading-tight">{equip.name}</p>
                    <p className="text-xs text-slate-500">{equip.location}</p>
                  </div>
                </div>
                <span className={`status-badge ring-1 text-xs ${statusStyles[equip.status]}`}>
                  {statusLabels[equip.status]}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600 mb-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Model</span>
                  <span className="font-medium">{equip.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Serial</span>
                  <span className="font-mono">{equip.serial}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Last Service</span>
                  <span>{formatDate(equip.lastService)}</span>
                </div>
              </div>

              <div className={`flex items-center justify-between p-2.5 rounded-lg ${
                equip.status === 'needs_service' || equip.status === 'out_of_service'
                  ? 'bg-amber-50'
                  : 'bg-slate-50'
              }`}>
                <div>
                  <p className="text-xs font-medium text-slate-700">Next Service Due</p>
                  <p className="text-xs text-slate-500">{formatDate(equip.nextService)}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${
                    daysToService < 0    ? 'text-red-600' :
                    daysToService <= 14  ? 'text-red-500' :
                    daysToService <= 30  ? 'text-amber-500' :
                    'text-slate-700'
                  }`}>
                    {daysToService < 0 ? `${Math.abs(daysToService)}d overdue` : `${daysToService}d`}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
