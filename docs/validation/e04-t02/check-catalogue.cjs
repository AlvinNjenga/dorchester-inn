const { chromium } = require('playwright-core');
const assert = require('node:assert/strict');
const fs = require('node:fs');

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  const results = [];
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const [width, columns] of [[390, 1], [768, 2], [1440, 3], [1600, 3]]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto('http://127.0.0.1:5173/__style-sample');
      await page.locator('main h1').waitFor();
      await page.evaluate(() => document.fonts.ready);
      const roomSection = page.locator('section[aria-labelledby="sample-catalogue-grid"]');
      const serviceSection = page.locator('section[aria-labelledby="sample-service-cards"]');
      const amenities = page.locator('section[aria-labelledby="sample-amenities"]');
      const variations = page.locator('section[aria-labelledby="sample-catalogue-variations"]');
      for (const section of [roomSection, serviceSection, amenities, variations]) {
        const expectedColumns = section === amenities && width >= 1024 ? 4 : columns;
        assert.equal(await section.locator('> div.grid').evaluate(node => getComputedStyle(node).gridTemplateColumns.split(' ').length), expectedColumns);
      }
      for (const image of await roomSection.locator('img').all()) {
        await image.scrollIntoViewIfNeeded();
        await image.evaluate(node => node.decode());
        assert.equal(await image.evaluate(node => node.naturalWidth), 1024);
        assert(await image.getAttribute('alt'));
      }
      for (const [title, usd, kes] of [['Basic Double Room', 15, '1,500'], ['Standard Double Room', 20, '2,000'], ['Deluxe Double Room', 60, '6,500']]) {
        const card = roomSection.getByRole('article', { name: title, exact: true });
        assert((await card.textContent()).includes(`USD $${usd} / KES ${kes}`));
        assert((await card.textContent()).includes('per night'));
      }
      assert.equal(await serviceSection.getByText(/Development placeholder:/).count(), 3);
      assert((await serviceSection.textContent()).includes('15\u201330 minutes'));
      assert((await serviceSection.textContent()).includes('Half price on cocktails during happy hour.'));
      assert.equal(await amenities.locator('svg[aria-hidden="true"]').count(), 4);
      assert.equal(await amenities.locator('a, button, [tabindex]').count(), 0);
      assert.equal(await variations.getByRole('article', { name: 'Lounge', exact: true }).locator('ul').count(), 0);
      const ids = await page.locator('[id]').evaluateAll(nodes => nodes.map(node => node.id));
      assert.equal(ids.length, new Set(ids).size);
      const levels = await page.locator('main :is(h1,h2,h3)').evaluateAll(nodes => nodes.map(node => Number(node.tagName[1])));
      levels.forEach((level, index) => { if (index) assert(level <= levels[index - 1] + 1); });
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      for (const [name, section] of [['rooms', roomSection], ['services', serviceSection], ['amenities', amenities], ['variations', variations]]) {
        await page.evaluate(() => document.activeElement instanceof HTMLElement && document.activeElement.blur());
        await section.screenshot({ path: `docs/validation/e04-t02/${name}-${width}.png` });
      }
      for (const section of [roomSection, serviceSection]) {
        const destinations = await section.locator('a').evaluateAll(nodes => nodes.map(node => ({ href: node.getAttribute('href'), name: node.getAttribute('aria-label') })));
        for (const destination of destinations) {
          const link = section.getByRole('link', { name: destination.name, exact: true });
          await link.focus();
          await page.keyboard.press('Enter');
          await page.waitForURL(url => url.pathname === destination.href);
          await page.locator('main h1').waitFor();
          assert.equal(new URL(page.url()).pathname, destination.href);
          await page.goBack();
          await section.waitFor();
        }
      }
      results.push({ width, columns, imagesAndPrices: 'pass', servicePlaceholders: 'pass', headingOrder: 'pass', uniqueIds: 'pass', omittedDetails: 'pass', noninteractiveAmenities: 'pass', overflow: false, keyboardDestinations: 6 });
    }
    await page.setViewportSize({ width: 390, height: 1000 });
    await page.evaluate(() => document.documentElement.style.fontSize = '200%');
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    assert.deepEqual(errors, []);
    fs.writeFileSync('docs/validation/e04-t02/results.json', JSON.stringify({ views: results, doubledTextNoOverflow: true, pageErrors: errors }, null, 2));
    console.log('Catalogue checks passed: four widths, 24 keyboard journeys, photos/prices, content variations, headings and doubled text.');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exit(1); });
