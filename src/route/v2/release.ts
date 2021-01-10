import express, { Response } from 'express'
import { Request } from '@/types/types'
import db from '@/db/sequelize'
import Release from '@/db/sequelize/models/Release'

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  req.protect?.()
  console.log(db.model('releases'))
  console.log(db.models)
  console.log(db.modelManager)

  // Release.findAll()
  //   .then((response) => console.log(response))
  //   .catch((err) => console.log(err))
})
router.get('/:id', (req: Request, res: Response) => {
  req.protect?.()
})
router.post('/', (req: Request, res: Response) => {
  req.protect?.()
  const data = {
    channel: { name: 'VDUD' },
    video: { title: 'test' },
    guest: { guest: 'Victor Ryabkov' },
    recommendation: { recommendation: 'test' },
  }
  const { channel, video, guest, recommendation } = data
  Release.create({
    channel,
    video,
    guest,
    recommendation,
  })
    .then((response) => {
      console.log(response)
      res.send(response)
    })
    .catch((err) => console.log(err))
})
router.put('/', (req: Request, res: Response) => {
  req.protect?.()
})
router.delete('/', (req: Request, res: Response) => {
  req.protect?.()
})

export default router
