require('dotenv').config()

const jwt = require('jsonwebtoken')
const express = require('express')
const authentication = require('../middleware/authentication')
const {
  AUTH_PORT,
  STATUS_UNAUTHORIZED,
  STATUS_FORBIDDEN,
  REFRESH_TOKEN_SECRET,
} = require('../constants/constants')

const app = express()

app.use(express.json())

/**
 * Authenticate user then get a JWT
 * TODO: Salt hashed passwords with bcrypt later
 */
app.post('/login', (req, res) => {
  const username = req.body.username
  const user = { name: username }
  const jwtSignedAccessToken = authentication.generateAccessToken(user)
  const jwtSignedRefreshToken = authentication.generateRefreshToken(user)
  res.json({
    accessToken: jwtSignedAccessToken,
    refreshToken: jwtSignedRefreshToken,
  })
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
