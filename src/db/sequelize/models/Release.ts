import Sequelize from 'sequelize'

import db from '@/db/sequelize/index'

const Release = db.define('releases', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  channel: {
    type: Sequelize.JSONB,
  },
  video: {
    type: Sequelize.JSONB,
  },
  guest: {
    type: Sequelize.JSONB,
  },
  recommendation: {
    type: Sequelize.JSONB,
  },
})

export default Release
