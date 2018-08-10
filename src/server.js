import {
  AsyncComponentProvider,
  createAsyncContext,
} from 'react-async-component'
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

    // ℹ️ Ensure you wrap your application with the provider.
    const app = (
      <AsyncComponentProvider asyncContext={asyncContext}>
        <StaticRouter context={context} location={req.url}>
          <App />
        </StaticRouter>
      </AsyncComponentProvider>
    )

    // ℹ️ First we bootstrap our app to ensure the async components/data are resolved
    await asyncBootstrapper(app)

    const markup = renderToString(app)

    // ️️ℹ️ Get the async component state
    const asyncState = asyncContext.getState()

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
        ${
          process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
        <script type="text/javascript">
          // ℹ️ Serialise the state into the HTML response
          window.ASYNC_COMPONENTS_STATE = ${serialize(asyncState)}
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
