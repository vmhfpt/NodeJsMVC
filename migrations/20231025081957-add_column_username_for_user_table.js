'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    // await queryInterface.addColumn('users','username',  { 
    //   type: Sequelize.STRING 
    // });
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('users','username', {
          type: Sequelize.DataTypes.STRING,
          unique: true,
        }, { transaction: t })
      ]);
    });
  },

  down (queryInterface, Sequelize) {
    // queryInterface.removeColumn('users','username', {});
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('users', 'username', { transaction: t }),
      ]);
    });
  }
};
