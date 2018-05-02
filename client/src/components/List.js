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

const setEvtSource = q => handler => {
  evtSource = new EventSource(
    `http://localhost:3000/live?track=${q}`
  )

  evtSource.addEventListener('tweet', handler)
}

const mapState = prop('tweet')

const initalState = {isLive: F()}

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
      this.props.request(this.props.currentCandidate)
    },
    componentDidUpdate(prevProps) {
      // close source when toggling live off or on candidate change
      evtSource && prevProps.isLive && !this.props.isLive
        ? evtSource.close()
        : noop

      // load all tweets when toggling candidates
      prevProps.currentCandidate !==
      this.props.currentCandidate
        ? this.props.request(this.props.currentCandidate)
        : noop

      const handleTweetEvt = pipe(
        prop('data'),
        JSON.parse,
        tweet =>
          this.props.requestAdd(
            this.props.currentCandidate,
            tweet
          )
      )

      const setEvtSourceToCandidate = setEvtSource(
        this.props.currentCandidate
      )

      this.props.isLive
        ? setEvtSourceToCandidate(handleTweetEvt)
        : noop
    }
  }),
  branch(prop('hasError'), renderComponent(Err))
)(List)
