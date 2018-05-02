import {
  cond,
  prop,
  equals,
  always,
  evolve,
  prepend,
  union,
  T,
  F
} from 'ramda'
import * as actions from './actions'

const initialState = {
  isNotifing: F(),
  isLoading: F(),
  hasError: F(),
  errMsg: always(null),
  tweets: []
}

const reducer = (state = initialState, action) =>
  cond([
    [
      equals(actions.REQUEST_ADD_TWEET),
      () =>
        evolve(
          {
            isNotifing: T
          },
          state
        )
    ],
    [
      equals(actions.SUCCESS_ADD_TWEET),
      () =>
        evolve(
          {
            isNotifing: F,
            tweets: prepend(action.payload.tweet)
          },
          state
        )
    ],
    [
      equals(actions.REQUEST_TWEETS),
      () =>
        evolve(
          {
            isLoading: T,
            hasError: F,
            errMsg: always(null),
          },
          state
        )
    ],
    [
      equals(actions.SUCCESS_TWEETS),
      () =>
        evolve(
          {
            isLoading: F,
            hasError: F,
            tweets: union(action.payload.tweets)
          },
          state
        )
    ],
    [
      equals(actions.FAILURE_TWEETS),
      () =>
        evolve(
          {
            isLoading: F,
            hasError: T,
            errMsg: always(action.payload.error)
          },
          state
        )
    ],
    [T, always(state)]
  ])(action.type)

export default reducer
