import express, { Response } from 'express'

// eslint-disable-next-line import/no-cycle
import { DI } from '@/app'

// Utils
// import { errorHandler } from '@/'
import { Request } from '@/types/types'
import { Release } from '@/db/entities/Release'
import { wrap } from '@mikro-orm/core'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  req.protect?.()

  const releases = await DI.releaseRepo.findAll(['channel'], {}, 20)
  res.json(releases)
})

router.post('/', async (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400)
    return res.json({ message: 'One of `name, email` is missing' })
  }
  const releaseBody: Release = req.body
  console.log(releaseBody)

  try {
    const release = new Release(releaseBody.channel, releaseBody.video)
    wrap(release).assign(req.body, { em: DI.em })
    await DI.releaseRepo.persist(release).flush()

    res.json(release)
  } catch (e) {
    return res.status(400).json({ message: e.message })
  }
})

export default router
