import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import ClinicRow from './ClinicRow'
import Pagination from './Pagination'

const PAGE_SIZE = 10

async function getClinicIdsForLanguage(languageId) {
  const { data, error } = await supabase
    .from('personnel_languages')
    .select('personnel(clinic_id)')
    .eq('language_id', languageId)

  if (error || !data) return []
  return [...new Set(data.map((r) => r.personnel?.clinic_id).filter(Boolean))]
}

export default function ClinicTable({ neighborhoodId, selectedLanguageId }) {
  const [clinics, setClinics] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  useEffect(() => {
    setPage(0)
  }, [neighborhoodId, selectedLanguageId])

  useEffect(() => {
    if (!neighborhoodId) return

    async function fetchClinics() {
      setLoading(true)
      setError(null)

      let allowedClinicIds = null
      if (selectedLanguageId) {
        allowedClinicIds = await getClinicIdsForLanguage(selectedLanguageId)
        if (allowedClinicIds.length === 0) {
          setClinics([])
          setTotalCount(0)
          setLoading(false)
          return
        }
      }

      const from = page * PAGE_SIZE
      const to = from + PAGE_SIZE - 1

      let query = supabase
        .from('clinics')
        .select(
          '*, personnel(name, role, personnel_languages(languages(name)))',
          { count: 'exact' }
        )
        .eq('neighborhood_id', neighborhoodId)
        .order('name')
        .range(from, to)

      if (allowedClinicIds !== null) {
        query = query.in('id', allowedClinicIds)
      }

      const { data, error: fetchError, count } = await query

      if (fetchError) {
        setError(fetchError.message)
        setClinics([])
        setTotalCount(0)
      } else {
        setClinics(data ?? [])
        setTotalCount(count ?? 0)
      }

      setLoading(false)
    }

    fetchClinics()
  }, [neighborhoodId, selectedLanguageId, page])

  if (!neighborhoodId) return null

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {!loading && !error && (
        <p className="text-sm text-gray-500 mb-3">
          {totalCount === 0
            ? 'No se encontraron clínicas para esta selección.'
            : `Mostrando ${Math.min(page * PAGE_SIZE + 1, totalCount)}–${Math.min(
                (page + 1) * PAGE_SIZE,
                totalCount
              )} de ${totalCount} clínica${totalCount !== 1 ? 's' : ''}`}
        </p>
      )}

      {loading && (
        <div className="flex items-center gap-2 text-gray-400 py-8 justify-center">
          <span className="animate-spin text-lg">⏳</span>
          <span className="text-sm">Cargando clínicas…</span>
        </div>
      )}

      {error && (
        <div className="rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          Error al cargar las clínicas: {error}
        </div>
      )}

      {!loading && !error && clinics.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="py-3 px-4 text-left font-semibold text-gray-600 whitespace-nowrap">
                  Nombre de la Clínica
                </th>
                <th className="py-3 px-4 text-left font-semibold text-gray-600">
                  Dirección
                </th>
                <th className="py-3 px-4 text-left font-semibold text-gray-600 whitespace-nowrap">
                  Teléfono
                </th>
                <th className="py-3 px-4 text-left font-semibold text-gray-600">
                  Servicios
                </th>
                <th className="py-3 px-4 text-left font-semibold text-gray-600">
                  Idiomas Atendidos
                </th>
                <th className="py-3 px-4 text-center font-semibold text-gray-600 whitespace-nowrap">
                  Idioma Extendido
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {clinics.map((clinic) => (
                <ClinicRow key={clinic.id} clinic={clinic} />
              ))}
            </tbody>
          </table>

          <Pagination
            page={page}
            totalPages={totalPages}
            onPrev={() => setPage((p) => Math.max(0, p - 1))}
            onNext={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          />
        </div>
      )}
    </div>
  )
}
