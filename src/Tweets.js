import * as React from 'react'
import {connect} from 'react-redux'
import {compose, withStateHandlers} from 'recompose'
import {pick} from 'ramda'
import {request} from './store/tweet/actions'

const Tweets = ({currentCandidate, tweets}) => {
  console.log()
  return <div>tweets for {currentCandidate}</div>
}

const mapState = pick('tweet')

const mapActions = {
  request
}

export default connect(mapState, mapActions)(Tweets)
