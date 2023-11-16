import puppeteer from 'puppeteer';

export async function scrape(url: string) {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const test =
    'https://www.cms.gov/medicare-coverage-database/view/lcd.aspx?LCDId=33690&ContrID=140';

  await page.goto(test);

  await page.setViewport({ width: 1080, height: 1024 });

  await page.click('button[type="button"][id="btnAcceptLicense"]');

  // get LCD
  const lcd = await page.$eval('span[id="lblPageTitle"]', (span) => {
    return span.textContent;
  });

  //get codes

  // get Coverage Guidance
  const spanSelector = 'span[id="lblCoverageIndication"]';
  const coverageGuidanceArr = await page.$eval(spanSelector, (span) => {
    const childElements = Array.from(span.querySelectorAll('p'));

    const extractedData = [];

    for (const childElement of childElements) {
      extractedData.push(childElement.textContent);
    }
    return extractedData;
  });

  await browser.close();

  return {
    lcd,
    coverageGuidanceArr,
  };
}
