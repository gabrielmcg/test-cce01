const puppeteer = require('puppeteer');

const PORT = process.env.PORT || 80;
const MESSAGE = process.env.MESSAGE || 'test message';

(async () => {
  const browser = await puppeteer.launch({headless: true, args:['--no-sandbox']});
  const page = await browser.newPage();
  await page.goto('http://10.10.174.231:' + PORT);

await page.type('body > div > form > fieldset > input', MESSAGE );
await page.click('body > div > form > fieldset > button');

//await page.waitForNavigation({waitUntil: 'networkidle2'});

console.log("back from refresh");



//await page.goto('http://10.10.174.231:32798');


const words= await page.evaluate(() => {

console.log("in page evaluate ");

 const messages= Array.from(document.querySelectorAll('body > div > div > div'));

// console.log("messages: " + messages);

return messages.map(msg => {
      const msg_text  = msg.textContent.trim();

//     console.log("msg_text " + msg_text);
     return msg_text;
 });
});


  console.log(words.join('\n'));


//await page.screenshot({path: 'example.png'});

  await browser.close();
})();

