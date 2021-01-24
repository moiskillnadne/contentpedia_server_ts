/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable func-names */
import { NextFunction, Response } from 'express'
import * as jwt from 'jsonwebtoken'

import { Request } from '@/types/types.d'

export default function (req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace(`Bearer `, '')

  if (token) {
    req.store = { jwt: jwt.decode(token) as any }

    req.protect = function (): any {
      try {
        return jwt.verify(token, process.env.JWT_SECRET || '')
      } catch (err) {
        res.status(401).json({ msg: 'Token expired!' })
        next(new Error('Token expired'))
      }
    }
  }

  next()
}
