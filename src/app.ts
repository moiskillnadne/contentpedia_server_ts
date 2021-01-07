import 'reflect-metadata'
import { MikroORM } from '@mikro-orm/core'
import express, { Request, Response } from 'express'
import * as Sentry from '@sentry/node'
import c from 'colors'
import bodyParser from 'body-parser'
import { Initer } from '@/init'

// Utils
import videoRouter from '@/route/v1/videoDetails'
import userRouter from '@/route/v1/auth'
import jwtMiddleware from '@/middleware/jwt'

const { PORT_SERVER = 5555, DB_URI } = process.env
const app = express()

// Connections
const init = new Initer(app)
init.sentry()
// init.mikroorm()
const microInit = async () => {
  const orm = await MikroORM.init({
    type: 'mongo',
    clientUrl: DB_URI,
    dbName: 'contentpedia_dev',
  })
  console.log(orm.em)
}
microInit()

// Middlewares
app.use(Sentry.Handlers.requestHandler())
app.use(Sentry.Handlers.tracingHandler()) // TracingHandler creates a trace for every incoming request
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(jwtMiddleware)

// Routes
app.use('/api/v1/videoDetails/', videoRouter)
app.use('/api/v1/auth', userRouter)

// Test
app.get('/', function rootHandler(req: Request, res: Response) {
  res.end('Hello world!')
})

app.use(Sentry.Handlers.errorHandler()) // The error handler must be before any other error middleware and after all controllers

app.listen(PORT_SERVER, () => {
  console.info(`${c.green('Server successfuly started')} ${c.blue(`PORT: ${PORT_SERVER}`)}`)
})
