import 'reflect-metadata'
import * as Tracing from '@sentry/tracing'
import express, { Request, Response } from 'express'
import * as Sentry from '@sentry/node'
import c from 'colors'
import bodyParser from 'body-parser'
import { EntityManager, EntityRepository, MikroORM, RequestContext } from '@mikro-orm/core'
import { Release } from '@/db/entities/Release'
import options from '@/mikro-orm.config'

// Utils
import videoRouter from '@/route/v1/videoDetails'
import userRouter from '@/route/v1/auth'
import releaseRoter from '@/route/v2/releaseRouter'
import jwtMiddleware from '@/middleware/jwt'

const { PORT_SERVER = 5555 } = process.env
const app = express()

// eslint-disable-next-line import/prefer-default-export
export const DI = {} as {
  orm: MikroORM
  em: EntityManager
  releaseRepo: EntityRepository<Release>
}

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
connectToMongo()

// Middlewares
app.use(Sentry.Handlers.requestHandler())
app.use(Sentry.Handlers.tracingHandler()) // TracingHandler creates a trace for every incoming request
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(jwtMiddleware)
app.use((req, res, next) => RequestContext.create(DI.orm.em, next))

// Routes
app.use('/api/v1/videoDetails/', videoRouter)
app.use('/api/v1/auth', userRouter)
app.use('/api/v2/release/', releaseRoter)

// Test
app.get('/', function rootHandler(req: Request, res: Response) {
  res.end('Hello world!')
})

app.use(Sentry.Handlers.errorHandler()) // The error handler must be before any other error middleware and after all controllers

app.listen(PORT_SERVER, () => {
  console.info(`${c.green('Server successfuly started')} ${c.blue(`PORT: ${PORT_SERVER}`)}`)
})

async function connectToMongo() {
  DI.orm = await MikroORM.init(options)
  DI.em = DI.orm.em
  DI.releaseRepo = DI.orm.em.getRepository(Release)
}
