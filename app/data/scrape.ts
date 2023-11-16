import puppeteer from 'puppeteer';

type hcpsData = {
  code: string;
  description: string;
};

export async function scrape(url: string) {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const test =
    'https://www.cms.gov/medicare-coverage-database/view/lcd.aspx?LCDId=33690&ContrID=140';

  await page.goto(test);

  await page.setViewport({ width: 1080, height: 1024 });

  await page.click('button[type="button"][id="btnAcceptLicense"]');

  // LCD
  const lcd = await page.$eval('span[id="lblPageTitle"]', (span) => {
    return span.textContent;
  });

  // Modifiers
  const hcpsModifiersSelector = 'div[id="divHcpcsCodesGroup1Fields"]';
  const hcpcsModifiersArr = await page.$eval(hcpsModifiersSelector, (div) => {
    const childElements = Array.from(div.querySelectorAll('p'));

    const extractedData = [];

    for (const childElement of childElements) {
      extractedData.push(childElement.textContent);
    }

    return extractedData;
  });

  // HSPSC Codes
  const tableSelector = 'table[id="gdvHcpcsCodes1"]';
  const hcpsData = await page.evaluate((tableSelector) => {
    const table = document.querySelector(tableSelector);
    const rows = table?.querySelectorAll('tr');
    const data: hcpsData[] = [];

    rows?.forEach((row) => {
      const columns = row.querySelectorAll('td'); // Change 'td' to 'th' if you want to include table headers

      // Ensure there are at least two columns (code and description)
      if (columns.length >= 2) {
        const rowData = {
          code: columns[0].textContent.trim(),
          description: columns[1].textContent.trim(),
        };

        data.push(rowData);
      }
    });

    return data;
  }, tableSelector);

  // get Coverage Guidance
  const coverageGuidanceSelector = 'span[id="lblCoverageIndication"]';
  const coverageGuidanceArr = await page.$eval(
    coverageGuidanceSelector,
    (span) => {
      const childElements = Array.from(span.querySelectorAll('p'));

      const extractedData = [];

      for (const childElement of childElements) {
        extractedData.push(childElement.textContent);
      }

      return extractedData;
    }
  );

  await browser.close();

  return {
    lcd,
    coverageGuidanceArr,
    hcpcsModifiersArr,
    hcpsData,
  };
}

export async function getLCD() {}
