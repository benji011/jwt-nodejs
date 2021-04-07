const { createClient } = require('@supabase/supabase-js')
const { _ } = require('lodash')

require('dotenv').config()

const express = require('express')
const bcrypt = require('bcrypt')
const authentication = require('../middleware/authentication')
const {
  AUTH_PORT,
  STATUS_BAD_GATEWAY,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_CREATED,
  SUPABASE_URL,
  SUPABASE_KEY,
} = require('../constants/constants')

// Initialize supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Initialize as an Express app
const app = express()
app.use(express.json())

/**
 * Register user account
 */
app.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(16)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const user = {
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword,
    }
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
      const { error } = await supabase.from('users').insert([user])
      if (error) {
        res.sendStatus(STATUS_INTERNAL_SERVER_ERROR)
      } else {
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
    const salt = await bcrypt.genSalt(16)
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
 * Send a DELETE request to our DB to remove refresh token
 */
app.delete('/logout', (req, res) => {
  res.sendStatus(204)
})

app.listen(AUTH_PORT, () => {
  console.log(`started authentication server on port: ${AUTH_PORT}`)
})
