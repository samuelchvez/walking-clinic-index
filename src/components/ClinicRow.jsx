import LanguageBadges from './LanguageBadges'

export default function ClinicRow({ clinic }) {
  const languages = [
    ...new Set(
      (clinic.personnel ?? [])
        .flatMap((p) => (p.personnel_languages ?? []).map((pl) => pl.languages?.name))
        .filter(Boolean)
    ),
  ]

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      {/* Nombre */}
      <td className="py-3 px-4 font-medium text-gray-900 align-top">
        {clinic.name}
      </td>

      {/* Dirección */}
      <td className="py-3 px-4 text-sm text-gray-600 align-top">
        {clinic.address ?? <span className="text-gray-400 italic">No registrada</span>}
      </td>

      {/* Teléfono */}
      <td className="py-3 px-4 text-sm text-gray-600 align-top whitespace-nowrap">
        {clinic.phone ? (
          <a
            href={`tel:${clinic.phone.replace(/\D/g, '')}`}
            className="text-brand-green hover:underline font-medium"
          >
            {clinic.phone}
          </a>
        ) : (
          <span className="text-gray-400 italic">—</span>
        )}
      </td>

      {/* Servicios */}
      <td className="py-3 px-4 text-sm text-gray-600 align-top">
        {clinic.service ?? <span className="text-gray-400 italic">—</span>}
      </td>

      {/* Idiomas */}
      <td className="py-3 px-4 align-top">
        <LanguageBadges languages={languages} />
      </td>

      {/* Afiliación */}
      <td className="py-3 px-4 text-center align-top">
        {clinic.is_extended_language_affiliated ? (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-brand-green-light text-brand-navy">
            ✓ Afiliada
          </span>
        ) : (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-500">
            —
          </span>
        )}
      </td>
    </tr>
  )
}
