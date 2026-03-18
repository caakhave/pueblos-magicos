export interface PuebloData {
  id: string
  name: string
  state: string
  stateKey: string
  lat: number
  lng: number
  elevation: number | null
  population: number | null
  image: string
  description: {
    en: string
    es: string
  }
}
