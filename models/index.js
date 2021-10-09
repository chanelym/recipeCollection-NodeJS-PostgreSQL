const database = require('./../database');

const worldMenu = database.define('world_menu', {
  recipe_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  recipe_name: {
    type: Sequelize.VARCHAR,
    allowNull: false,
  },
  recipe_cuisine: {
    type: Sequelize.VARCHAR,
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
});

module.exports = worldMenu;