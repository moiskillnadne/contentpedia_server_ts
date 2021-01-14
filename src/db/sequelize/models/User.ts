import { DataTypes } from 'sequelize'
import pg from '@/db/sequelize'

// eslint-disable-next-line import/prefer-default-export
export const User = pg.define(
  'User',
  {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'Users',
  },
)
