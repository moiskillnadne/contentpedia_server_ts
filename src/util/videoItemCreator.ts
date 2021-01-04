import mongoose from 'mongoose'
import { VideoModel } from '@/db/model/videoDetails'
import { DateTime } from 'luxon'
import * as utils from '@/util/urlParser'
import * as model from '@/common/types/videoModel'

export default function videoItemCreator(
  channel: model.ChannelModel,
  video: model.VideoDetailsModel,
  guest: model.GuestModel,
  recommendation: model.RecommendationModel,
) {
  const videoID = utils.getVideoIDFromUrl(video.url)

  return new VideoModel({
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
      video: recommendation.video,
      audio: recommendation.audio,
      text: recommendation.text,
    },
    timestamp: DateTime.local().setZone('Europe/Moscow').toFormat('dd.MM.yyyy'),
  })
}
