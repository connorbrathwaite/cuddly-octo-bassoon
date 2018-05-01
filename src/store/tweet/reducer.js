import {
  cond,
  path,
  equals,
  always,
  evolve,
  union,
  T,
  F
} from 'ramda'
import * as actions from './actions'

const initialState = {
  isLoading: F(),
  hasError: F(),
  tweets: []
}

const reducer = (state = initialState, action) =>
  cond([
    [
      equals(actions.REQUEST_TWEETS),
      () =>
        evolve({
          isLoading: T,
          hasError: F
        })(state)
    ],
    [
      equals(actions.SUCCESS_TWEETS),
      () =>
        evolve({
          isLoading: F,
          hasError: F,
          tweets: union(action.payload.tweets)
        })(state)
    ],
    [
      equals(actions.FAILURE_TWEETS),
      () =>
        evolve({
          isLoading: F,
          hasError: T
        })(state)
    ],
    [T, always(state)]
  ])(action.type)

export default reducer
