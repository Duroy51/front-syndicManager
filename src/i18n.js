import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { use } from 'react';

i18n
  .use(HttpApi) // ou .use(Backend)
  .use(LanguageDetector) // Détecte la langue du navigateur/cookie
  .use(initReactI18next) // connecte i18next avec react
  .init({
    supportedLngs: ['fr', 'en', 'de'], // langues supportées
    fallbackLng: 'fr', // langue par défaut
    lng: 'en',
    detection: {
      order: ['cookie', 'localStorage', 'htmlTag', 'path', 'subdomain'],
      caches: ['cookie'],
    },
    debug: true,
    interpolation: {
      escapeValue: false, // pas besoin d'échapper les valeurs, permet d'utiliser du HTML dans les traductions
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // chemin où sont stockées les traductions
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;

