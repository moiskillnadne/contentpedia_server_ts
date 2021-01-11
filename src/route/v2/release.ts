import express, { Response } from 'express'
import { Request } from '@/types/types'
import db from '@/db/sequelize'
import Release from '@/db/sequelize/models/Release'

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  req.protect?.()
})
router.get('/:id', (req: Request, res: Response) => {
  req.protect?.()
})
router.post('/', (req: Request, res: Response) => {
  req.protect?.()
})
router.put('/:id', (req: Request, res: Response) => {
  req.protect?.()
})
router.delete('/:id', (req: Request, res: Response) => {
  req.protect?.()
})

export default router
