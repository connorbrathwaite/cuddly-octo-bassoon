const REQUEST_TWEETS = 'REQUEST_TWEETS'
const SUCCESS_TWEETS = 'SUCCESS_TWEETS'
const FAILURE_TWEETS = 'FAILURE_TWEETS'

export const request = candidate => ({
  type: REQUEST_TWEETS,
  payload: {
    candidate
  }
})
export const success = (candidate, response) => ({
  type: SUCCESS_TWEETS,
  payload: {
    candidate,
    tweets: response.tweets
  }
})
export const failure = (candidate, error) => ({
  type: FAILURE_TWEETS,
  payload: {
    candidate,
    error
  }
})
