import { Entity, Property } from '@mikro-orm/core'

@Entity()
export class Guest {
  @Property({ name: 'fullname' })
  getFullName() {
    return `${this.lastName} ${this.firstName} ${this.middleName}`
  }

  // Имя
  @Property()
  firstName!: string

  // Фамилия
  @Property()
  lastName!: string

  // Отчество
  @Property()
  middleName!: string

  @Property()
  birthdate!: Date

  @Property()
  profession?: string
}

export const test = 'test'
