require('dotenv').config()
const express = require('express')
const app = express()
const data = require('../data/samplePosts')
const authentication = require('../middleware/authentication')
const { API_PORT } = require('../constants/constants')

app.use(express.json())

app.get('/posts', authentication.authenticateAccessToken, (req, res) => {
  const posts = data.posts
  res.json(posts.filter((post) => post.username == req.user.name))
})

app.listen(API_PORT, () => {
  console.log(`started API server on port: ${API_PORT}`)
})
