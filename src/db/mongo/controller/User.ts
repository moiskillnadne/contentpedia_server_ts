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

  public getOneUserBy = async (props: string, value: string | number) => {
    try {
      const users = await UserModel.findOne({ [props]: value }).exec()
      return users
    } catch (err) {
      throw new Error(err)
    }
  }

  // POST
  public addUser = async (obj: User) => {
    try {
      const user = new UserModel(obj)
      await user.save()
    } catch (err) {
      throw new Error(err)
    }
  }

  // UPDATE
  public updateOneUserField = async (id: string, props: string, value: string | number) => {
    try {
      await UserModel.updateOne({ id }, { [props]: value })
    } catch (err) {
      throw new Error(err)
    }
  }
  // DELETE
}

export default new MongoUserController()
