import { TsMorphMetadataProvider } from '@mikro-orm/reflection'

const { DB_URI } = process.env

export default {
  metadataProvider: TsMorphMetadataProvider,
  entities: ['./db/entities/**/*.js'],
  entitiesTs: ['./db/entities/**/*.ts'],
  dbName: 'contentpedia_dev',
  type: 'mongo', // one of `mongo` | `mysql` | `mariadb` | `postgresql` | `sqlite`
  clientUrl: DB_URI,
}
