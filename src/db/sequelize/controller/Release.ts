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
      const res = await release.save()
      return res
    } catch (err) {
      throw new Error(err)
    }
  }

  public getAllRelease = async () => {
    try {
      const release = await Release.findAll()
      return release
    } catch (err) {
      throw new Error(err)
    }
  }

  public getReleaseById = async (id: string) => {
    try {
      const release = await Release.findOne({
        where: {
          id,
        },
      })
      return release
    } catch (err) {
      throw new Error(err)
    }
  }

  public deleteOneReleaseByUuid = async (uuid: string) => {
    try {
      const result = await Release.destroy({
        where: { uuid },
      })
      return result
    } catch (err) {
      throw new Error(err)
    }
  }

  public updateReleaseByUuid = async (uuid: string, release: releaseTypes.ReleaseModel) => {
    try {
      const result = await Release.update({ ...release }, { where: { uuid } })
      return result
    } catch (err) {
      throw new Error(err)
    }
  }
}

export default new PostgresReleaseController()
