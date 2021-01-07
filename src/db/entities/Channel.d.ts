import { Entity, Property } from '@mikro-orm/core'

@Entity()
export class Channel {
  @Property()
  name!: string
}

export const test = 'test'
