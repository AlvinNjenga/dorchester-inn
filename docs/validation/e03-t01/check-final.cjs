const { chromium } = require('playwright-core');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const origin = process.env.CHECK_ORIGIN || 'http://127.0.0.1:5175';

function contrast(a, b) {
  const luminance = color => {
    const channels = color.match(/[\d.]+/g).slice(0, 3).map(Number).map(v => {
      v /= 255;
      return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    });
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  };
  const values = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  const results = { widths: [], textResize: [], fallback: [], contrast: [], errors: [] };
  const save = (name, value) => fs.writeFileSync(path.join(__dirname, name), JSON.stringify(value, null, 2) + '\n');
  try {
    const page = await browser.newPage();
    page.on('pageerror', error => results.errors.push(error.message));
    for (const width of [320, 390, 768, 1440, 1600]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(origin + '/__style-sample');
      await page.locator('h1').waitFor();
      await page.evaluate(() => document.fonts.ready);
      const dimensions = await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth }));
      assert(dimensions.scrollWidth <= width, `Overflow at ${width}px`);
      results.widths.push(dimensions);
      await page.screenshot({ path: path.join(__dirname, `final-${width}.png`), fullPage: true });
    }

    // 200% text resizing is distinct from browser page zoom. Halved viewport
    // tests reflow separately; neither is described as native browser zoom.
    for (const width of [390, 720]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.evaluate(() => document.documentElement.style.fontSize = '200%');
      const size = await page.evaluate(() => ({ width: innerWidth, root: getComputedStyle(document.documentElement).fontSize, scrollWidth: document.documentElement.scrollWidth }));
      assert.equal(size.root, '32px');
      assert(size.scrollWidth <= width);
      results.textResize.push(size);
      await page.screenshot({ path: path.join(__dirname, `text-200-${width}.png`), fullPage: true });
    }
    await page.evaluate(() => document.documentElement.style.fontSize = '');

    const pairs = await page.evaluate(() => {
      const body = getComputedStyle(document.body);
      const heading = getComputedStyle(document.querySelector('h1'));
      const button = getComputedStyle(document.querySelector('button.button-primary'));
      const input = getComputedStyle(document.querySelector('#sample-name'));
      const placeholder = getComputedStyle(document.querySelector('#sample-name'), '::placeholder');
      const dark = getComputedStyle(document.querySelector('article.bg-primary-dark'));
      return [
        ['Body on ivory', body.color, body.backgroundColor, 4.5],
        ['Heading on ivory', heading.color, body.backgroundColor, 4.5],
        ['Body on white', body.color, input.backgroundColor, 4.5],
        ['Action text on gold', button.color, button.backgroundColor, 4.5],
        ['Text on navy', dark.color, dark.backgroundColor, 4.5],
        ['Input text', input.color, input.backgroundColor, 4.5],
        ['Placeholder', placeholder.color, input.backgroundColor, 4.5],
        ['Input boundary on white', input.borderColor, input.backgroundColor, 3],
        ['Input boundary on ivory', input.borderColor, body.backgroundColor, 3],
        ['Two-colour focus bands', heading.color, input.backgroundColor, 3],
      ];
    });
    for (const [name, foreground, background, minimum] of pairs) {
      const ratio = contrast(foreground, background);
      assert(ratio >= minimum, `${name}: ${ratio}`);
      results.contrast.push({ name, foreground, background, ratio: Number(ratio.toFixed(2)), minimum });
    }

    for (const width of [390, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: 1000 } });
      const fallback = await context.newPage();
      let blocked = 0;
      await fallback.route('**/*.woff2*', route => { blocked++; return route.abort(); });
      await fallback.goto(origin + '/__style-sample');
      await fallback.locator('h1').waitFor();
      await fallback.evaluate(() => document.fonts.ready);
      const session = await context.newCDPSession(fallback);
      await session.send('DOM.enable');
      await session.send('CSS.enable');
      const { root } = await session.send('DOM.getDocument');
      const actualFonts = {};
      for (const [name, selector] of [['heading', 'h1'], ['body', 'main p']]) {
        const { nodeId } = await session.send('DOM.querySelector', { nodeId: root.nodeId, selector });
        const { fonts } = await session.send('CSS.getPlatformFontsForNode', { nodeId });
        assert(fonts.length > 0 && fonts.every(font => !font.isCustomFont));
        actualFonts[name] = fonts.map(font => font.familyName);
      }
      assert(blocked >= 5);
      assert(await fallback.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      results.fallback.push({ width, blocked, actualFonts });
      await fallback.screenshot({ path: path.join(__dirname, `fallback-${width}.png`), fullPage: true });
      await context.close();
    }
    assert.deepEqual(results.errors, []);
    results.passed = true;
    save('final-results.json', results);
    console.log(JSON.stringify(results));
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
