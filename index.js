const puppeteer = require('puppeteer')
require('dotenv').config()

const GYM_URL = process.env.GYM_URL

async function run() {
  const browser = await puppeteer.launch({ headless: false, })
  const page = await browser.newPage()

  await page.goto(GYM_URL)

  const [button] = await page.$x("//button[contains(., 'Allow all cookies')]");

  if (button) {
    await button.click();
  }


  await browser.close()
}

run()