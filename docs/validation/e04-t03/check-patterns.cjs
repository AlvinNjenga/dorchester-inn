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
    for (const width of [390, 768, 1440, 1600]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto('http://127.0.0.1:5173/__style-sample');
      const contacts = page.locator('section[aria-labelledby="sample-contact-tiles"]');
      await contacts.waitFor();
      assert.equal(await contacts.getByRole('article').count(), 3);
      assert.equal(await contacts.getByRole('link', { name: 'Call Dorchester Inn', exact: true }).getAttribute('href'), 'tel:+254717411717');
      assert.equal(await contacts.getByRole('link', { name: 'Email Dorchester Inn', exact: true }).getAttribute('href'), 'mailto:info@dorchesterinnke.com');
      assert.equal(await contacts.getByRole('article', { name: 'Address', exact: true }).getByRole('link').count(), 0);
      for (const value of await contacts.locator('article p').all()) {
        assert.equal(await value.evaluate(node => getComputedStyle(node).userSelect), 'text');
      }
      await contacts.getByRole('link', { name: 'Call Dorchester Inn', exact: true }).focus();
      await page.keyboard.press('Tab');
      assert.equal(await page.evaluate(() => document.activeElement.getAttribute('href')), 'mailto:info@dorchesterinnke.com');
      await page.locator('main').focus();
      await page.evaluate(() => document.activeElement.blur());
      await page.waitForTimeout(200);
      await contacts.screenshot({ path: `docs/validation/e04-t03/contacts-${width}.png` });
      for (const slug of ['lounge', 'massage-chair', 'content-check', 'minimal']) {
        await page.goto(`http://127.0.0.1:5173/__service-sample/${slug}`);
        await page.locator('main h1').waitFor();
        await page.evaluate(() => document.fonts.ready);
        assert.equal(await page.locator('main h1').count(), 1);
        const levels = await page.locator('main :is(h1,h2,h3)').evaluateAll(nodes => nodes.map(node => Number(node.tagName[1])));
        levels.forEach((level, index) => { if (index) assert(level <= levels[index - 1] + 1); });
        const breadcrumbs = page.getByRole('navigation', { name: 'Breadcrumb', exact: true });
        assert.equal(await breadcrumbs.getByRole('link', { name: 'Services', exact: true }).getAttribute('href'), '/services');
        assert.equal(await breadcrumbs.locator('[aria-current="page"]').count(), 1);
        if (slug === 'minimal') {
          assert.equal(await page.getByRole('heading', { name: 'Practical information', exact: true }).count(), 0);
          assert.equal(await page.getByRole('heading', { name: 'Questions about this service?', exact: true }).count(), 0);
        } else {
          assert.equal(await page.getByRole('heading', { name: 'Practical information', exact: true }).count(), 1);
        }
        if (slug === 'content-check') {
          const image = page.locator('main img');
          await image.scrollIntoViewIfNeeded();
          await image.evaluate(node => node.decode());
          assert.equal(await image.evaluate(node => node.naturalWidth), 500);
          assert.equal(await page.getByRole('link', { name: /Email the Dorchester Inn team with questions/ }).getAttribute('href'), 'mailto:info@dorchesterinnke.com');
        } else {
          assert.equal(await page.getByText(/Development placeholder:/).count(), 1);
        }
        if (slug === 'massage-chair') {
          assert((await page.locator('main').textContent()).includes('15\u201330 minutes'));
          assert((await page.locator('main').textContent()).includes('Prices to be confirmed.'));
        }
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
        await page.locator('main').focus();
        await page.evaluate(() => document.activeElement.blur());
        await page.waitForTimeout(200);
        await page.locator('main').screenshot({ path: `docs/validation/e04-t03/${slug}-${width}.png` });
        if (slug === 'lounge' || slug === 'massage-chair') {
          await page.getByRole('link', { name: 'Contact the Dorchester Inn team', exact: true }).click();
          await page.waitForURL(url => url.pathname === '/contact');
          await page.getByRole('heading', { name: 'Contact us', level: 1, exact: true }).waitFor();
          await page.goBack();
          await breadcrumbs.waitFor();
        }
        await breadcrumbs.getByRole('link', { name: 'Services', exact: true }).focus();
        await page.keyboard.press('Enter');
        await page.waitForURL(url => url.pathname === '/services');
        await page.getByRole('heading', { name: 'Services', level: 1, exact: true }).waitFor();
        results.push({ width, slug, headings: 'pass', optionalSections: 'pass', imageOrPlaceholder: 'pass', keyboardBreadcrumb: 'pass', overflow: false });
      }
    }
    await page.setViewportSize({ width: 390, height: 1000 });
    for (const path of ['/__style-sample', '/__service-sample/content-check', '/__service-sample/minimal']) {
      await page.goto(`http://127.0.0.1:5173${path}`);
      await page.locator('main h1').waitFor();
      await page.evaluate(() => document.documentElement.style.fontSize = '200%');
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    }
    await page.goto('http://127.0.0.1:5173/__service-sample/unknown');
    await page.getByRole('heading', { name: 'Page not found', exact: true }).waitFor();
    assert.deepEqual(errors, []);
    fs.writeFileSync('docs/validation/e04-t03/results.json', JSON.stringify({ views: results, contacts: 'three selectable values and correct tel/mailto URLs at four widths', pointerContactJourneys: 8, keyboardBreadcrumbJourneys: 16, doubledTextNoOverflow: true, unknownSample: '404 recovery', pageErrors: errors }, null, 2));
    console.log('Contact/service checks passed: 16 preview views, 8 pointer contact journeys, 16 keyboard breadcrumb journeys, optional content, image fixture and doubled text.');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exit(1); });
