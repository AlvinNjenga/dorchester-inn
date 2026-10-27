const { chromium } = require('playwright-core');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const origin = 'http://127.0.0.1:5174';
const routes = [
 ['/', 'Home'], ['/services', 'Services'], ['/make-a-booking', 'Make a booking'],
 ['/rooms', 'Rooms'], ['/our-bar', 'Our bar'], ['/cocktail-happy-hour', 'Cocktail happy hour'],
 ['/about-us', 'About us'], ['/leave-a-review', 'Leave a review'], ['/blog', 'Blog'],
 ['/contact', 'Contact us'], ['/gallery', 'Gallery'], ['/faqs', 'FAQs'],
 ['/rooms/basic-double', 'Basic Double Room'], ['/rooms/standard-double', 'Standard Double Room'],
 ['/rooms/deluxe-double', 'Deluxe Double Room'], ['/services/lounge', 'Lounge'],
 ['/services/massage-chair', 'Massage Chair'],
];
(async () => {
 const browser = await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const results = {routes:[], errors:[], screenshots:[]};
 try {
  const page = await browser.newPage();
  page.on('pageerror', e => results.errors.push(e.message));
  for (const width of [390,1440]) {
   await page.setViewportSize({width,height:1000});
   for (const [url,title] of routes) {
    await page.goto(origin+url);
    await page.getByRole('heading',{level:1,name:title,exact:true}).waitFor();
    assert.equal(await page.locator('header').count(),1);
    assert.equal(await page.locator('footer').count(),1);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth),true);
    results.routes.push({width,url,title,passed:true});
   }
   await page.goto(origin+'/');
   await page.getByRole('heading',{level:1,name:'Home',exact:true}).waitFor();
   const screenshot = path.join(__dirname,`routing-${width}.png`);
   await page.screenshot({path:screenshot,fullPage:true});
   results.screenshots.push(screenshot);
  }
  for (const url of ['/does-not-exist','/rooms/unknown','/services/unknown','/blog/a/b']) {
   await page.goto(origin+url);
   await page.getByRole('heading',{name:'Page not found',exact:true}).waitFor();
   assert.equal(await page.locator('main').getByRole('link',{name:'Go to Home'}).count(),1);
  }
  results.notFound = 'passed';
  await page.goto(origin+'/blog/example-article');
  await page.getByRole('heading',{name:'Blog article',exact:true}).waitFor();
  await page.getByText('example-article',{exact:true}).waitFor();
  await page.reload();
  await page.getByRole('heading',{name:'Blog article',exact:true}).waitFor();
  results.articleAndRefresh = 'passed locally';
  await page.goto(origin+'/');
  await page.getByRole('heading',{name:'Home',exact:true}).waitFor();
  const nav = page.getByRole('navigation',{name:'Development navigation'});
  assert.equal(await nav.getByRole('link').count(),17);
  for (const [url,title] of routes) {
   await nav.locator(`a[href="${url}"]`).click();
   await page.getByRole('heading',{name:title,exact:true}).waitFor();
   assert.equal(await nav.locator('[aria-current="page"]').count(),1);
  }
  await nav.getByRole('link',{name:'Rooms',exact:true}).click();
  await page.getByRole('heading',{name:'Rooms',exact:true}).waitFor();
  await nav.getByRole('link',{name:'Contact us',exact:true}).click();
  await page.getByRole('heading',{name:'Contact us',exact:true}).waitFor();
  await page.goBack();
  await page.getByRole('heading',{name:'Rooms',exact:true}).waitFor();
  await page.goForward();
  await page.getByRole('heading',{name:'Contact us',exact:true}).waitFor();
  results.linksAndHistory = 'passed';
  await page.goto(origin+'/');
  await page.getByRole('heading',{name:'Home',exact:true}).waitFor();
  await page.keyboard.press('Tab');
  assert.equal(await page.locator(':focus').textContent(),'Skip to main content');
  assert.equal(await page.locator(':focus').evaluate(el=>el.getBoundingClientRect().top >= 0),true);
  await page.keyboard.press('Enter');
  assert.equal(await page.locator(':focus').getAttribute('id'),'main-content');
  await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'Rooms',exact:true}).focus();
  assert.notEqual(await page.locator(':focus').evaluate(el=>getComputedStyle(el).outlineStyle),'none');
  await page.keyboard.press('Enter');
  await page.getByRole('heading',{name:'Rooms',exact:true}).waitFor();
  results.keyboard = 'passed';
  const slow = await browser.newPage();
  await slow.route('**/src/pages/GalleryPage.tsx*', async route => {await new Promise(r=>setTimeout(r,1500));await route.continue();});
  await slow.goto(origin+'/');
  await slow.getByRole('heading',{name:'Home',exact:true}).waitFor();
  await slow.getByRole('navigation',{name:'Development navigation'}).getByRole('link',{name:'Gallery',exact:true}).click();
  await slow.getByRole('status').filter({hasText:'Loading page'}).waitFor();
  await slow.getByRole('heading',{name:'Gallery',exact:true}).waitFor();
  results.loading = 'passed';
  const failed = await browser.newPage();
  await failed.route('**/src/pages/GalleryPage.tsx*', route=>route.abort());
  await failed.goto(origin+'/');
  await failed.getByRole('heading',{name:'Home',exact:true}).waitFor();
  await failed.getByRole('navigation',{name:'Development navigation'}).getByRole('link',{name:'Gallery',exact:true}).click();
  await failed.getByRole('heading',{name:'Unable to load this page',exact:true}).waitFor();
  await failed.locator('main').getByRole('link',{name:'Go to Home'}).click();
  await failed.getByRole('heading',{name:'Home',exact:true}).waitFor();
  results.errorRecovery = 'passed (intentional download failure)';
  assert.deepEqual(results.errors,[]);
 } catch(error) {results.failure=error.stack;process.exitCode=1;}
 finally {await browser.close(); fs.writeFileSync(path.join(__dirname,'results.json'),JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));}
})();
