import Sequelize from 'sequelize'

import db from '@/db/sequelize/index'

export const Release = db.define(
  'Release',
  {
    id: {
      type: Sequelize.DataTypes.UUID,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    isComplete: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: false,
    },
    channel: {
      type: Sequelize.DataTypes.JSONB,
      allowNull: false,
    },
    video: {
      type: Sequelize.DataTypes.JSONB,
      allowNull: false,
    },
    guest: {
      type: Sequelize.DataTypes.JSONB,
      allowNull: false,
    },
    recommendation: {
      type: Sequelize.DataTypes.JSONB,
      allowNull: false,
    },
  },
  {
    tableName: 'Releases',
  },
)

export const test = 'test'
