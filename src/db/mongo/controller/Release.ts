import { ReleaseModel } from '@/db/mongo/model/release'
import * as utils from '@/util/urlParser'
import { RecommendationContentState } from '@/common/types/state'
import * as releaseTypes from '@/common/types/release'

class MongoReleaseController {
  // GET
  public getAllRelease = async () => {
    try {
      return await ReleaseModel.find().exec()
    } catch (err) {
      throw new Error(err)
    }
  }

  public getOneRelease = async (id: string) => {
    try {
      return await ReleaseModel.findOne({ id }).exec()
    } catch (err) {
      throw new Error(err)
    }
  }

  public getReleasePerPage = async (page: number) => {
    const query = {}
    const result = await ReleaseModel.paginate(query, { page, limit: 20 }, (err, res) => {
      if (err) throw new Error(err)
      return res
    })
    return result
  }

  public getCompletedPerPage = async (page: number, searchQuery?: { props: string; value: string }) => {
    let query: Record<string, string | boolean | Record<string, string>>
    query = { isComplete: true }
    if (searchQuery?.props) {
      const reg = { [searchQuery.props]: { $regex: searchQuery.value, $options: 'gi' } }
      query = { ...query, ...reg }
    }
    const result = await ReleaseModel.paginate(query, { page, limit: 20 }, (err, res) => {
      if (err) throw new Error(err)
      return res
    })
    return result
  }

  public getInprocessPerPage = async (page: number, searchQuery?: { props: string; value: string }) => {
    let query: Record<string, string | boolean | Record<string, string>>
    query = { isComplete: false }
    if (searchQuery?.props) {
      const reg = { [searchQuery.props]: { $regex: searchQuery.value, $options: 'gi' } }
      query = { ...query, ...reg }
    }
    const result = await ReleaseModel.paginate(query, { page, limit: 20 }, (err, res) => {
      if (err) throw new Error(err)
      return res
    })
    return result
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

    try {
      const release = new ReleaseModel({ ...data, video: { ...data.video, previewUrl } })

      return await release.save()
    } catch (err) {
      throw new Error(err)
    }
  }

  // UPDATE
  public updateReleaseByID = async (data: { id: string; release: releaseTypes.ReleaseModel }) => {
    const videoID = utils.getVideoIDFromUrl(data.release.video.url)
    const previewUrl = utils.formatterToPreviewLink(videoID)
    try {
      return await ReleaseModel.updateOne(
        { id: data.id },
        { $set: { ...data.release, video: { ...data.release.video, previewUrl } } },
        {},
      ).exec()
    } catch (err) {
      throw new Error(err)
    }
  }

  // DELETE
  public deleteReleaseByID = async (id: string) => {
    try {
      return await ReleaseModel.deleteOne({ id }).exec()
    } catch (err) {
      throw new Error()
    }
  }
}

export default new MongoReleaseController()
