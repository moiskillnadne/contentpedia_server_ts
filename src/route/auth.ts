import express, { Response } from 'express'
import UserDetailsSchema from '@/model/user'
import * as jwt from 'jsonwebtoken'

import { Request } from '@/types/types'

// import userCreator from '@/util/userCreator'
import { errorHandler } from '@/util/common'

const router = express.Router()

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body

  let user

  try {
    user = await UserDetailsSchema.findOne({ email }).exec()
  } catch (err) {
    errorHandler(err, res, 'Connection with DB lost!')
  }

  if (!user) res.status(401).json({ msg: 'User is not exist!' })
  if (user?.get('password') !== password) res.status(401).json({ msg: 'Password incorrect!' })

  const tokens = generateJWT(user?._id)

  res.status(200).json(tokens)
})

router.get('/refresh', async (req: Request, res: Response) => {
  req.protect?.()
  const tokens = generateJWT('123')

  res.status(200).json(tokens)
})

function generateJWT(id: string) {
  const today = new Date()
  const expirationDate = new Date(today)
  expirationDate.setDate(today.getDate() + 60)

  const token = jwt.sign({ id }, process.env.JWT_SECRET || '', { expiresIn: '1h' })
  const refreshToken = jwt.sign({ id }, process.env.JWT_SECRET || '', { expiresIn: '37d' })

  return {
    token,
    refreshToken,
  }
}

export default router
