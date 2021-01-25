import { Requestable } from '@savchenko91/rc-redux-api-mw'
import { ReleaseModel, RecommendationContentModel } from './release'


export type ReleaseState = Requestable & {
  VideoList: ReleaseModel[]
  Video: ReleaseModel | null
  validation: {
    previewLink: string | null
  }
  details?: {
    totalDocs: number
    limit: number
    page: number
    totalPages: number
    pagingCounter: number
    hasPrevPage: boolean
    hasNextPage: boolean
    prevPage: number | null
    nextPage: number | null
  }
}

export type RecommendationContentState = {
  video: RecommendationContentModel[] | []
  audio: RecommendationContentModel[] | []
  text: RecommendationContentModel[] | []
}

export type RootState = {
  releaseState: ReleaseState
  recommendationContentState: RecommendationContentState
}
