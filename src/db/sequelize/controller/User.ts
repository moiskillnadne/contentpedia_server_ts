import { User } from '@/db/sequelize/models/User'
import * as auth from '@/common/types/auth'

class PostgresUserController {
  // GET
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

  // POST
  public addUser = async (obj: auth.User) => {
    try {
      const user = await User.create(obj)
      await user.save()
    } catch (err) {
      throw new Error(err)
    }
  }

  // UPDATE
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
}

export default new PostgresUserController()
