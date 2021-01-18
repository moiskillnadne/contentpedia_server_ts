import { DeepReadonly } from '@/common/types/util.d'

export type ReleaseModel = DeepReadonly<{
   _id?: string
   uuid?: string
   id?: string
  } & RawReleaseModel>

export type RawReleaseModel = DeepReadonly<
  GeneralReleaseModel & {
    recommendation: RecommendationModel
  }
>

export type GeneralReleaseModel = DeepReadonly<{
  isComplete: boolean
  channel: ChannelModel
  video: VideoDetailsModel
  guest: GuestModel
}>

export type ChannelModel = DeepReadonly<{
  title: string
  url: string
}>

export type VideoDetailsModel = DeepReadonly<{
  title: string
  url: string
  previewUrl: string
}>

export type GuestModel = DeepReadonly<{
  firstname: string
  lastname: string
  middlename: string
  birthDate: Date
  profession: string
}>

export type RecommendationModel = DeepReadonly<{
  video: RecommendationContentModel[] | []
  audio: RecommendationContentModel[] | []
  text: RecommendationContentModel[] | []
}>

export type RecommendationContentModel = DeepReadonly<{
  id?: string
  _id?: string
  type: string
  title: string
  timecode: string
  url?: string
  comment?: string
  tags: string
}>
