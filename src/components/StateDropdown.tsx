import { useState, useRef, useEffect } from 'react'
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
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const stateMap = new Map<string, string>()
  for (const p of pueblos) {
    if (!stateMap.has(p.stateKey)) stateMap.set(p.stateKey, p.state)
  }
  const states = Array.from(stateMap.entries()).sort((a, b) => a[1].localeCompare(b[1]))
  const selectedName = selectedState ? stateMap.get(selectedState) : null

  // Close on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  function choose(key: string | null) {
    onSelect(key)
    setOpen(false)
  }

  return (
    <div className="bg-fresco-cream border-b border-daring/20 px-4 py-3 flex items-center gap-3">
      {/* Decorative accent */}
      <span className="hidden sm:block w-1 h-6 rounded-full bg-cherry-tomato opacity-70 flex-shrink-0" />

      <div className="flex items-center gap-2 flex-shrink-0">
        <svg className="w-4 h-4 text-cherry-tomato opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="text-xs font-semibold uppercase tracking-widest text-dormer-brown hidden sm:block">
          {lang === 'en' ? 'State' : 'Estado'}
        </span>
      </div>

      {/* Custom dropdown */}
      <div ref={ref} className="relative w-full md:w-72">
        <button
          onClick={() => setOpen((o) => !o)}
          className={`w-full flex items-center justify-between gap-2 pl-4 pr-3 py-2 rounded-md
                      border text-sm font-medium text-left transition-all duration-150 shadow-sm
                      ${open
                        ? 'bg-white border-cherry-tomato/60 ring-2 ring-cherry-tomato/20'
                        : 'bg-white border-daring/30 hover:border-cherry-tomato/40 hover:shadow'
                      }
                      ${selectedName ? 'text-tricorn-black' : 'text-dormer-brown'}`}
        >
          <span className="truncate">
            {selectedName ?? t.selectState}
          </span>
          <svg
            className={`w-4 h-4 flex-shrink-0 text-cherry-tomato transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {open && (
          <div className="absolute z-50 mt-1 w-full bg-white border border-daring/20 rounded-md shadow-lg overflow-hidden">
            {/* Search-style header strip */}
            <div className="px-3 py-2 border-b border-daring/10 bg-fresco-cream/60">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-dormer-brown">
                {lang === 'en' ? `${states.length} states` : `${states.length} estados`}
              </span>
            </div>

            <ul className="max-h-64 overflow-y-auto">
              {/* Clear option */}
              <li>
                <button
                  onClick={() => choose(null)}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors
                              ${!selectedState
                                ? 'bg-cherry-tomato/10 text-cherry-tomato font-semibold'
                                : 'text-dormer-brown hover:bg-fresco-cream/80 hover:text-tricorn-black'
                              }`}
                >
                  {t.selectState}
                </button>
              </li>

              {/* Divider */}
              <li className="border-t border-daring/10" />

              {states.map(([key, name]) => (
                <li key={key}>
                  <button
                    onClick={() => choose(key)}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center justify-between gap-2
                                ${selectedState === key
                                  ? 'bg-cherry-tomato text-white font-semibold'
                                  : 'text-tricorn-black hover:bg-fresco-cream/80 hover:text-cherry-tomato'
                                }`}
                  >
                    {name}
                    {selectedState === key && (
                      <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Active state pill */}
      {selectedName && (
        <button
          onClick={() => choose(null)}
          className="hidden sm:flex items-center gap-1.5 pl-3 pr-2 py-1 rounded-full
                     bg-cherry-tomato/10 border border-cherry-tomato/30
                     text-xs font-medium text-cherry-tomato
                     hover:bg-cherry-tomato/20 transition-colors flex-shrink-0"
        >
          {selectedName}
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* Total count */}
      <span className="ml-auto text-xs font-semibold uppercase tracking-widest text-dormer-brown flex-shrink-0">
        {pueblos.length} total
      </span>
    </div>
  )
}
