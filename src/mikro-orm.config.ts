import { Options } from '@mikro-orm/core'

// Entities
import { Release } from '@/db/entities/Release'
import { Channel } from '@/db/entities/Channel'
import { Video } from '@/db/entities/Video'
import { Guest } from '@/db/entities/Guest'

const { DB_URI } = process.env

const options: Options = {
  type: 'mongo',
  clientUrl: DB_URI,
  entities: [Release, Channel, Video, Guest],
  debug: true,
}

export default options
