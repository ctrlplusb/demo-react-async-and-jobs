import {
  AsyncComponentProvider,
  createAsyncContext,
} from 'react-async-component'
import { extractCritical } from 'emotion-server'
import { JobProvider, createJobContext } from 'react-jobs'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import asyncBootstrapper from 'react-async-bootstrapper'
import express from 'express'
import React from 'react'
import serialize from 'serialize-javascript'

import App from './App'

// eslint-disable-next-line import/no-dynamic-require
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const server = express()
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    const context = {}

    // ️️️ℹ️ Create the async context for our provider, this grants
    // us the ability to tap into the state to send back to the client.
    const asyncContext = createAsyncContext()

    // ℹ️ Create the job context for our provider, this grants
    // us the ability to track the resolved jobs to send back to the client.
    const jobContext = createJobContext()

    // ℹ️ Ensure you wrap your application with the providers.
    const app = (
      <AsyncComponentProvider asyncContext={asyncContext}>
        <JobProvider jobContext={jobContext}>
          <StaticRouter context={context} location={req.url}>
            <App />
          </StaticRouter>
        </JobProvider>
      </AsyncComponentProvider>
    )

    // ℹ️ First we bootstrap our app to ensure the async components/data are resolved
    await asyncBootstrapper(app)

    const { html: markup, ids, css } = extractCritical(renderToString(app))

    // ️️ℹ️ Get the async component state
    const asyncState = asyncContext.getState()

    // ℹ️ Get the resolved jobs state.
    const jobsState = jobContext.getState()

    if (context.url) {
      res.redirect(context.url)
    } else {
      res.status(200).send(
        `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Welcome to Razzle</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ''
        }
        <style>
          ${css}
        </style>
        ${
          process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
        <script type="text/javascript">
          // ℹ️ Serialise the state into the HTML response so that we will be
          // able to use the data to rehydrate our react app correctly on the
          // client.
          window.ASYNC_COMPONENTS_STATE = ${serialize(asyncState)}
          window.JOBS_STATE = ${serialize(jobsState)}
          window.EMOTION_IDS = ${serialize(ids)}
        </script>
    </head>
    <body>
        <div id="root">${markup}</div>
    </body>
</html>`,
      )
    }
  })

export default server
