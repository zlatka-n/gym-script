## Gym class script

- This script books gym class for you. When booking is successfull, it will also send an sms confirmation to your phone number. In the end, it will log you out and close your browser.

### Browser Support

- All chromium based browsers: Chrome, Brave..
- For more information go to: [Puppeteer](https://github.com/puppeteer/puppeteer)

### Installing

Download this repository and navigate to this project in terminal. Then download all packages with:

```
$ npm install
```

Finally, to use this script run:

```
$ npm start
```

### Prerequisites

#### Create Twilio account for sending SMS confirmations.

- If you don't need sms confirmations, comment this line in utils.js

```
  if (confirmation) sendSms(confirmation) //comment this line, if you don't want to send sms to your phone
```

- Twilio offers free trial with credit, which enables you to send SMS messages to your verified phone number.
- After creating account on [Twilio](https://www.twilio.com/try-twilio), get your: _TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER_ and fill those values in .env file. Continue below.

#### Create .env file in the root directory. Fill in values for these variables:

```
GYM_URL=https://www.XXX.cz/
CARD_NUMBER=1XXX8
PASSWORD=YourPassword1243
TWILIO_ACCOUNT_SID=AXXXXXXXXXXXXX8
TWILIO_AUTH_TOKEN=9XXXXXXXXXXXd
MY_PHONE_NUMBER=+420XXXXXXX2
TWILIO_PHONE_NUMBER=+162XXXXX7
```

- For more information, how to use .env file see [dotenv](https://github.com/motdotla/dotenv)

### Troubleshooting

#### You can't log in with correct username and password, and see this error:

[![Screenshot-2023-04-20-at-13-41-06.png](https://i.postimg.cc/T3MB4CWk/Screenshot-2023-04-20-at-13-41-06.png)](https://postimg.cc/Vdg7S9gM)

The website uses Google reCAPTCHA for protection from bots. If you run this script several times, your IP address might get blocked.

**Solution** is to change your IP address:

1. connect to different network
2. connect with VPN: I personally use [Proton](https://protonvpn.com/), which offers free version.
