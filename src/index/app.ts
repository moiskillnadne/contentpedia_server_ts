import express, { Request, Response } from 'express'
import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'
import c from 'colors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import videoRouter from '@/route/videoDetails'

// Settings
const { PORT_SERVER, DB_URI } = process.env
const app = express()
Sentry.init({
  dsn: 'https://d7b6b6aee6884eed879d8d25a212ad09@o490705.ingest.sentry.io/5555124',
  environment: process.env.ENVIRONMENT,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
    new Tracing.Integrations.Mongo(),
  ],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
})
mongoose.connect(
  DB_URI as string,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) return
    console.error(c.red('Server cant connect to DB'))
    console.error(err)
  },
)
mongoose.set('useFindAndModify', false)

app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler())
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler())

// All controllers should live here
// Routes
app.use('/api/v1/videoDetails/', videoRouter)

app.get('/', function rootHandler(req: Request, res: Response) {
  res.end('Hello world!')
})

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler())

// Optional fallthrough error handler
// app.use(function onError(err: Error, req: Request, res: any, next: NextFunction) {
//   console.error(err)
//   // The error id is attached to `res.sentry` to be returned
//   // and optionally displayed to the user for support.
//   res.statusCode = 500
//   res.end(`${res.sentry}\n`)
// })

// eslint-disable-next-line no-console
app.listen(PORT_SERVER, () => console.log(`${c.green('Server successfuly started')} ${c.blue(`PORT: ${PORT_SERVER}`)}`))
