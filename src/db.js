const Sequelize = require('sequelize');
const { POSTGRES_CREDENTIALS } = require('./config');

const credentials = {
  USER: POSTGRES_CREDENTIALS.USER,
  PASSWORD: POSTGRES_CREDENTIALS.PASSWORD,
  DB: POSTGRES_CREDENTIALS.DB,
};

const dbConfig = {
  HOST: POSTGRES_CREDENTIALS.HOST,
  dialect: 'postgres',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const sequelize = new Sequelize(credentials.DB, credentials.USER, credentials.PASSWORD, dbConfig);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.activity = require('./models/activity')(sequelize, Sequelize);

module.exports = db;
