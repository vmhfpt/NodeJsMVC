'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book.init({
    title: DataTypes.STRING(255),
    slug: DataTypes.STRING(255),
    author: DataTypes.STRING(255),
    isbn: DataTypes.STRING(255),
    year : DataTypes.INTEGER,
    category_id : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'books',
  });
  return Book;
};