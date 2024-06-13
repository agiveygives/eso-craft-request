import translations from './translations';

export const supportedLocales = [
  'en-US',
  'fr',
];

const messages = {
  en: translations.enUS,
  'en-US': translations.enUS,
  fr: translations.fr,
};

export default messages;
