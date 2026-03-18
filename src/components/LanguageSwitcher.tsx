import type { Lang } from '../i18n'

interface Props {
  lang: Lang
  onLangChange: (lang: Lang) => void
}

export default function LanguageSwitcher({ lang, onLangChange }: Props) {
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onLangChange('en')}
        className={`px-3 py-1 text-sm font-semibold rounded transition-colors ${
          lang === 'en'
            ? 'bg-white text-cherry-tomato'
            : 'text-white/80 hover:text-white hover:bg-white/10'
        }`}
        aria-pressed={lang === 'en'}
      >
        EN
      </button>
      <span className="text-white/40">|</span>
      <button
        onClick={() => onLangChange('es')}
        className={`px-3 py-1 text-sm font-semibold rounded transition-colors ${
          lang === 'es'
            ? 'bg-white text-cherry-tomato'
            : 'text-white/80 hover:text-white hover:bg-white/10'
        }`}
        aria-pressed={lang === 'es'}
      >
        ES
      </button>
    </div>
  )
}
