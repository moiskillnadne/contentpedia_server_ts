const options = {
    type: 'postgresql',
    migrations: {
        path: './src/migrations',
        tableName: 'migrations',
        transactional: true,
    },
    tsNode: true,
    user: 'vtcehnnr',
    password: 'WJWMFRgbmjQzDmnFWITvgw7lSxI6ZmMw',
    dbName: 'vtcehnnr',
    host: 'postgres://vtcehnnr:WJWMFRgbmjQzDmnFWITvgw7lSxI6ZmMw@hattie.db.elephantsql.com',
    port: 5432,
    entities: ['/Users/victorryabkov/projects/contentpedia_server_ts/src/db/entities'],
    entitiesTs: ['/Users/victorryabkov/projects/contentpedia_server_ts/src/db/entities'],
}