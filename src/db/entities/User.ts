import { Entity, Property } from '@mikro-orm/core'

@Entity()
export default class User {
  @Property({ type: 'string' })
  email!: string

  @Property({ type: 'string' })
  password!: string

  constructor(email: string, password: string) {
    this.email = email
    this.password = password
  }
}
