import * as React from 'react'
import {connect} from 'react-redux'
import {
  branch,
  compose,
  lifecycle,
  withStateHandlers,
  withProps,
  renderComponent
} from 'recompose'
import {
  always,
  pipe,
  prop,
  propEq,
  filter,
  evolve,
  not,
  F,
  T
} from 'ramda'
import {List as AList, Button} from 'antd'
import Err from '../components/Err'
import {requestAdd, request} from '../store/tweet/actions'

const ListItem = ({text, author, createdAt}) => (
  <AList.Item extra={createdAt}>
    <AList.Item.Meta
      title={<a href="#">{author}</a>}
      description={text}
    />
  </AList.Item>
)

const List = ({
  filteredTweets,
  isLive,
  isLoading,
  toggleLive,
  otherCandidate,
  currentCandidate,
  toggleCandidate
}) => {
  const pagination = {
    pageSize: 5,
    defaultCurrent: 1,
    total: filteredTweets.length,
    showTotal: total => `${total} tweets`
  }

  const listProps = {
    // pagination (lib not working atm),
    renderItem: ListItem,
    bordered: T(),
    loading: isLoading,
    dataSource: filteredTweets,
    header: (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <h1>
          {filteredTweets.length} tweets for{' '}
          {currentCandidate}
        </h1>
        <Button.Group>
          <Button type="primary" onClick={toggleCandidate}>
            # {otherCandidate}
          </Button>
          <Button type="secondairy" onClick={toggleLive}>
            live {isLive ? 'off' : 'on'}
          </Button>
        </Button.Group>
      </div>
    )
  }

  return <AList {...listProps} />
}

const noop = () => {}

// TODO: refactor into a saga channel...
let evtSource = null

const candidates = {
  trump: 'trump',
  hilary: 'hilary'
}

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
  isLive: F(),
  otherCandidate: prop('hilary')(candidates),
  currentCandidate: prop('trump')(candidates)
}

const stateHandlers = {
  toggleLive: state => () =>
    evolve({
      isLive: not
    })(state),
  toggleCandidate: prevState =>
    always({
      currentCandidate: prevState.otherCandidate,
      otherCandidate: prevState.currentCandidate
    })
}

const propMapper = ({tweets, currentCandidate}) => ({
  filteredTweets: filter(
    propEq('candidate', currentCandidate)
  )(tweets)
})

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
        currentCandidate
      } = this.props

      // load all tweets when toggling candidates
      prevProps.currentCandidate !== currentCandidate
        ? request(currentCandidate)
        : noop

      // close source when toggling live off or on candidate change
      prevProps.isLive && !isLive && evtSource
        ? evtSource.close()
        : noop

      const _requestAdd = tweet =>
        requestAdd(currentCandidate, tweet)

      const handleTweetEvt = pipe(
        prop('data'),
        JSON.parse,
        _requestAdd
      )

      isLive
        ? setEvtSource(currentCandidate, handleTweetEvt)
        : noop
    }
  }),
  withProps(propMapper),
  branch(prop('hasError'), renderComponent(Err))
)(List)
