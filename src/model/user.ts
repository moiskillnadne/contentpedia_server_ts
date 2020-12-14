import mongoose, { Schema } from 'mongoose'

const userSchema: Schema = new Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  email: String,
  password: String,
  timestamp: String,
})

const User = mongoose.model('userDetails', userSchema)
export default User
