export const REQUEST_TWEETS = 'REQUEST_TWEETS'

export const SUCCESS_TWEETS = 'SUCCESS_TWEETS'

export const FAILURE_TWEETS = 'FAILURE_TWEETS'

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
