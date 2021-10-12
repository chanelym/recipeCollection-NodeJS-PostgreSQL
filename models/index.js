const { Sequelize, Datatypes } = require('sequelize');
const database = require('../database');

const worldMenu = database.sequelize.define('recipes', {
  recipe_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  recipe_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  recipe_cuisine: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  recipe_history: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  recipe_ingredients: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  recipe_prep_method: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  recipe_image_url: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
},{
  freezeTableName: true,
  timestamps: false,
  createdAt: false,
  updatedAt: false,
});

module.exports = worldMenu;