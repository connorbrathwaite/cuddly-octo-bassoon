import {takeLatest, put, call} from 'redux-saga/effects'
import {map} from 'ramda'
import * as actions from './actions'
import * as api from './api'

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

function* watch(action) {
  const {candidate} =  action.payload
  try {
    const {data} = yield call(
      api.fetchTweets,
      candidate
    )
    const tweets = map(format(candidate), data.statuses)
    yield put(actions.success(candidate, tweets))
  } catch (error) {
    yield put(actions.failure(candidate, error))
  }
}
export default function* rootSaga() {
  yield takeLatest(actions.REQUEST_TWEETS, watch)
}
