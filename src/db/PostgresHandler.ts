import { User } from '@/db/sequelize/models/User'
import { Release } from '@/db/sequelize/models/Release'
import * as utils from '@/util/urlParser'
import { RecommendationContentState } from '@/common/types/state'

type UserModel = {
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

class PostgresHandler {
  public addUser = async (obj: UserModel) => {
    try {
      const user = await User.create(obj)
      await user.save()
    } catch (err) {
      throw new Error(err)
    }
  }

  public getAllUser = async () => {
    try {
      const users = await User.findAll()
      return users
    } catch (err) {
      throw new Error(err)
    }
  }

  public getOneUserBy = async (props: string, value: string | number) => {
    try {
      const users = await User.findAll({
        where: {
          [props]: value,
        },
      })
      return users[0]
    } catch (err) {
      throw new Error(err)
    }
  }

  public updateOneUserField = async (id: string, props: string, value: string | number) => {
    try {
      await User.update(
        { [props]: value },
        {
          where: {
            id,
          },
        },
      )
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

    try {
      const release = await Release.create({
        uuid,
        isComplete,
        channel,
        video: { ...video, previewUrl },
        guest,
        recommendation,
      })
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

  public updateReleaseByUuid = async (uuid: string, release: any) => {
    try {
      const result = await Release.update({ ...release }, { where: { uuid } })
      return result
    } catch (err) {
      throw new Error(err)
    }
  }
}

export default new PostgresHandler()
