export default function FilterBar({
  provinces,
  cities,
  neighborhoods,
  languages,
  selectedProvince,
  selectedCity,
  selectedNeighborhood,
  selectedLanguage,
  setSelectedProvince,
  setSelectedCity,
  setSelectedNeighborhood,
  setSelectedLanguage,
  loadingProvinces,
  loadingCities,
  loadingNeighborhoods,
  onSearch,
}) {
  const canSearch = Boolean(selectedNeighborhood)

  function handleSubmit(e) {
    e.preventDefault()
    if (canSearch) onSearch()
  }

  return (
    <section className="bg-white border-b border-gray-200 py-6 px-4 shadow-sm">
      <div className="max-w-5xl mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Fila 1: Provincia → Ciudad → Barrio */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 min-w-0">
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                Provincia / Territorio
              </label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green disabled:bg-gray-100 disabled:text-gray-400"
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                disabled={loadingProvinces}
              >
                <option value="">
                  {loadingProvinces ? 'Cargando…' : 'Seleccione una provincia'}
                </option>
                {provinces.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.code})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 min-w-0">
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                Ciudad
              </label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green disabled:bg-gray-100 disabled:text-gray-400"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                disabled={!selectedProvince || loadingCities}
              >
                <option value="">
                  {loadingCities ? 'Cargando…' : cities.length === 0 ? 'Sin ciudades' : 'Seleccione una ciudad'}
                </option>
                {cities.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 min-w-0">
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                Barrio
              </label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green disabled:bg-gray-100 disabled:text-gray-400"
                value={selectedNeighborhood}
                onChange={(e) => setSelectedNeighborhood(e.target.value)}
                disabled={!selectedCity || loadingNeighborhoods}
              >
                <option value="">
                  {loadingNeighborhoods
                    ? 'Cargando…'
                    : neighborhoods.length === 0
                    ? 'Sin barrios'
                    : 'Seleccione un barrio'}
                </option>
                {neighborhoods.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Fila 2: Filtro de idioma + Botón buscar */}
          <div className="flex flex-col sm:flex-row gap-3 items-end">
            <div className="flex-1 min-w-0">
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                Idioma Hablado por el Personal{' '}
                <span className="normal-case font-normal text-gray-400">(opcional)</span>
              </label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green disabled:bg-gray-100 disabled:text-gray-400"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                disabled={!selectedNeighborhood}
              >
                <option value="">Cualquier idioma</option>
                {languages.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="hidden sm:block flex-1" />
            <div className="hidden sm:block flex-1" />

            <button
              type="submit"
              disabled={!canSearch}
              className="px-8 py-2 rounded-md font-semibold text-sm transition-colors
                bg-brand-green text-white hover:bg-brand-green-dark active:bg-brand-green-dark
                disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              Buscar
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
