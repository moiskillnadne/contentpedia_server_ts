import { ReleaseModel } from '@/db/mongo/model/release'
import * as utils from '@/util/urlParser'
import { RecommendationContentState } from '@/common/types/state'
import * as releaseTypes from '@/common/types/release'

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
  public addRelease = async (data: {
    id: string
    isComplete: boolean
    channel: releaseTypes.ChannelModel
    video: releaseTypes.VideoDetailsModel
    guest: releaseTypes.GuestModel
    recommendation: RecommendationContentState
  }) => {
    const videoID = utils.getVideoIDFromUrl(data.video.url)
    const previewUrl = utils.formatterToPreviewLink(videoID)

    const release = new ReleaseModel({ ...data, video: { ...data.video, previewUrl } })

    try {
      return await release.save()
    } catch (err) {
      throw new Error(err)
    }
  }

  // UPDATE
  public updateReleaseByUuid = async (uuid: string, video: releaseTypes.ReleaseModel) => {
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
