'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('StudentSubjects', ['StudentId'], {
      type: 'FOREIGN KEY',
      name: 'studentsubjects_students_fk',
      references: { //Required field
        table: 'Students',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('StudentSubjects', 'studentsubjects_students_fk');
  }
};
