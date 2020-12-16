import mongoose from 'mongoose'
import VideoDetailsSchema from '@/db/model/videoDetails'
import { DateTime } from 'luxon'
import * as utils from '@/util/urlParser'
import { ChannelModel, VideoModel, GuestModel, RecommendationModel } from '@/types/video'

export default function videoItemCreator(
  channel: ChannelModel,
  video: VideoModel,
  guest: GuestModel,
  recommendation: RecommendationModel,
) {
  const videoID = utils.getVideoIDFromUrl(video.url)

  return new VideoDetailsSchema({
    _id: new mongoose.Types.ObjectId(),
    channel: {
      name: channel.name,
    },
    video: {
      name: video.name,
      url: video.url,
      previewUrl: utils.formatterToPreviewLink(videoID),
    },
    guest: {
      name: guest.name,
      age: guest.age || null,
      profession: guest.profession || null,
    },
    recommendation: {
      videoContent: recommendation.videoContent,
      audioContent: recommendation.audioContent,
      textContent: recommendation.textContent,
    },
    timestamp: DateTime.local().setZone('Europe/Moscow').toFormat('dd.MM.yyyy'),
  })
}
