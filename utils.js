const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN
const MY_PHONE_NUMBER = process.env.MY_PHONE_NUMBER
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER

const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

const sendSms = (text) => {
  client.messages
    .create({
      body: text,
      from: TWILIO_PHONE_NUMBER,
      to: MY_PHONE_NUMBER
    })
    .then(message => console.log(message.sid))
    .catch(err => console.log(err))

}

module.exports = { sendSms }