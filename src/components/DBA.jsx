const Sequelize = require('sequelize');
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
  storage: 'database/dbV1.sqlite',

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});


const train_t_table= sequelize.define('train_time_table', {
  train_id: {
    type: Sequelize.INTEGER
  },
  arrive_t: {
    type: Sequelize.DATE
  },
  depart_t: {
    type: Sequelize.DATE  
  },
  order: {
    type: Sequelize.INTEGER
  },
  route: {
    type: Sequelize.STRING
 },
  source_hash: {
    type: Sequelize.STRING
  }
});

// force: true will drop the table if it already exists
train_t_table.sync({force: true});
