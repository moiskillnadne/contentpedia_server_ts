import express, { Response } from 'express'
import * as jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { v4 } from 'uuid'

// Utils
import { errorHandler, hashPassword, createPromises } from '@/util/common'
import * as validate from '@/util/validate'

// Types
import { User } from '@/common/types/auth'
import { Request } from '@/types/types'

// Controllers
import PostgresUserController from '@/db/sequelize/controller/User'
import MongoUserController from '@/db/mongo/controller/User'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const dbPromises = createPromises(MongoUserController.getAllUser, PostgresUserController.getAllUser)
    const users = await Promise.race(dbPromises)

    res.send(users)
  } catch (err) {
    errorHandler(err, res, 'Cant get user from DB..')
  }
})

router.post('/getOneUser', async (req: Request, res: Response) => {
  const { email } = req.body
  const errors = await validate.isExist({ email }, ['email'])
  if (errors.length !== 0) res.status(400).json({ err: 'Bad request. Some fields empty', fields: errors })

  try {
    const dbPromises = createPromises(MongoUserController.getUserBy, PostgresUserController.getUserBy, {
      props: 'email',
      value: email,
    })
    const user = await Promise.race(dbPromises)
    res.status(200).json(user)
  } catch (err) {
    errorHandler(err, res, 'Cant to find user with props!')
  }
})

router.post('/', async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, role } = req.body

    const errors = await validate.isExist(req.body, ['email', 'password', 'firstName', 'lastName', 'role'])
    if (errors.length !== 0) res.status(400).json({ err: 'Bad request. Some fields empty', fields: errors })

    const hashedPass = await hashPassword(password)
    const id = v4()

    const dbPromises = createPromises(MongoUserController.addUser, PostgresUserController.addUser, {
      id,
      email,
      password: hashedPass,
      firstName,
      lastName,
      role,
    } as User)
    const result = await Promise.all(dbPromises)

    res.status(200).json({ msg: 'User was added.', result })
  } catch (err) {
    errorHandler(err, res, 'Unable to save new user!')
  }
})

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const errors = await validate.isExist({ email, password }, ['email', 'password'])
    if (errors.length !== 0) res.status(400).json({ err: 'Bad request. Some fields empty', fields: errors })

    const dbPromise = createPromises(MongoUserController.getUserBy, PostgresUserController.getUserBy, {
      props: 'email',
      value: email,
    })

    const user = (await Promise.race(dbPromise)) as { db: string; data: User }

    if (!user) res.status(401).json({ msg: 'User is not exist!' })
    const isCompare = bcrypt.compareSync(password, user?.data?.password)
    if (!isCompare) res.status(401).json({ msg: 'Password incorrect!' })

    const tokens = generateJWT((user.data?._id || user?.data?.id) as string)

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
  const { id, props, value } = req.body
  const errors = await validate.isExist(req.body, ['id', 'props', 'value'])
  if (errors.length !== 0) res.status(400).json({ err: 'Bad request. Some fields empty', fields: errors })

  try {
    const dbPromise = createPromises(MongoUserController.updateUserByID, PostgresUserController.updateUserByID, {
      id,
      props,
      value,
    })

    const result = await Promise.all(dbPromise)

    res.status(200).json({ msg: 'Item was successfully updated!', result })
  } catch (err) {
    errorHandler(err, res, 'Cant update item!')
  }
})

router.delete('/', async (req: Request, res: Response) => {
  const { id } = req.body
  const errors = await validate.isExist(req.body, ['id'])
  if (errors.length !== 0) res.status(400).json({ err: 'Bad request. Some fields empty', fields: errors })

  try {
    const dbPromise = createPromises(MongoUserController.deleteUserByID, PostgresUserController.deleteUserByID, { id })

    const result = await Promise.all(dbPromise)
    res.status(200).json({ msg: 'Successfully deleted!', data: result })
  } catch (err) {
    errorHandler(err, res, 'Cant delete users!')
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
