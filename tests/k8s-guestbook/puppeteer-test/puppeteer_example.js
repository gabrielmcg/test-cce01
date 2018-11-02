const puppeteer = require('puppeteer');

const PORT = process.env.PORT || 80;
const MESSAGE = process.env.MESSAGE || 'test message';

(async () => {
  const browser = await puppeteer.launch({headless: true, args:['--no-sandbox']});
  const page = await browser.newPage();
  await page.goto('http://10.10.174.231:' + PORT);

await page.type('body > div > form > fieldset > input', MESSAGE );
await page.click('body > div > form > fieldset > button');

const words= await page.evaluate(() => {

console.log("in page evaluate ");

 const messages= Array.from(document.querySelectorAll('body > div > div > div'));

return messages.map(msg => {
      const msg_text  = msg.textContent.trim();

     return msg_text;
 });
});


  console.log(words.join('\n'));

  await browser.close();
})();

