import { Entity, Property } from '@mikro-orm/core'

@Entity()
export class Video {
  @Property()
  title!: string

  @Property()
  url!: string

  @Property()
  previewUrl!: string
}

export const test = 'test'
