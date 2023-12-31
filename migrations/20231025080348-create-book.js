'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      slug : {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.INTEGER
      },
      category_id : {
        type: Sequelize.INTEGER
      },
      isbn: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      content : {
        type: Sequelize.TEXT('long')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('books');
  }
};