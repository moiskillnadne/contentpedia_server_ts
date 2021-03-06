export type ChannelModel = {
  name: string
}

export type GuestModel = {
  name: string
  age?: string
  profession?: string
}

export type VideoModelType = {
  name: string
  url: string
}

export type RecommendationModel = {
  videoContent: ContentModel[]
  audioContent: ContentModel[]
  textContent: ContentModel[]
}

export type ContentModel = {
  type: string
  title: string
  timecode: string
  url: string
  comment?: string
  tags: string
}
