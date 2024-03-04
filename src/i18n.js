// i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './en.json';
import viTranslation from './vi.json';

export const initializeI18n = (language) => {
  const resources = {
    en: {
      translation: enTranslation
    },
    vi: {
      translation: viTranslation
    }
  };

  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: language,
      fallbackLng: 'vi',
      interpolation: {
        escapeValue: false
      }
    });
};

export default i18n;
