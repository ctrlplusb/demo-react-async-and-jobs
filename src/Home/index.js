/* eslint-disable react/prop-types */

import { asyncComponent } from 'react-async-component'
import React from 'react'

export default asyncComponent({
  resolve: () => import('./Home'),
  LoadingComponent: () => <div>Loading...</div>,
  ErrorComponent: ({ error }) => <div>{error.message}</div>,
})
