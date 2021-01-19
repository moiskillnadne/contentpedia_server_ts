import express, { Response } from 'express'
import { v4 } from 'uuid'

// Utils
import { errorHandler, createPromises } from '@/util/common'
import * as validate from '@/util/validate'
import { formatterToPreviewLink, getVideoIDFromUrl } from '@/util/urlParser'

// Types
import { Request } from '@/types/types'

// Controllers
import MongoReleaseController from '@/db/mongo/controller/Release'
import PostgresReleaseController from '@/db/sequelize/controller/Release'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  req.protect?.()
  try {
    const dbPromise = createPromises(MongoReleaseController.getAllRelease, PostgresReleaseController.getAllRelease)

    const dbResult = await Promise.race(dbPromise)

    res.status(200).json(dbResult)
  } catch (err) {
    errorHandler(err, res, 'Getting items from DB failed!')
  }
})

router.post('/', async (req: Request, res: Response) => {
  req.protect?.()
  const { isComplete, channel, video, guest, recommendation } = req.body

  const errors = await validate.isExist(req.body, ['isComplete', 'channel', 'video', 'guest', 'recommendation'])
  if (errors.length !== 0) res.status(400).json({ err: 'Bad request. Some fields empty', fields: errors })

  const id = v4()

  try {
    const dbPromise = createPromises(MongoReleaseController.addRelease, PostgresReleaseController.addRelease, {
      id,
      isComplete,
      channel,
      video,
      guest,
      recommendation,
    })
    const result = await Promise.all(dbPromise)

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
    const dbPromise = createPromises(
      MongoReleaseController.deleteReleaseByID,
      PostgresReleaseController.deleteReleaseByID,
      id,
    )

    const result = await Promise.all(dbPromise)
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
    const dbPromise = createPromises(
      MongoReleaseController.updateReleaseByID,
      PostgresReleaseController.updateReleaseByID,
      { id, body },
    )

    const result = await Promise.all(dbPromise)

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
    const dbPromise = createPromises(MongoReleaseController.getOneRelease, PostgresReleaseController.getReleaseById, id)

    const video = await Promise.all(dbPromise).then((values) => {
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
