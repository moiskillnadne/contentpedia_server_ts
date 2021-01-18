import { model, Schema, Document } from 'mongoose'
import { v4 } from 'uuid'

export const DOCUMENT_NAME = 'User'
export const COLLECTION_NAME = 'users'

export default interface User extends Document {
  id: string
  email: string
  password: string
  firstName: string
  lastName: string
  role: string
}

const userSchema: Schema = new Schema(
  {
    id: {
      type: String,
      default: v4,
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
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const UserModel = model<User>(DOCUMENT_NAME, userSchema, COLLECTION_NAME)
