import { User } from '@/common/types/auth'
import { UserModel } from '@/db/mongo/model/user'

class MongoUserController {
  // GET
  public getAllUser = async () => {
    try {
      const users = await UserModel.find()
      return users
    } catch (err) {
      throw new Error(err)
    }
  }

  public getUserBy = async (data: { props: string; value: string | number }) => {
    try {
      const users = await UserModel.findOne({ [data.props]: data.value }).exec()
      return users
    } catch (err) {
      throw new Error(err)
    }
  }

  // POST
  public addUser = async (obj: User) => {
    try {
      const user = new UserModel(obj)
      return await user.save()
    } catch (err) {
      throw new Error(err)
    }
  }

  // UPDATE
  public updateUserByID = async (data: { id: string; props: string; value: string | number }) => {
    try {
      return await UserModel.updateOne({ id: data.id }, { [data.props]: data.value })
    } catch (err) {
      throw new Error(err)
    }
  }

  // DELETE
  public deleteUserByID = async (data: { id: string }) => {
    try {
      const result = await UserModel.deleteOne({ id: data.id })
      return result
    } catch (err) {
      throw new Error(err)
    }
  }
}

export default new MongoUserController()
