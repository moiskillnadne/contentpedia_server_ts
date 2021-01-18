import { ReleaseModel } from '@/db/mongo/model/release'
import * as utils from '@/util/urlParser'
import { RecommendationContentState } from '@/common/types/state'
import * as release from '@/common/types/release'

class MongoReleaseController {

  // GET
  public getAllRelease = async () => {
    try {
      const result = await ReleaseModel.find().exec()
      return result
    } catch (err) {
      throw new Error(err)
    }
  }
  public getOneRelease = async (id: string) => {
    try {
      const result = await ReleaseModel.findOne({ id }).exec()
      return result
    } catch (err) {
      throw new Error(err)
    }
  }

  // POST
  public addRelease = async (
    uuid: string,
    isComplete: boolean,
    channel: release.ChannelModel,
    video: release.VideoDetailsModel,
    guest: release.GuestModel,
    recommendation: RecommendationContentState,
  ) => {
    const videoID = utils.getVideoIDFromUrl(video.url)
    const previewUrl = utils.formatterToPreviewLink(videoID)

    const release = new ReleaseModel({
      uuid,
      isComplete,
      channel: {
        title: channel.title,
        url: channel.url,
      },
      video: {
        title: video.title,
        url: video.url,
        previewUrl,
      },
      guest: {
        firstname: guest.firstname,
        lastname: guest.lastname,
        middlename: guest.middlename,
        birthDate: guest.birthDate,
        profession: guest.profession,
      },
      recommendation: {
        video: recommendation.video,
        audio: recommendation.audio,
        text: recommendation.text,
      },
    })

    try {
      const result = await release.save()
      return result
    } catch (err) {
      throw new Error(err)
    }
  }

  // UPDATE
  public updateReleaseByUuid = async (uuid: string, video: release.ReleaseModel) => {
    const result = await ReleaseModel.updateOne({ uuid }, { ...video }, {}, (err, res) => {
      if (err) throw new Error(err)
      return res
    }).exec()
    return result
  }


  // DELETE
  public deleteReleaseByUuid = async (uuid: string) => {
    try {
      const result = await ReleaseModel.deleteOne({ uuid }).exec()
      return result
    } catch (err) {
      throw new Error()
    }
  }


}

export default new MongoReleaseController()
