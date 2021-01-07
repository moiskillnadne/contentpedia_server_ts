import { Requestable } from '@savchenko91/rc-redux-api-mw'
import { ReleaseModel, RecommendationContentModel } from './videoModel.d'

type UserModel = {
  _id: string
  email: string
  password: string
  timestamp: string
}

export type UserState = Requestable & {
  UserList: UserModel[]
}

export type ReleaseState = Requestable & {
  VideoList: ReleaseModel[]
  Video: ReleaseModel | null
  validation: {
    previewLink: string | null
  }
}

export type RecommendationContentState = {
  video: RecommendationContentModel[] | []
  audio: RecommendationContentModel[] | []
  text: RecommendationContentModel[] | []
}

export type RootState = {
  userState: UserState
  releaseState: ReleaseState
  recommendationContentState: RecommendationContentState
}
