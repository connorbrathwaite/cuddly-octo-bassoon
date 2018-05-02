import * as React from 'react'
import {Alert} from 'antd'

const Err = ({errMsg, props}) => (
  <Alert message={errMsg} type="error" />
)

export default Err
