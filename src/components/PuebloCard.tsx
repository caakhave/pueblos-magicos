import type { PuebloData } from '../types'
import type { Lang } from '../i18n'
import { strings } from '../i18n'

interface Props {
  pueblo: PuebloData
  lang: Lang
}

export default function PuebloCard({ pueblo, lang }: Props) {
  const t = strings[lang]
  const description = pueblo.description[lang] || t.noDescription

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow border border-daring/20 flex flex-col">
      {/* Image */}
      <div className="relative w-full" style={{ paddingTop: '56.25%' /* 16:9 */ }}>
        {pueblo.image ? (
          <img
            src={`./img/${pueblo.image}`}
            alt={pueblo.name}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-fresco-cream flex items-center justify-center">
            <span className="text-dormer-brown text-sm font-medium">{t.noImage}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        {/* Name + State */}
        <div className="flex items-start justify-between gap-2">
          <h2 className="font-playfair text-lg font-semibold text-tricorn-black leading-tight">
            {pueblo.name}
          </h2>
          <span className="text-xs font-medium text-white bg-cherry-tomato px-2 py-0.5 rounded-full whitespace-nowrap">
            {pueblo.state}
          </span>
        </div>

        {/* Stats */}
        <div className="flex gap-4 text-xs text-dormer-brown">
          {pueblo.population !== null && (
            <span>
              <span className="font-semibold">{t.population}:</span>{' '}
              {pueblo.population.toLocaleString()}
            </span>
          )}
          {pueblo.elevation !== null && (
            <span>
              <span className="font-semibold">{t.elevation}:</span>{' '}
              {pueblo.elevation.toLocaleString()}{t.metersAbbr}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-tricorn-black/80 leading-relaxed flex-1">
          {description}
        </p>
      </div>
    </div>
  )
}
