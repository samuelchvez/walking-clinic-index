export default function Pagination({ page, totalPages, onPrev, onNext }) {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-4 py-4 border-t border-gray-100">
      <button
        onClick={onPrev}
        disabled={page === 0}
        className="px-4 py-1.5 rounded text-sm font-medium border border-gray-300
          hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Anterior
      </button>

      <span className="text-sm text-gray-600">
        Página <span className="font-semibold">{page + 1}</span> de{' '}
        <span className="font-semibold">{totalPages}</span>
      </span>

      <button
        onClick={onNext}
        disabled={page >= totalPages - 1}
        className="px-4 py-1.5 rounded text-sm font-medium border border-gray-300
          hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Siguiente
      </button>
    </div>
  )
}
