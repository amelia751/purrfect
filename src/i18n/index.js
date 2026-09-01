'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './en.json';
import viTranslation from './vi.json';

export const initializeI18n = (language) => {
  const resources = {
    en: {
      translation: enTranslation,
    },
    vi: {
      translation: viTranslation,
    },
  };

  if (i18n.isInitialized) {
    if (language) {
      i18n.changeLanguage(language);
    }
    return i18n;
  }

  i18n.use(initReactI18next).init({
    resources,
    lng: language || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

  return i18n;
};

initializeI18n();

export default i18n;
