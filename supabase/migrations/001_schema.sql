-- Walking Clinic Index — Schema Migration
-- Run this in the Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── Tables ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS provinces (
  id   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  code TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS cities (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  province_id UUID NOT NULL REFERENCES provinces(id)
);

CREATE TABLE IF NOT EXISTS neighborhoods (
  id      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name    TEXT NOT NULL,
  city_id UUID NOT NULL REFERENCES cities(id)
);

CREATE TABLE IF NOT EXISTS languages (
  id   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS clinics (
  id                              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name                            TEXT NOT NULL,
  address                         TEXT,
  phone                           TEXT,
  service                         TEXT,
  neighborhood_id                 UUID NOT NULL REFERENCES neighborhoods(id),
  lat                             DECIMAL(9, 6),
  lng                             DECIMAL(9, 6),
  is_extended_language_affiliated BOOLEAN NOT NULL DEFAULT FALSE
);

-- Add service column if the table already existed without it (safe to re-run)
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS service TEXT;

-- Personnel placed by the HR company at clinics
CREATE TABLE IF NOT EXISTS personnel (
  id        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name      TEXT NOT NULL,
  role      TEXT NOT NULL CHECK (role IN ('doctor', 'nurse')),
  clinic_id UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE
);

-- Languages each personnel member speaks (specialized languages only)
CREATE TABLE IF NOT EXISTS personnel_languages (
  personnel_id UUID NOT NULL REFERENCES personnel(id) ON DELETE CASCADE,
  language_id  UUID NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
  PRIMARY KEY (personnel_id, language_id)
);

-- ─── Indexes ───────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_cities_province_id         ON cities(province_id);
CREATE INDEX IF NOT EXISTS idx_neighborhoods_city_id      ON neighborhoods(city_id);
CREATE INDEX IF NOT EXISTS idx_clinics_neighborhood_id    ON clinics(neighborhood_id);
CREATE INDEX IF NOT EXISTS idx_personnel_clinic_id        ON personnel(clinic_id);
CREATE INDEX IF NOT EXISTS idx_personnel_languages_person ON personnel_languages(personnel_id);
CREATE INDEX IF NOT EXISTS idx_personnel_languages_lang   ON personnel_languages(language_id);

-- ─── Row-Level Security ────────────────────────────────────────────────────

ALTER TABLE provinces           ENABLE ROW LEVEL SECURITY;
ALTER TABLE cities              ENABLE ROW LEVEL SECURITY;
ALTER TABLE neighborhoods       ENABLE ROW LEVEL SECURITY;
ALTER TABLE languages           ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinics             ENABLE ROW LEVEL SECURITY;
ALTER TABLE personnel           ENABLE ROW LEVEL SECURITY;
ALTER TABLE personnel_languages ENABLE ROW LEVEL SECURITY;

-- Public read-only access (no auth required for MVP)
-- DROP first so this script is safe to re-run
DROP POLICY IF EXISTS "Public read provinces"        ON provinces;
DROP POLICY IF EXISTS "Public read cities"           ON cities;
DROP POLICY IF EXISTS "Public read neighborhoods"    ON neighborhoods;
DROP POLICY IF EXISTS "Public read languages"        ON languages;
DROP POLICY IF EXISTS "Public read clinics"          ON clinics;
DROP POLICY IF EXISTS "Public read personnel"        ON personnel;
DROP POLICY IF EXISTS "Public read personnel_languages" ON personnel_languages;

CREATE POLICY "Public read provinces"
  ON provinces FOR SELECT USING (true);

CREATE POLICY "Public read cities"
  ON cities FOR SELECT USING (true);

CREATE POLICY "Public read neighborhoods"
  ON neighborhoods FOR SELECT USING (true);

CREATE POLICY "Public read languages"
  ON languages FOR SELECT USING (true);

CREATE POLICY "Public read clinics"
  ON clinics FOR SELECT USING (true);

CREATE POLICY "Public read personnel"
  ON personnel FOR SELECT USING (true);

CREATE POLICY "Public read personnel_languages"
  ON personnel_languages FOR SELECT USING (true);
