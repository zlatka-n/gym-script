const puppeteer = require('puppeteer')
require('dotenv').config()

const GYM_URL = process.env.GYM_URL
const CARD_NUMBER = process.env.CARD_NUMBER

async function run() {
  const browser = await puppeteer.launch({ headless: false, })
  const page = await browser.newPage()

  await page.goto(GYM_URL)

  const [buttonCookies] = await page.$x("//button[contains(., 'Allow all cookies')]");
  const reservation = await page.$("li[class='reservation']")

  if (buttonCookies) await buttonCookies.click();

  ///Navigate to login page
  if (reservation) {

    await Promise.all([
      reservation.click(),
      page.waitForNavigation
    ])

    //Accept all cookies again
    await page.waitForSelector(".CybotCookiebotDialogBodyButton")
    await page.click("button[id='CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll']")

    //Type card number
    const cardNumber = await page.$("input[name='uid']")
    await cardNumber.type(CARD_NUMBER)

  }
  await browser.close()

}

run()