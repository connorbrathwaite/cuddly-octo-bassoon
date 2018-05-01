import * as React from 'react'
import {connect} from 'react-redux'
import {
  branch,
  compose,
  lifecycle,
  renderComponent
} from 'recompose'
import {prop, propEq, filter} from 'ramda'
import {List as AList, Spin} from 'antd'
import {request} from '../store/tweet/actions'

const List = ({
  hasError,
  header,
  currentCandidate,
  tweets
}) =>  (
    <AList
      bordered
      header={header}
      dataSource={filter(
        propEq('candidate', currentCandidate)
      )(tweets)}
      renderItem={item => (
        <AList.Item extra={item.createdAt}>
          <AList.Item.Meta
            title={
              <a href="https://ant.design">{item.author}</a>
            }
            description={item.text}
          />
        </AList.Item>
      )}
    />
  )

const mapState = prop('tweet')

export default compose(
  connect(mapState, {request}),
  lifecycle({
    componentDidMount() {
      this.props.request(this.props.currentCandidate)
    },
    componentDidUpdate(nextProps) {
      this.props.currentCandidate !==
      nextProps.currentCandidate
        ? this.props.request(this.props.currentCandidate)
        : null
    }
  }),
  branch(prop('isLoading'), renderComponent(Spin))
)(List)
