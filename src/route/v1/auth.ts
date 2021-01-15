import express, { Response } from 'express'
import * as jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

// Utils
import { Request } from '@/types/types'
import { errorHandler, hashPassword } from '@/util/common'
import * as validate from '@/util/validate'
import PostgresHandler from '@/db/PostgresHandler'
import MongoHandler from '@/db/MongoHandler'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await PostgresHandler.getAllUser()
    res.send(users)
  } catch (err) {
    console.error(err)
  }
})

router.post('/', async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, role } = req.body

    const errors = await validate.isExist(req.body, ['email', 'password', 'firstName', 'lastName', 'role'])
    if (errors.length !== 0) res.status(400).json({ err: 'Bad request. Some fields empty', fields: errors })

    const hashedPass = await hashPassword(password)

    await MongoHandler.addUser({ email, password: hashedPass, firstName, lastName, role })
    await PostgresHandler.addUser({ email, password: hashedPass, firstName, lastName, role })

    res.status(200).json({ msg: 'User was added.' })
  } catch (err) {
    errorHandler(err, res, 'Unable to save new user!')
  }
})

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const errors = await validate.isExist({ email, password }, ['email', 'password'])
    if (errors.length !== 0) res.status(400).json({ err: 'Bad request. Some fields empty', fields: errors })

    let user

    // Try to get user from Mongo
    user = await MongoHandler.getOneUserBy('email', email)

    // If Mongo result is empty, try get user from Postgres
    if (!user) {
      user = await PostgresHandler.getOneUserBy('email', email)
    }

    if (!user) res.status(401).json({ msg: 'User is not exist!' })
    const isCompare = await bcrypt.compareSync(password, user?.get('password'))
    if (!isCompare) res.status(401).json({ msg: 'Password incorrect!' })

    const tokens = generateJWT(user?.get('_id' || 'id') as string)

    res.status(200).json(tokens)
  } catch (err) {
    errorHandler(err, res, 'Connection with DB lost!')
  }
})

router.post('/refresh', async (req: Request, res: Response) => {
  req.protect?.()
  const tokens = generateJWT('123')

  res.status(200).json(tokens)
})

router.post('/update', async (req: Request, res: Response) => {
  const { id, type, props, value } = req.body
  const errors = await validate.isExist(req.body, ['id', 'type', 'props', 'value'])
  if (errors.length !== 0) res.status(400).json({ err: 'Bad request. Some fields empty', fields: errors })

  try {
    switch (type) {
      case 'mongo':
        await MongoHandler.updateOneUserField(id, props, value)
        break
      case 'postgres':
        await PostgresHandler.updateOneUserField(id, props, value)
        break
      default:
        res.status(400).json({ msg: 'Bad request. Invalid type!' })
        break
    }

    res.status(200).json({ msg: 'Item was successfully updated!' })
  } catch (err) {
    errorHandler(err, res, 'Cant update item!')
  }
})

function generateJWT(id: string) {
  const today = new Date()
  const expirationDate = new Date(today)
  expirationDate.setDate(today.getDate() + 60)

  const token = jwt.sign({ id }, process.env.JWT_SECRET || '', { expiresIn: `${60000 * 10}ms` })
  const refreshToken = jwt.sign({ id }, process.env.JWT_SECRET || '', { expiresIn: '37d' })

  return {
    token,
    refreshToken,
  }
}

export default router
