import express, { Response } from 'express'
import { v4 } from 'uuid'
import { body, validationResult, param } from 'express-validator'

// Utils
import { errorHandler } from '@/util/common'
import { formatterToPreviewLink, getVideoIDFromUrl } from '@/util/urlParser'

// Types
import { Request } from '@/types/types'
import { channelBlockOption } from '@/common/constants/options'

// Controllers
import MongoReleaseController from '@/db/mongo/controller/Release'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  req.protect?.()
  try {
    const result = await MongoReleaseController.getAllRelease()
    res.status(200).json({ data: result, dataCount: result.length })
  } catch (err) {
    errorHandler(err, res, 'Getting items from DB failed!')
  }
})

router.post('/page/:page', param('page', 'Not exist'), async (req: Request, res: Response) => {
  req.protect?.()
  const { page } = req.params

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const result = await MongoReleaseController.getReleasePerPage(Number(page))
    res.status(200).json(result)
  } catch (err) {
    errorHandler(err, res, 'Getting items from DB failed!')
  }
})

router.post('/completed/page/:page', param('page', 'Not exist'), async (req: Request, res: Response) => {
  req.protect?.()
  const { page } = req.params

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const result = await MongoReleaseController.getCompletedPerPage(Number(page))
    res.status(200).json(result)
  } catch (err) {
    errorHandler(err, res, 'Getting items from DB failed!')
  }
})

router.post('/inprocess/page/:page', param('page', 'Not exist'), async (req: Request, res: Response) => {
  req.protect?.()
  const { page } = req.params

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const result = await MongoReleaseController.getInprocessPerPage(Number(page))
    res.status(200).json(result)
  } catch (err) {
    errorHandler(err, res, 'Getting items from DB failed!')
  }
})

router.post(
  '/',
  body('isComplete').exists().withMessage('Field is empty').isBoolean().withMessage('Field should be true or false'),
  body('channel').exists().withMessage('Field is empty'),
  body('video').exists().withMessage('Field is empty'),
  body('guest').exists().withMessage('Field is empty'),
  body('recommendation').exists().withMessage('Field is empty'),
  async (req: Request, res: Response) => {
    req.protect?.()
    const { isComplete, channel, video, guest, recommendation } = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const id = v4()
    const option = channelBlockOption.filter((item) => item.text === channel.title)
    const modifiedChannel = { ...channel, url: option[0].value }

    try {
      const result = await MongoReleaseController.addRelease({
        id,
        isComplete,
        channel: modifiedChannel,
        video,
        guest,
        recommendation,
      })

      res.status(200).json({
        msg: 'Saved successful!',
        success: result,
      })
    } catch (err) {
      errorHandler(err, res, 'Saving to DB failed!')
    }
  },
)

router.delete('/:id', param('id', 'Please provide ID!'), async (req: Request, res: Response) => {
  req.protect?.()
  const { id } = req.params
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const result = await MongoReleaseController.deleteReleaseByID(id)
    res.status(200).json({
      msg: 'Removed successful!',
      success: result,
    })
  } catch (err) {
    errorHandler(err, res, 'Removing from DB failed!')
  }
})

router.put(
  '/:id',
  param('id', 'Please provide ID!'),
  body('isComplete').exists().withMessage('Field is empty').isBoolean().withMessage('Field should be true or false'),
  body('channel').exists().withMessage('Field is empty'),
  body('video').exists().withMessage('Field is empty'),
  body('guest').exists().withMessage('Field is empty'),
  body('recommendation').exists().withMessage('Field is empty'),
  async (req: Request, res: Response) => {
    req.protect?.()
    const { id } = req.params
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const result = await MongoReleaseController.updateReleaseByID({ id, release: { ...req.body } })

      res.status(200).json({
        msg: 'Successfuly updated!',
        status: result,
      })
    } catch (err) {
      errorHandler(err, res, 'Item updating failed!')
    }
  },
)

router.get('/:id', async (req: Request, res: Response) => {
  req.protect?.()
  const { id } = req.params

  try {
    const result = await MongoReleaseController.getOneRelease(id)
    if (!result) res.status(204).json({ msg: 'Is empty!' })
    res.status(200).json(result)
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
