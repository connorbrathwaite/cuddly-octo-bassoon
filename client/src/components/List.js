import * as React from 'react'
import {connect} from 'react-redux'
import {
  branch,
  compose,
  lifecycle,
  renderComponent
} from 'recompose'
import {pipe, prop, propEq, filter} from 'ramda'
import {List as AList, Alert} from 'antd'
import {requestAdd, request} from '../store/tweet/actions'

const List = ({
  tweets,
  header,
  isLoading,
  requestAdd,
  currentCandidate
}) => (
  <AList
    bordered
    header={header}
    loading={isLoading}
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

const Err = ({hasError}) => (
  <Alert message={hasError} type="error" />
)

const mapState = prop('tweet')

export default compose(
  connect(mapState, {request, requestAdd}),
  lifecycle({
    componentDidMount() {
      const {
        request,
        requestAdd,
        currentCandidate
      } = this.props

      const evtSource = new EventSource(
        `http://localhost:3000/live?q=${currentCandidate}`
      )

      const handleTweetEvent = pipe(
        prop('data'),
        JSON.parse,
        tweet => requestAdd(currentCandidate, tweet)
      )

      evtSource.addEventListener('tweet', handleTweetEvent)

      request(currentCandidate)
    },
    componentDidUpdate(nextProps) {
      this.props.currentCandidate !==
      nextProps.currentCandidate
        ? this.props.request(this.props.currentCandidate)
        : null
    }
  }),
  branch(prop('hasError'), renderComponent(Err))
)(List)
