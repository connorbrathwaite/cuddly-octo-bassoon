import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux'
import {createLogger} from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import tweetReducer from './tweet/reducer'
import rootSaga from './tweet/sagas'

export default () => {
  const rootReducer = combineReducers({
    tweet: tweetReducer
  })

  const loggerMiddleware = createLogger({
    collapsed: false,
    duration: true
  })

  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    rootReducer,
    applyMiddleware(loggerMiddleware, sagaMiddleware)
  )

  store.runSaga = sagaMiddleware.run(rootSaga)

  return store
}
