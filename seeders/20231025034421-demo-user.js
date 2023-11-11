'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      username : 'ak47016599',
      name: 'Vũ Minh Hùng',
      password: '123456789Hv',
      email: 'vuminhhungltt904@gmail.com',
      remember_token : '',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
