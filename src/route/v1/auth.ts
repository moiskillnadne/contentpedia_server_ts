import express, { Response } from 'express'
import * as jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

// Utils
import { UserModel } from '@/db/model/user'
import { Request } from '@/types/types'
import { errorHandler } from '@/util/common'

const router = express.Router()

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body
  let user

  try {
    user = await UserModel.findOne({ email }).exec()
  } catch (err) {
    errorHandler(err, res, 'Connection with DB lost!')
  }

  if (!user) res.status(401).json({ msg: 'User is not exist!' })
  const isCompare = await bcrypt.compareSync(password, user?.get('password'))
  if (!isCompare) res.status(401).json({ msg: 'Password incorrect!' })

  const tokens = generateJWT(user?.get('_id'))

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

// async function hashPassword(password: any) {
//   const salt = await bcrypt.genSalt(10)
//   const hash = await bcrypt.hash(password, salt)
//   console.log(hash)
// }

export default router
