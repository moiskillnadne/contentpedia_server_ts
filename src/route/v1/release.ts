import express, { Response } from 'express'

// Utils
import { errorHandler } from '@/util/common'
import * as validate from '@/util/validate'
import { formatterToPreviewLink, getVideoIDFromUrl } from '@/util/urlParser'
import { Request } from '@/types/types'
import MongoHandler from '@/db/MongoHandler'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  req.protect?.()
  try {
    const dbResult = await MongoHandler.getAllRelease()
    if (!dbResult.length) res.status(204).json({ msg: 'Is empty!' })

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

  try {
    const result = await MongoHandler.addRelease(isComplete, channel, video, guest, recommendation)
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
    const result = await MongoHandler.deleteReleaseByID(id)
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
    const result = await MongoHandler.updateReleaseByID(id, body)

    const video = await MongoHandler.getOneRelease(id)
    res.status(200).json({
      status: result.ok,
      msg: 'Successfuly updated!',
      modifiedItem: video,
    })
  } catch (err) {
    errorHandler(err, res, 'Item updating failed!')
  }
})

router.get('/getOne/:id', async (req: Request, res: Response) => {
  req.protect?.()
  const { id } = req.params
  const errors = await validate.isExist({ id }, ['id'])
  if (errors.length !== 0) res.status(400).json({ err: 'Bad request. Some fields empty', fields: errors })

  try {
    const video = await MongoHandler.getOneRelease(id)
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
