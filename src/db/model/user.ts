import { model, Schema, Document, SchemaTypes } from 'mongoose'

export const DOCUMENT_NAME = 'User'
export const COLLECTION_NAME = 'users'

export default interface User extends Document {
  _id: string
  email: string
  password: string
  timestamp: string
}

const userSchema: Schema = new Schema({
  _id: {
    type: SchemaTypes.ObjectId,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    maxlength: 75,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  timestamp: {
    type: String,
    required: true,
  },
})

export const UserModel = model<User>(DOCUMENT_NAME, userSchema, COLLECTION_NAME)
