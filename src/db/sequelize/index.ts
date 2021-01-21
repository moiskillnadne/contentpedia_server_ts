import { Sequelize } from 'sequelize'

const { SEQ_URI } = process.env

export default new Sequelize(SEQ_URI as string)
