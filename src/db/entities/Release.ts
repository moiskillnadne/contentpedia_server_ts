import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from '@mikro-orm/core'
import { ObjectId } from 'mongodb'
import { v4 } from 'uuid'

// Entities
import { Channel } from '@/db/entities/Channel'
import { Video } from '@/db/entities/Video'
import { Guest } from '@/db/entities/Guest'

@Entity()
export class Release {
  @PrimaryKey({ type: ObjectId })
  _id!: ObjectId

  @SerializedPrimaryKey({ type: v4 })
  uuid = v4()

  @Property({ type: Date })
  createdAt = new Date()

  @Property({ onUpdate: () => new Date(), type: Date })
  updateAt = new Date()

  @ManyToOne({ type: Channel })
  channel!: Channel

  @ManyToOne({ type: Video })
  video!: Video

  @OneToOne(() => Guest, (guest) => guest, { owner: true })
  guest!: Guest

  constructor(channel: Channel, video: Video) {
    this.channel = channel
    this.video = video
    // this.guest = guest
  }
}

export const test = 'test'
