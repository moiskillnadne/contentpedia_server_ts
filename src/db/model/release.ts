import { model, Schema } from 'mongoose'
import * as Vmodel from '@/common/types/videoModel'
import { v4 } from 'uuid'

export const DOCUMENT_NAME = 'Release'
export const COLLECTION_NAME = 'releases'

const videoSchema: Schema = new Schema<Vmodel.ReleaseModel>(
  {
    id: {
      type: String,
      default: v4,
      required: true,
    },
    isComplete: {
      type: Boolean,
      required: true,
      default: false,
    },
    channel: {
      title: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
        trim: true,
      },
    },
    video: {
      title: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
        trim: true,
      },
      previewUrl: {
        type: String,
        required: true,
      },
    },
    guest: {
      firstname: {
        type: String,
        required: true,
        trim: true,
      },
      lastname: {
        type: String,
        required: true,
        trim: true,
      },
      middlename: {
        type: String,
        required: true,
        trim: true,
      },
      birthDate: {
        type: String,
        required: true,
        trim: true,
      },
      profession: {
        type: String,
        required: false,
        trim: true,
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
            trim: true,
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
  },
  {
    timestamps: true,
  },
)

export const ReleaseModel = model(DOCUMENT_NAME, videoSchema, COLLECTION_NAME)
