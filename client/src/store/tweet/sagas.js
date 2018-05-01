import {
  takeLatest,
  takeEvery,
  take,
  put,
  call
} from 'redux-saga/effects'
import {map, pipe, prop} from 'ramda'
import {message} from 'antd'
import * as actions from './actions'
import * as api from './api'

message.config({maxCount: 3})

const format = candidate => ({
  id,
  text,
  created_at,
  user: {screen_name}
}) => ({
  id,
  text,
  candidate,
  author: screen_name,
  createdAt: created_at
})

function* watchLoads(action) {
  const {candidate} = action.payload

  try {
    const data = yield call(api.fetchTweets, candidate)
    const tweets = map(format(candidate), data)
    yield put(actions.success(candidate, tweets))
  } catch (error) {
    yield put(actions.failure(candidate, error.message))
  }
}

function* watchAdds(action) {
  const {
    payload: {candidate, tweet}
  } = yield take(actions.REQUEST_ADD_TWEET)
  yield put(
    actions.add(candidate, format(candidate)(tweet))
  )

  message.info(tweet.text)
}

export default function* root() {
  yield [
    takeLatest(actions.REQUEST_TWEETS, watchLoads),
    takeEvery(actions.REQUEST_ADD_TWEET, watchAdds)
  ]
}
