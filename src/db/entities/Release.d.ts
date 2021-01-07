import { BaseEntity, Entity, ManyToOne, PrimaryKey, Property, SerializedPrimaryKey } from '@mikro-orm/core'
import { ObjectId } from 'mongodb'
import { v4 } from 'uuid'

// Entities
import { Channel } from '@/db/entities/Channel'
import { Video } from '@/db/entities/Video'
import { Guest } from '@/db/entities/Guest'

@Entity()
export class Release {
  @PrimaryKey()
  _id!: ObjectId

  @SerializedPrimaryKey()
  uuid = v4()

  @Property()
  createdAt = new Date()

  @Property({ onUpdate: () => new Date() })
  updateAt = new Date()

  // @ManyToOne('channel', 'Channel')
  // channel!: Channel

  // @ManyToOne()
  // video!: Video

  // @ManyToOne()
  // guest!: Guest

  // @ManyToOne()
  // recommendation!: string
}

export const test = 'test'
