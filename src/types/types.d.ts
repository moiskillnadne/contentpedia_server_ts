import { Request as ExpressRequest } from 'express'

export type Jwt = {
  _id?: string
}

export type Request = ExpressRequest & {
  store?: {
    jwt?: null | {
      _id?: string
    }
  }
  protect?: () => Jwt
}
