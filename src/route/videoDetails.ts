import express, { Request, Response } from 'express'
import VideoDetailsSchema from '@/model/videoDetails'

import videoItemCreator from '@/util/videoItemCreator'
import { errorHandler } from '@/util/common'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const dbResult = await VideoDetailsSchema.find().exec()
    if (!dbResult.length) res.status(204).json({ msg: 'Is empty!' })

    res.status(200).json(dbResult)
  } catch (err) {
    errorHandler(err, res, 'Getting items from DB failed!')
  }
})

router.post('/', async (req: Request, res: Response) => {
  const { channel, video, guest, recommendation } = req.body

  try {
    const videoDetails = videoItemCreator(channel, video, guest, recommendation)
    const result = await videoDetails.save()
    res.status(200).json({
      msg: 'Saved successful!',
      success: result,
    })
  } catch (err) {
    errorHandler(err, res, 'Saving to DB failed!')
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const result = await VideoDetailsSchema.remove({ _id: id }).exec()
    res.status(200).json({
      msg: 'Removed successful!',
      success: result,
    })
  } catch (err) {
    errorHandler(err, res, 'Removing from DB failed!')
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { body } = req

  try {
    const result = await VideoDetailsSchema.updateOne({ _id: id }, { $set: { ...body } })
    if (result.ok) {
      const video = await VideoDetailsSchema.findById(id).exec()
      res.status(200).json({
        msg: 'Successfuly updated!',
        modifiedItem: video,
      })
    }
  } catch (err) {
    errorHandler(err, res, 'Item updating failed!')
  }
})

router.get('/getOne/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const video = await VideoDetailsSchema.findById(id).exec()
    if (!video) res.status(204).json({ msg: 'Is empty!' })
    res.status(200).json(video)
  } catch (err) {
    errorHandler(err, res, 'Getting item by ID failed!')
  }
})

export default router
