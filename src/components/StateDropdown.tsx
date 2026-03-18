import type { Lang } from '../i18n'
import { strings } from '../i18n'
import type { PuebloData } from '../types'

interface Props {
  pueblos: PuebloData[]
  selectedState: string | null
  onSelect: (stateKey: string | null) => void
  lang: Lang
}

export default function StateDropdown({ pueblos, selectedState, onSelect, lang }: Props) {
  const t = strings[lang]

  // Build sorted list of unique states from data
  const stateMap = new Map<string, string>()
  for (const p of pueblos) {
    if (!stateMap.has(p.stateKey)) {
      stateMap.set(p.stateKey, p.state)
    }
  }
  const states = Array.from(stateMap.entries()).sort((a, b) =>
    a[1].localeCompare(b[1])
  )

  return (
    <div className="px-4 py-3 bg-fresco-cream border-b border-daring/30">
      <select
        value={selectedState ?? ''}
        onChange={(e) => onSelect(e.target.value || null)}
        className="w-full md:w-72 px-3 py-2 rounded border border-daring/40 bg-white text-tricorn-black
                   focus:outline-none focus:ring-2 focus:ring-georgian-blue focus:border-georgian-blue
                   text-sm font-medium cursor-pointer"
        aria-label={t.selectState}
      >
        <option value="">{t.selectState}</option>
        {states.map(([key, name]) => (
          <option key={key} value={key}>
            {name}
          </option>
        ))}
      </select>
    </div>
  )
}
