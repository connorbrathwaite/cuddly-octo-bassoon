import React from 'react'
import {evolve, not, T} from 'ramda'
import {withStateHandlers} from 'recompose'
import {Layout, Button} from 'antd'

const style = {
  content: {
    padding: '0 50px'
  },
  breadcrumb: {
    margin: '16px 0'
  },
  children: {
    background: '#fff',
    padding: 24,
    minHeight: 280
  },
  footer: {
    textAlign: 'center'
  }
}

const BaseLayout = ({
  children,
  isAuthenticated,
  toggleIsAuthenticated
}) => (
  <Layout className="layout">
    <Layout.Content style={style.content}>
      <div style={style.children}>
        {isAuthenticated ? (
          children
        ) : (
          <Button
            icon="twitter"
            onClick={toggleIsAuthenticated}
          >
            Get Started
          </Button>
        )}
      </div>
    </Layout.Content>
    <Layout.Footer style={style.footer}>
      Ant Design ©2018 Created by Ant UED
    </Layout.Footer>
  </Layout>
)

// authentication creds in `.env` but we can still pretend we're logging in for fun
const initialState = {
  isAuthenticated: T()
}

const stateHandlers = {
  toggleIsAuthenticated: state => () =>
    evolve({
      isAuthenticated: not
    })(prevState)
}

export default withStateHandlers(
  initialState,
  stateHandlers
)(BaseLayout)
