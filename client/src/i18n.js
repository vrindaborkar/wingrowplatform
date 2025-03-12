import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpBackend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'mr',
    supportedLngs: ['en', 'mr', 'hi'],
    debug: true,
    detection: {
      order: ['cookie', 'htmlTag', 'localStorage', 'path', 'subdomain'],
      caches: ['cookie'],
    },
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/assets/{{lng}}/translation.json',
    },
    react: { useSuspense: false },
  })

export default i18n
