import type { PuebloData } from '../types'
import type { Lang } from '../i18n'
import { strings } from '../i18n'
import PuebloCard from './PuebloCard'

interface Props {
  stateKey: string
  pueblos: PuebloData[]
  lang: Lang
  onBack: () => void
}

export default function PuebloList({ stateKey, pueblos, lang, onBack }: Props) {
  const t = strings[lang]

  const filtered = pueblos
    .filter((p) => p.stateKey === stateKey)
    .sort((a, b) => a.name.localeCompare(b.name))

  const stateName = filtered[0]?.state ?? stateKey

  return (
    <div className="flex-1 bg-fresco-cream px-4 py-6">
      <div className="max-w-7xl mx-auto">
        {/* Back button + State heading */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onBack}
            className="text-sm font-medium text-georgian-blue hover:text-daring transition-colors"
          >
            {t.backToMap}
          </button>
          <h2 className="font-playfair text-2xl font-bold text-tricorn-black">
            {stateName}
          </h2>
          <span className="text-sm text-dormer-brown">
            ({filtered.length})
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((pueblo) => (
            <PuebloCard key={pueblo.id} pueblo={pueblo} lang={lang} />
          ))}
        </div>
      </div>
    </div>
  )
}
