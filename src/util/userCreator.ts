import mongoose from 'mongoose'
import { UserModel } from '@/db/model/user'
import { DateTime } from 'luxon'

export default function userCreator(email: string, password: string) {
  return new UserModel({
    _id: new mongoose.Types.ObjectId(),
    email,
    password,
    timestamp: DateTime.local().setZone('Europe/Moscow').toFormat('dd.MM.yyyy'),
  })
}
