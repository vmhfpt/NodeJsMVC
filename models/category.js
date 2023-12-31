'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.books, {
        foreignKey: 'category_id'
      })
    }
  }
  Category.init({
    name: { type: DataTypes.STRING(255), unique: true },
    slug: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'categories',
  });
  return Category;
};