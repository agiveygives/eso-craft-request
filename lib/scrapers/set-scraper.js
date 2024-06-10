// https://en.uesp.net/wiki/Online:Craftable_Sets

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { toLowerCamelCase } = require('./utils');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://en.uesp.net/wiki/Online:Craftable_Sets');

  const craftableSets = await page.evaluate(() => (
    Array
      .from(document.querySelectorAll('table.wikitable.sortable tbody tr th'))
      .map((th) => th.textContent)
      .sort()
  ));

  let setsJs = 'export default [\n';

  craftableSets.forEach((set) => {
    const i18nKey = `set.${toLowerCamelCase(set)}`;
    setsJs += `  '${i18nKey}',\n`;
  });

  setsJs += '];\n';

  const setsFile = path.resolve(__dirname, '../../src/constants/sets.js');

  fs.writeFileSync(setsFile, setsJs, 'utf8');

  await browser.close();
})();
