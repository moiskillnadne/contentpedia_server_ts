import { Release } from '@/db/sequelize/models/Release'
import * as utils from '@/util/urlParser'
import { RecommendationContentState } from '@/common/types/state'
import * as releaseTypes from '@/common/types/release'

class PostgresReleaseController {
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

    try {
      const release = await Release.create({ ...data, video: { ...data.video, previewUrl } })
      return await release.save()
    } catch (err) {
      throw new Error(err)
    }
  }

  public getAllRelease = async () => {
    try {
      return await Release.findAll()
    } catch (err) {
      throw new Error(err)
    }
  }

  public getReleaseById = async (id: string) => {
    try {
      return await Release.findOne({
        where: {
          id,
        },
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  public deleteReleaseByID = async (id: string) => {
    try {
      return await Release.destroy({
        where: { id },
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  public updateReleaseByID = async (data: { id: string; release: releaseTypes.ReleaseModel }) => {
    try {
      return await Release.update({ ...data.release }, { where: { id: data.id } })
    } catch (err) {
      throw new Error(err)
    }
  }
}

export default new PostgresReleaseController()
