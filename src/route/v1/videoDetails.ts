import express, { Response } from 'express'

// Utils
import { VideoModel } from '@/db/model/videoDetails'
import videoItemCreator from '@/util/videoItemCreator'
import { errorHandler } from '@/util/common'
import { formatterToPreviewLink, getVideoIDFromUrl } from '@/util/urlParser'
import { Request } from '@/types/types'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  req.protect?.()
  try {
    const dbResult = await VideoModel.find().exec()
    if (!dbResult.length) res.status(204).json({ msg: 'Is empty!' })

    res.status(200).json(dbResult)
  } catch (err) {
    errorHandler(err, res, 'Getting items from DB failed!')
  }
})

router.post('/', async (req: Request, res: Response) => {
  req.protect?.()
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
  req.protect?.()
  const { id } = req.params
  try {
    const result = await VideoModel.remove({ _id: id }).exec()
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

  try {
    const result = await VideoModel.updateOne({ _id: id }, { $set: { ...body } })
    if (result.ok) {
      const video = await VideoModel.findById(id).exec()
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
  req.protect?.()
  const { id } = req.params
  try {
    const video = await VideoModel.findById(id).exec()
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
    console.info(videoLink)
    res.status(404).json({
      msg: 'Video link is empty!',
    })
  }

  const id = getVideoIDFromUrl(videoLink)
  const previewLink = formatterToPreviewLink(id)
  res.status(200).json(previewLink)
})

export default router
