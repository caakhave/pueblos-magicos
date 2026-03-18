import LanguageSwitcher from './LanguageSwitcher'
import type { Lang } from '../i18n'

interface Props {
  lang: Lang
  onLangChange: (lang: Lang) => void
}

export default function Header({ lang, onLangChange }: Props) {
  return (
    <header className="bg-cherry-tomato text-white px-4 py-3 flex items-center justify-between shadow-md">
      <h1 className="font-playfair text-xl sm:text-2xl md:text-3xl font-bold tracking-tight truncate mr-4">
        Pueblos Mágicos de México
      </h1>
      <LanguageSwitcher lang={lang} onLangChange={onLangChange} />
    </header>
  )
}
