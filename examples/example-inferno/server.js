import express from 'express'
import proxy from 'express-http-proxy'
import Inferno from 'inferno'
import { renderToString } from 'inferno-server'
import { RendererProvider } from 'inferno-fela'
import fs from 'fs'
import { renderToMarkup } from 'fela-dom'
import App from './app'
import createRenderer from './renderer'

const app = express()

app.use(
  '/bundle.js',
  proxy('localhost:8080', { forwardPath: () => '/bundle.js' })
)

app.get('/', (req, res) => {
  const renderer = createRenderer()

  const indexHTML = fs.readFileSync(`${__dirname}/index.html`).toString()
  const appHtml = renderToString(
    <RendererProvider renderer={renderer}>
      <App />
    </RendererProvider>
  )

  console.log(appHtml)

  const appCSS = renderToMarkup(renderer)

  res.write(
    indexHTML
      .replace('<!-- {{app}} -->', appHtml)
      .replace('<!-- {{css}} -->', appCSS)
  )
  res.end()
})

app.listen(8000, 'localhost', () => {
  console.log('Access the universal app at http://%s:%d', 'localhost', 8000)
})
