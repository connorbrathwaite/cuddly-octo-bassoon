import * as React from 'react'

const Err = ({hasError}) => (
  <Alert message={hasError} type="error" />
)

export default Err