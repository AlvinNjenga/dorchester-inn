const { chromium } = require('playwright-core');
const assert = require('node:assert/strict');
const fs = require('node:fs');

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  const results = [];
  try {
    const page = await browser.newPage();
    for (const width of [390, 768, 1440, 1600]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto('http://127.0.0.1:5173/__style-sample');
      await page.locator('main h1').waitFor();
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator('h1').count(), 1);
      const levels = await page.locator('main :is(h1,h2,h3)').evaluateAll(nodes => nodes.map(node => Number(node.tagName[1])));
      levels.forEach((level, i) => { if (i) assert(level <= levels[i - 1] + 1); });
      assert.equal(Math.round((await page.locator('main > header').boundingBox()).width), width);
      assert.equal(await page.getByRole('navigation', { name: 'Breadcrumb', exact: true }).locator('[aria-current="page"]').textContent(), 'Style sample');
      const stories = page.locator('section[aria-labelledby="sample-stories"]');
      const images = stories.locator('img');
      assert.equal(await images.count(), 2);
      for (const image of await images.all()) {
        await image.scrollIntoViewIfNeeded();
        await image.evaluate(node => node.decode());
      }
      assert.deepEqual(await images.evaluateAll(nodes => nodes.map(node => [node.naturalWidth, node.naturalHeight])), [[768, 576], [500, 386]]);
      const secondRow = stories.locator('section').nth(1);
      const image = await secondRow.locator(':scope > div').nth(0).boundingBox();
      const text = await secondRow.locator(':scope > div').nth(1).boundingBox();
      assert(width < 768 ? image.y < text.y : image.x > text.x);
      assert.equal(await secondRow.getByRole('link').count(), 0);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      await page.evaluate(() => document.activeElement instanceof HTMLElement && document.activeElement.blur());
      await page.locator('main > header').screenshot({ path: `docs/validation/e04-t01/title-${width}.png` });
      await stories.screenshot({ path: `docs/validation/e04-t01/stories-${width}.png` });
      const button = page.getByRole('button', { name: 'Try sample action', exact: true });
      await button.focus();
      await page.keyboard.press('Enter');
      await page.getByRole('status').filter({ hasText: 'Sample action activated.' }).waitFor();
      await button.focus();
      await page.keyboard.press('Tab');
      assert.equal(await page.evaluate(() => document.activeElement.textContent), 'Explore rooms');
      await stories.getByRole('link', { name: 'Explore rooms' }).click();
      await page.getByRole('heading', { name: 'Rooms', level: 1, exact: true }).waitFor();
      assert(await page.locator('main').evaluate(node => node.classList.contains('site-container')));
      await page.goBack();
      await page.locator('main h1').waitFor();
      results.push({ width, headingOrder: 'pass', fullWidthBand: 'pass', mosaicOrder: 'pass', optionalAction: 'pass', overflow: false, keyboardAction: 'pass', disabledSkipped: 'pass', routeAndHistory: 'pass' });
    }
    await page.setViewportSize({ width: 390, height: 1000 });
    await page.evaluate(() => document.documentElement.style.fontSize = '200%');
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    fs.writeFileSync('docs/validation/e04-t01/results.json', JSON.stringify({ views: results, doubledTextNoOverflow: true, suppliedImagesLoadedInOrder: true, productionImageApproval: 'not established by development sample' }, null, 2));
    console.log('Primitives: four widths, heading order, layout, keyboard and route checks passed; doubled text has no overflow.');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exit(1); });
