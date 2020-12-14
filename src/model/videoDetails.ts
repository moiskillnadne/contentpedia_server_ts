import mongoose, { Schema } from 'mongoose'

const videoDetails: Schema = new Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  channel: {
    name: String,
  },
  video: {
    name: String,
    url: String,
    previewUrl: String,
  },
  guest: {
    name: String,
    age: String || null,
    profession: String || null,
  },
  recommendation: {
    videoContent: [
      {
        type: {
          type: String,
        },
        name: String,
        timecode: String,
        url: String || null,
        comment: String || null,
        tags: String,
      },
    ],
    audioContent: [
      {
        type: {
          type: String,
        },
        name: String,
        timecode: String,
        url: String || null,
        comment: String || null,
        tags: String,
      },
    ],
    textContent: [
      {
        type: {
          type: String,
        },
        name: String,
        timecode: String,
        url: String || null,
        comment: String || null,
        tags: String,
      },
    ],
  },
  timestamp: String,
})

const VideoDetails = mongoose.model('videoDetails', videoDetails)
export default VideoDetails
