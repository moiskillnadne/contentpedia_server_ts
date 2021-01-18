import express, { Response } from 'express'

// Utils
import { errorHandler } from '@/util/common'
import * as validate from '@/util/validate'
import { formatterToPreviewLink, getVideoIDFromUrl } from '@/util/urlParser'
import { Request } from '@/types/types'
import MongoReleaseController from '@/db/mongo/controller/Release'
import PostgresReleaseController from '@/db/sequelize/controller/Release'
import { v4 } from 'uuid'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  req.protect?.()
  try {
    const postgresPromise = new Promise((resolve) => {
      resolve(
        PostgresReleaseController.getAllRelease().then((result) => ({
          db: 'postgres',
          data: result,
        })),
      )
    })
    const mongoPromise = new Promise((resolve) => {
      resolve(MongoReleaseController.getAllRelease().then((result) => ({ db: 'Mongo', data: result })))
    })
    const dbResult = await Promise.race([postgresPromise, mongoPromise])

    res.status(200).json(dbResult)
  } catch (err) {
    errorHandler(err, res, 'Getting items from DB failed!')
  }
})

router.post('/', async (req: Request, res: Response) => {
  req.protect?.()
  const { isComplete, channel, video, guest, recommendation } = req.body
  const uuid = v4()

  const errors = await validate.isExist(req.body, ['isComplete', 'channel', 'video', 'guest', 'recommendation'])
  if (errors.length !== 0) res.status(400).json({ err: 'Bad request. Some fields empty', fields: errors })

  try {
    const postgresPromise = new Promise((resolve) => {
      resolve(
        PostgresReleaseController.addRelease(uuid, isComplete, channel, video, guest, recommendation).then((result) => ({
          db: 'Postgres',
          data: result,
        })),
      )
    })
    const mongoPromise = new Promise((resolve) => {
      resolve(
        MongoReleaseController.addRelease(uuid, isComplete, channel, video, guest, recommendation).then((result) => ({
          db: 'Mongo',
          data: result,
        })),
      )
    })
    const result = await Promise.all([postgresPromise, mongoPromise])

    res.status(200).json({
      msg: 'Saved successful!',
      success: result,
    })
  } catch (err) {
    errorHandler(err, res, 'Saving to DB failed!')
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  req.protect?.()
  const { id } = req.params
  const errors = await validate.isExist({ id }, ['id'])
  if (errors.length !== 0) res.status(400).json({ err: 'Bad request. Some fields empty', fields: errors })

  try {
    const postgresPromise = new Promise((resolve) => {
      resolve(
        PostgresReleaseController.deleteOneReleaseByUuid(id).then((result) => ({
          db: 'Postgres',
          data: result,
        })),
      )
    })
    const mongoPromise = new Promise((resolve) => {
      resolve(
        MongoReleaseController.deleteReleaseByUuid(id).then((result) => ({
          db: 'Mongo',
          data: result,
        })),
      )
    })

    const result = await Promise.all([postgresPromise, mongoPromise])
    res.status(200).json({
      msg: 'Removed successful!',
      success: result,
    })
  } catch (err) {
    errorHandler(err, res, 'Removing from DB failed!')
  }
})

router.put('/:id', async (req: Request, res: Response) => {
  req.protect?.()
  const { id } = req.params
  const { body } = req

  const errors = await validate.isExist({ id, ...body }, [
    'id',
    'isComplete',
    'channel',
    'video',
    'guest',
    'recommendation',
  ])
  if (errors.length !== 0) res.status(400).json({ err: 'Bad request. Some fields empty', fields: errors })

  try {
    const mongoPromise = new Promise((resolve) => {
      resolve(
        MongoReleaseController.updateReleaseByUuid(id, body).then((result) => ({
          db: 'Mongo',
          data: result,
        })),
      )
    })
    const postgresPromise = new Promise((resolve) => {
      resolve(
        PostgresReleaseController.updateReleaseByUuid(id, body).then((result) => ({
          db: 'Postgres',
          data: result,
        })),
      )
    })

    const result = await Promise.all([mongoPromise, postgresPromise])

    // const video = await MongoHandler.getOneRelease(id)
    res.status(200).json({
      msg: 'Successfuly updated!',
      status: result,
    })
  } catch (err) {
    errorHandler(err, res, 'Item updating failed!')
  }
})

router.get('/:id', async (req: Request, res: Response) => {
  req.protect?.()
  const { id } = req.params
  const errors = await validate.isExist({ id }, ['id'])
  if (errors.length !== 0) res.status(400).json({ err: 'Bad request. Some fields empty', fields: errors })

  try {
    const postgresPromise = new Promise((resolve) => {
      resolve(
        PostgresReleaseController.getReleaseById(id).then((result) => ({
          db: 'Postgres',
          data: result,
        })),
      )
    })
    const mongoPromise = new Promise((resolve) => {
      resolve(
        MongoReleaseController.getOneRelease(id).then((result) => ({
          db: 'Mongo',
          data: result,
        })),
      )
    })
    const video = await Promise.all([postgresPromise, mongoPromise]).then((values) => {
      const releases = values.filter((item: any) => item.data !== null)
      return releases[0]
    })
    if (!video) res.status(204).json({ msg: 'Is empty!' })
    res.status(200).json(video)
  } catch (err) {
    errorHandler(err, res, 'Getting item by ID failed!')
  }
})

router.post('/getPreviewLink', (req: Request, res: Response) => {
  req.protect?.()
  const { videoLink } = req.body
  if (!videoLink) {
    res.status(404).json({
      msg: 'Video link is empty!',
    })
  }

  const id = getVideoIDFromUrl(videoLink)
  const previewLink = formatterToPreviewLink(id)
  res.status(200).json(previewLink)
})

export default router
