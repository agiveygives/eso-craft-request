// https://en.uesp.net/wiki/Online:Craftable_Sets
// https://eso-sets.com/

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

async function retry(fn, retries = 3, delay = 1000) {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;
    await sleep(delay);
    return retry(fn, retries - 1, delay * 2);
  }
}

// eslint-disable-next-line max-len
async function saveTranslations(setsFile, englishTranslationsFile, frenchTranslationsFile, setsJs, englishTranslations, frenchTranslations) {
  try {
    fs.writeFileSync(setsFile, setsJs, 'utf8');
    fs.writeFileSync(englishTranslationsFile, englishTranslations, 'utf8');
    fs.writeFileSync(frenchTranslationsFile, JSON.stringify(frenchTranslations, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving translations:', error);
    throw error;
  }
}

(async () => {
  let browser;
  try {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      timeout: 60000, // Increase timeout for CI environment
    });

    const uespPage = await browser.newPage();
    await retry(async () => {
      await uespPage.goto('https://en.uesp.net/wiki/Online:Craftable_Sets', {
        waitUntil: 'networkidle0',
        timeout: 30000,
      });
    });

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

      englishTranslations += `  "${i18nKey}": "${set.trim()}"`;
      if (index === craftableSets.length - 1) {
        englishTranslations += '\n}\n';
      } else {
        englishTranslations += ',\n';
      }

      setsJs += `  '${i18nKey}',\n`;
    });

    setsJs += '];\n';

    const setsFile = path.resolve(__dirname, '../../src/constants/sets.js');
    const englishTranslationsFile = path.resolve(__dirname, '../../src/i18n/en-US/sets.json');
    const frenchTranslationsFile = path.resolve(__dirname, '../../src/i18n/fr/sets.json');

    let frenchTranslations = {};
    if (fs.existsSync(frenchTranslationsFile)) {
      const jsonFileContent = fs.readFileSync(frenchTranslationsFile, 'utf8');
      frenchTranslations = JSON.parse(jsonFileContent);
    }

    const esoSetsPage = await browser.newPage();
    esoSetsPage.setDefaultTimeout(60000); // Increase timeout for CI environment

    const totalSetCount = craftableSets.length;

    for (const [index, set] of craftableSets.entries()) {
      console.log('\n');
      const processingMessage = `Processing ${set}...`;

      if (frenchTranslations[i18nKeys[index]]) {
        console.log(`French translation for ${set} already exists: ${frenchTranslations[i18nKeys[index]]}`);
        console.log(`Processed [${index + 1}/${totalSetCount}]`);
        continue;
      }

      try {
        showLoadingBar(processingMessage, 0, 8);
        await retry(async () => {
          await esoSetsPage.goto('https://eso-sets.com/', {
            waitUntil: 'networkidle0',
            timeout: 30000,
          });
        });

        await retry(async () => {
          await esoSetsPage.type('#query', set);
          await esoSetsPage.keyboard.press('Enter');
          await esoSetsPage.waitForNavigation({ timeout: 30000 });
        });

        showLoadingBar(processingMessage, 2, 8);

        await retry(async () => {
          await esoSetsPage.evaluate(() => {
            const setLink = Array.from(document.querySelectorAll('a')).find((a) => a.href.includes('/set/'));
            if (setLink) {
              setLink.click();
            }
          });
          await esoSetsPage.waitForNavigation({ timeout: 30000 });
        });

        showLoadingBar(processingMessage, 4, 8);
        await sleep(2000);

        await retry(async () => {
          await esoSetsPage.evaluate(() => {
            const languageLink = Array.from(document.querySelectorAll('a')).find((a) => a.href.includes('/fr/'));
            if (languageLink) {
              languageLink.click();
            } else {
              throw new Error('French language link not found');
            }
          });
          await esoSetsPage.waitForNavigation({ timeout: 30000 });
        });

        showLoadingBar(processingMessage, 6, 8);
        await sleep(3000); // Increased wait time for French page to load

        const setName = await retry(async () => {
          const result = await esoSetsPage.evaluate(() => {
            const element = document.querySelector('span.set-tooltip-setname');
            if (!element) {
              throw new Error('Set name element not found on French page');
            }
            return element.innerText;
          });

          if (!result || result.trim() === '') {
            throw new Error('Empty set name found');
          }

          return result;
        });

        showLoadingBar(processingMessage, 7, 8);

        const trimmedSetName = setName.trim();
        if (!trimmedSetName) {
          throw new Error('Set name is empty after trimming');
        }

        frenchTranslations[i18nKeys[index]] = trimmedSetName;
        showLoadingBar(processingMessage, 8, 8);

        console.log(`\nFrench translation for ${set}: ${setName}`);
        console.log(`Processed [${index + 1}/${totalSetCount}]`);

        // Save progress after each successful set
        await saveTranslations(setsFile, englishTranslationsFile, frenchTranslationsFile, setsJs, englishTranslations, frenchTranslations);
      } catch (error) {
        console.error(`Error processing set ${set}:`, error);
        // Continue with next set instead of failing completely
        continue;
      }
    }

    // Final save of all translations
    await saveTranslations(setsFile, englishTranslationsFile, frenchTranslationsFile, setsJs, englishTranslations, frenchTranslations);

  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
})();
