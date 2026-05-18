-- ============================================================
-- SISTEMA CONTROL DE ACCESO — SCHEMA SUPABASE
-- Pegar en: Supabase Dashboard → SQL Editor → Run
-- ============================================================

-- 1. EMPRESAS (multi-tenant)
CREATE TABLE companies (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  rut         TEXT UNIQUE,
  address     TEXT,
  phone       TEXT,
  logo_url    TEXT,
  active      BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PUERTAS / PUNTOS DE ACCESO
CREATE TABLE doors (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id  UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,       -- "Puerta Principal", "Acceso Bodega"
  location    TEXT,
  active      BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 3. USUARIOS DEL SISTEMA
CREATE TABLE user_profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id  UUID REFERENCES companies(id),  -- NULL = superadmin
  role        TEXT NOT NULL CHECK (role IN ('superadmin', 'admin', 'guard')),
  full_name   TEXT NOT NULL,
  door_id     UUID REFERENCES doors(id),      -- asignado solo a guardias
  active      BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PERSONAS / VISITANTES (registro histórico por RUT)
CREATE TABLE persons (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rut         TEXT NOT NULL UNIQUE,
  full_name   TEXT NOT NULL,
  birth_date  DATE,
  sex         TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 5. REGISTROS DE VISITA
CREATE TABLE visits (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id       UUID NOT NULL REFERENCES companies(id),
  door_id          UUID NOT NULL REFERENCES doors(id),
  person_id        UUID NOT NULL REFERENCES persons(id),
  guard_id         UUID NOT NULL REFERENCES user_profiles(id),

  -- Campos requeridos
  visited_person   TEXT NOT NULL,    -- A quién visita
  area             TEXT NOT NULL,    -- Área/departamento
  reason           TEXT NOT NULL,    -- Motivo de visita
  entry_time       TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Campos opcionales
  exit_time        TIMESTAMPTZ,
  visitor_company  TEXT,             -- Empresa del visitante
  vehicle_plate    TEXT,             -- Placa vehículo
  photo_url        TEXT,             -- Foto visitante
  notes            TEXT,             -- Observaciones

  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ÍNDICES PARA PERFORMANCE
-- ============================================================
CREATE INDEX idx_visits_company ON visits(company_id);
CREATE INDEX idx_visits_entry ON visits(entry_time DESC);
CREATE INDEX idx_visits_person ON visits(person_id);
CREATE INDEX idx_visits_door ON visits(door_id);
CREATE INDEX idx_persons_rut ON persons(rut);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) — AISLAMIENTO MULTI-EMPRESA
-- ============================================================
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE doors ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE persons ENABLE ROW LEVEL SECURITY;

-- Función helper: obtener company_id del usuario actual
CREATE OR REPLACE FUNCTION get_user_company_id()
RETURNS UUID LANGUAGE SQL SECURITY DEFINER AS $$
  SELECT company_id FROM user_profiles WHERE id = auth.uid();
$$;

-- Función helper: obtener rol del usuario actual
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT LANGUAGE SQL SECURITY DEFINER AS $$
  SELECT role FROM user_profiles WHERE id = auth.uid();
$$;

-- COMPANIES: superadmin ve todo, admin/guard solo la suya
CREATE POLICY "companies_select" ON companies FOR SELECT
  USING (get_user_role() = 'superadmin' OR id = get_user_company_id());

CREATE POLICY "companies_superadmin_all" ON companies FOR ALL
  USING (get_user_role() = 'superadmin');

-- DOORS: cada empresa ve solo sus puertas
CREATE POLICY "doors_select" ON doors FOR SELECT
  USING (get_user_role() = 'superadmin' OR company_id = get_user_company_id());

CREATE POLICY "doors_admin_manage" ON doors FOR ALL
  USING (get_user_role() IN ('superadmin', 'admin') AND company_id = get_user_company_id());

-- USER_PROFILES: admin ve usuarios de su empresa
CREATE POLICY "profiles_select" ON user_profiles FOR SELECT
  USING (
    get_user_role() = 'superadmin'
    OR company_id = get_user_company_id()
    OR id = auth.uid()
  );

-- VISITS: cada empresa ve solo sus registros
CREATE POLICY "visits_select" ON visits FOR SELECT
  USING (get_user_role() = 'superadmin' OR company_id = get_user_company_id());

CREATE POLICY "visits_insert" ON visits FOR INSERT
  WITH CHECK (company_id = get_user_company_id());

CREATE POLICY "visits_update_exit" ON visits FOR UPDATE
  USING (company_id = get_user_company_id());

-- PERSONS: visible para todos (tabla compartida de RUTs)
CREATE POLICY "persons_select" ON persons FOR SELECT USING (true);
CREATE POLICY "persons_insert" ON persons FOR INSERT WITH CHECK (true);
CREATE POLICY "persons_update" ON persons FOR UPDATE USING (true);

-- ============================================================
-- DATOS DE EJEMPLO (empresa demo)
-- ============================================================
INSERT INTO companies (id, name, rut, address) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Empresa Demo SA', '76.000.001-1', 'Santiago, Chile');

INSERT INTO doors (company_id, name, location) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Puerta Principal', 'Lobby Entrada'),
  ('00000000-0000-0000-0000-000000000001', 'Acceso Bodega', 'Sector B');
