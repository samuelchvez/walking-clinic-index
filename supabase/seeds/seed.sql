-- Walking Clinic Index — Seed Data
-- Run in Supabase SQL Editor AFTER 001_schema.sql

-- ─── Provinces ────────────────────────────────────────────────────────────

INSERT INTO provinces (id, name, code) VALUES
  ('11111111-0001-0001-0001-000000000001', 'Alberta',                   'AB'),
  ('11111111-0001-0001-0001-000000000002', 'British Columbia',           'BC'),
  ('11111111-0001-0001-0001-000000000003', 'Manitoba',                  'MB'),
  ('11111111-0001-0001-0001-000000000004', 'New Brunswick',             'NB'),
  ('11111111-0001-0001-0001-000000000005', 'Newfoundland and Labrador', 'NL'),
  ('11111111-0001-0001-0001-000000000006', 'Northwest Territories',     'NT'),
  ('11111111-0001-0001-0001-000000000007', 'Nova Scotia',               'NS'),
  ('11111111-0001-0001-0001-000000000008', 'Nunavut',                   'NU'),
  ('11111111-0001-0001-0001-000000000009', 'Ontario',                   'ON'),
  ('11111111-0001-0001-0001-000000000010', 'Prince Edward Island',      'PE'),
  ('11111111-0001-0001-0001-000000000011', 'Quebec',                    'QC'),
  ('11111111-0001-0001-0001-000000000012', 'Saskatchewan',              'SK'),
  ('11111111-0001-0001-0001-000000000013', 'Yukon',                     'YT')
ON CONFLICT (id) DO NOTHING;

-- ─── Cities ───────────────────────────────────────────────────────────────

INSERT INTO cities (id, name, province_id) VALUES
  ('22222222-0002-0002-0002-000000000001', 'Markham', '11111111-0001-0001-0001-000000000009')
ON CONFLICT (id) DO NOTHING;

-- ─── Neighborhoods ────────────────────────────────────────────────────────

INSERT INTO neighborhoods (id, name, city_id) VALUES
  ('33333333-0003-0003-0003-000000000001', 'Greensborough',  '22222222-0002-0002-0002-000000000001'),
  ('33333333-0003-0003-0003-000000000002', 'Cornell',        '22222222-0002-0002-0002-000000000001'),
  ('33333333-0003-0003-0003-000000000003', 'Box Grove',      '22222222-0002-0002-0002-000000000001'),
  ('33333333-0003-0003-0003-000000000004', 'Angus Glen',     '22222222-0002-0002-0002-000000000001'),
  ('33333333-0003-0003-0003-000000000005', 'Legacy',         '22222222-0002-0002-0002-000000000001'),
  ('33333333-0003-0003-0003-000000000006', 'Markham Village','22222222-0002-0002-0002-000000000001')
ON CONFLICT (id) DO NOTHING;

-- ─── Languages ────────────────────────────────────────────────────────────

INSERT INTO languages (id, name) VALUES
  ('44444444-0004-0004-0004-000000000001', 'English'),
  ('44444444-0004-0004-0004-000000000002', 'French'),
  ('44444444-0004-0004-0004-000000000003', 'Mandarin'),
  ('44444444-0004-0004-0004-000000000004', 'Cantonese'),
  ('44444444-0004-0004-0004-000000000005', 'Tamil'),
  ('44444444-0004-0004-0004-000000000006', 'Punjabi'),
  ('44444444-0004-0004-0004-000000000007', 'Urdu')
ON CONFLICT (id) DO NOTHING;

-- ─── Limpieza clínicas / personal (seguro para re-ejecución) ─────────────
-- Borra en orden correcto para respetar foreign keys.
DELETE FROM personnel_languages;
DELETE FROM personnel;
DELETE FROM clinics;

