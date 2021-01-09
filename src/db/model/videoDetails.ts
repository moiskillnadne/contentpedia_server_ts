import { model, Schema, SchemaTypes } from 'mongoose'
import * as Vmodel from '@/common/types/videoModel'

export const DOCUMENT_NAME = 'Video'
export const COLLECTION_NAME = 'videodetails'

const videoSchema: Schema = new Schema<Vmodel.ReleaseModel>({
  _id: SchemaTypes.ObjectId,
  channel: {
    name: {
      type: String,
      required: true,
    },
  },
  video: {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    previewUrl: {
      type: String,
      required: true,
    },
  },
  guest: {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: false,
    },
    profession: {
      type: String,
      required: false,
    },
  },
  recommendation: {
    video: [
      {
        type: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        timecode: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: false,
        },
        comment: {
          type: String,
          required: false,
        },
        tags: {
          type: String,
          required: true,
        },
      },
    ],
    audio: [
      {
        type: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        timecode: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: false,
        },
        comment: {
          type: String,
          required: false,
        },
        tags: {
          type: String,
          required: true,
        },
      },
    ],
    text: [
      {
        type: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        timecode: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: false,
        },
        comment: {
          type: String,
          required: false,
        },
        tags: {
          type: String,
          required: true,
        },
      },
    ],
  },
  timestamp: String,
})

export const VideoModel = model(DOCUMENT_NAME, videoSchema, COLLECTION_NAME)
