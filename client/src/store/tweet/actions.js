export const REQUEST_ADD_TWEET = 'REQUEST_ADD_TWEET'

export const SUCCESS_ADD_TWEET = 'SUCCESS_ADD_TWEET'

export const REQUEST_TWEETS = 'REQUEST_TWEETS'

export const SUCCESS_TWEETS = 'SUCCESS_TWEETS'

export const FAILURE_TWEETS = 'FAILURE_TWEETS'

export const requestAdd = (candidate, tweet) => ({
  type: REQUEST_ADD_TWEET,
  payload: {
    candidate,
    tweet
  }
})

export const add = (candidate, tweet) => ({
  type: SUCCESS_ADD_TWEET,
  payload: {
    candidate,
    tweet
  }
})

export const request = candidate => ({
  type: REQUEST_TWEETS,
  payload: {
    candidate
  }
})

export const success = (candidate, tweets) => ({
  type: SUCCESS_TWEETS,
  payload: {
    candidate,
    tweets
  }
})

export const failure = (candidate, error) => ({
  type: FAILURE_TWEETS,
  payload: {
    candidate,
    error
  }
})
