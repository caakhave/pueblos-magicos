import { useState } from 'react'
import type { Lang } from './i18n'
import type { PuebloData } from './types'
import Header from './components/Header'
import StateDropdown from './components/StateDropdown'
import PuebloList from './components/PuebloList'
import MexicoMapWidget from './MexicoMapWidget'
import rawData from './data/pueblos-magicos-data.json'

const pueblos = (rawData as { pueblos: PuebloData[] }).pueblos

export default function App() {
  const [lang, setLang] = useState<Lang>('en')
  const [selectedState, setSelectedState] = useState<string | null>(null)

  const handleStateSelect = (stateKey: string | null) => {
    setSelectedState(stateKey)
  }

  return (
    <div className="min-h-screen flex flex-col bg-fresco-cream">
      <Header lang={lang} onLangChange={setLang} />
      <StateDropdown
        pueblos={pueblos}
        selectedState={selectedState}
        onSelect={handleStateSelect}
        lang={lang}
      />

      <main className="flex-1 flex flex-col">
        {selectedState === null ? (
          <div
            className="w-full"
            style={{ minHeight: '300px', height: '65vh', maxHeight: '70vh' }}
          >
            <MexicoMapWidget />
          </div>
        ) : (
          <PuebloList
            stateKey={selectedState}
            pueblos={pueblos}
            lang={lang}
            onBack={() => setSelectedState(null)}
          />
        )}
      </main>
    </div>
  )
}
