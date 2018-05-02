require('dotenv').config()
const http = require('http')
const url = require('url')
const twitterClient = require('twit')

const twit = new twitterClient({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret:
    process.env.TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000
})

const handleTweets = (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  twit
    .get('search/tweets', {...req.query, count: 10})
    .then(data => {
      res.statusCode = 200
      res.end(JSON.stringify(data))
    })
    .catch(err => {
      res.statusCode = 500
      res.end(JSON.stringify({error: err}))
    })
}

const handleLive = (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  const stream = twit.stream('statuses/filter', req.query)

  stream.on('tweet', tweet => {
    const id = `id: ${Date.now()}`
    const data = `data: ${JSON.stringify(tweet)}`
    res.write(`event: tweet\n${id}\n${data}\n\n`)
  })
}

http
  .createServer((req, res) => {
    // params
    req.query = url.parse(req.url, true).query

    // cors
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Request-Method', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET'
    )

    if (req.method === 'OPTIONS') {
      res.writeHead(200)
      return res.end()
    }

    // routes
    if (req.url.includes('/tweets')) {
      return handleTweets(req, res)
    }

    if (req.url.includes('/live')) {
      return handleLive(req, res)
    }
  })
  .listen(3000, err => {
    err
      ? (console.error(err), process.exit(1))
      : console.log('live on port 3000')
  })
