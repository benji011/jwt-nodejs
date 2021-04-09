const { createClient } = require('@supabase/supabase-js')
const cors = require('cors')
const { _ } = require('lodash')

require('dotenv').config()

const express = require('express')
const bcrypt = require('bcrypt')
const authentication = require('../middleware/authentication')
const mailService = require('../services/sendEmail')

const {
  AUTH_PORT,
  STATUS_BAD_GATEWAY,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_CREATED,
  SUPABASE_URL,
  SUPABASE_KEY,
  SALT,
} = require('../constants/constants')

// Initialize supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
const APP_DOMAIN = process.env.DOMAIN

// Initialize as an Express app
const app = express()
app.use(express.json())
app.use(
  cors({
    origin: `${APP_DOMAIN}:3001`,
  })
)

/**
 * Register user account
 */
app.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(SALT)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const user = {
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword,
    }
    // Need to check that has already been registered or not.
    const { data: users, error } = await supabase
      .from('users')
      .select('email')
      .eq('email', user.email)
    if (error) {
      res.sendStatus(STATUS_INTERNAL_SERVER_ERROR)
    }
    if (users.length > 0) {
      res.json({
        error: `A user with the email address "${user.email}" already exists.`,
      })
    } else {
      // Insert user data into the table if there is no error, else send confirmation email
      // and return registration was successful.
      const { data, error } = await supabase.from('users').insert([user])
      if (error) {
        res.sendStatus(STATUS_INTERNAL_SERVER_ERROR)
      } else {
        // Generate an email confirmation URL based on the UUID of this user.
        const uuid = _.find(data, { username: user.username }).uuid
        const emailSecret = authentication.generateEmailSecretToken(uuid)
        const confirmationUrl = `${APP_DOMAIN}:3001/confirmation/${emailSecret}`
        // Send confirmation email
        mailService.sendMessage({
          username: user.username,
          email_to: user.email,
          url: confirmationUrl,
        })
        res.sendStatus(STATUS_CREATED)
      }
    }
  } catch {
    res.sendStatus(STATUS_BAD_GATEWAY)
  }
})

/**
 * Authenticate user then get a JWT
 */
app.post('/login', async (req, res) => {
  try {
    const email = req.body.email
    const salt = await bcrypt.genSalt(SALT)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const user = { email: email, password: hashedPassword }

    const { data: data } = await supabase
      .from('users')
      .select('password')
      .eq('email', email)
    const supabasePassword = _.map(data, 'password')[0]

    // Compare the hashed password with what we found from the DB with that email
    const validPassword = await bcrypt.compare(
      req.body.password,
      supabasePassword
    )
    if (validPassword) {
      // Assuming authentication was completed, generate then return an access and refresh token.
      const jwtSignedAccessToken = authentication.generateAccessToken(user)
      const jwtSignedRefreshToken = authentication.generateRefreshToken(user)
      res.json({
        accessToken: jwtSignedAccessToken,
        refreshToken: jwtSignedRefreshToken,
      })
    } else {
      res.json({
        message: 'Either the password is wrong or something else went wrong',
      })
    }
  } catch {
    res.sendStatus(STATUS_BAD_GATEWAY)
  }
})

/**
 * Creates a new token
 * TODO: store this refresh token into a DB
 */
app.post('/token', (req, res) => {
  return authentication.verifyAccessToken(req, res)
})

/**
 * Activates user account using the token provided.
 */
app.get('/confirmation', async (req, res) => {
  const uuid = req.query.uuid
  const token = req.query.token

  if (!uuid || !token) {
    res.sendStatus(STATUS_BAD_GATEWAY)
  }

  // Checks if user was confirmed already
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('uuid', uuid)
    .eq('confirmation_code', 'TBC')
    .neq('is_activated', true)

  if (error) {
    res.json({
      error: error,
      status: STATUS_INTERNAL_SERVER_ERROR,
    })
  }
  // If the user has not been activated then we can update, else return
  // message that the user is already confirmed.
  if (data) {
    res.json({
      message: `${uuid} has already been activated! No action required :)`,
    })
  } else {
    const { data, error } = await supabase
      .from('users')
      .update({ confirmation_code: token, is_activated: true })
      .eq('uuid', uuid)

    if (error) {
      res.sendStatus(STATUS_INTERNAL_SERVER_ERROR)
    }
    res.json({
      message: 'Account activated',
      user: data,
    })
  }
})

/**
 * Send a DELETE request to our DB to remove refresh token
 */
app.delete('/logout', (req, res) => {
  res.sendStatus(204)
})

app.listen(AUTH_PORT, () => {
  console.log(`started authentication server on port: ${AUTH_PORT}`)
})
