import { model, Schema } from 'mongoose'

export const DOCUMENT_NAME = 'User'
export const COLLECTION_NAME = 'users'

const userSchema: Schema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
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

export const UserModel = model(DOCUMENT_NAME, userSchema, COLLECTION_NAME)
