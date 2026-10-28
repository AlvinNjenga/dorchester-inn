// Run with NODE_PATH pointing to an existing playwright-core installation.
// One homepage navigation, then resize the same page. No other pages visited.
const { chromium } = require('playwright-core');
const fs = require('node:fs');
const path = require('node:path');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: true,
  });
  const results = { capturedAt: new Date().toISOString(), captures: [] };
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
    await page.goto('https://kinsley.bslthemes.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(10000);
    const blocked = /bot verification|just a moment|verify you are human/i;
    if (blocked.test(await page.title()) || /verifying that you are not a robot/i.test(await page.locator('body').innerText())) {
      throw new Error('Homepage verification challenge encountered; stopped without retries or overwriting screenshots.');
    }
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.evaluate(() => document.fonts.ready);
      // Scroll naturally to activate lazy images and entrance animations.
      for (let y = 0; y < await page.evaluate(() => document.documentElement.scrollHeight); y += 700) {
        await page.evaluate(position => window.scrollTo(0, position), y);
        await page.waitForTimeout(200);
        if (y > 30000) throw new Error('Unexpected homepage height; stopped scrolling.');
      }
      await page.waitForTimeout(2000);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(1500);
      const metadata = await page.evaluate(() => ({
        title: document.title, url: location.href, width: innerWidth,
        height: document.documentElement.scrollHeight,
        headings: [...document.querySelectorAll('h1,h2')].map(el => el.textContent.trim()),
        pendingImages: [...document.images].filter(img => !img.complete || !img.naturalWidth).map(img => img.currentSrc || img.src),
      }));
      const filename = `homepage-${width}.png`;
      await page.screenshot({ path: path.join(__dirname, filename), fullPage: true });
      results.captures.push({ ...metadata, filename });
      console.log(JSON.stringify({ width, title: metadata.title, height: metadata.height, pendingImages: metadata.pendingImages.length }));
    }
    fs.writeFileSync(path.join(__dirname, 'homepage-capture-data.json'), JSON.stringify(results, null, 2) + '\n');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error.message); process.exitCode = 1; });
