import puppeteer from 'puppeteer';
import type { lcdDataType } from 'types';

type hcpsData = {
  code: string;
  description: string;
};

export async function scrape(url: string) {
  console.log('scrape ~ url:', url);
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.goto(url);

  await page.setViewport({ width: 1080, height: 1024 });

  await page.click('button[type="button"][id="btnAcceptLicense"]');

  // LCD
  const lcd = await page.$eval('span[id="lblPageTitle"]', (span) => {
    return span.textContent;
  });

  // Modifiers
  const hcpsModifiersSelector = 'div[id="divHcpcsCodesGroup1Fields"]';
  const hcpcsModifiers = await page.$eval(hcpsModifiersSelector, (div) => {
    const childElements = Array.from(div.querySelectorAll('p'));

    const extractedData = [];

    for (const childElement of childElements) {
      extractedData.push(childElement.textContent);
    }

    return extractedData.slice(2, -1);
  });

  // HSPSC Codes
  const tableSelector = 'table[id="gdvHcpcsCodes1"]';
  const hcpscCodes = await page.evaluate((tableSelector) => {
    const table = document.querySelector(tableSelector);
    const rows = table?.querySelectorAll('tr');
    const data: hcpsData[] = [];

    rows?.forEach((row) => {
      const columns = row.querySelectorAll('td'); // Change 'td' to 'th' if you want to include table headers

      // Ensure there are at least two columns (code and description)
      if (columns.length >= 2) {
        const rowData = {
          code: columns[0].textContent?.trim() || 'N/A',
          description: columns[1].textContent?.trim() || 'N/A',
        };

        data.push(rowData);
      }
    });

    return data;
  }, tableSelector);

  // get Coverage Guidance
  const coverageGuidanceSelector = 'span[id="lblCoverageIndication"]';
  const coverageGuidelines = await page.$eval(
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
    coverageGuidelines,
    hcpcsModifiers,
    hcpscCodes,
  };
}

export async function getLCDs() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const url = 'https://cgsmedicare.com/jc/coverage/lcdinfo.html';

  await page.goto(url);
  await page.setViewport({ width: 1080, height: 1024 });

  const tableSelector = 'table.greenbackground';
  const table = await page.$(tableSelector);

  if (table) {
    const data = await table.evaluate((table) => {
      const rows = Array.from(table.querySelectorAll('tr'));

      const rowData: lcdDataType[] = [];

      rows.slice(1).forEach((row) => {
        const columns = row.querySelectorAll('td');
        if (columns.length > 0) {
          const link = columns[0].querySelector('a');
          if (link) {
            rowData.push({
              text: link.textContent as string,
              url: link.href,
            });
          }
        }
      });

      return rowData;
    });

    await browser.close();
    return data;
  }
}
