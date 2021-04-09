require('dotenv').config()
const jwt = require('jsonwebtoken')

const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  STATUS_UNAUTHORIZED,
  STATUS_FORBIDDEN,
  ACCESS_TOKEN_EXPIRY,
} = require('../constants/constants')

/**
 * Generate a refresh token that doesn't expire
 *
 * @param {*} user
 * @returns JWT signed refresh token
 */
const generateRefreshToken = (user) => {
  return jwt.sign(user, REFRESH_TOKEN_SECRET)
}

/**
 * Generate an email secret token
 *
 * @param {*} uuid
 * @returns JWT signed email secret token
 */
const generateEmailSecretToken = (uuid) => {
  return jwt.sign(uuid, REFRESH_TOKEN_SECRET)
}

/**
 * Generates an access token with 15 seconds expiry time limit
 *
 * @param {*} user
 * @returns JWT verified token
 */
const generateAccessToken = (user) => {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY })
}

/**
 * Authenticate access token
 */
const authenticateAccessToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) {
    return res.sendStatus(STATUS_UNAUTHORIZED)
  }
  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(STATUS_FORBIDDEN)
    }
    req.user = user
    next()
  })
}

/**
 * Verifies the access token and returns a newly generated access token
 *
 * @param {*} user
 */
const verifyAccessToken = (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null) {
    res.sendStatus(STATUS_UNAUTHORIZED)
  }
  // TODO: get this info from some DB
  // if (!refreshTokens.includes(refreshToken)) {
  //   res.sendStatus(STATUS_FORBIDDEN)
  // }
  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(STATUS_FORBIDDEN)
    }
    const accessToken = generateAccessToken({ name: user.name })
    return res.json({
      accessToken: accessToken,
    })
  })
}

module.exports = {
  generateRefreshToken,
  generateAccessToken,
  generateEmailSecretToken,
  authenticateAccessToken,
  verifyAccessToken,
}
