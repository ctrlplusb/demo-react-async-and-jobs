import { AsyncComponentProvider } from 'react-async-component'
import { hydrate } from 'react-dom'
import asyncBootstrapper from 'react-async-bootstrapper'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import React from 'react'

import App from './App'

// ℹ️ Get any "rehydrate" state sent back by the server
const rehydrateState = window.ASYNC_COMPONENTS_STATE

// ️ℹ️ Ensure you wrap your application with the provider,
// and pass in the rehydrateState.
const app = (
  <AsyncComponentProvider rehydrateState={rehydrateState}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AsyncComponentProvider>
)

// ℹ️ Run the bootstrapper, which in this context will ensure that all
// components specified by the rehydrateState will be resolved prior to render.
asyncBootstrapper(app).then(() => {
  // ℹ️ Render the app
  hydrate(app, document.getElementById('root'))
})

if (module.hot) {
  module.hot.accept()
}
