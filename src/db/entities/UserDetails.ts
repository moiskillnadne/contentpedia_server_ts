import { Entity, PrimaryKey, Property } from '@mikro-orm/core'

@Entity()
export default class Details {
  @PrimaryKey({ type: 'string' })
  id!: string

  @Property({ type: 'number' })
  carCount!: number

  @Property({ type: 'string' })
  salary!: string

  constructor(id: string, carCount: number, salary: string) {
    this.id = id
    this.carCount = carCount
    this.salary = salary
  }
}
