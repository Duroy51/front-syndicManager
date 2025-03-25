import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next) // IMPORTANT : Cela connecte i18n à React
  .init({
    supportedLngs: ['fr', 'en', 'de'], // Langues supportées
    fallbackLng: 'en', // Langue par défaut
    debug: true, // Activer les logs pour diagnostiquer
    interpolation: {
      escapeValue: false, // Requis avec React
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // Chemin des fichiers JSON de traduction
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['cookie', 'localStorage'],
    },
  });

export default i18n;
