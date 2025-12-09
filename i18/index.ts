import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';
import fr from './fr.json';
import ko from './ko.json';

const resources = {
  en: { translation: en },
  ko: { translation: ko },
  fr: { translation: fr },
};

const languageCode: string = Localization.getLocales()[0]?.languageCode || 'en';

i18n.use(initReactI18next).init({
  lng: languageCode,              
  fallbackLng: 'en',
  resources,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;