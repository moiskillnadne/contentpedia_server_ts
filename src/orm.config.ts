import { MikroORM } from '@mikro-orm/core'

export default {
  migrations: {
    path: './src/migrations',
    tableName: 'migrations',
    transactional: true,
  },
  tsNode: process.env.NODE_DEV === 'true',
  user: 'vtcehnnr',
  password: 'WJWMFRgbmjQzDmnFWITvgw7lSxI6ZmMw',
  dbName: 'vtcehnnr',
  host: 'postgres://vtcehnnr:WJWMFRgbmjQzDmnFWITvgw7lSxI6ZmMw@hattie.db.elephantsql.com',
  port: 5432,
  entities: ['src/db/entities/*.ts'],
  entitiesTs: ['src/db/entities/*.ts'],
  type: 'postgresql',
} as Parameters<typeof MikroORM.init>[0]
