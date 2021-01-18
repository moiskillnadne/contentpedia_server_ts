import Sequelize from 'sequelize'

import db from '@/db/sequelize/index'

export const Release = db.define(
  'Release',
  {
    uuid: Sequelize.DataTypes.UUID,
    isComplete: Sequelize.DataTypes.BOOLEAN,
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
