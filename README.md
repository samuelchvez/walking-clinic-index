# Walking Clinic Index — Canada

A public-facing directory of walking clinics in Canada, run by a medical HR company that places doctors and nurses who speak specialized languages. Patients filter by province → city → neighbourhood → language to find a clinic staffed by someone who speaks their language.

**MVP coverage:** Greensborough, Markham, Ontario.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Frontend | React 18 + Vite 6 |
| Styling | TailwindCSS 3 |
| Map | Mapbox GL JS (via react-map-gl v8) |
| Database / API | Supabase (hosted PostgreSQL, client-side JS SDK) |
| Hosting | **Vercel** (free Hobby plan — see below) |

---

## Quickstart

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com) (free tier is sufficient)
2. In **SQL Editor**, run the migration:
   ```
   supabase/migrations/001_schema.sql
   ```
3. Then run the seed data:
   ```
   supabase/seeds/seed.sql
   ```
4. Copy your **Project URL** and **anon public key** from *Project Settings → API*.

### 3. Get a Mapbox token

1. Create a free account at [account.mapbox.com](https://account.mapbox.com)
2. Copy your **Default public token** (no credit card required for free tier: 50k map loads/month)

### 4. Configure environment variables

Edit `.env.local`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_MAPBOX_TOKEN=your-mapbox-token-here
```

### 5. Run the dev server

```bash
npm run dev
# → http://localhost:5173
```

---

## Deploying to Vercel (free)

Vercel is the recommended host — zero-config for Vite, free Hobby plan, auto-deploy on push.

1. Push the repo to GitHub (or GitLab/Bitbucket)
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import your repo
3. Vercel auto-detects Vite — no build settings needed
4. In **Environment Variables**, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_MAPBOX_TOKEN`
5. Click **Deploy** — done. Every `git push` redeploys automatically.

> **Note:** Supabase's anon key is safe to expose client-side. It's locked down by Row Level Security (read-only public policies).

---

## Using the App

1. Select **Province / Territory** — all 13 Canadian provinces/territories
2. Select **City** — currently Markham, ON
3. Select **Neighbourhood** — 6 Markham neighbourhoods available
4. *(Optional)* Select a **Language Spoken by Staff** to filter to clinics with at least one doctor or nurse who speaks that language
5. Click **Search**

### What you'll see

- **Map** with coloured pins — green for affiliated clinics (our HR-placed staff), blue for others
- Click any pin for a clinic info popup
- Neighbourhoods without data show a **"Coming Soon"** overlay on the map
- **Table** below the map with details, language badges, and affiliated status

### Results table columns

| Column | Description |
|---|---|
| Clinic Name | Walk-in clinic name |
| Address | Street address |
| Phone | Clickable phone link |
| Languages Served | Badges for each language spoken by clinic personnel |
| Extended Language | Green ✓ Affiliated = clinic has HR-placed language-specialist staff |

---

## Business Context

This is a product of a medical HR company that recruits doctors and nurses who speak specialized languages and places them at walking clinics across Canada. The directory helps patients who don't speak Canada's official languages (English/French) find nearby clinics staffed by our network.

**Tracked specialized languages:** Mandarin · Cantonese · Tamil · Punjabi · Urdu

---

## Database Schema

```
provinces           (id, name, code)
cities              (id, name, province_id)
neighborhoods       (id, name, city_id)
languages           (id, name)                            -- English, French + 5 specialized
clinics             (id, name, address, phone,
                     neighborhood_id, lat, lng,
                     is_extended_language_affiliated)
personnel           (id, name, role, clinic_id)           -- role: 'doctor' | 'nurse'
personnel_languages (personnel_id, language_id)           -- junction: languages spoken
```

All tables have **public read-only RLS** — no authentication needed for the MVP.

### Key design decisions

- `is_extended_language_affiliated` = clinic has staff placed by our HR company (set manually in seed; a DB trigger can automate this later)
- `clinic_languages` junction table was replaced by the `personnel` / `personnel_languages` model so the *who* is tracked, not just the *what*
- `lat` / `lng` stored directly on `clinics` for simple map marker rendering

---

## Project Structure

```
src/
  lib/
    supabaseClient.js       # Supabase singleton
  hooks/
    useFilters.js           # Province → city → neighbourhood → language cascade
  components/
    Hero.jsx                # Header / about section
    FilterBar.jsx           # Four-filter form + Search button
    MapView.jsx             # Mapbox GL map with affiliated/standard pins + coming-soon overlay
    ClinicTable.jsx         # Paginated results table (two-step language filter query)
    ClinicRow.jsx           # Single row — derives languages from personnel join
    LanguageBadges.jsx      # Colour-coded language pills
    Pagination.jsx          # Prev / Next controls
  App.jsx                   # Root: wires filters → map → table
supabase/
  migrations/001_schema.sql # Schema + RLS policies
  seeds/seed.sql            # All seed data (deterministic UUIDs, idempotent)
```

### Swapping in your real logo on the map pin

In `src/components/MapView.jsx`, find the `AffiliatedPin` component and replace the placeholder `<svg>` with your actual logo:

```jsx
// Before
<svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
  <path d="..." />  {/* placeholder medical icon */}
</svg>

// After — using an image asset
<img src="/logo.svg" className="w-6 h-6" alt="company logo" />
```

Put your logo file in the `public/` folder so Vite serves it as a static asset.
