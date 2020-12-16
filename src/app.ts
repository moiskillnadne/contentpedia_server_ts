import express, { Request, Response } from 'express'
import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'
import c from 'colors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

// Utils
import videoRouter from '@/route/v1/videoDetails'
import userRouter from '@/route/v1/auth'
import jwtMiddleware from '@/middleware/jwt'

const { PORT_SERVER, DB_URI } = process.env
const app = express()

// Connections
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

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(jwtMiddleware)
app.use(Sentry.Handlers.requestHandler())
app.use(Sentry.Handlers.tracingHandler()) // TracingHandler creates a trace for every incoming request

// Routes
app.use('/api/v1/videoDetails/', videoRouter)
app.use('/api/v1/auth', userRouter)

// Test
app.get('/', function rootHandler(req: Request, res: Response) {
  res.end('Hello world!')
})

app.use(Sentry.Handlers.errorHandler()) // The error handler must be before any other error middleware and after all controllers

// eslint-disable-next-line no-console
app.listen(PORT_SERVER, () => console.log(`${c.green('Server successfuly started')} ${c.blue(`PORT: ${PORT_SERVER}`)}`))
