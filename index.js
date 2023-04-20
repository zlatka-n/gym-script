const puppeteer = require('puppeteer-extra')
const userAgent = require('user-agents')
require('dotenv').config()

const GYM_URL = process.env.GYM_URL
const CARD_NUMBER = process.env.CARD_NUMBER
const PASSWORD = process.env.PASSWORD

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const { sendSms } = require('./utils')
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
  const cardNumberInput = await page.$("input[name='uid']")
  const passwordInput = await page.$("input[name='heslo']")

  await cardNumberInput.type(CARD_NUMBER)
  await passwordInput.type(PASSWORD)

  const logInBtn = await page.$("button[class='button log-in g-recaptcha']")

  await Promise.all([
    logInBtn.click(),
    page.waitForNavigation
  ])

  await page.waitForSelector('#menu-schedule')

  const timetable = await page.$("li[id='menu-schedule']")
  await timetable.click()

  await page.waitForSelector('#location')

  const selectLocation = await page.$("select[id='location']")
  const selectClass = await page.$("select[id='group']")

  await selectLocation.select('3')  //select Karlin's value
  await selectClass.select('9*bosu')

  await page.click('button[type="submit"]')

  //Click book for selected class
  await page.waitForSelector('a[title="Book"]')
  await page.click('a[title="Book"]')

  //modal: confirm booking with yes
  await page.waitForSelector('div[class="dialog-window-popup-wrapper"]')

  await page.click('a[class="button orange yes"]')

  ///wait for BE response
  await page.waitForTimeout(3000);

  page.waitForSelector('div[class="dialog-window-popup-wrapper"]', { visible: true })

  const confirmation = await page.$eval('div[id="modal-body-1"]', element => {
    return element.textContent
  })

  if (confirmation) sendSms(confirmation)

  const okBtnModal = await page.waitForSelector('div[id="modal-buttons-1"]', { visible: true })
  await okBtnModal.click()

  await page.waitForSelector("aside[class='right']", { visible: true })

  ///wait and click logout 
  await page.waitForTimeout(1000);
  await page.click("aside[class='right']")

  await browser.close()

}

run()