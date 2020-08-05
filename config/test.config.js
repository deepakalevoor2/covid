module.exports = {
  mongodb: {
    url: 'mongodb://localhost:27017',
    databaseName: 'covid',
  },
  migrationsDir: 'migrations',
  changelogCollectionName: 'changelog',
}