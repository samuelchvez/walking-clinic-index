const LANGUAGE_COLORS = {
  English:   'bg-blue-100 text-blue-800',
  French:    'bg-sky-100 text-sky-800',
  Mandarin:  'bg-red-100 text-red-800',
  Cantonese: 'bg-orange-100 text-orange-800',
  Tamil:     'bg-purple-100 text-purple-800',
  Punjabi:   'bg-pink-100 text-pink-800',
  Urdu:      'bg-teal-100 text-teal-800',
}

const DEFAULT_COLOR = 'bg-gray-100 text-gray-700'

export default function LanguageBadges({ languages }) {
  if (!languages || languages.length === 0) {
    return <span className="text-gray-400 text-xs italic">None listed</span>
  }

  return (
    <div className="flex flex-wrap gap-1">
      {languages.map((lang) => {
        const colorClass = LANGUAGE_COLORS[lang] ?? DEFAULT_COLOR
        return (
          <span
            key={lang}
            className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${colorClass}`}
          >
            {lang}
          </span>
        )
      })}
    </div>
  )
}
