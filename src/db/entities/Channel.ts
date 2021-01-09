import { Entity, PrimaryKey, Property } from '@mikro-orm/core'
import { v4 } from 'uuid'

@Entity()
export class Channel {
  @PrimaryKey({ type: 'string' })
  uuid = v4()

  @Property({ type: 'string' })
  name!: string

  constructor(name: string) {
    this.name = name
  }
}

export const test = 'test'
