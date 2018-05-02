import * as React from 'react'
import {withStateHandlers} from 'recompose'
import {evolve, prop} from 'ramda'
import {Card, Button} from 'antd'
import List from '../components/List'

const Tweet = ({
  currentCandidate,
  otherCandidate,
  toggleCandidate
}) => (
  <List
    currentCandidate={currentCandidate}
    Header={({children}) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <h1>Tweets for {currentCandidate}</h1>
        <Button.Group>
          <Button type="primary" onClick={toggleCandidate}>
            # {otherCandidate}
          </Button>
          {children}
        </Button.Group>
      </div>
    )}
  />
)

const candidates = {
  trump: 'trump',
  hilary: 'hilary'
}

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

export default withStateHandlers(
  initialState,
  stateHandlers
)(Tweet)