-- ─── Clinics ──────────────────────────────────────────────────────────────
-- Source: Cuadrante H4 (Greensborough), datos.docx — todos afiliados.
-- Coords geocodificadas vía Nominatim/OpenStreetMap (Feb 2026).
-- Todas asignadas al barrio Greensborough (cuadrante H4 del directorio).

INSERT INTO clinics (id, name, address, phone, service, neighborhood_id, lat, lng, is_extended_language_affiliated) VALUES
  (
    '55555555-0005-0005-0005-000000000001',
    'Markham Stouffville Urgent Care',
    '110 Copper Creek Drive, Markham ON L6B 0P9',
    '(905) 472-8911',
    'Urgencias / Medicina familiar',
    '33333333-0003-0003-0003-000000000001',
    43.868384, -79.227739,
    TRUE
  ),
  (
    '55555555-0005-0005-0005-000000000002',
    'MedCare Clinics @ Walmart',
    '500 Copper Creek Drive, Markham ON L6B 0S1',
    '(905) 205-1400',
    'Medicina familiar',
    '33333333-0003-0003-0003-000000000001',
    43.870828, -79.216913,
    TRUE
  ),
  (
    '55555555-0005-0005-0005-000000000003',
    'Greensborough Family Medical Centre',
    '10 Greensborough Village Circle, Markham ON L6E 1M4',
    '(905) 201-1143',
    'Medicina familiar',
    '33333333-0003-0003-0003-000000000001',
    43.902826, -79.250043,
    TRUE
  ),
  (
    '55555555-0005-0005-0005-000000000004',
    'Care Connect Clinic',
    '13 Ivanhoe Drive, Markham ON',
    NULL,
    'Medicina familiar / Atención primaria',
    '33333333-0003-0003-0003-000000000001',
    43.880565, -79.312780,
    TRUE
  ),
  (
    '55555555-0005-0005-0005-000000000005',
    'Markham Central Clinic',
    '9560 Markham Road, Markham ON L6E 0T9',
    '(905) 472-8888',
    'Medicina familiar / Múltiples especialidades',
    '33333333-0003-0003-0003-000000000001',
    43.898227, -79.266125,
    TRUE
  ),
  (
    '55555555-0005-0005-0005-000000000006',
    'NR Medical Clinic',
    '1250 Castlemore Avenue, Markham ON',
    NULL,
    'Medicina familiar / Múltiples especialidades',
    '33333333-0003-0003-0003-000000000001',
    43.904348, -79.267305,
    TRUE
  ),
  (
    '55555555-0005-0005-0005-000000000007',
    'Dr. Siva Associate Medical Clinic',
    '9889 Markham Road, Markham ON',
    NULL,
    'Medicina familiar',
    '33333333-0003-0003-0003-000000000001',
    43.850963, -79.254314,
    TRUE
  ),
  (
    '55555555-0005-0005-0005-000000000008',
    'Whole Health Medical Centre',
    'Bur Oak Avenue & 16th Avenue, Markham ON',
    '(905) 554-4474',
    'Medicina familiar',
    '33333333-0003-0003-0003-000000000001',
    43.899242, -79.231439,
    TRUE
  ),
  (
    '55555555-0005-0005-0005-000000000009',
    'Ashgrove Medical Centre',
    '6633 Highway 7, Markham ON',
    NULL,
    'Urgencias / Medicina familiar',
    '33333333-0003-0003-0003-000000000001',
    43.878603, -79.236851,
    TRUE
  ),
  (
    '55555555-0005-0005-0005-000000000010',
    'Markham Family Health Team (Cornell)',
    '122 Cornell Park Avenue, Markham ON L6B 1B6',
    '(905) 471-9999',
    'Medicina familiar / Múltiples especialidades',
    '33333333-0003-0003-0003-000000000001',
    43.889563, -79.231913,
    TRUE
  ),
  (
    '55555555-0005-0005-0005-000000000011',
    'Health For All Family Health Team',
    '379 Church Street, Markham ON',
    NULL,
    'Medicina familiar / Clínica académica',
    '33333333-0003-0003-0003-000000000001',
    43.884800, -79.231857,
    TRUE
  ),
  (
    '55555555-0005-0005-0005-000000000012',
    '9th Line Online Doctors / Pharmacy',
    '6884 14th Avenue, Markham ON',
    NULL,
    'Medicina familiar',
    '33333333-0003-0003-0003-000000000001',
    43.860059, -79.228112,
    TRUE
  )
