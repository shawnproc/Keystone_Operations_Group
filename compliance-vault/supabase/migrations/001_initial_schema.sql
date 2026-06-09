-- Compliance Vault — Initial Schema
-- Run this in Supabase SQL Editor after creating your project

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ────────────────────────────────────────────────────────────────
-- ORGANIZATIONS (parent entity — one per customer account)
-- ────────────────────────────────────────────────────────────────
CREATE TABLE organizations (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name                  TEXT NOT NULL,
  owner_user_id         UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_tier     TEXT NOT NULL DEFAULT 'starter'
                          CHECK (subscription_tier IN ('starter', 'growth', 'enterprise')),
  stripe_customer_id    TEXT UNIQUE,
  stripe_subscription_id TEXT,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────────
-- ESTABLISHMENTS (individual locations within an org)
-- ────────────────────────────────────────────────────────────────
CREATE TABLE establishments (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id     UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name                TEXT NOT NULL,
  address             TEXT,
  city                TEXT,
  state               TEXT NOT NULL DEFAULT 'VA',
  zip                 TEXT,
  phone               TEXT,
  permit_number       TEXT,
  permit_expiry       DATE,
  establishment_type  TEXT NOT NULL DEFAULT 'restaurant'
                        CHECK (establishment_type IN ('restaurant','food_truck','catering','hospital','school','cafeteria','other')),
  is_active           BOOLEAN NOT NULL DEFAULT TRUE,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────────
-- EMPLOYEES
-- ────────────────────────────────────────────────────────────────
CREATE TABLE employees (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  establishment_id  UUID NOT NULL REFERENCES establishments(id) ON DELETE CASCADE,
  organization_id   UUID NOT NULL REFERENCES organizations(id),
  first_name        TEXT NOT NULL,
  last_name         TEXT NOT NULL,
  email             TEXT,
  phone             TEXT,
  hire_date         DATE,
  role              TEXT,
  is_active         BOOLEAN NOT NULL DEFAULT TRUE,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────────
-- CERTIFICATIONS
-- ────────────────────────────────────────────────────────────────
CREATE TABLE certifications (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id     UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES organizations(id),
  cert_type       TEXT NOT NULL,   -- food_handler, food_protection_manager, serve_safe, etc.
  cert_number     TEXT,
  issuing_body    TEXT,
  issue_date      DATE,
  expiry_date     DATE NOT NULL,
  document_url    TEXT,
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Computed status view (avoids storing denormalized status)
CREATE OR REPLACE VIEW certifications_with_status AS
SELECT
  c.*,
  e.first_name,
  e.last_name,
  e.role AS employee_role,
  est.name AS establishment_name,
  CASE
    WHEN c.expiry_date < CURRENT_DATE               THEN 'overdue'
    WHEN c.expiry_date <= CURRENT_DATE + INTERVAL '14 days' THEN 'critical'
    WHEN c.expiry_date <= CURRENT_DATE + INTERVAL '30 days' THEN 'due_soon'
    ELSE 'compliant'
  END AS status,
  (c.expiry_date - CURRENT_DATE) AS days_until_expiry
FROM certifications c
JOIN employees e ON e.id = c.employee_id
JOIN establishments est ON est.id = e.establishment_id;

-- ────────────────────────────────────────────────────────────────
-- PERMITS
-- ────────────────────────────────────────────────────────────────
CREATE TABLE permits (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  establishment_id  UUID NOT NULL REFERENCES establishments(id) ON DELETE CASCADE,
  organization_id   UUID NOT NULL REFERENCES organizations(id),
  permit_type       TEXT NOT NULL,
  permit_number     TEXT,
  issuing_authority TEXT,
  issue_date        DATE,
  expiry_date       DATE NOT NULL,
  renewal_cost      NUMERIC(10,2),
  notes             TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE VIEW permits_with_status AS
SELECT
  p.*,
  est.name AS establishment_name,
  est.city,
  est.state,
  CASE
    WHEN p.expiry_date < CURRENT_DATE               THEN 'overdue'
    WHEN p.expiry_date <= CURRENT_DATE + INTERVAL '14 days' THEN 'critical'
    WHEN p.expiry_date <= CURRENT_DATE + INTERVAL '30 days' THEN 'due_soon'
    ELSE 'compliant'
  END AS status,
  (p.expiry_date - CURRENT_DATE) AS days_until_expiry
FROM permits p
JOIN establishments est ON est.id = p.establishment_id;

-- ────────────────────────────────────────────────────────────────
-- INSPECTIONS
-- ────────────────────────────────────────────────────────────────
CREATE TABLE inspections (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  establishment_id    UUID NOT NULL REFERENCES establishments(id) ON DELETE CASCADE,
  organization_id     UUID NOT NULL REFERENCES organizations(id),
  inspection_date     DATE NOT NULL,
  inspector_name      TEXT,
  inspection_type     TEXT NOT NULL DEFAULT 'routine',
  score               INTEGER CHECK (score >= 0 AND score <= 100),
  result              TEXT NOT NULL
                        CHECK (result IN ('pass','pass_with_violations','fail','critical_fail')),
  violation_count     INTEGER NOT NULL DEFAULT 0,
  critical_violations INTEGER NOT NULL DEFAULT 0,
  notes               TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────────
-- VIOLATIONS
-- ────────────────────────────────────────────────────────────────
CREATE TABLE violations (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inspection_id     UUID NOT NULL REFERENCES inspections(id) ON DELETE CASCADE,
  organization_id   UUID NOT NULL REFERENCES organizations(id),
  violation_code    TEXT,
  description       TEXT NOT NULL,
  severity          TEXT NOT NULL CHECK (severity IN ('critical','major','minor')),
  corrective_action TEXT,
  corrected_by      DATE,
  is_corrected      BOOLEAN NOT NULL DEFAULT FALSE,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────────
-- EQUIPMENT
-- ────────────────────────────────────────────────────────────────
CREATE TABLE equipment (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  establishment_id      UUID NOT NULL REFERENCES establishments(id) ON DELETE CASCADE,
  organization_id       UUID NOT NULL REFERENCES organizations(id),
  name                  TEXT NOT NULL,
  equipment_type        TEXT NOT NULL DEFAULT 'other',
  model                 TEXT,
  serial_number         TEXT,
  purchase_date         DATE,
  last_service_date     DATE,
  next_service_date     DATE,
  service_interval_days INTEGER NOT NULL DEFAULT 180,
  status                TEXT NOT NULL DEFAULT 'operational'
                          CHECK (status IN ('operational','needs_service','out_of_service')),
  notes                 TEXT,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────────
-- MAINTENANCE LOGS
-- ────────────────────────────────────────────────────────────────
CREATE TABLE maintenance_logs (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  equipment_id      UUID NOT NULL REFERENCES equipment(id) ON DELETE CASCADE,
  organization_id   UUID NOT NULL REFERENCES organizations(id),
  service_date      DATE NOT NULL,
  service_type      TEXT,
  technician        TEXT,
  description       TEXT,
  cost              NUMERIC(10,2),
  next_service_date DATE,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────────
-- TEMPERATURE LOGS
-- ────────────────────────────────────────────────────────────────
CREATE TABLE temperature_logs (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  equipment_id      UUID NOT NULL REFERENCES equipment(id) ON DELETE CASCADE,
  establishment_id  UUID NOT NULL REFERENCES establishments(id),
  organization_id   UUID NOT NULL REFERENCES organizations(id),
  logged_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  temperature       NUMERIC(5,2) NOT NULL,
  unit              CHAR(1) NOT NULL DEFAULT 'F' CHECK (unit IN ('F','C')),
  is_in_range       BOOLEAN,
  logged_by         TEXT,
  notes             TEXT
);

-- ────────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ────────────────────────────────────────────────────────────────
ALTER TABLE organizations       ENABLE ROW LEVEL SECURITY;
ALTER TABLE establishments      ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees           ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications      ENABLE ROW LEVEL SECURITY;
ALTER TABLE permits             ENABLE ROW LEVEL SECURITY;
ALTER TABLE inspections         ENABLE ROW LEVEL SECURITY;
ALTER TABLE violations          ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment           ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance_logs    ENABLE ROW LEVEL SECURITY;
ALTER TABLE temperature_logs    ENABLE ROW LEVEL SECURITY;

-- Organizations: owner can see/edit their own org
CREATE POLICY "org_owner_access" ON organizations
  USING (owner_user_id = auth.uid());

-- Helper function: returns the org ID for the current user
CREATE OR REPLACE FUNCTION current_org_id() RETURNS UUID
  LANGUAGE sql STABLE
  AS $$
    SELECT id FROM organizations WHERE owner_user_id = auth.uid() LIMIT 1;
  $$;

-- All child tables: org members can access their org's data
CREATE POLICY "org_members_establishments"   ON establishments    USING (organization_id = current_org_id());
CREATE POLICY "org_members_employees"        ON employees         USING (organization_id = current_org_id());
CREATE POLICY "org_members_certifications"   ON certifications    USING (organization_id = current_org_id());
CREATE POLICY "org_members_permits"          ON permits           USING (organization_id = current_org_id());
CREATE POLICY "org_members_inspections"      ON inspections       USING (organization_id = current_org_id());
CREATE POLICY "org_members_violations"       ON violations        USING (organization_id = current_org_id());
CREATE POLICY "org_members_equipment"        ON equipment         USING (organization_id = current_org_id());
CREATE POLICY "org_members_maintenance"      ON maintenance_logs  USING (organization_id = current_org_id());
CREATE POLICY "org_members_temperature"      ON temperature_logs  USING (organization_id = current_org_id());

-- ────────────────────────────────────────────────────────────────
-- INDEXES for common query patterns
-- ────────────────────────────────────────────────────────────────
CREATE INDEX idx_certifications_expiry     ON certifications(expiry_date);
CREATE INDEX idx_certifications_org        ON certifications(organization_id);
CREATE INDEX idx_permits_expiry            ON permits(expiry_date);
CREATE INDEX idx_permits_org               ON permits(organization_id);
CREATE INDEX idx_inspections_date          ON inspections(inspection_date DESC);
CREATE INDEX idx_inspections_establishment ON inspections(establishment_id);
CREATE INDEX idx_violations_inspection     ON violations(inspection_id);
CREATE INDEX idx_equipment_next_service    ON equipment(next_service_date);
CREATE INDEX idx_temperature_logged_at     ON temperature_logs(logged_at DESC);

-- ────────────────────────────────────────────────────────────────
-- TRIGGER: auto-create organization on user signup
-- ────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO organizations (owner_user_id, name, subscription_tier)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'org_name', 'My Organization'),
    COALESCE(NEW.raw_user_meta_data->>'plan', 'starter')
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ────────────────────────────────────────────────────────────────
-- TRIGGER: auto-update next_service_date on maintenance log insert
-- ────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_equipment_after_service()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  UPDATE equipment
  SET
    last_service_date = NEW.service_date,
    next_service_date = NEW.next_service_date,
    status = 'operational'
  WHERE id = NEW.equipment_id;
  RETURN NEW;
END;
$$;

CREATE TRIGGER after_maintenance_log
  AFTER INSERT ON maintenance_logs
  FOR EACH ROW EXECUTE FUNCTION update_equipment_after_service();
