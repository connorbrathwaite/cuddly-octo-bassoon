import * as React from 'react'
import {Provider} from 'react-redux'
import configureStore from './store'
import BaseLayout from './components/BaseLayout'
import List from './components/List'

const store = configureStore()

export default () => (
  <Provider store={store}>
    <BaseLayout>
      <List />
    </BaseLayout>
  </Provider>
)
