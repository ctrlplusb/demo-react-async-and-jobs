/* eslint-disable react/prop-types */

import { withJob } from 'react-jobs'
import React from 'react'

function CatPicture({ jobResult }) {
  return <img alt="Space Cat" src={jobResult} width="100%" />
}

export default withJob({
  work: () =>
    Promise.resolve('https://i.ytimg.com/vi/b-CWbJBcgF4/maxresdefault.jpg'),
  LoadingComponent: () => <div>Loading...</div>,
  ErrorComponent: ({ error }) => <div>{error.message}</div>,
})(CatPicture)
