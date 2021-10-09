const Sequelize = require('sequelize');

const sequelize = new Sequelize('world_menu', 'world', 'menu', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;