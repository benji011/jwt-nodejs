require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')
const express = require('express')
const cors = require('cors')
const app = express()
const postsData = require('../data/samplePosts')
const authentication = require('../middleware/authentication')
const { API_PORT } = require('../constants/constants')

const { SUPABASE_URL, SUPABASE_KEY } = require('../constants/constants')

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

app.use(express.json())
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
)

app.get('/posts', authentication.authenticateAccessToken, (req, res) => {
  const posts = postsData.posts
  res.json(posts.filter((post) => post.username == req.user.name))
})

app.get(
  '/newsfeed',
  authentication.authenticateAccessToken,
  async (req, res) => {
    const uuid = req.query.uuid
    if (!uuid) {
      res.sendStatus(400)
    }
    const { data: newsfeed, error } = await supabase
      .from('newsfeed')
      .select('*')
      .eq('uuid', uuid)
    if (error) {
      res.sendStatus(500)
    }
    res.json(newsfeed)
  }
)

app.listen(API_PORT, () => {
  console.log(`started API server on port: ${API_PORT}`)
})
