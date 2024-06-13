// https://en.uesp.net/wiki/Online:Craftable_Sets
// https://eso-sets.com/

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { toLowerCamelCase } = require('./utils');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function showLoadingBar(message, currentTick, totalTicks) {
  const progressBar = Array(totalTicks).fill(' ');
  progressBar.fill('=', 0, currentTick);

  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(`${message} [${progressBar.join('')}]`);
}

(async () => {
  const browser = await puppeteer.launch();
  const uespPage = await browser.newPage();
  await uespPage.goto('https://en.uesp.net/wiki/Online:Craftable_Sets');

  const craftableSets = await uespPage.evaluate(() => (
    Array
      .from(document.querySelectorAll('table.wikitable.sortable tbody tr th'))
      .map((th) => th.textContent)
      .sort()
  ));

  const i18nKeys = [];

  let englishTranslations = '{\n';
  let setsJs = 'export default [\n';

  craftableSets.forEach((set, index) => {
    const i18nKey = `set.${toLowerCamelCase(set)}`;
    i18nKeys.push(i18nKey);

    // update english translations
    englishTranslations += `  "${i18nKey}": "${set}"`;
    if (index === craftableSets.length - 1) {
      englishTranslations += '\n}\n';
    } else {
      englishTranslations += ',\n';
    }

    // update sets.js
    setsJs += `  '${i18nKey}',\n`;
  });

  setsJs += '];\n';

  const setsFile = path.resolve(__dirname, '../../src/constants/sets.js');
  const englishTranslationsFile = path.resolve(__dirname, '../../src/i18n/en-US/sets.json');

  fs.writeFileSync(setsFile, setsJs, 'utf8');
  fs.writeFileSync(englishTranslationsFile, englishTranslations, 'utf8');

  const frenchTranslationsFile = path.resolve(__dirname, '../../src/i18n/fr/sets.json');
  let frenchTranslations = {};
  if (fs.existsSync(frenchTranslationsFile)) {
    const jsonFileContent = fs.readFileSync(frenchTranslationsFile, 'utf8');
    console.log(jsonFileContent.length)
    console.log('jsonFileContent', jsonFileContent);
    frenchTranslations = JSON.parse(jsonFileContent);
  }

  const esoSetsPage = await browser.newPage();
  esoSetsPage.setDefaultTimeout(240000)

  const totalSetCount = craftableSets.length;

  for (const [index, set] of craftableSets.entries()) {
    console.log("\n")
    const processingMessage = `Processing ${set}...`;

    if (frenchTranslations[i18nKeys[index]]) {
      console.log(`French translation for ${set} already exists: ${frenchTranslations[i18nKeys[index]]}`);
      console.log(`Processed [${index + 1}/${totalSetCount}]`);
      continue;
    }

    showLoadingBar(processingMessage, 0, 8);
    await esoSetsPage.goto('https://eso-sets.com/');
    await esoSetsPage.type('#query', set);
    await esoSetsPage.keyboard.press('Enter');
    showLoadingBar(processingMessage, 1,8);
    await esoSetsPage.waitForNavigation();
    showLoadingBar(processingMessage, 2,8);

    await esoSetsPage.evaluate(() => {
      const setLink = Array.from(document.querySelectorAll('a')).find(a => a.href.includes('/set/'));
      if (setLink) {
        setLink.click();
      }
    });
    showLoadingBar(processingMessage, 3,8);
    esoSetsPage.waitForNavigation();
    await sleep(2000);

    showLoadingBar(processingMessage, 4,8);
    await esoSetsPage.evaluate(() => {
      const languageLink = Array.from(document.querySelectorAll('a')).find(a => a.href.includes('/fr/'));
      if (languageLink) {
        languageLink.click();
      }
    });
    showLoadingBar(processingMessage, 5,8);
    esoSetsPage.waitForNavigation();
    await sleep(2000);

    showLoadingBar(processingMessage, 6,8);
    const setName = await esoSetsPage.evaluate(() => (
      document.querySelector('span.set-tooltip-setname').innerText
    ));
    showLoadingBar(processingMessage, 7,8);

    // update french translations
    frenchTranslations[i18nKeys[index]] = setName;

    showLoadingBar(processingMessage, 8,8);

    console.log(`\nFrench translation for ${set}: ${setName}`);
    console.log(`Processed [${index + 1}/${totalSetCount}]`);
  };

  // Sort the keys alphabetically
  const sortedTranslations = Object.keys(frenchTranslations)
    .sort()
    .reduce((acc, key) => {
      acc[key] = frenchTranslations[key];
      return acc;
    }, {});

  fs.writeFileSync(frenchTranslationsFile, JSON.stringify(sortedTranslations, null, 2), 'utf8');

  await browser.close();
})();
