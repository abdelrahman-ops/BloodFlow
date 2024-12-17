import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import navbarEn from './en/navbar.json';
import homeEn from './en/home.json';
import footerEn from './en/footer.json';
import commonEn from './en/common.json';

import navbarAr from './ar/navbar.json';
import homeAr from './ar/home.json';
import footerAr from './ar/footer.json';
import commonAr from './ar/common.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        navbar: navbarEn,
        home: homeEn,
        footer: footerEn,
        common: commonEn,
      },
      ar: {
        navbar: navbarAr,
        home: homeAr,
        footer: footerAr,
        common: commonAr,
      },
    },
    fallbackLng: 'en',
    ns: ['navbar', 'home', 'footer', 'common'], // Define namespaces
    defaultNS: 'common', // Default namespace
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
