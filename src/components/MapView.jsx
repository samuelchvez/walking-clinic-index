import { useState, useEffect } from 'react'
import Map, { Marker, NavigationControl, Popup } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'
import { supabase } from '../lib/supabaseClient'

const DEFAULT_VIEW = { longitude: -79.250, latitude: 43.880, zoom: 12 }

function AffiliatedPin() {
  return (
    <div
      className="w-12 h-12 rounded-full bg-white border-2 border-brand-navy shadow-lg
                 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform overflow-hidden"
      title="Clínica afiliada"
    >
      <img
        src="/logo.svg"
        alt="Clínica afiliada"
        className="w-10 h-10 object-contain"
        draggable={false}
      />
    </div>
  )
}

function StandardPin() {
  return (
    <div
      className="w-6 h-6 rounded-full bg-brand-navy/70 border-2 border-white shadow-md
                 cursor-pointer hover:scale-110 transition-transform"
      title="Clínica de atención inmediata"
    />
  )
}

async function getClinicIdsForLanguage(languageId) {
  const { data, error } = await supabase
    .from('personnel_languages')
    .select('personnel(clinic_id)')
    .eq('language_id', languageId)
  if (error || !data) return []
  return [...new Set(data.map((r) => r.personnel?.clinic_id).filter(Boolean))]
}

export default function MapView({ neighborhoodId, selectedLanguageId, isGreensborough }) {
  const [pins, setPins] = useState([])
  const [popup, setPopup] = useState(null)
  const [loading, setLoading] = useState(false)

  const token = import.meta.env.VITE_MAPBOX_TOKEN

  useEffect(() => {
    if (!neighborhoodId) return

    async function fetchPins() {
      setLoading(true)
      setPopup(null)

      let allowedClinicIds = null
      if (selectedLanguageId) {
        allowedClinicIds = await getClinicIdsForLanguage(selectedLanguageId)
        if (allowedClinicIds.length === 0) {
          setPins([])
          setLoading(false)
          return
        }
      }

      let query = supabase
        .from('clinics')
        .select('id, name, address, phone, service, lat, lng, is_extended_language_affiliated')
        .eq('neighborhood_id', neighborhoodId)

      if (allowedClinicIds !== null) {
        query = query.in('id', allowedClinicIds)
      }

      const { data } = await query
      setPins((data ?? []).filter((c) => c.lat != null && c.lng != null))
      setLoading(false)
    }

    fetchPins()
  }, [neighborhoodId, selectedLanguageId])

  if (!token || token.startsWith('your-')) {
    return (
      <div className="h-64 rounded-xl border border-dashed border-gray-300 bg-gray-50
                      flex flex-col items-center justify-center text-center px-4">
        <p className="text-gray-500 text-sm font-medium">Mapa no disponible</p>
        <p className="text-gray-400 text-xs mt-1">
          Configure <code className="bg-gray-100 px-1 rounded">VITE_MAPBOX_TOKEN</code> en{' '}
          <code className="bg-gray-100 px-1 rounded">.env.local</code> para activar el mapa.
        </p>
      </div>
    )
  }

  return (
    <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-sm"
         style={{ height: 420 }}>
      {loading && (
        <div className="absolute inset-0 z-10 bg-white/60 flex items-center justify-center">
          <span className="text-sm text-gray-500">Cargando mapa…</span>
        </div>
      )}

      <Map
        mapboxAccessToken={token}
        initialViewState={DEFAULT_VIEW}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        <NavigationControl position="top-right" />

        {pins.map((clinic) => (
          <Marker
            key={clinic.id}
            longitude={clinic.lng}
            latitude={clinic.lat}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation()
              setPopup(popup?.id === clinic.id ? null : clinic)
            }}
          >
            {clinic.is_extended_language_affiliated ? <AffiliatedPin /> : <StandardPin />}
          </Marker>
        ))}

        {popup && (
          <Popup
            longitude={popup.lng}
            latitude={popup.lat}
            anchor="top"
            onClose={() => setPopup(null)}
            closeOnClick={false}
            className="text-sm"
          >
            <div className="p-1 min-w-[180px]">
              <p className="font-semibold text-gray-900 leading-snug">{popup.name}</p>
              {popup.address && (
                <p className="text-gray-500 text-xs mt-1">{popup.address}</p>
              )}
              {popup.service && (
                <p className="text-gray-500 text-xs mt-0.5 italic">{popup.service}</p>
              )}
              {popup.phone && (
                <a
                  href={`tel:${popup.phone.replace(/\D/g, '')}`}
                  className="text-brand-green text-xs hover:underline mt-1 inline-block"
                >
                  {popup.phone}
                </a>
              )}
              {popup.is_extended_language_affiliated && (
                <span className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full
                                 text-xs font-semibold bg-brand-green-light text-brand-navy block w-fit">
                  ✓ Afiliada
                </span>
              )}
            </div>
          </Popup>
        )}
      </Map>

      {/* Overlay "Próximamente" para barrios sin datos */}
      {!isGreensborough && (
        <div className="absolute inset-0 z-20 bg-gray-900/70 backdrop-blur-sm
                        flex flex-col items-center justify-center rounded-xl">
          <p className="text-white text-2xl font-bold tracking-tight">Próximamente</p>
          <p className="text-gray-300 text-sm mt-2">
            Este barrio aún no está disponible.
          </p>
        </div>
      )}
    </div>
  )
}
