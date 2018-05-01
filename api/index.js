require('dotenv').config()
const Twit = require('twit')
const fastify = require('fastify')()

const twit = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000
})

fastify.use(require('cors')())

fastify.get('/', (request, reply) =>
  twit
    .get('search/tweets', {...request.query, count: 10})
    .then(data =>
      reply
        .code(200)
        .header('Content-Type', 'application/json')
        .send(data)
    )
    .catch(err =>
      reply
        .code(500)
        .header('Content-Type', 'application/json')
        .send({error: JSON.stringify(err)})
    )
)

fastify.listen(3000, err => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }

  console.log('live on port 3000')
})
