const puppeteer = require('puppeteer');


async function wppMessage() {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
    await page.goto('https://web.whatsapp.com/');

    await page.waitForSelector('.YtmXM');
    await delay(3000);

    const contactName = 'Eu';

    await page.click(`span[title="${contactName}"]`);

    await page.waitForSelector('.y8WcF');

    const messageBar = await page.$('div[tabindex="-1"]');
    await messageBar.focus();

    const amountOfMessages = 20;

    for (let i = 0; i < amountOfMessages; i++) {
      await page.evaluate(() => {
        const message = "mensagem de envio no wpp";
        document.execCommand('insertText', false, message);
      });

      await page.click('span[data-testid="send"]');
      await delay(500);
    };

  } catch (error) {
    console.error('Error', error);
  }
};

wppMessage();

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
};