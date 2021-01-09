import { Entity, PrimaryKey, Property } from '@mikro-orm/core'
import { v4 } from 'uuid'

@Entity()
export class Guest {
  @PrimaryKey({ type: v4 })
  uuid = v4()

  @Property({ name: 'fullname' })
  getFullName() {
    return `${this.lastName} ${this.firstName} ${this.middleName}`
  }

  // Имя
  @Property({ type: 'string' })
  firstName!: string

  // Фамилия
  @Property({ type: 'string' })
  lastName!: string

  // Отчество
  @Property({ type: 'string' })
  middleName!: string

  @Property({ type: Date })
  birthdate!: Date

  @Property({ type: 'string' })
  profession?: string

  constructor(firstName: string, lastName: string, middleName: string, birthdate: Date, profession?: string) {
    this.firstName = firstName
    this.lastName = lastName
    this.middleName = middleName
    this.birthdate = birthdate
    this.profession = profession
  }
}

export const test = 'test'
