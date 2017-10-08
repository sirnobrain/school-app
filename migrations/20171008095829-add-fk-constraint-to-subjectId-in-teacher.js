'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Teachers', ['SubjectId'], {
      type: 'FOREIGN KEY',
      name: 'teachers_subjects_fk',
      references: { //Required field
        table: 'Subjects',
        field: 'id'
      },
      onDelete: 'SET NULL'
    });
  },

  down: (queryInterface, Sequelize) => {
    return  queryInterface.removeConstraint('Teachers', 'teachers_subjects_fk');
  }
};
