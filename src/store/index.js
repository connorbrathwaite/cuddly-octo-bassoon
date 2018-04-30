import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux'
import {createLogger} from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import tweetReducer from './tweet/reducer'

const loggerMiddleware = createLogger({
  collapsed: false,
  duration: true
})

const sagaMiddleware = createSagaMiddleware()

const combinedReducers = combineReducers({
  tweet: tweetReducer
})

const store = createStore(
  combinedReducers,
  applyMiddleware(loggerMiddleware, sagaMiddleware)
)

export default store
