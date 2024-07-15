import i18nConfig from "../i18nConfig"

export const locales = [
    { locale: 'fr', labels: { fr: 'Français', en: 'French' }, flag: '🇫🇷' },
    { locale: 'en', labels: { fr: 'Anglais', en: 'English' }, flag: '🇬🇧' },
  ]
  
export  const defaultLocale = 'fr'

export type Locale = (typeof i18nConfig)['locales'][number]

