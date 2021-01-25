import c from 'colors'
import { Response } from 'express'
import bcrypt from 'bcryptjs'
import * as validate from '@/util/validate'

export function isProvided(obj: Record<string, unknown>, varsName?: string) {
  const keys = Object.keys(obj)
  const undefinedKeys: string[] = []

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i]
    const variable = obj[key]

    if (variable === undefined) {
      undefinedKeys.push(key)
    }
  }

  if (undefinedKeys.length) {
    throw new Error(c.red(`${varsName || 'Some mandatory'} variables are not provided: ${undefinedKeys.join(', ')}`))
  }
}

export function errorHandler(err: Error, res: Response, msg: string) {
  res.status(500).json({ msg: 'Something go wrong.. :/', error: err.toString() })
  throw new Error(`${c.red(msg)} ${err.toString()}`)
}

export async function isExistHandler<K extends string, V>(data: Record<K, V>, requiredProps: Array<K>, res: Response) {
  const errors = await validate.isExist(data, requiredProps)
  if (errors.length !== 0) {
    res.status(400).json({ err: 'Bad request. Some fields empty', fields: errors })
    return false
  }
  return true
}

export async function hashPassword(password: any): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  console.log(hash)
  return hash
}

export function createPromises<T>(
  mongoController: (props?: any) => any,
  postgresController: (props?: any) => any,
  props?: T,
): Array<Promise<any>> {
  const mongoPromise = new Promise((resolve, reject) => {
    mongoController(props ?? props)
      .then((result: any) =>
        resolve({
          db: 'Mongo',
          data: result,
        }),
      )
      .catch((err: any) => reject(err))
  })

  const postgresPromise = new Promise((resolve, reject) => {
    postgresController(props ?? props)
      .then((result: any) =>
        resolve({
          db: 'Postgres',
          data: result,
        }),
      )
      .catch((err: any) => reject(err))
  })

  return [mongoPromise, postgresPromise]
}
