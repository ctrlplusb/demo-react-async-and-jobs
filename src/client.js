import { hydrate } from 'react-dom'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import React from 'react'

import App from './App'

hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
)

if (module.hot) {
  module.hot.accept()
}
