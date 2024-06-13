const translationFiles = [
  'armor',
  'common',
  'jewelry',
  'materials',
  'motifs',
  'sets',
  'weapons',
];

const english = translationFiles.reduce((translations, file) => {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const translation = require(`./en-US/${file}.json`);
  return { ...translations, ...translation };
}, {});
const french = translationFiles.reduce((translations, file) => {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const translation = require(`./fr/${file}.json`);
  return { ...translations, ...translation };
}, {});

export { english, french };

export default {
  enUS: english,
  fr: french,
};
