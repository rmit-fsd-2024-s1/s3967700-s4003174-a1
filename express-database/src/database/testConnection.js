const { Sequelize } = require('sequelize');
const config = require('./config.js');

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: 'mysql',
  port: config.PORT || 3306
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  })
  .finally(() => {
    sequelize.close();
  });