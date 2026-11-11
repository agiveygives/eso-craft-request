// https://en.uesp.net/wiki/Online:Styles

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { toLowerCamelCase } = require('./utils');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms)); // eslint-disable-line no-promise-executor-return
}

function showLoadingBar(message, currentTick, totalTicks) {
  const progressBar = Array(totalTicks).fill(' ');
  progressBar.fill('=', 0, currentTick);

  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(`${message} [${progressBar.join('')}]`);
}

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const uespPage = await browser.newPage();
  await uespPage.goto('https://en.uesp.net/wiki/Online:Styles');

  const craftableStyles = await uespPage.evaluate(() => (
    Array
      .from(document.querySelectorAll('table.wikitable.sortable tbody tr'))
      .map((tr) => ({
        name: tr.children[0].innerText.trim().replace(' Style', ''),
        material: tr.children[1].innerText.trim(),
        motifNum: tr.children[2].attributes['data-sort-value'].value,
      }))
      .sort()
  ));

  const i18nKeys = [];

  let englishTranslations = '{\n';
  englishTranslations += '  "style.none": "No Preference",\n';
  englishTranslations += '  "stone.any": "Any Style Stone",\n';
  let stylesJs = 'export default [\n';

  craftableStyles.forEach((style, index) => {
    const i18nNameKey = `crafting.mofit.${style.motifNum}.${toLowerCamelCase(style.name)}`;
    const i18nStoneKey = `crafting.stone.${style.motifNum}.${toLowerCamelCase(style.name)}`;
    i18nKeys.push({ name: i18nNameKey, stone: i18nStoneKey });

    // update english translations
    englishTranslations += `  "${i18nNameKey}": "${style.name}",\n`;
    englishTranslations += `  "${i18nStoneKey}": "${style.material}"`;
    if (index === craftableStyles.length - 1) {
      englishTranslations += '\n}\n';
    } else {
      englishTranslations += ',\n';
    }

    // update styles.js
    stylesJs += `  { name: '${i18nNameKey}', stone: '${i18nStoneKey}' },\n`;
  });

  stylesJs += '];\n';

  const stylesFile = path.resolve(__dirname, '../../src/constants/styles.js');
  const englishTranslationsFile = path.resolve(__dirname, '../../src/i18n/en-US/motifs.json');

  fs.writeFileSync(stylesFile, stylesJs, 'utf8');
  fs.writeFileSync(englishTranslationsFile, englishTranslations, 'utf8');

  // const frenchTranslationsFile = path.resolve(__dirname, '../../src/i18n/fr/motifs.json');
  // let frenchTranslations = {};
  // if (fs.existsSync(frenchTranslationsFile)) {
  //   const jsonFileContent = fs.readFileSync(frenchTranslationsFile, 'utf8');
  //   frenchTranslations = JSON.parse(jsonFileContent);
  // }

  // const esoSetsPage = await browser.newPage();
  // esoSetsPage.setDefaultTimeout(240000);

  // const totalStyleCount = craftableStyles.length;

  // for (const [index, style] of craftableStyles.entries()) { // eslint-disable-line no-restricted-syntax
  //   console.log('\n');
  //   const processingMessage = `Processing ${style.name}...`;

  //   if (frenchTranslations[i18nKeys[index]]) {
  //     console.log(`French translation for ${set} already exists: ${frenchTranslations[i18nKeys[index]]}`);
  //     console.log(`Processed [${index + 1}/${totalStyleCount}]`);
  //     continue; // eslint-disable-line no-continue
  //   }

  //   showLoadingBar(processingMessage, 0, 8);
  //   await esoSetsPage.goto('https://eso-sets.com/'); // eslint-disable-line no-await-in-loop
  //   await esoSetsPage.type('#query', set); // eslint-disable-line no-await-in-loop
  //   await esoSetsPage.keyboard.press('Enter'); // eslint-disable-line no-await-in-loop
  //   showLoadingBar(processingMessage, 1, 8);
  //   await esoSetsPage.waitForNavigation(); // eslint-disable-line no-await-in-loop
  //   showLoadingBar(processingMessage, 2, 8);

  //   await esoSetsPage.evaluate(() => { // eslint-disable-line no-await-in-loop
  //     const setLink = Array.from(document.querySelectorAll('a')).find((a) => a.href.includes('/set/'));
  //     if (setLink) {
  //       setLink.click();
  //     }
  //   });
  //   showLoadingBar(processingMessage, 3, 8);
  //   esoSetsPage.waitForNavigation();
  //   await sleep(2000); // eslint-disable-line no-await-in-loop

  //   showLoadingBar(processingMessage, 4, 8);
  //   await esoSetsPage.evaluate(() => { // eslint-disable-line no-await-in-loop
  //     const languageLink = Array.from(document.querySelectorAll('a')).find((a) => a.href.includes('/fr/'));
  //     if (languageLink) {
  //       languageLink.click();
  //     }
  //   });
  //   showLoadingBar(processingMessage, 5, 8);
  //   esoSetsPage.waitForNavigation();
  //   await sleep(2000); // eslint-disable-line no-await-in-loop

  //   showLoadingBar(processingMessage, 6, 8);
  //   const setName = await esoSetsPage.evaluate(() => ( // eslint-disable-line no-await-in-loop
  //     document.querySelector('span.set-tooltip-setname').innerText
  //   ));
  //   showLoadingBar(processingMessage, 7, 8);

  //   // update french translations
  //   frenchTranslations[i18nKeys[index]] = setName;

  //   showLoadingBar(processingMessage, 8, 8);

  //   console.log(`\nFrench translation for ${set}: ${setName}`);
  //   console.log(`Processed [${index + 1}/${totalSetCount}]`);
  // }

  // // Sort the keys alphabetically
  // const sortedTranslations = Object.keys(frenchTranslations)
  //   .sort()
  //   .reduce((acc, key) => {
  //     acc[key] = frenchTranslations[key];
  //     return acc;
  //   }, {});

  // fs.writeFileSync(frenchTranslationsFile, JSON.stringify(sortedTranslations, null, 2), 'utf8');

  await browser.close();
})();
