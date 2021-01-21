process.env.NODE_ENV === 'development'

import env from '../../config/env'

const { SEQ_DATABASE, SEQ_PASSWORD, SEQ_USERNAME, SEQ_HOST, SEQ_PORT } = process.env

console.log(DB_NAME)

export const development = {
    database: SEQ_DATABASE,
    username: SEQ_USERNAME,
    password: SEQ_PASSWORD,
    host: SEQ_PORT,
    port: SEQ_HOST,
    dialect: 'postgres',
}