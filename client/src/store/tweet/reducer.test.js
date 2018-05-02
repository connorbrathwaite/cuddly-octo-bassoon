import reducer, {initalState} from './reducer'
import {add, request, success, failure} from './actions'

const mockTweet = {
  id: 991675463184539600,
  author: 'JanLandy',
  candidate: 'trump',
  createdAt: 'Wed May 02 13:47:09 +0000 2018',
  text:
    '@renato_mariotti I think we have to understand that Trump is guilty, and because he’s guilty he’s going to do every… https://t.co/3eOqwlBew0'
}

describe('tweet reducer', () => {
  test('request tweets', () => {
    const state = reducer(initalState, request('trump'))
    expect(state.isLoading).toBe(true)
    expect(state.hasError).toBe(false)
  })

  test('recieve tweets', () => {
    const state = reducer(
      initalState,
      success('trump', [mockTweet])
    )
    expect(state.tweets).toMatchSnapshot()
    expect(state.isLoading).toBe(false)
    expect(state.hasError).toBe(false)
  })

  test('failure tweets', () => {
    const state = reducer(initalState, failure('trump'))
    expect(state.isLoading).toBe(false)
    expect(state.hasError).toBeTruthy()
  })
})
