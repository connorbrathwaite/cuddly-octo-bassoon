import React from 'react'
import {evolve, not, T} from 'ramda'
import {withStateHandlers} from 'recompose'
import {Layout, Button} from 'antd'
import './style.css'

const {Header, Content, Footer} = Layout

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
    <Header>
      <div className="logo" />
    </Header>
    <Content style={style.content}>
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
    </Content>
    <Footer style={style.footer}>
      Ant Design ©2018 Created by Ant UED
    </Footer>
  </Layout>
)

// authentication creds in `keys.json` but we can still pretend we're logging in for fun
const initialState = {
  isAuthenticated: T() // false
}

const stateHandlers = {
  toggleIsAuthenticated: prevState => () =>
    evolve({
      isAuthenticated: not
    })(prevState)
}

export default withStateHandlers(
  initialState,
  stateHandlers
)(BaseLayout)
