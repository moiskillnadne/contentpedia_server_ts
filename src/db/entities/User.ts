import { Entity, PrimaryKey, Property, Collection, OneToOne } from '@mikro-orm/core'
import Details from '@/db/entities/UserDetails'

@Entity()
export default class User {
  @PrimaryKey({ type: 'string' })
  id!: string

  @Property({ type: 'string' })
  email!: string

  @Property({ type: 'string' })
  password!: string

  @OneToOne(() => Details)
  details = new Collection<Details>(this)

  constructor(id: string, email: string, password: string) {
    this.email = email
    this.password = password
  }
}
