import puppeteer from 'puppeteer';

export async function scrape() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const URL = 'https://cgsmedicare.com/jc/coverage/lcdinfo.html';

  await page.goto(URL);

  await page.setViewport({ width: 1080, height: 1024 });

  const h1Elem = await page.$('h1');

  if (h1Elem) {
    const h1Text = await page.evaluate((el) => el.textContent, h1Elem);
    return h1Text;
  }
}
