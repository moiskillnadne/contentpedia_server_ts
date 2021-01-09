import { Entity, PrimaryKey, Property } from '@mikro-orm/core'
import { v4 } from 'uuid'

@Entity()
export class Video {
  @PrimaryKey({ type: v4 })
  uuid = v4()

  @Property({ type: 'string' })
  title!: string

  @Property({ type: 'string' })
  url!: string

  @Property({ type: 'string' })
  previewUrl!: string

  constructor(title: string, url: string, previewUrl: string) {
    this.title = title
    this.url = url
    this.previewUrl = previewUrl
  }
}

export const test = 'test'
