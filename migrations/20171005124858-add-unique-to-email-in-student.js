'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addConstraint("Students", ['email'], {
      type: 'unique',
      name: 'uc_email'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("Students", 'email');
  }
};