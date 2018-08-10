import { AsyncComponentProvider } from 'react-async-component'
import { JobProvider } from 'react-jobs'
import { hydrate } from 'react-dom'
import asyncBootstrapper from 'react-async-bootstrapper'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import React from 'react'

import App from './App'

// ℹ️ Get any state sent back by the server for the react-async-components.
const asyncComponentsState = window.ASYNC_COMPONENTS_STATE

// ️ℹ️ Get any state sent back by the server for the react-jobs.
const reactJobsState = window.JOBS_STATE

// ️ℹ️ Ensure you wrap your application with the providers and pass in the
// rehydrate state for the components and jobs.
const app = (
  <AsyncComponentProvider rehydrateState={asyncComponentsState}>
    <JobProvider rehydrateState={reactJobsState}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </JobProvider>
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
