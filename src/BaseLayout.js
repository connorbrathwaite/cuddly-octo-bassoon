import React from 'react'
import {Layout, Breadcrumb} from 'antd'
import './style.css'

const {Header, Content, Footer} = Layout

const style = {
  content: {padding: '0 50px'},
  breadcrumb: {margin: '16px 0'},
  children: {
    background: '#fff',
    padding: 24,
    minHeight: 280
  },
  footer: {textAlign: 'center'}
}

const BaseLayout = ({children}) => (
  <Layout className="layout">
    <Header>
      <div className="logo" />
    </Header>
    <Content style={style.content}>
      <div style={style.children}>{children}</div>
    </Content>
    <Footer style={style.footer}>
      Ant Design ©2018 Created by Ant UED
    </Footer>
  </Layout>
)

export default BaseLayout
