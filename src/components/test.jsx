const Sequelize = require('sequelize')
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // SQLite only
  storage: 'database/dbV1.sqlite'
});

const train_ts = sequelize.define('train_time_tables', {
    train_id:'', arrive_t: '', depart_t: '', order: '', route: '', source_hash: ''
});
train_ts.sync({force : false}).then(() => {
    return train_ts.create({train_id: 0, arrive_t: 0, depart_t: 0, order: 0, route: 0, source_hash: 0});
});
