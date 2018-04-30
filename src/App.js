import * as React from 'react'
import {compose, withStateHandlers} from 'recompose'
import {evolve, prop, always} from 'ramda'
import {Provider} from 'react-redux'
import {Button} from 'antd'
import store from './store'
import BaseLayout from './BaseLayout'
import Tweets from './Tweets'

const candidates = {
  trump: 'trump',
  hilary: 'hilary'
}

const App = ({
  currentCandidate,
  otherCandidate,
  toggleCandidate
}) => (
  <BaseLayout>
    <div>currentCandidate {currentCandidate}</div>
    <Provider store={store}>
      <Tweets currentCandidate={currentCandidate} />
    </Provider>
    <Button onClick={toggleCandidate}>
      switch to {otherCandidate}
    </Button>
  </BaseLayout>
)

const initialState = {
  currentCandidate: prop('trump')(candidates),
  otherCandidate: prop('hilary')(candidates)
}

const stateHandlers = {
  toggleCandidate: prevState => () => ({
    currentCandidate: prevState.otherCandidate,
    otherCandidate: prevState.currentCandidate
  })
}

export default compose(
  withStateHandlers(initialState, stateHandlers)
)(App)