ON CONFLICT (id) DO NOTHING;

-- ─── Personnel ────────────────────────────────────────────────────────────
-- Nombres ilustrativos — reemplazar con datos reales antes de publicar.
-- Distribución aleatoria de idiomas especializados por clínica.

INSERT INTO personnel (id, name, role, clinic_id) VALUES
  -- Markham Stouffville Urgent Care
  ('66666666-0006-0006-0006-000000000001', 'Dr. Lin Wei',          'doctor', '55555555-0005-0005-0005-000000000001'),
  ('66666666-0006-0006-0006-000000000002', 'Enfermera Sarah Chan',  'nurse',  '55555555-0005-0005-0005-000000000001'),
  -- MedCare Clinics @ Walmart
  ('66666666-0006-0006-0006-000000000003', 'Enfermera Fatima Malik','nurse',  '55555555-0005-0005-0005-000000000002'),
  -- Greensborough Family Medical Centre
  ('66666666-0006-0006-0006-000000000004', 'Dra. Mei Chen',         'doctor', '55555555-0005-0005-0005-000000000003'),
  ('66666666-0006-0006-0006-000000000005', 'Dr. Raj Patel',         'doctor', '55555555-0005-0005-0005-000000000003'),
  -- Care Connect Clinic
  ('66666666-0006-0006-0006-000000000006', 'Dra. Anitha Kumar',     'doctor', '55555555-0005-0005-0005-000000000004'),
  ('66666666-0006-0006-0006-000000000007', 'Enfermera Priya Nair',  'nurse',  '55555555-0005-0005-0005-000000000004'),
  -- Markham Central Clinic
  ('66666666-0006-0006-0006-000000000008', 'Dr. Zhang Wei',         'doctor', '55555555-0005-0005-0005-000000000005'),
  ('66666666-0006-0006-0006-000000000009', 'Enfermera Amy Ng',      'nurse',  '55555555-0005-0005-0005-000000000005'),
  -- NR Medical Clinic
  ('66666666-0006-0006-0006-000000000010', 'Enfermera Gurpreet Kaur','nurse', '55555555-0005-0005-0005-000000000006'),
  ('66666666-0006-0006-0006-000000000011', 'Dr. Imran Khan',        'doctor', '55555555-0005-0005-0005-000000000006'),
  -- Dr. Siva Associate Medical Clinic
  ('66666666-0006-0006-0006-000000000012', 'Dr. Siva Ramakrishnan', 'doctor', '55555555-0005-0005-0005-000000000007'),
  -- Whole Health Medical Centre
  ('66666666-0006-0006-0006-000000000013', 'Dr. William Lam',       'doctor', '55555555-0005-0005-0005-000000000008'),
  -- Ashgrove Medical Centre
  ('66666666-0006-0006-0006-000000000014', 'Dr. Chen Lin',          'doctor', '55555555-0005-0005-0005-000000000009'),
  ('66666666-0006-0006-0006-000000000015', 'Enfermero Ranjit Singh','nurse',  '55555555-0005-0005-0005-000000000009'),
  -- Markham Family Health Team (Cornell)
  ('66666666-0006-0006-0006-000000000016', 'Dra. Kavitha Raj',      'doctor', '55555555-0005-0005-0005-000000000010'),
  ('66666666-0006-0006-0006-000000000017', 'Enfermera Zara Ahmed',  'nurse',  '55555555-0005-0005-0005-000000000010'),
  -- Health For All Family Health Team
  ('66666666-0006-0006-0006-000000000018', 'Dra. Jessica Wong',     'doctor', '55555555-0005-0005-0005-000000000011'),
  ('66666666-0006-0006-0006-000000000019', 'Dr. Harpreet Gill',     'doctor', '55555555-0005-0005-0005-000000000011'),
  -- 9th Line Online Doctors / Pharmacy
  ('66666666-0006-0006-0006-000000000020', 'Enfermera Mei Lin',     'nurse',  '55555555-0005-0005-0005-000000000012')
