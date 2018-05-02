import * as React from 'react'
import {connect} from 'react-redux'
import {
  branch,
  compose,
  lifecycle,
  withStateHandlers,
  renderComponent
} from 'recompose'
import {
  pipe,
  prop,
  propEq,
  filter,
  evolve,
  not,
  F
} from 'ramda'
import {List as AList, Alert, Button} from 'antd'
import Err from '../components/Err'
import {requestAdd, request} from '../store/tweet/actions'

const List = ({
  Header,
  tweets,
  isLive,
  isLoading,
  toggleLive,
  currentCandidate
}) => (
  <AList
    bordered
    loading={isLoading}
    header={
      <Header>
        <Button type="secondairy" onClick={toggleLive}>
          Live {isLive ? 'Off' : 'On'}
        </Button>
      </Header>
    }
    dataSource={filter(
      propEq('candidate', currentCandidate)
    )(tweets)}
    renderItem={item => (
      <AList.Item extra={item.createdAt}>
        <AList.Item.Meta
          title={<a href="#">{item.author}</a>}
          description={item.text}
        />
      </AList.Item>
    )}
  />
)

const noop = () => {}

// TODO: refactor into a saga channel...
let evtSource = null

const setEvtSource = (q, handler) => {
  console.log('run')
  console.log(q, handler)
  evtSource ? evtSource.close() : noop

  evtSource = new EventSource(
    `http://localhost:3000/live?track=${q}`
  )

  evtSource.addEventListener('tweet', handler)
}

const mapState = prop('tweet')

const initalState = {
  isLive: F()
}

const stateHandlers = {
  toggleLive: state => () =>
    evolve({
      isLive: not
    })(state)
}

export default compose(
  connect(mapState, {request, requestAdd}),
  withStateHandlers(initalState, stateHandlers),
  lifecycle({
    componentDidMount() {
      const {request, currentCandidate} = this.props
      request(currentCandidate)
    },
    componentDidUpdate(prevProps) {
      const {
        isLive,
        request,
        requestAdd,
        currentCandidate,
      } = this.props

      // load all tweets when toggling candidates
      prevProps.currentCandidate !== currentCandidate
        ? request(currentCandidate)
        : noop

      // close source when toggling live off or on candidate change
      prevProps.isLive && !isLive && evtSource
        ? evtSource.close()
        : noop


      const _requestAdd = tweet => requestAdd(currentCandidate, tweet)

      const handleTweetEvt = pipe(
        prop('data'),
        JSON.parse,
        _requestAdd
      )

      isLive ? setEvtSource(currentCandidate, handleTweetEvt) : noop
    }
  }),
  branch(prop('hasError'), renderComponent(Err))
)(List)
