import { model, Schema, Document, SchemaTypes, Types } from 'mongoose'

export const DOCUMENT_NAME = 'Video'
export const COLLECTION_NAME = 'videos'

export default interface Video extends Document {
  _id: Types.ObjectId
  channel: {
    name: string
  }
  video: {
    name: string
    url: string
    previewUrl: string
  }
  guest: {
    name: string
    age: string
    profession: string
  }
  recommendation: {
    videoContent: [
      {
        type: {
          type: string
        }
        name: string
        timecode: string
        url: string
        comment: string
        tags: string
      },
    ]
    audioContent: [
      {
        type: {
          type: string
        }
        name: string
        timecode: string
        url: string
        comment: string
        tags: string
      },
    ]
    textContent: [
      {
        type: {
          type: string
        }
        name: string
        timecode: string
        url: string
        comment: string
        tags: string
      },
    ]
  }
  timestamp: string
}

const videoSchema: Schema = new Schema({
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
    videoContent: [
      {
        type: {
          type: String,
          required: true,
        },
        name: {
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
    audioContent: [
      {
        type: {
          type: String,
          required: true,
        },
        name: {
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
    textContent: [
      {
        type: {
          type: String,
          required: true,
        },
        name: {
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