ON CONFLICT (id) DO NOTHING;

-- ─── Personnel Languages ──────────────────────────────────────────────────

INSERT INTO personnel_languages (personnel_id, language_id) VALUES
  -- Dr. Lin Wei → Mandarin
  ('66666666-0006-0006-0006-000000000001', '44444444-0004-0004-0004-000000000003'),
  -- Enfermera Sarah Chan → Cantonese
  ('66666666-0006-0006-0006-000000000002', '44444444-0004-0004-0004-000000000004'),
  -- Enfermera Fatima Malik → Urdu
  ('66666666-0006-0006-0006-000000000003', '44444444-0004-0004-0004-000000000007'),
  -- Dra. Mei Chen → Mandarin
  ('66666666-0006-0006-0006-000000000004', '44444444-0004-0004-0004-000000000003'),
  -- Dr. Raj Patel → Punjabi
  ('66666666-0006-0006-0006-000000000005', '44444444-0004-0004-0004-000000000006'),
  -- Dra. Anitha Kumar → Tamil
  ('66666666-0006-0006-0006-000000000006', '44444444-0004-0004-0004-000000000005'),
  -- Enfermera Priya Nair → Tamil
  ('66666666-0006-0006-0006-000000000007', '44444444-0004-0004-0004-000000000005'),
  -- Dr. Zhang Wei → Mandarin
  ('66666666-0006-0006-0006-000000000008', '44444444-0004-0004-0004-000000000003'),
  -- Enfermera Amy Ng → Cantonese
  ('66666666-0006-0006-0006-000000000009', '44444444-0004-0004-0004-000000000004'),
  -- Enfermera Gurpreet Kaur → Punjabi
  ('66666666-0006-0006-0006-000000000010', '44444444-0004-0004-0004-000000000006'),
  -- Dr. Imran Khan → Urdu
  ('66666666-0006-0006-0006-000000000011', '44444444-0004-0004-0004-000000000007'),
  -- Dr. Siva Ramakrishnan → Tamil
  ('66666666-0006-0006-0006-000000000012', '44444444-0004-0004-0004-000000000005'),
  -- Dr. William Lam → Cantonese
  ('66666666-0006-0006-0006-000000000013', '44444444-0004-0004-0004-000000000004'),
  -- Dr. Chen Lin → Mandarin
  ('66666666-0006-0006-0006-000000000014', '44444444-0004-0004-0004-000000000003'),
  -- Enfermero Ranjit Singh → Punjabi
  ('66666666-0006-0006-0006-000000000015', '44444444-0004-0004-0004-000000000006'),
  -- Dra. Kavitha Raj → Tamil
  ('66666666-0006-0006-0006-000000000016', '44444444-0004-0004-0004-000000000005'),
  -- Enfermera Zara Ahmed → Urdu
  ('66666666-0006-0006-0006-000000000017', '44444444-0004-0004-0004-000000000007'),
  -- Dra. Jessica Wong → Cantonese
  ('66666666-0006-0006-0006-000000000018', '44444444-0004-0004-0004-000000000004'),
  -- Dr. Harpreet Gill → Punjabi
  ('66666666-0006-0006-0006-000000000019', '44444444-0004-0004-0004-000000000006'),
  -- Enfermera Mei Lin → Mandarin
  ('66666666-0006-0006-0006-000000000020', '44444444-0004-0004-0004-000000000003')
ON CONFLICT DO NOTHING;
