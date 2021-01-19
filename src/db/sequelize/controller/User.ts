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

  public getUserBy = async (data: { props: string; value: string | number }) => {
    try {
      const users = await User.findAll({
        where: {
          [data.props]: data.value,
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
      return await user.save()
    } catch (err) {
      throw new Error(err)
    }
  }

  // UPDATE
  public updateUserByID = async (data: { id: string; props: string; value: string | number }) => {
    try {
      return await User.update(
        { [data.props]: data.value },
        {
          where: {
            id: data.id,
          },
        },
      )
    } catch (err) {
      throw new Error(err)
    }
  }

  // DELETE
  public deleteUserByID = async (data: { id: string }) => {
    try {
      const result = await User.destroy({ where: { id: data.id } })
      return result
    } catch (err) {
      throw new Error(err)
    }
  }
}

export default new PostgresUserController()
