import { DeepReadonly } from './util.d'

export type AuthForm = DeepReadonly<{
  email: string
  password: string
}>

export type TokenModel = DeepReadonly<{
  token: string
  refreshToken: string
}>

export type User = {
  id?: string
  _id?: string
  email: string
  password: string
  firstName: string
  lastName: string
  role: 'admin' | 'member'
}
