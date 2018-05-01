import {concat, path} from 'ramda'
import pipeP from 'promised-pipe'

const getUrl = concat('http://localhost:3000/tweets?q=')

const toJSON = res => res.json()

export const fetchTweets = pipeP(
  getUrl,
  fetch,
  toJSON,
  path(['data', 'statuses'])
)
