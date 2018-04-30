import React from 'react'
import {compose, withStateHandlers} from 'recompose'
import {evolve, prop, always} from 'ramda'
import {Button} from 'antd'
import BaseLayout from './BaseLayout'

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
