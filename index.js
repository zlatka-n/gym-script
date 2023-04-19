const puppeteer = require('puppeteer-extra')
const userAgent = require('user-agents')
require('dotenv').config()

const GYM_URL = process.env.GYM_URL
const CARD_NUMBER = process.env.CARD_NUMBER
const PASSWORD = process.env.PASSWORD

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())


async function run() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    slowMo: 10,
  })
  const page = await browser.newPage()


  await page.setUserAgent(userAgent.random().toString())

  await page.goto(GYM_URL)

  const [buttonCookies] = await page.$x("//button[contains(., 'Allow all cookies')]");
  const reservation = await page.$("li[class='reservation']")

  if (buttonCookies) await buttonCookies.click();

  ///Navigate to login page

  await Promise.all([
    reservation.click(),
    page.waitForNavigation
  ])

  //Accept all cookies again
  await page.waitForSelector(".CybotCookiebotDialogBodyButton")
  await page.click("button[id='CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll']")

  //Login
  const cardNumber = await page.$("input[name='uid']")
  const password = await page.$("input[name='heslo']")

  await cardNumber.type(CARD_NUMBER)
  await password.type(PASSWORD)

  const logInBtn = await page.$("button[class='button log-in g-recaptcha']")

  await Promise.all([
    logInBtn.click(),
    page.waitForNavigation
  ])


  await page.waitForSelector('#menu-schedule')

  await page.click("li[id='menu-schedule']")

  await browser.close()

}

run()