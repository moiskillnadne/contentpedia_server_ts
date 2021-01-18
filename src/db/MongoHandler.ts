import { UserModel } from '@/db/mongo/model/user'
import { ReleaseModel } from '@/db/mongo/model/release'
import * as utils from '@/util/urlParser'
import { RecommendationContentState } from '@/common/types/state'

type IUser = {
  email: string
  password: string
  firstName: string
  lastName: string
  role: 'admin' | 'member'
}

type Channel = {
  title: string
  url: string
}
type Video = {
  title: string
  url: string
  previewUrl: string
}

type Guest = {
  firstname: string
  lastname: string
  middlename: string
  birthDate: Date
  profession: string
}

class MongoHandler {
  public addUser = async (obj: IUser) => {
    try {
      const user = new UserModel(obj)
      await user.save()
    } catch (err) {
      throw new Error(err)
    }
  }

  public getAllUser = async () => {
    try {
      const users = await UserModel.find()
      return users
    } catch (err) {
      throw new Error(err)
    }
  }

  public getOneUserBy = async (props: string, value: string | number) => {
    try {
      const users = await UserModel.findOne({ [props]: value }).exec()
      return users
    } catch (err) {
      throw new Error(err)
    }
  }

  public updateOneUserField = async (id: string, props: string, value: string | number) => {
    try {
      await UserModel.updateOne({ id }, { [props]: value })
    } catch (err) {
      throw new Error(err)
    }
  }

  public getAllRelease = async () => {
    try {
      const result = await ReleaseModel.find().exec()
      return result
    } catch (err) {
      throw new Error(err)
    }
  }

  public addRelease = async (
    uuid: string,
    isComplete: boolean,
    channel: Channel,
    video: Video,
    guest: Guest,
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

  public deleteReleaseByUuid = async (uuid: string) => {
    try {
      const result = await ReleaseModel.deleteOne({ uuid }).exec()
      return result
    } catch (err) {
      throw new Error()
    }
  }

  public updateReleaseByUuid = async (uuid: string, video: Record<string, unknown>) => {
    const result = await ReleaseModel.updateOne({ uuid }, { ...video }, {}, (err, res) => {
      if (err) throw new Error(err)
      return res
    }).exec()
    return result
  }

  public getOneRelease = async (id: string) => {
    try {
      const result = await ReleaseModel.findOne({ id }).exec()
      return result
    } catch (err) {
      throw new Error(err)
    }
  }
}

export default new MongoHandler()
