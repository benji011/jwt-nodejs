require('dotenv').config()
const express = require('express')
const app = express()
const postsData = require('../data/samplePosts')
const newsfeedData = require('../data/newsfeed')
const authentication = require('../middleware/authentication')
const { API_PORT } = require('../constants/constants')

app.use(express.json())

app.get('/posts', authentication.authenticateAccessToken, (req, res) => {
  const posts = postsData.posts
  res.json(posts.filter((post) => post.username == req.user.name))
})

app.get('/newsfeed', authentication.authenticateAccessToken, (req, res) => {
  const newsfeed = newsfeedData.newsfeed
  res.json(newsfeed)
})

app.listen(API_PORT, () => {
  console.log(`started API server on port: ${API_PORT}`)
})
