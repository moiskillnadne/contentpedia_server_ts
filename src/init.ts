import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'
import express from 'express'
import c from 'colors'
import { MikroORM, RequestContext } from '@mikro-orm/core'
import MikroConfig from '@/mikro-orm.config'

export class Initer {
  app: express.Application

  constructor(app: express.Application) {
    this.app = app
  }

  sentry() {
    Sentry.init({
      dsn: 'https://d7b6b6aee6884eed879d8d25a212ad09@o490705.ingest.sentry.io/5555124',
      integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Tracing.Integrations.Express({ app: this.app }),
        new Tracing.Integrations.Mongo(),
      ],

      // We recommend adjusting this value in production, or using tracesSampler
      // for finer control
      tracesSampleRate: 1.0,
    })

    console.info(c.green('Sentry was successfuly inited!'))
  }

  // async mikroorm() {
  //   try {
  //     const orm = await MikroORM.init(MikroConfig)
  //     console.log(orm) // access EntityManager via `em` property

  //     this.app.use((req, res, next) => {
  //       RequestContext.create(orm.em, next)
  //     })
  //   } catch (err) {
  //     console.error(c.red(err))
  //   }
  // }
}

export const test = 'test'
