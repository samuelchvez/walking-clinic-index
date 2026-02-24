export default function Hero() {
  return (
    <header className="bg-brand-navy text-white">
      {/* Barra superior — identidad de marca */}
      <div className="border-b border-white/10 py-5 px-4">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-md">
            <img
              src="/logo.svg"
              alt="Logo Maplebridge"
              className="w-10 h-10 object-contain"
              draggable={false}
            />
          </div>
          <div>
            <div className="text-xl font-bold tracking-[0.14em] uppercase leading-none">
              Maplebridge
            </div>
            <div className="text-brand-green text-[10px] font-semibold tracking-[0.28em] uppercase mt-1">
              Soluciones de Personal de Salud
            </div>
          </div>
        </div>
      </div>

      {/* Cuerpo del hero */}
      <div className="py-10 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center gap-8">
          {/* Izquierda — texto */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-3 leading-tight">
              Directorio de Clínicas de Atención Inmediata
            </h1>
            <p className="text-white/75 text-base leading-relaxed max-w-lg">
              Ubicamos médicos y enfermeros que hablan su idioma en clínicas de
              atención inmediata en todo Canadá. Use los filtros a continuación
              para encontrar una clínica cerca de usted, atendida por
              profesionales de la salud que pueden servirle en su idioma.
            </p>
            <p className="mt-4 text-white/40 text-sm">
              Actualmente disponible en:{' '}
              <span className="text-white/70 font-medium">Markham, Ontario</span>.{' '}
              Próximamente más ciudades.
            </p>
          </div>

          {/* Derecha — tarjetas informativas */}
          <div className="flex flex-col gap-3 md:w-72 flex-shrink-0">
            <div className="rounded-lg border border-white/15 bg-white/5 px-5 py-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-green flex-shrink-0" />
                <p className="font-semibold text-sm text-white">Clínica Afiliada</p>
              </div>
              <p className="text-white/55 text-xs leading-relaxed">
                Cuenta con personal médico especialista en idiomas asignado
                directamente por Maplebridge
              </p>
            </div>

            <div className="rounded-lg border border-white/15 bg-white/5 px-5 py-4">
              <p className="font-semibold text-sm text-white mb-1">Idiomas Especializados</p>
              <p className="text-brand-green text-xs tracking-wide">
                Mandarin · Cantonese · Tamil · Punjabi · Urdu
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
