import express, { Request, Response } from 'express'
import VideoDetailsSchema from '@/model/videoDetails'

import videoItemCreator from '@/util/videoItemCreator'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const dbResult = await VideoDetailsSchema.find().exec()
    if (!dbResult.length) res.status(204).json({ msg: 'Is empty!' })

    res.status(200).json(dbResult)
  } catch (err) {
    throw new Error(`Getting items from DB failed! ${err.toString()}`)
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
    throw new Error(`Saving to DB failed! ${err.toString()}`)
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params.testItemId
  try {
    const result = await VideoDetailsSchema.remove({ _id: id }).exec()
    res.status(200).json({
      msg: 'Removed successful!',
      success: result,
    })
  } catch (err) {
    throw new Error(`Removing from DB failed! ${err.toString()}`)
  }
})

router.put('/:id', async (req, res) => {
  const id = req.params.testItemId
  const { body } = req

  // eslint-disable-next-line no-console
  console.log(body)

  try {
    const videoDetails = await VideoDetailsSchema.findOneAndUpdate({ _id: id }, body, { upsert: true }, function (
      err,
      doc,
    ) {
      // eslint-disable-next-line no-console
      console.log(err)
      // eslint-disable-next-line no-console
      console.log(doc)
      return 'ready'
    })
  } catch (err) {
    throw new Error(`Item updating failed! ${err.toString()}`)
  }

  res.status(200)
})

export default router
