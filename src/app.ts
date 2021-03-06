import express, { Request, Response } from 'express'
import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'
import c from 'colors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import Sequelize from '@/db/sequelize'

// Utils
import videoRouter from '@/route/v1/release'
import userRouter from '@/route/v1/auth'
import releaseRouter from '@/route/v2/release'
import jwtMiddleware from '@/middleware/jwt'

const { PORT_SERVER = 5555, DB_URI } = process.env
const app = express()

// Connections
Sentry.init({
  dsn: 'https://d7b6b6aee6884eed879d8d25a212ad09@o490705.ingest.sentry.io/5555124',
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

mongoose.connect(DB_URI as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
mongoose.connection.on('connected', () => {
  console.info(c.green('Successfully connected to MongoDB!'))
})
mongoose.connection.on('error', (err) => {
  if (!err) return
  console.error(c.red('Connecting to MongoDB failed!'))
  console.error(err)
})
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
Sequelize.authenticate()
  .then(() => console.info(c.green('Successfully connected to Postgres!')))
  .catch((err) => console.error(c.red('Connecting to Postgres failed..'), err))

// Middlewares
app.use(Sentry.Handlers.requestHandler())
app.use(Sentry.Handlers.tracingHandler()) // TracingHandler creates a trace for every incoming request
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(jwtMiddleware)

// Routes
app.use('/api/v1/release', videoRouter)
app.use('/api/v1/auth', userRouter)
app.use('/api/v2/release', releaseRouter)

// Test
app.get('/', function rootHandler(req: Request, res: Response) {
  res.end('Hello world!')
})

app.use(Sentry.Handlers.errorHandler()) // The error handler must be before any other error middleware and after all controllers

app.listen(PORT_SERVER, () =>
  console.info(`${c.green('Server successfuly started')} ${c.blue(`PORT: ${PORT_SERVER}`)}`),
)
