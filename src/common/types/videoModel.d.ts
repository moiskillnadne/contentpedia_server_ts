import { DeepReadonly } from '@/common/types/util.d'

export type ReleaseModel = DeepReadonly<{ _id: string } & RawReleaseModel>
export type RawReleaseModel = DeepReadonly<
  GeneralReleaseModel & {
    recommendation: RecommendationModel
  }
>

export type GeneralReleaseModel = DeepReadonly<{
  channel: ChannelModel
  video: VideoDetailsModel
  guest: GuestModel
}>

export type ChannelModel = DeepReadonly<{
  name: string
}>

export type VideoDetailsModel = DeepReadonly<{
  name: string
  url: string
  previewUrl: string
}>

export type GuestModel = DeepReadonly<{
  name: string
  age?: string
  profession?: string
}>

export type RecommendationModel = DeepReadonly<{
  video: RecommendationContentModel[] | []
  audio: RecommendationContentModel[] | []
  text: RecommendationContentModel[] | []
}>

export type RecommendationContentModel = DeepReadonly<{
  id: string
  type: string
  title: string
  timecode: string
  url?: string
  comment?: string
  tags: string
}>
