'use strict'
require('dotenv').config()

const mailgun = require('mailgun-js')
const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
})

const EMAIL_TO = process.env.MAILGUN_SENDER

const sendMessage = (payload) => {
  const data = {
    from: EMAIL_TO,
    to: payload.email_to,
    subject: 'Yggdrasil - Activate your account',
    text: `Hi ${payload.username}! Please confirm your account through this link -> ${payload.url}`,
  }
  mg.messages().send(data, function (error, body) {
    if (error) {
      console.log(error)
    }
  })
}

module.exports = {
  sendMessage,
}
