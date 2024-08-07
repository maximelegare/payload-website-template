export const locales = [
  { locale: 'fr', labels: { fr: 'Français', en: 'French' }, flag: '🇫🇷' },
  { locale: 'en', labels: { fr: 'Anglais', en: 'English' }, flag: '🇬🇧' },
] as const

export const defaultLocale = 'fr'

export type Locale = (typeof locales)[number]['locale'] | 'all'
