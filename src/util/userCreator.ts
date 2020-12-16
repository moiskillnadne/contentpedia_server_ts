import mongoose from 'mongoose'
import UserDetailsSchema from '@/db/model/user'
import { DateTime } from 'luxon'

export default function userCreator(email: string, password: string) {
  return new UserDetailsSchema({
    _id: new mongoose.Types.ObjectId(),
    email,
    password,
    timestamp: DateTime.local().setZone('Europe/Moscow').toFormat('dd.MM.yyyy'),
  })
}
