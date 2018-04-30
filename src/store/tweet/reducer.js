import {
  cond,
  equals,
  always,
  evolve,
  prepend,
  T,
  F
} from 'ramda'
import * as actions from './actions'

const initialState = {
  loading: false,
  error: false,
  tweets: []
}

const reducer = (state = initialState, action) =>
  cond([
    [equals(actions.request), always({loading: T()})],
    [
      equals(actions.success),
      () =>
        evolve({
          loading: F(),
          tweets: prepend(action.payload.tweets)
        })(state)
    ],
    [T, always(state)]
  ])(action.type)

export default reducer
