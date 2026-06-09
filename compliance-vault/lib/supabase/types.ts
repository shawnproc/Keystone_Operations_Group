export type SubscriptionTier = 'starter' | 'growth' | 'enterprise'
export type EstablishmentType = 'restaurant' | 'food_truck' | 'catering' | 'hospital' | 'school' | 'cafeteria' | 'other'
export type ComplianceStatus = 'compliant' | 'due_soon' | 'overdue' | 'critical'
export type InspectionResult = 'pass' | 'pass_with_violations' | 'fail' | 'critical_fail'
export type ViolationSeverity = 'critical' | 'major' | 'minor'
export type EquipmentStatus = 'operational' | 'needs_service' | 'out_of_service'

export interface Organization {
  id: string
  name: string
  owner_user_id: string
  subscription_tier: SubscriptionTier
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  created_at: string
}

export interface Establishment {
  id: string
  organization_id: string
  name: string
  address: string | null
  city: string | null
  state: string
  zip: string | null
  phone: string | null
  permit_number: string | null
  permit_expiry: string | null
  establishment_type: EstablishmentType
  created_at: string
}

export interface Employee {
  id: string
  establishment_id: string
  organization_id: string
  first_name: string
  last_name: string
  email: string | null
  phone: string | null
  hire_date: string | null
  role: string | null
  is_active: boolean
  created_at: string
}

export interface Certification {
  id: string
  employee_id: string
  organization_id: string
  cert_type: string
  cert_number: string | null
  issuing_body: string | null
  issue_date: string | null
  expiry_date: string
  status: ComplianceStatus
  document_url: string | null
  created_at: string
  employee?: Employee
}

export interface Permit {
  id: string
  establishment_id: string
  organization_id: string
  permit_type: string
  permit_number: string | null
  issuing_authority: string | null
  issue_date: string | null
  expiry_date: string
  renewal_cost: number | null
  status: ComplianceStatus
  notes: string | null
  created_at: string
  establishment?: Establishment
}

export interface Inspection {
  id: string
  establishment_id: string
  organization_id: string
  inspection_date: string
  inspector_name: string | null
  inspection_type: string
  score: number | null
  result: InspectionResult
  violation_count: number
  critical_violations: number
  notes: string | null
  created_at: string
  establishment?: Establishment
  violations?: Violation[]
}

export interface Violation {
  id: string
  inspection_id: string
  organization_id: string
  violation_code: string | null
  description: string
  severity: ViolationSeverity
  corrective_action: string | null
  corrected_by: string | null
  is_corrected: boolean
  created_at: string
}

export interface Equipment {
  id: string
  establishment_id: string
  organization_id: string
  name: string
  equipment_type: string
  model: string | null
  serial_number: string | null
  purchase_date: string | null
  last_service_date: string | null
  next_service_date: string | null
  service_interval_days: number
  status: EquipmentStatus
  notes: string | null
  created_at: string
  establishment?: Establishment
}

export interface MaintenanceLog {
  id: string
  equipment_id: string
  organization_id: string
  service_date: string
  service_type: string | null
  technician: string | null
  description: string | null
  cost: number | null
  next_service_date: string | null
  created_at: string
}

export interface TemperatureLog {
  id: string
  equipment_id: string
  establishment_id: string
  organization_id: string
  logged_at: string
  temperature: number
  unit: string
  is_in_range: boolean | null
  logged_by: string | null
  notes: string | null
}

export interface DashboardMetrics {
  compliance_score: number
  total_employees: number
  certifications_expiring_30: number
  certifications_expired: number
  permits_expiring_30: number
  permits_expired: number
  equipment_needs_service: number
  last_inspection_score: number | null
  last_inspection_date: string | null
  open_violations: number
}
