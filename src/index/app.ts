import express from 'express'
import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'
import c from 'colors'

// Settings
const { PORT_SERVER } = process.env
const app: express.Application = express()
Sentry.init({
  dsn: 'https://d7b6b6aee6884eed879d8d25a212ad09@o490705.ingest.sentry.io/5555124',
  environment: process.env.ENVIRONMENT,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
})

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler())
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler())

// All controllers should live here
app.get('/', function rootHandler(req, res) {
  res.end('Hello world!')
})
app.get('/debug-sentry', function mainHandler(req, res) {
  throw new Error('My first Sentry error!')
})

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler())

// Optional fallthrough error handler
app.use(function onError(err: Record<string, unknown>, req: any, res: any, next: any) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500
  res.end(`${res.sentry}\n`)
})

// eslint-disable-next-line no-console
app.listen(PORT_SERVER, () => console.log(`${c.green('Server successfuly started')} ${c.blue(`PORT: ${PORT_SERVER}`)}`))
