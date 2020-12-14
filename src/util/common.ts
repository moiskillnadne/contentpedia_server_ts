import c from 'colors'
import { Response } from 'express'

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
  throw new Error(`${msg} ${err.toString()}`)
}
