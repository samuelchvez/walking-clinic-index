import { useState } from 'react'
import Hero from './components/Hero'
import FilterBar from './components/FilterBar'
import MapView from './components/MapView'
import ClinicTable from './components/ClinicTable'
import { useFilters } from './hooks/useFilters'

const GREENSBOROUGH_NAME = 'Greensborough'

export default function App() {
  const filters = useFilters()

  const [searchedNeighborhoodId, setSearchedNeighborhoodId] = useState(null)
  const [searchedLanguageId, setSearchedLanguageId] = useState(null)
  const [isGreensborough, setIsGreensborough] = useState(false)

  function handleSearch() {
    const nbh = filters.neighborhoods.find(
      (n) => n.id === filters.selectedNeighborhood
    )
    setSearchedNeighborhoodId(filters.selectedNeighborhood || null)
    setSearchedLanguageId(filters.selectedLanguage || null)
    setIsGreensborough(nbh?.name === GREENSBOROUGH_NAME)
  }

  const hasSearched = Boolean(searchedNeighborhoodId)

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />

      <FilterBar
        provinces={filters.provinces}
        cities={filters.cities}
        neighborhoods={filters.neighborhoods}
        languages={filters.languages}
        selectedProvince={filters.selectedProvince}
        selectedCity={filters.selectedCity}
        selectedNeighborhood={filters.selectedNeighborhood}
        selectedLanguage={filters.selectedLanguage}
        setSelectedProvince={filters.setSelectedProvince}
        setSelectedCity={filters.setSelectedCity}
        setSelectedNeighborhood={filters.setSelectedNeighborhood}
        setSelectedLanguage={filters.setSelectedLanguage}
        loadingProvinces={filters.loadingProvinces}
        loadingCities={filters.loadingCities}
        loadingNeighborhoods={filters.loadingNeighborhoods}
        onSearch={handleSearch}
      />

      <main className="max-w-6xl mx-auto px-4">
        {!hasSearched ? (
          <div className="py-16 text-center text-gray-400 text-sm">
            Seleccione una provincia, ciudad y barrio arriba, luego haga clic en{' '}
            <strong className="text-gray-500">Buscar</strong> para encontrar clínicas.
          </div>
        ) : (
          <>
            <div className="pt-6">
              <MapView
                neighborhoodId={searchedNeighborhoodId}
                selectedLanguageId={searchedLanguageId}
                isGreensborough={isGreensborough}
              />
            </div>

            <div className="flex gap-4 mt-3 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-4 h-4 rounded-full bg-brand-green border border-white shadow" />
                Clínica afiliada (nuestra red de personal de salud)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-3.5 h-3.5 rounded-full bg-brand-navy/70 border border-white shadow" />
                Otra clínica de atención inmediata
              </span>
            </div>

            <ClinicTable
              neighborhoodId={searchedNeighborhoodId}
              selectedLanguageId={searchedLanguageId}
            />
          </>
        )}
      </main>
    </div>
  )
}
