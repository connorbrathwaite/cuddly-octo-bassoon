import * as React from 'react'
import {Alert} from 'antd'

const Err = ({errMsg, props}) => (
  console.log(errMsg, props),
  <Alert message={errMsg} type="error" />
)

export default Err
