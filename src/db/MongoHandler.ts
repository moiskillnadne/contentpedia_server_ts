import { UserModel } from '@/db/model/user'

type IUser = {
  email: string
  password: string
  firstName: string
  lastName: string
  role: 'admin' | 'member'
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
}

export default new MongoHandler()
